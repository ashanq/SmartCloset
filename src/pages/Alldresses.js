import React from 'react';
import { collection, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { useFirestoreCollectionData, useFirestore } from 'reactfire';
import { db } from '../firebase';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import NavigationBar from '../NavigationBar'; // Import NavigationBar
import {ThreeDots} from 'react-loader-spinner';

function AllDresses() {
    const dressesRef = collection(db, 'dresses');
    const { status, data: dresses } = useFirestoreCollectionData(dressesRef);

    const deleteDress = async (id) => {
        try {
            await deleteDoc(doc(db, 'dresses', id));
        } catch (e) {
            console.error("Error deleting dress: ", e);
        }
    }

    const pickDress = async (id, slotId) => {
        fetch(`http://192.168.161.112/${slotId}`)
            .then(response => console.log(response))
            .catch(error => console.error('Error:', error));
    
        const dressRef = doc(db, 'dresses', id);
        await updateDoc(dressRef, {
            picked: true,
        });
    }

    if (status === 'loading') {
      // Use ThreeDots Loader
      return(<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <ThreeDots color="#00BFF" height={80} width={80} />
         </div>
         );
      }
    
    if (status === 'error') {
      return <div>Error: Something went wrong</div>;
    }

  return (
    <Container>
        <NavigationBar /> 
      <Row>
        {dresses.filter(dress => !dress.picked).map(dress => {
          return (
            <Col md={4} key={dress.NO_ID_FIELD}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={dress.image} />
                <Card.Body>
                  <Card.Title>{dress.name}</Card.Title>
                  <Card.Text>
                    Type: {dress.type}
                    <br />
                    Color: {dress.color}
                  </Card.Text>
                  <Button variant="primary"  onClick={() => pickDress(dress.NO_ID_FIELD, dress.slotId) }>Pick</Button>
                  <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => deleteDress(dress.NO_ID_FIELD)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default AllDresses;
