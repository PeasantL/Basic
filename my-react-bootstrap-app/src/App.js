import React, { useEffect, useState } from 'react';
import { Container, Image, Row, Col, Button} from 'react-bootstrap';
import { TextForm } from './components/form';


export default function App () {

  const [textValues, setTextValues] = useState({
    name: "",
    description: "",
    personality: "",
    first_mes: "",
    mes_example: "",
    scenario: "",
    creator_notes: "",
    system_prompt: "",
    post_history_instructions: "",
    creator: "" 
  });


  //Todo: change every text box to be disabled until there is a file loaded!  
  //Handle Change should be invoke if there is a loaded json, so that the 
  //JSON data is changed with changes in text
  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event.target
    setTextValues({
      ...textValues,
      [name]: value // Use computed property name to update the right part of the state
    });

    //
    setData(prevData => ({
      ...prevData,
      data: { ...prevData.data, [name]: value}
    }));

  };

  const [jsonObject, setData] = useState(null);

  //to be changed to recieve from API 
  //Update textValues upon loading the fetched data
  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(jsonObject => {
        setData(jsonObject); //Sets the fetched data to state

        // Updates textValues based on the fetched data
        setTextValues(prevValues => ({
          ...prevValues,
          ...Object.keys(prevValues).reduce((acc, key) => {
            // Check if the fetched data has the key and if so, update the value 
            if (jsonObject.data.hasOwnProperty(key)) {
              acc[key] = jsonObject.data[key];
            }
            return acc;
        }, {})
      }));
    })
    .catch(error => console.error('There was a problem with the fetch operation', error));
  }, []);
  

  /* App Structure */

  return (
    <div class= "mt-3 mb-3">
      <Container> 
        <div class= "mb-5">
          <Row>
            <Col>
              <div className="d-grid gap-4">
              <Button variant="primary" size="lg">Load File</Button>
              <Button variant="primary" size="lg">Save File</Button>
              <Button variant="primary" size="lg">Reset File</Button>
              </div>
            </Col>
            <Col>
              <Image src="main_awkward-questions-fm_spec_v2.png" fluid alt="Image" className="img-fluid mx-auto d-block" rounded/>
            </Col>
          </Row>
        </div>
        {/*Text boxes rendering*/}
          <TextForm textValues={textValues} handleChange={handleChange} />
      </Container>

      <Container>
        <pre>{JSON.stringify(jsonObject, null, 2)}</pre>
      </Container>
    </div>
  );
};

