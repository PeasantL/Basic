import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import { TextForm } from "./components/form";
import { UploadImage } from "./components/upload";
import { dataFormat, imageStyle } from "./components/data_format";
import {
  processStringBoth,
  processStringAsterisk,
  processStringQuotes,
  mes_exampleStringProcess,
} from "./utils/stringprocessing";
import { AlwaysOpenAccordian } from "./components/accordian";

export default function App() {
  const [data, setData] = useState({
    data: dataFormat,
  });

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

  const processFields = (processingFunction) => {
    setData((prevData) => {
      // Destructuring to extract the array and any other fields you wish to process
      const { first_mes, mes_example, alternate_greetings } = prevData.data;

      // Apply processingFunction to first_mes and mes_example directly
      const processedFirstMes = processingFunction(first_mes);
      const processedMesExample = mes_exampleStringProcess(
        mes_example,
        processingFunction,
      );

      // Apply processingFunction to each element in alternate_greeting if it exists
      const processedAlternateGreetings = alternate_greetings.map((item) =>
        processingFunction(item),
      );

      return {
        ...prevData,
        data: {
          ...prevData.data,
          first_mes: processedFirstMes,
          mes_example: processedMesExample,
          alternate_greetings: processedAlternateGreetings,
        },
      };
    });
  };

  const handleStringBoth = () => processFields(processStringBoth);
  const handleStringAsterisk = () => processFields(processStringAsterisk);
  const handleStringQuote = () => processFields(processStringQuotes);

  // Load JSON from API
  useEffect(() => {
    fetch("http://localhost:3001/api/data")
      .then((response) => response.json())
      .then((jsonObject) => setData(jsonObject))
      .catch((error) =>
        console.error("There was a problem with the fetch operation", error),
      );
  }, []);

  // Function to handle saving data
  const handleSave = () => {
    fetch("http://localhost:3001/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }), // Your JSON data goes here
    })
      .then((response) => response.json())
      .then((serverData) => console.log(serverData)) // Log any response from the server
      .catch((error) => console.error("Error:", error));
    console.log("Data to send:", data);
  };

  //Function to delete file
  const deleteHotfile = async () => {
    try {
      const response = await fetch("http://localhost:3001/delete-hotfile", {
        method: "DELETE",
      });
      const responseData = await response.text();
      console.log(responseData);
      window.location.reload();
      alert("File deleted successfully");
    } catch (error) {
      console.error("Failed to delete the file:", error);
      alert("Failed to delete the file");
    }
  };

  /* App Structure */
  return (
    <div className="mt-3 mb-3">
      <Container>
        <div className="mb-5">
          <Row>
            <Col>
              <div className="d-grid gap-4">
                <UploadImage />
                <Button variant="primary" disabled="true">
                  Upload Folder
                </Button>
                <Button variant="primary" onClick={deleteHotfile}>
                  Purge Upload
                </Button>
                {/*To change Save file to Save file(s)*/}
                <Button variant="primary" onClick={handleSave}>
                  Save File
                </Button>
                <Button variant="primary" onClick={handleStringAsterisk}>
                  Convert Asterisk
                </Button>
                <Button variant="primary" onClick={handleStringQuote}>
                  Convert Quotes
                </Button>
                <Button variant="primary" onClick={handleStringBoth}>
                  Convert Both
                </Button>
                <Button variant="primary" disabled="true">
                  Download Folder
                </Button>
                <Button variant="primary" disabled="true">
                  Change Image
                </Button>
              </div>
            </Col>
            <Col>
              <Image
                src="http://localhost:3001/api/images"
                style={imageStyle}
                alt="Image"
                className="width=20% mx-auto d-block"
                rounded
              />
            </Col>
          </Row>
        </div>
      </Container>

      {/*Text boxes rendering*/}
      <Container>
        <AlwaysOpenAccordian />
        <TextForm textValues={data.data} handleChange={handleChange} />
      </Container>

      <Container className="mt-3">
        <h5>Raw String Check</h5>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Container>
    </div>
  );
}
