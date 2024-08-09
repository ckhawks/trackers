import styles from "../../page.module.scss";
import BackButton from "../../../components/BackButton";
import AddProgressButton from "../../../components/AddProgressButton";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { redirect } from "next/navigation";
import { getSession } from "@/auth/lib";

import { sql } from "@vercel/postgres";
import DeleteTrackerButton from "@/components/DeleteTrackerButton";
import EditTrackerButton from "@/components/EditTrackerButton";

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}

function getDateStringFromDate(date: Date) {
  // const timestamp = 1616608200000; // example timestamp
  // const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function Tracker({
  params,
}: {
  params: { uuid: string };
}) {
  const session = await getSession();
  console.log("session", session);

  if (!session) {
    redirect("/login");
  }

  // SELECT t.*. SUM(p.points) FROM "Tracker" t

  const query = `
    SELECT
      t.*,
      COALESCE(SUM(pe.points), 0) as points
    FROM "Tracker" t
    LEFT JOIN "Progress" p
    ON p."trackerid" = t.id AND p."deletedat" is NULL
    LEFT JOIN (
      SELECT "progressid", points
      FROM "ProgressEvent" 
      WHERE id IN (
        SELECT MAX(id)
        FROM "ProgressEvent"
        GROUP BY "progressid" 
      )
    ) pe ON pe."progressid" = p.id
    WHERE t.userid = $1
    AND t.id = $2
    GROUP BY t."id"`;
  // const query = `
  //   SELECT
  // `;
  const query_params = [session.user.id, params.uuid];
  const { rows: trackers } = await sql.query(query, query_params);

  const query2 = `
    SELECT * FROM "Progress" p
    LEFT JOIN "ProgressEvent" pe ON pe."progressid" = p.id
    WHERE pe.id IN (
      SELECT MAX(id) FROM "ProgressEvent"
      GROUP BY "progressid"
    )
    AND p."deletedat" is NULL
    AND p."trackerid" = $1
    ORDER BY p.id DESC;
  `;
  const query_params2 = [params.uuid];
  const { rows: progresses } = await sql.query(query2, query_params2);

  if (trackers.length > 1) {
    return <p>Found multiple trackers with that name somehow.</p>;
  }

  if (trackers.length == 0) {
    return <p>Found no trackers with that name.</p>;
  }

  const tracker = trackers[0];

  console.log("tracker", tracker);

  return (
    <div className={styles.wrapper}>
      <BackButton to="/" text="Back" />
      <main className={styles["main-centered"]}>
        <h1>{tracker.name}</h1>

        <p className={styles.subtext}>
          {tracker.points} point{tracker.points != 1 && "s"}
          {/* — 2 days ago*/}
        </p>

        {tracker.description && (
          <p className={styles["tracker-description"]}>{tracker.description}</p>
        )}

        <AddProgressButton trackerId={tracker.id} userId={session.user.id} />
        <div className={styles.description}></div>
        <div
          className={`${styles.row} ${styles.content}`}
          style={{ marginTop: "48px" }}
        >
          <h2></h2>
        </div>
        <div className={styles["progress-column"]}></div>
        {progresses &&
          progresses.map((progress) => {
            const tooltip = (
              <Tooltip id="tooltip" key={progress.id}>
                <strong>
                  {progress.points} point{progress.points != 1 && "s"}
                </strong>
                <br />
                {progress.summary && (
                  <>
                    {progress.summary}
                    <br />
                  </>
                )}

                <span style={{ color: "rgba(0,0,0,.5)" }}>
                  {getDateStringFromDate(progress.createdat)}
                </span>
              </Tooltip>
            );

            return (
              <OverlayTrigger
                placement="right"
                overlay={tooltip}
                key={progress.id}
              >
                <div
                  className={styles["progress-section"]}
                  style={{
                    height: 20 * progress.points + "px",
                    backgroundColor: random_rgba(),
                  }}
                ></div>
              </OverlayTrigger>
            );
          })}

        <EditTrackerButton
          tracker_id={tracker.id}
          tracker_name={tracker.name}
          tracker_description={tracker.description}
          tracker_focus={tracker.focus}
        />
        <DeleteTrackerButton
          tracker_id={tracker.id}
          tracker_name={tracker.name}
        />
      </main>
    </div>
  );
}
