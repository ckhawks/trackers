import React from "react";

import { authenticate } from "@/app/lib/actions";

export default function Page() {
  return (
    <form action={authenticate}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
