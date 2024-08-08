"use server";

import { getSession, logout } from "@/auth/lib";
import LoginComponent from "./LoginComponent";

export default async function Page() {
  const session = await getSession();
  console.log("session", session);

  return (
    <section>
      {!session && <LoginComponent />}

      {session && (
        <form action={logout}>
          <button type="submit">Logout</button>
        </form>
      )}

      <pre>Session: {JSON.stringify(session, null, 2)}</pre>
    </section>
  );
}
