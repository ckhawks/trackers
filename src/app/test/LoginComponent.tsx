"use client";

import { login } from "@/auth/lib";
import { useActionState } from "react";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export default function LoginComponent() {
  const [state, loginAction] = useFormState(login, initialState);

  return (
    <form action={loginAction}>
      {state && <p aria-live="polite">{state?.message}</p>}
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" required />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
