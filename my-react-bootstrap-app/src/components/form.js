import React from 'react';
import { Form } from 'react-bootstrap'


export const TextForm = ({ textValues, handleChange}) => {
  return (
    <>
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
    </>
  );
};