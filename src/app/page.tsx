import styles from "./page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import AddTrackerButton from "../components/AddTrackerButton";
import Link from "next/link";

import { sql } from "@vercel/postgres";
import { getSession } from "@/auth/lib";
import { Col, Row } from "react-bootstrap";
import ProfileButton from "@/components/ProfileButton";

export default async function Home() {
  const session = await getSession();
  // console.log("session", session);

  // const { rows: trackers } = await sql`SELECT * FROM "Tracker" `; // WHERE "userid"=${userId}
  // for some reason the line above doesn't work with the uuid parameter

  if (session) {
    // const query = `
    //   SELECT * FROM "Tracker" t
    //   WHERE t.userid = $1;
    // `;
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
      GROUP BY t."id"
    `;
    const params = [session.user.id];
    const { rows: trackers } = await sql.query(query, params);

    const focusedTrackers = [];
    const backburnerTrackers = [];

    for (let tracker of trackers) {
      if (tracker.focus) {
        focusedTrackers.push(tracker);
      } else {
        backburnerTrackers.push(tracker);
      }
    }

    return (
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={styles.description}>
            <Row style={{ alignItems: "center" }}>
              <Col>
                <h1>Trackers</h1>
                <p className={styles.subtext}>
                  You&apos;re making progress,
                  <span style={{ color: "rgba(0,0,0,.8)", fontWeight: 600 }}>
                    {" "}
                    {session.user.username}
                  </span>
                  !
                </p>
              </Col>
              <Col xs={3}>
                <ProfileButton username={session.user.username} />
              </Col>
            </Row>
          </div>
          <div
            className={`${styles.row} ${styles.content}`}
            style={{ marginTop: "48px" }}
          >
            <h3>Your trackers</h3>
            <AddTrackerButton />
          </div>
          <p>Focus</p>
          <div className={styles["tracker-cards"]}>
            {focusedTrackers.map((tracker) => (
              <Link
                href={"/tracker/" + tracker.id}
                passHref
                legacyBehavior
                key={tracker.id}
              >
                <div className={styles["tracker-card"]}>
                  <div className={styles["tracker-card-content"]}>
                    <div style={{ fontWeight: 600 }}>{tracker.name}</div>
                    <div style={{}} className={styles["subtext"]}>
                      {tracker.points} {/*— 2 days ago */}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className={styles["icon-gray"]}
                  />
                </div>
              </Link>
            ))}
            {focusedTrackers.length == 0 && (
              <p className={styles['subtext']}>There are no focused trackers.</p>
            )}
          </div>
          <p style={{ marginTop: "48px" }}>Backburner</p>
          <div className={styles["tracker-cards"]}>
            {backburnerTrackers.map((tracker) => (
              <Link
                href={"/tracker/" + tracker.id}
                passHref
                legacyBehavior
                key={tracker.id}
              >
                <div
                  className={`${styles["tracker-card"]} ${styles["tracker-card-backburner"]}`}
                >
                  <div className={styles["tracker-card-content"]}>
                    <div style={{ fontWeight: 600 }}>{tracker.name}</div>
                    <div style={{}} className={styles["subtext"]}>
                      {tracker.points} {/*— 2 days ago */}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className={styles["icon-gray"]}
                  />
                </div>
              </Link>
            ))}
            {focusedTrackers.length == 0 && (
              <p className={styles['subtext']}>There are no backburner trackers.</p>
            )}
          </div>
        </main>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.wrapper}>
        <main className={`${styles.main} ${styles.narrow}`}>
          <div className={styles.description}>
            <Link href="/">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: "#E26F6F", fontSize: "2rem" }}
                />
              </div>

              <h1>Trackers</h1>
            </Link>
            <p className={styles.subtext}>
              You&apos;re making progress; track it!
            </p>
          </div>
          <div
            className={`${styles.row} ${styles.content}`}
            style={{ marginTop: "24px" }}
          ></div>

          <section>
            Trackers is an unconventional productivity and mindfulness
            application, allowing you to track incremental personal progress in
            a variety of user-defined areas.
            <br />
            <br />
            You define trackers (areas that you want to progress in), and then
            you can add progress events where you choose an amount of points to
            award yourself. Over time, you&apos;re able to see the tower of your
            progress grow, passing milestones.
            <br />
            <br />
            <Link href="/register" className={styles["button"]}>
              Register
            </Link>
            <Link
              style={{ marginTop: "8px" }}
              href="/login"
              className={`${styles["button"]} ${styles["button-secondary"]}`}
            >
              Login
            </Link>
            <br />
            <span style={{ marginRight: "8px", fontWeight: 600 }}>Why?</span>
            It can incentivize making consistent progress, and recognizing
            progress over time. It also provides a loose framework for how to
            track progress in areas that are typically unquantifiable.
            <br />
            <br />
            <span style={{ color: "rgba(0,0,0,.5)" }}>
              Credit to my therapist for the initial idea the application was
              built around.
            </span>
            {/* {session && (
        <form action={logout}>
          <button type="submit">Logout</button>
        </form>
      )} */}
            {/* <pre>Session: {JSON.stringify(session, null, 2)}</pre> */}
          </section>
        </main>
      </div>
    );
  }
}
