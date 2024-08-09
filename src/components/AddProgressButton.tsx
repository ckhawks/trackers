"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { addProgressToTracker } from "@/app/api/progress/actions";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

function AddProgressButton(props: {trackerId: string, userId: string}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, addProgressToTrackerAction] = useFormState(addProgressToTracker, initialState);

  useEffect(() => {
    if(state?.state === "success") {
      setShow(false);
    }
  }, [state]);

  return (
    <>
      <div
        className={styles["button"]}
        onClick={handleShow}
        style={{ marginTop: "16px" }}
      >
        <FontAwesomeIcon icon={faPlus} /> Add progress
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Form action={addProgressToTrackerAction}>
        <Modal.Header closeButton>
          <Modal.Title>Add progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {state?.message && (
            <p aria-live="polite">
              <Alert variant='danger' style={{fontSize: '0.9rem'}}>
                {state?.message}
              </Alert>
            </p>
          )}
          <input style={{display: 'none' }} type="hidden" id="progress-trackerId" name="progress-trackerId" value={props.trackerId}></input>
          <input style={{display: 'none' }} type="hidden" id="progress-userid" name="progress-userid" value={props.userId}></input>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="progress-points">Points</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="number"
                  id="progress-points"
                  name="progress-points"
                  style={{ maxWidth: "100px" }}
                />
              </InputGroup>
            </Col>
            {/* <Col xs="auto">
              <Form.Label htmlFor="progress-date">Date</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="date"
                  id="progress-date"
                  name="progress-date"
                />
              </InputGroup>
            </Col> */}
          </Row>
          <Form.Label htmlFor="progress-summary">Summary</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              id="progress-summary"
              name="progress-summary"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddProgressButton;
