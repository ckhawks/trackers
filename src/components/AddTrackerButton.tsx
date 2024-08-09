"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useFormState } from "react-dom";
import { addTracker } from "@/app/api/trackers/actions";

const initialState = {
  message: "",
};

function AddTrackerButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, addTrackerAction] = useFormState(addTracker, initialState);

  useEffect(() => {
    if (state?.state === "success") {
      setShow(false);
    }
  }, [state]);

  return (
    <>
      <div className={styles["button"]} onClick={handleShow}>
        <FontAwesomeIcon icon={faPlus} /> Add tracker
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Form action={addTrackerAction}>
          <Modal.Header closeButton>
            <Modal.Title>Add tracker</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {state?.message && (
              <p aria-live="polite">
                <Alert variant="danger" style={{ fontSize: "0.9rem" }}>
                  {state?.message}
                </Alert>
              </p>
            )}
            <Form.Label htmlFor="tracker-name">Name</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                id="tracker-name"
                name="tracker-name"
                aria-describedby="basic-addon3"
              />
            </InputGroup>
            <Form.Label htmlFor="tracker-description">Description</Form.Label>
            <InputGroup>
              <Form.Control
                id="tracker-description"
                name="tracker-description"
                as="textarea"
              />
            </InputGroup>
            <Form.Check // prettier-ignore
              type={"checkbox"}
              id={`tracker-focus`}
              name="tracker-focus"
              label={`Current focus`}
              defaultChecked={true}
              style={{ marginTop: "12px" }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {" "}
              {/*  onClick={handleClose}*/}
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddTrackerButton;
