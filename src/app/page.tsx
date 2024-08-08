import styles from "./page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AddTrackerButton from "../components/AddTrackerButton";
import Link from "next/link";

import { sql } from "@vercel/postgres";
import { getSession } from "@/auth/lib";
import { redirect } from "next/navigation";
import { Col, Row } from "react-bootstrap";
import ProfileButton from "@/components/ProfileButton";

export default async function Home() {
  const session = await getSession();
  console.log("session", session);

  if (!session) {
    redirect("/login");
  }

  const query = 'SELECT * FROM "Tracker" WHERE userid = $1';
  const params = [session.user.id];
  const { rows: trackers } = await sql.query(query, params);

  // const { rows: trackers } = await sql`SELECT * FROM "Tracker" `; // WHERE "userid"=${userId}
  // for some reason the line above doesn't work with the uuid parameter

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.description}>
          <Row style={{alignItems: 'center'}}>
          <Col>
          <h1>Trackers</h1>
          <p className={styles.subtext}>
            You&apos;re making progress,
            <span style={{color: "rgba(0,0,0,.8)", fontWeight: 600}}>
              {" "}{session.user.username}
            </span>!
          </p>
          </Col>
          <Col xs={3}>
            <ProfileButton username={session.user.username}/>
            
          </Col>
          </Row>
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
