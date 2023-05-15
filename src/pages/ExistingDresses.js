import React from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../NavigationBar"; // Import NavigationBar
import {ThreeDots} from 'react-loader-spinner';


function ExistingDresses() {
  const [dresses, setDresses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDresses = async () => {
      const dressesCollection = await getDocs(collection(db, "dresses"));
      setDresses(
        dressesCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    };

    fetchDresses();
  }, []);

  

  const restoreDress = async (id, slotId) => {
    fetch(`http://192.168.25.112/${slotId}`)
      .then((response) => console.log(response))
      .catch((error) => console.error("Error:", error));

    const dressRef = doc(db, "dresses", id);
    await updateDoc(dressRef, {
      picked: false,
    });

    // Update the local state
    setDresses(
      dresses.map((dress) =>
        dress.id === id ? { ...dress, picked: false } : dress
      )
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ThreeDots color="#000000" height={80} width={80} />
      </div>
    );
  }
  return (
    <Container>
      <NavigationBar />
      <Row>
        {dresses.map((dress) => {
          return (
            <Col md={4} key={dress.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={dress.image} />
                <Card.Body>
                  <Card.Title>{dress.name}</Card.Title>
                  <Card.Text>
                    Type: {dress.type}
                    <br />
                    Color: {dress.color}
                  </Card.Text>
                  {dress.picked ? (
                    <Button
                      variant="success"
                      onClick={() => restoreDress(dress.id, dress.slotId)}
                    >
                      Restore Dress
                    </Button>
                  ) : (
                    <span>Not Picked</span>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default ExistingDresses;
