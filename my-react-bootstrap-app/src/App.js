import React from "react";
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import { TextForm } from "./components/TextBoxes";
import { UploadImage } from "./components/UploadButton";
import { imageStyle } from "./utils/dataFormat";
import { StringProcessButtons } from "./components/StringProcessButtons";
import { AlwaysOpenAccordian } from "./components/Accordian";
import useDataFetch from "./hooks/useDataFetch";
import { saveData, deleteHotfile as deleteHotfileAPI } from "./utils/api";

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

  // Wrapped function to handle deletion with UI feedback (e.g., reloading)
  const deleteHotfile = async () => {
    try {
      await deleteHotfileAPI();
      window.location.reload();
      alert("File deleted successfully");
    } catch (error) {
      alert("Failed to delete the file");
    }
  };

  // Wrapped function for handleSave to use in the UI
  const handleSave = () => {
    saveData(data)
      .then((serverData) => console.log(serverData))
      .catch((error) => console.error("Error:", error));
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
                <Button variant="primary" disabled>
                  Upload Folder
                </Button>
                <Button variant="primary" onClick={deleteHotfile}>
                  Purge Upload
                </Button>
                {/*To change Save file to Save file(s)*/}
                <Button variant="primary" onClick={handleSave}>
                  Save File
                </Button>
                <StringProcessButtons data={data} setData={setData} />
                <Button variant="primary" disabled>
                  Download Folder
                </Button>
                <Button variant="primary" disabled>
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
