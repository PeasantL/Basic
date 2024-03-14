import React, { useState } from 'react';
import { Container, Image, Form } from 'react-bootstrap';

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

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event.target
    setTextValues({
      ...textValues,
      [name]: value // Use computed property name to update the right part of the state
    });
  };

  return (
    <div class= "mt-3 mb-3">
      <Container> 
        <div class= "mb-5">
        <Image src="main_awkward-questions-fm_spec_v2.png" fluid alt="Image" className="img-fluid mx-auto d-block" rounded/>
        </div>
      
        {Object.keys(textValues).map((key) => (
          <Form.Group key={key} controlId={`form${key}`}>
            <Form.Label>{key}</Form.Label>
            <Form.Control
              as= "textarea"
              rows= {3}
              type="text"
              name={key}
              value={textValues[key]}
              onChange={handleChange}
            />
          </Form.Group>
        ))}
      </Container>
      


    </div>
  );
};

