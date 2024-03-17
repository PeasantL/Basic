import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FormTextBox } from "./components/FormTextBoxes";
import { AlwaysOpenAccordian } from "./components/Accordian";
import useDataFetch from "./hooks/useDataFetch";
import PanelFileState from "./components/PanelFileState";
import PanelFileContent from "./components/PanelFileContent";
import PanelImage from "./components/PanelImage";
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
            <PanelFileState data={data} />
          </Col>
          <Col>
            <PanelFileContent setData={setData} />
          </Col>
          <Col>
            <PanelImage />
          </Col>
        </Row>
      </Container>
      {/*Text boxes rendering*/}
      <Container>
        <Card className="custom-glassy">
          <Card.Body>
            <h2>Tavern</h2>
            <AlwaysOpenAccordian />
            <FormTextBox textValues={data.data} handleChange={handleChange} />
          </Card.Body>
        </Card>
      </Container>
      {/*Raw String Temp rendering*/}
      <Container className="custom-raw-string">
        <Card className="custom-glassy">
          <Card.Body>
            <h3>Raw String Check</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
