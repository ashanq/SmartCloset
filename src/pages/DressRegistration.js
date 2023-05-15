import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Button, Form, Image, Row, Col, Alert } from "react-bootstrap";
import NavigationBar from "../NavigationBar"; // Import NavigationBar

function DressRegistration() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [slotId, setSlotId] = useState(""); // new state variable for slot id
  const [isWebcamOpen, setWebcamOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const webcamRef = useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    return imageSrc;
  }, [webcamRef]);

  const saveDress = async () => {
    // Validation
    if (name === "") {
      setAlertMessage("Please enter a dress name.");
      setAlertVariant("danger");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    if (type === "") {
      setAlertMessage("Please select a dress type.");
      setAlertVariant("danger");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    if (color === "") {
      setAlertMessage("Please enter a dress color.");
      setAlertVariant("danger");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    if (slotId === "") {
      setAlertMessage("Please enter a slot id.");
      setAlertVariant("danger");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    if (capturedImage === null) {
      setAlertMessage("Please capture an image.");
      setAlertVariant("danger");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    // Check if slotId is unique
    const slotIdQuery = await getDocs(
      query(collection(db, "dresses"), where("slotId", "==", slotId))
    );
    if (!slotIdQuery.empty) {
      setAlertMessage(
        "Slot ID must be unique. Please enter a different Slot ID."
      );
      setAlertVariant("danger");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    // If slotId is unique, save the dress
    const image = capture();
    try {
      const docRef = await addDoc(collection(db, "dresses"), {
        name,
        type,
        color,
        image,
        slotId, // save the slotId to the dress document
        picked: false, // Add the new field
      });
      setAlertMessage("Dress saved successfully!");
      setAlertVariant("success");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      setAlertMessage("Error saving dress.");
      setAlertVariant("danger");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="container">
      <NavigationBar />
      <Form>
        {showAlert && (
          <Alert
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
            dismissible={false}
          >
            {alertMessage}
          </Alert>
        )}

        <Form.Group controlId="name">
          <Form.Label>Dress Name </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dress Name"
          />
        </Form.Group>

        <Form.Group controlId="type">
          <Form.Label>Dress Type</Form.Label>
          <Form.Control
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select a Dress</option>
            <option value="Shirts">Shirts</option>
            <option value="Trousers">Trousers</option>
            <option value="Frocks">Frocks</option>
            <option value="Sarees">Sarees</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="color">
          <Form.Label>Dress Color</Form.Label>
          <Form.Control
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Dress Color"
          />
        </Form.Group>

        <Form.Group controlId="slotId">
          <Form.Label>Slot ID</Form.Label>
          <Form.Control
            type="number"
            value={slotId}
            onChange={(e) => setSlotId(e.target.value)}
            placeholder="Slot ID"
          />
        </Form.Group>

        <br />
        {isWebcamOpen && (
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        )}

        <Row className="justify-content-md-center mt-3">
          <Col xs={12} md={4}>
            <Button variant="primary" block onClick={() => setWebcamOpen(true)}>
              Open Webcam
            </Button>
          </Col>
          {isWebcamOpen && (
            <Col xs={12} md={4}>
              <Button variant="secondary" block onClick={capture}>
                Capture Image
              </Button>
            </Col>
          )}
          <Col xs={12} md={4}>
            <Button variant="primary" block onClick={saveDress}>
              Save Dress
            </Button>
          </Col>
        </Row>

        {capturedImage && (
          <div className="mt-3">
            <h3>Captured Image</h3>
            <Image src={capturedImage} alt="Captured" fluid />
          </div>
        )}
      </Form>
    </div>
  );
}

export default DressRegistration;
