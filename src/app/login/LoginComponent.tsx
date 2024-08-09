"use client";

import { login } from "@/auth/lib";
import { useFormState } from "react-dom";

import styles from "../page.module.scss";
import { Alert, Form } from "react-bootstrap";
import Link from "next/link";

const initialState = {
  message: "",
};

export default function LoginComponent() {
  const [state, loginAction] = useFormState(login, initialState);

  return (
    <form action={loginAction}>
      {state?.message && (
        <p aria-live="polite">
          <Alert variant='danger' style={{fontSize: '0.9rem'}}>
            {state?.message}
          </Alert>
        </p>
      )}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder=""  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder=""  />
      </Form.Group>
      <br />
      <div className={styles['login-buttons']}>
        <button type="submit" className={styles["button"]}>
          {/* <FontAwesomeIcon icon={faPlus} />  */} Login
        </button>
        <Link href="/register" className={`${styles["button"]} ${styles['button-secondary']}`}>
          Register
        </Link>
      </div>
    </form>
  );
}
