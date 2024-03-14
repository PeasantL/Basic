import React from 'react';
import { Form } from 'react-bootstrap'

export function CheckAndRadio() {
  return (
    <Form>
      {['checkbox', 'radio'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          <Form.Check // prettier-ignore
            type={type}
            id={`default-${type}`}
            label={`default ${type}`}
          />

          <Form.Check
            disabled
            type={type}
            label={`disabled ${type}`}
            id={`disabled-default-${type}`}
          />
        </div>
      ))}
    </Form>
  );
}
export function TextControls({ boxName, value, onChange}) {

  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    //Email input
   
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>{boxName}</Form.Label>
      <Form.Control 
        as="textarea" 
        rows={5} 
        value={value}
        onChange={handleInputChange}
      />
    </Form.Group>

  );
}