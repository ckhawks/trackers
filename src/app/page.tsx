import styles from "./page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AddTrackerButton from "../components/AddTrackerButton";
import Link from "next/link";

import { sql } from "@vercel/postgres";

export default async function Home() {
  const userId = "7e497089-9dfe-49b6-9823-0e2e05ca3e30";

  const query = 'SELECT * FROM "Tracker" WHERE userid = $1';
  const params = [userId];
  const { rows: trackers } = await sql.query(query, params);

  // const { rows: trackers } = await sql`SELECT * FROM "Tracker" `; // WHERE "userid"=${userId}
  // for some reason the line above doesn't work with the uuid parameter

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Trackers</h1>
          <p className={styles.subtext}>You&apos;re making progress.</p>
        </div>
        <div
          className={`${styles.row} ${styles.content}`}
          style={{ marginTop: "48px" }}
        >
          <h2>Your trackers</h2>
          <AddTrackerButton />
        </div>
        <div className={styles["tracker-cards"]}>
          {trackers.map((tracker) => (
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
                    1032 — 2 days ago
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={styles["icon-gray"]}
                />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
