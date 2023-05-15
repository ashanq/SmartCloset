import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import NavigationBar from "../NavigationBar"; // Import NavigationBar
import backgroundImage from "../assets/wardrobebgimage.jpg"; // Change this to the path of your image

function HomePage() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5",
      }}
    >
      <NavigationBar /> {/* Add NavigationBar */}
      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <Link to="/register">
              <Button variant="primary" className="mb-3">
                New Dresses
              </Button>
            </Link>
          </Col>
          <Col xs lg="2">
            <Link to="/select-dress">
              <Button variant="secondary" className="mb-3">
                Select Dresses
              </Button>
            </Link>
          </Col>
          <Col xs lg="2">
            <Link to="/view-dress">
              <Button variant="secondary" className="mb-3">
                View Dresses
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
