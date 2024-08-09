"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.scss";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useFormState } from "react-dom";
import { deleteTracker } from "@/app/api/trackers/actions";

const initialState = {
  message: "",
};

function DeleteTrackerButton(props: {
  tracker_name: string;
  tracker_id: string;
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, deleteTrackerAction] = useFormState(
    deleteTracker,
    initialState
  );

  useEffect(() => {
    if (state?.state === "success") {
      setShow(false);
    }
  }, [state]);

  return (
    <>
      <div
        className={`${styles["button"]} ${styles["button-secondary"]}`}
        onClick={handleShow}
        style={{ marginTop: "48px" }}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete tracker
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Form action={deleteTrackerAction}>
          <Modal.Header closeButton>
            <Modal.Title>Delete {props.tracker_name}?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {state?.message && (
              <p aria-live="polite">
                <Alert variant="danger" style={{ fontSize: "0.9rem" }}>
                  {state?.message}
                </Alert>
              </p>
            )}
            <p>
              Are you sure you&apos;d like to delete <b>{props.tracker_name}</b>
              ?
              <br />
              <br />
              <i>
                This will delete all data related to this tracker, and cannot be
                undone.
              </i>
            </p>
            <input
              style={{ display: "none" }}
              type="hidden"
              id="trackerId"
              name="trackerId"
              value={props.tracker_id}
            ></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default DeleteTrackerButton;
