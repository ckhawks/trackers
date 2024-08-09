"use server";

import styles from "../page.module.scss";
import { getSession, logout } from "@/auth/lib";
import LoginComponent from "./LoginComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage() {
  const session = await getSession();
  // console.log("session", session);

  if (session) {
    redirect("/");
  }

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
          {!session && <LoginComponent />}

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
