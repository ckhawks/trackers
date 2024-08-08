"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "@/app/page.module.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

function AddTrackerButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className={styles["button"]} onClick={handleShow}>
        <FontAwesomeIcon icon={faPlus} /> Add tracker
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add tracker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="tracker-name">Name</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control id="tracker-name" aria-describedby="basic-addon3" />
          </InputGroup>
          <Form.Label htmlFor="tracker-description">Description</Form.Label>
          <InputGroup>
            <Form.Control id="tracker-description" as="textarea" />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTrackerButton;
