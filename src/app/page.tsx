import styles from "./page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AddTrackerButton from "./components/AddTrackerButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>
            Trackers
          </h1>
          <p className={styles.subtext}>
            You're making progress.
          </p>
        </div>
        <div className={`${styles.row} ${styles.content}`} style={{marginTop: '48px'}}>
          <h2>Your trackers</h2>
          <AddTrackerButton />
        </div>
        <div className={styles["tracker-cards"]}>
            <Link href="/communication" passHref legacyBehavior>
                <div className={styles["tracker-card"]}>
                    <div className={styles['tracker-card-content']}>
                        <div style={{fontWeight: 600}}>Communication</div>
                        <div style={{}} className={styles['subtext']}>1032 — 2 days ago</div>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className={styles["icon-gray"]}/>
                </div>
            </Link>
        </div>
      </main>
    </div>
  );
}
