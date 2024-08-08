import styles from "../page.module.scss";
import BackButton from "../components/BackButton";
import AddProgressButton from "../components/AddProgressButton";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Tracker({ params }: { params: { slug: string } }) {

  const tooltip = (
    <Tooltip id="tooltip">
      <strong>July 24, 2024</strong><br/>Worked on Tracker project
    </Tooltip>
  );
  return (
    <div className={styles.wrapper}>
      <BackButton to="/" text="Back"/>
      <main className={styles['main-centered']}>
        <h1>
          UX Design
        </h1>

        <p className={styles.subtext}>
            1022 — 2 days ago
        </p>

        <AddProgressButton />
        <div className={styles.description}>
          
        
          
        </div>
        <div className={`${styles.row} ${styles.content}`} style={{marginTop: '48px'}}>
          <h2>Your trackers</h2>
        </div>
        <OverlayTrigger placement="right" overlay={tooltip}>
          <Button>Holy guacamole!</Button>
        </OverlayTrigger>
        
      </main>
    </div>
  );
}
