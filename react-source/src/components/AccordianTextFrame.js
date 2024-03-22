import { Accordion } from "react-bootstrap";
import { React } from "react";
import { FormTextBox } from "./FormTextBoxes";
import { jsonCardCategories } from "../utils/dataStructures";
import PropTypes from "prop-types";

export function AccordianTextFrame({ jsonCard, setJsonCard }) {
  const handleChange = (event, index = null) => {
    const { name, value } = event.target;
    setJsonCard((prevJsonCard) => {
      // Check if the field is an array
      if (index !== null) {
        // Handle array: update specific element
        const updatedArray = [...prevJsonCard.data[name]]; // Clone the array to avoid direct state mutation
        updatedArray[index] = value; // Update the element at the specific index
        return {
          ...prevJsonCard,
          data: { ...prevJsonCard.data, [name]: updatedArray }, // Update the state with the modified array
        };
      } else {
        // Handle regular field: just update the value
        return {
          ...prevJsonCard,
          data: { ...prevJsonCard.data, [name]: value },
        };
      }
    });
  };

  return (
    <>
      <Accordion defaultActiveKey={["1"]} alwaysOpen>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Self-Adjusting Settings</Accordion.Header>
          <Accordion.Body>
            <FormTextBox
              textValues={jsonCard.data}
              handleChange={handleChange}
              includedKeys={jsonCardCategories.defaultSetting}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey={["1"]} alwaysOpen>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Unchanged Settings</Accordion.Header>
          <Accordion.Body>
            <FormTextBox
              textValues={jsonCard.data}
              handleChange={handleChange}
              includedKeys={jsonCardCategories.addSetting}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey={["1"]} alwaysOpen>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Auxillary Settings</Accordion.Header>
          <Accordion.Body>
            <FormTextBox
              textValues={jsonCard.data}
              handleChange={handleChange}
              includedKeys={jsonCardCategories.miscSettings}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

AccordianTextFrame.propTypes = {
  jsonCard: PropTypes.object.isRequired,
  setJsonCard: PropTypes.func.isRequired,
};
