import { Accordion } from "react-bootstrap";
import { React } from "react";
import { FormTextBox } from "./FormTextBoxes";
import { dataCategories } from "../utils/dataStructures";
import PropTypes from "prop-types";

export function AccordianTextFrame({ textValues, handleChange }) {
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
  handleChange: PropTypes.func.isRequired,
};
