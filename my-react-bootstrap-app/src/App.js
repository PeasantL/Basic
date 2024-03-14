import React, { useEffect, useState } from 'react';
import { Container, Image, Row, Col, Button} from 'react-bootstrap';
import { TextForm } from './components/form';


export default function App() {
  const [data, setData] = useState({
    data: {
    }
  });

  // Handle form changes directly in the `data` state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      data: { ...prevData.data, [name]: value }
    }));
  };

  // Load JSON from API
  useEffect(() => {
    fetch('http://localhost:3001/api/data')
      .then(response => response.json())
      .then(jsonObject => setData(jsonObject))
      .catch(error => console.error('There was a problem with the fetch operation', error));
      
  }, []);

  console.log(data);

  // Function to handle saving data
  const handleSave = () => {
    // Implement your save functionality here
    console.log('Data to send:', data);
  };
  

  /* App Structure */
  return (
    <div class= "mt-3 mb-3">
      <Container> 
        <div class= "mb-5">
          <Row>
            <Col>
              <div className="d-grid gap-4">
              <Button variant="primary" size="lg">Load File</Button>
              <Button variant="primary" size="lg" onClick={handleSave}>Save File</Button>
              <Button variant="primary" size="lg">Reset File</Button>
              </div>
            </Col>
            <Col>
              <Image src="main_awkward-questions-fm_spec_v2.png" fluid alt="Image" className="img-fluid mx-auto d-block" rounded/>
            </Col>
          </Row>
        </div>
        {/*Text boxes rendering*/}
          <TextForm textValues={data.data} handleChange={handleChange} />
      </Container>

      <Container>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Container>
    </div>
  );
};

