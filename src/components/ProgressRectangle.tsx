"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.scss";
import { Alert, Button, Col, Form, InputGroup, Modal, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { editProgressEntry } from "@/app/api/progress/actions";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};



  function getDateStringFromDate(date: Date) {
    // const timestamp = 1616608200000; // example timestamp
    // const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

function ProgressRectangle(props: {progress: any, userId: string, color: string}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, editProgressEntryAction] = useFormState(editProgressEntry, initialState);

  useEffect(() => {
    if(state?.state === "success") {
      setShow(false);
    }
  }, [state]);

  const tooltip = (
    <Tooltip id="tooltip" key={props.progress.id} style={{marginLeft: '16px'}}>
      <strong>
        {props.progress.points} point{props.progress.points != 1 && "s"}
      </strong>
      <br />
      {props.progress.summary && (
        <>
          {props.progress.summary}
          <br />
        </>
      )}

      <span style={{ color: "rgba(0,0,0,.5)" }}>
        {getDateStringFromDate(props.progress.createdat)}
      </span>
    </Tooltip>
  );

  console.log(props.progress);


  return (
    <>
    <OverlayTrigger
                placement="right"
                overlay={tooltip}
                key={props.progress.id}
              >
                <div
                  className={styles["progress-section"]}
                  style={{
                    height: 20 * props.progress.points + "px",
                    backgroundColor: props.color,
                  }}
                  onClick={handleShow}
                ></div>
              </OverlayTrigger>
      {/* <div
        className={styles["button"]}
        onClick={handleShow}
        style={{ marginTop: "16px" }}
      >
        <FontAwesomeIcon icon={faPlus} /> Add progress
      </div> */}
      <Modal show={show} onHide={handleClose} centered>
        <Form action={editProgressEntryAction}>
        <Modal.Header closeButton>
          <Modal.Title>Edit progress entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {state?.message && (
            <p aria-live="polite">
              <Alert variant='danger' style={{fontSize: '0.9rem'}}>
                {state?.message}
              </Alert>
            </p>
          )}
          <input style={{display: 'none' }} type="hidden" id="progressId" name="progressId" value={props.progress.progressid}></input>
          <input style={{display: 'none' }} type="hidden" id="progress-userid" name="progress-userid" value={props.userId}></input>
          <Row className="align-items-center">
            <Col xs="auto">
                
              <Form.Label htmlFor="progress-points">Points</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="number"
                  id="progress-points"
                  name="progress-points"
                  defaultValue={props.progress.points}
                  style={{ maxWidth: "100px" }}
                />
              </InputGroup>
              
            </Col>
            <Col xs="auto">
            <Form.Label htmlFor="progress-date">Date</Form.Label>
            <div style={{marginBottom: '16px', minHeight: '38px', display: 'flex', alignItems: 'center'}}>
                <p style={{marginBottom: '0px'}}>{getDateStringFromDate(props.progress.createdat)}</p>
            </div>

              {/* <Form.Label htmlFor="progress-date">Date</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="date"
                  id="progress-date"
                  name="progress-date"
                />
              </InputGroup> */}
            </Col>
          </Row>
          <Form.Label htmlFor="progress-summary">Summary</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              id="progress-summary"
              name="progress-summary"
              defaultValue={props.progress.summary}
            />
            
          </InputGroup>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Edit
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ProgressRectangle;
