"use client";

import { register } from "@/auth/lib";
import { useFormState } from "react-dom";

import styles from "../page.module.scss";
import { Alert, Form } from "react-bootstrap";
import Link from "next/link";

const initialState = {
  message: "",
};

export default function RegisterComponent() {
  const [state, registerAction] = useFormState(register, initialState);

  return (
    <form action={registerAction}>
      {state?.message && (
        <p aria-live="polite">
          <Alert variant='danger' style={{fontSize: '0.9rem'}}>
            {state?.message}
          </Alert>
        </p>
      )}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Username</Form.Label>
        <Form.Control type="name" name="username" placeholder=""  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder=""  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder=""  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
        <Form.Label>Access Code</Form.Label>
        <Form.Control type="name" name="access_code" placeholder=""  />
      </Form.Group>
      <br />
      <div className={styles['login-buttons']}>
        <button type="submit" className={styles["button"]}>
          {/* <FontAwesomeIcon icon={faPlus} />  */} Register
        </button>
        <Link href="/login" className={`${styles["button"]} ${styles['button-secondary']}`}>
          Login
        </Link>
      </div>
    </form>
  );
}
