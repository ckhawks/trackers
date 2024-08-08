"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "../page.module.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

function AddProgressButton() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <div className={styles['button']} onClick={handleShow} style={{ marginTop: '16px' }}>
            <FontAwesomeIcon icon={faPlus} /> Add progress
        </div>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add progress</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="align-items-center">
                    <Col xs="auto">
                    <Form.Label htmlFor="progress-points">Points</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control type="number" id="progress-points" aria-describedby="basic-addon3" style={{maxWidth: '100px' }}/>
                    </InputGroup>
                    </Col>
                    <Col xs="auto">
                    <Form.Label htmlFor="progress-points">Date</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control type="date" id="progress-points" aria-describedby="basic-addon3" />
                    </InputGroup>
                    </Col>
                </Row>
                <Form.Label htmlFor="progress-summary">Summary</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control id="progress-summary" aria-describedby="basic-addon3" />
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
  
  export default AddProgressButton;