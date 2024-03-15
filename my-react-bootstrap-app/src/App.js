import React, { useEffect, useState } from 'react';
import { Container, Image, Row, Col, Button} from 'react-bootstrap';
import { TextForm } from './components/form';
import { UploadImage } from './hooks/upload'


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


  // Function to handle saving data
  const handleSave = () => {
    // Implement your save functionality here
    console.log('Data to send:', data);
  };
  

  /* App Structure */
  return (
    <div className= "mt-3 mb-3">
      <Container> 
        <div className= "mb-5">
          <Row>
            <Col>
              <div className="d-grid gap-4">
              <UploadImage />
              <Button variant="primary">Upload Folder</Button>
              <Button variant="primary">Purge Upload</Button>
              <Button variant="primary" onClick={handleSave}>Save File</Button>
              <Button variant="primary">Reset File</Button>
              <Button variant="primary">Convert Asterisk</Button>
              <Button variant="primary">Convert Speech Marks</Button>
              <Button variant="primary">Convert Both</Button>
              </div>
            </Col>
            <Col>
              <Image src="http://localhost:3001/api/images" fluid alt="Image" className="img-fluid mx-auto d-block" rounded/>
            </Col>
          </Row>
        </div>
        {/*Text boxes rendering*/}
          <TextForm textValues={data.data} handleChange={handleChange} />
      </Container>


      <Container className= "mt-3">
        <h5>Raw String Check</h5>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Container>
    </div>
  );
};