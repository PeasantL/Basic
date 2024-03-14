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