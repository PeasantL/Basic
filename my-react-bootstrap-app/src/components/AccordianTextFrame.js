import { Accordion } from "react-bootstrap";
import { React } from "react";
import { FormTextBox } from "./FormTextBoxes";
import { dataCategories } from "../utils/dataStructures";
import PropTypes from "prop-types";

export function AccordianTextFrame({ textValues, setData }) {
  const handleChange = (event, index = null) => {
    const { name, value } = event.target;
    setData((prevData) => {
      // Check if the field is an array
      if (index !== null) {
        // Handle array: update specific element
        const updatedArray = [...prevData.data[name]]; // Clone the array to avoid direct state mutation
        updatedArray[index] = value; // Update the element at the specific index
        return {
          ...prevData,
          data: { ...prevData.data, [name]: updatedArray }, // Update the state with the modified array
        };
      } else {
        // Handle regular field: just update the value
        return {
          ...prevData,
          data: { ...prevData.data, [name]: value },
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
              textValues={textValues}
              handleChange={handleChange}
              includedKeys={dataCategories.defaultSetting}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey={["1"]} alwaysOpen>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Unchanged Settings</Accordion.Header>
          <Accordion.Body>
            <FormTextBox
              textValues={textValues}
              handleChange={handleChange}
              includedKeys={dataCategories.addSetting}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey={["1"]} alwaysOpen>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Auxillary Settings</Accordion.Header>
          <Accordion.Body>
            <FormTextBox
              textValues={textValues}
              handleChange={handleChange}
              includedKeys={dataCategories.miscSettings}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

AccordianTextFrame.propTypes = {
  textValues: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};
