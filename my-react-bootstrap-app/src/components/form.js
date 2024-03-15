import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';

export const TextForm = ({ textValues, handleChange }) => {
  const textAreaRef = useRef({});

  const adjustHeight = (key) => {
    const textarea = textAreaRef.current[key];
    if (textarea) {
      textarea.style.height = 'inherit'; // Reset height to recalculate
      const computed = window.getComputedStyle(textarea);
      // Calculate the height
      const height = textarea.scrollHeight + parseInt(computed.borderTopWidth) + parseInt(computed.borderBottomWidth);
      textarea.style.height = `${height+2}px`;
    }
  };

  useEffect(() => {
    Object.keys(textValues).forEach(key => adjustHeight(key));
  }, [textValues]);

  const handleDynamicChange = (e) => {
    handleChange(e);
    adjustHeight(e.target.name);
  };

  return (
    <>
      {Object.keys(textValues).map((key) => (
        <Form.Group key={key} controlId={`form${key}`}>
          <Form.Label>{key}</Form.Label>
          <Form.Control
            as="textarea"
            ref={(el) => (textAreaRef.current[key] = el)}
            type="text"
            name={key}
            value={textValues[key]}
            onChange={handleDynamicChange}
            style={{ height: 'auto' }}
          />
        </Form.Group>
      ))}
    </>
  );
};
