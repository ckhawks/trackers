"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.scss";
import { faGear, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useFormState } from "react-dom";
import { editTracker } from "@/app/api/trackers/actions";

const initialState = {
  message: "",
};

function EditTrackerButton(props: {
  tracker_name: string;
  tracker_id: string;
  tracker_description: string;
  tracker_focus: boolean;
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, editTrackerAction] = useFormState(editTracker, initialState);

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
        <FontAwesomeIcon icon={faGear} /> Edit tracker
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Form action={editTrackerAction}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {props.tracker_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {state?.message && (
              <p aria-live="polite">
                <Alert variant="danger" style={{ fontSize: "0.9rem" }}>
                  {state?.message}
                </Alert>
              </p>
            )}
            <input
              style={{ display: "none" }}
              type="hidden"
              id="trackerId"
              name="trackerId"
              value={props.tracker_id}
            ></input>
            <Form.Label htmlFor="tracker-name">Name</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                id="tracker-name"
                name="tracker-name"
                aria-describedby="basic-addon3"
                defaultValue={props.tracker_name}
              />
            </InputGroup>
            <Form.Label htmlFor="tracker-description">Description</Form.Label>
            <InputGroup>
              <Form.Control
                id="tracker-description"
                name="tracker-description"
                as="textarea"
                defaultValue={props.tracker_description}
              />
            </InputGroup>
            <Form.Check // prettier-ignore
              type={"checkbox"}
              id={`tracker-focus`}
              name="tracker-focus"
              label={`Current focus`}
              defaultChecked={props.tracker_focus}
              style={{ marginTop: "12px" }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditTrackerButton;
