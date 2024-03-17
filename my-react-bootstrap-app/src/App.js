import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { TextForm } from "./components/TextBoxes";
import { AlwaysOpenAccordian } from "./components/Accordian";
import useDataFetch from "./hooks/useDataFetch";
import FileStatePanel from "./components/FileStatePanel";
import FileContentPanel from "./components/FileContentPanel";
import ImagePanel from "./components/ImagePanel";
import "./App.component.css";

//data should be renamed so that there is not structure like data.data
export default function App() {
  const [data, setData] = useDataFetch();

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

  console.log("In app.js " + typeof setData);

  /* App Structure */
  return (
    <div className="custom-page-container">
      {/*Panel rendering*/}
      <Container className="custom-panels-container">
        <Row>
          <Col>
            <FileStatePanel data={data} />
          </Col>
          <Col>
            <FileContentPanel data={data} setData={setData} />
          </Col>
          <Col>
            <ImagePanel />
          </Col>
        </Row>
      </Container>
      {/*Text boxes rendering*/}
      <Container className=".custom-text-box">
        <Card>
          <Card.Body>
            <h2>Tavern</h2>
            <AlwaysOpenAccordian />
            <TextForm textValues={data.data} handleChange={handleChange} />
          </Card.Body>
        </Card>
      </Container>
      {/*Raw String Temp rendering*/}
      <Container className="custom-raw-string">
        <Card>
          <Card.Body>
            <h3>Raw String Check</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
