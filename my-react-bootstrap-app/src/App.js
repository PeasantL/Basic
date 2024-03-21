import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { AccordianTextFrame } from "./components/AccordianTextFrame";
import useDataFetch from "./hooks/useDataFetch";
import useImageRefresher from "./hooks/useImageRefresher";
import PanelFileState from "./components/PanelFileState";
import PanelFileContent from "./components/PanelFileContent";
import PanelCloud from "./components/PanelCloud";
import PanelImage from "./components/PanelImage";
import BadgeTags from "./components/BadgeTags";
import "./App.component.css";

//data should be renamed so that there is not structure like data.data
export default function App() {
  const [jsonCard, setJsonCard, refreshJsonCard] = useDataFetch();
  const [imageUrl, refreshImage] = useImageRefresher(
    process.env.REACT_APP_IMAGE_API_URL,
  );

  /* App Structure */
  return (
    <div className="custom-page-container">
      {/*Panel rendering*/}
      <Container className="custom-panels-container">
        <Row>
          <Col>
            <PanelFileState
              jsonCard={jsonCard}
              refreshJsonCard={refreshJsonCard}
              refreshImage={refreshImage}
            />
          </Col>
          <Col>
            <Row>
              <PanelFileContent
                jsonCard={jsonCard}
                setJsonCard={setJsonCard}
                refreshJsonCard={refreshJsonCard}
                refreshImage={refreshImage}
              />
            </Row>
            <Row>
              <PanelCloud
                refreshJsonCard={refreshJsonCard}
                refreshImage={refreshImage}
              />
            </Row>
          </Col>
          <Col>
            <PanelImage imageUrl={imageUrl} />
          </Col>
        </Row>
      </Container>
      {/*Text boxes rendering*/}
      <Container>
        <Card className="custom-glassy">
          <Card.Body>
            <h2>{jsonCard.data.name}</h2>
            <div className="mt-3 mb-3">
              {/*take this out */}
              <BadgeTags jsonCard={jsonCard} />
            </div>
            <AccordianTextFrame jsonCard={jsonCard} setJsonCard={setJsonCard} />
          </Card.Body>
        </Card>
      </Container>
      {/*Raw String Temp rendering*/}
      <Container className="custom-raw-string">
        <Card className="custom-glassy">
          <Card.Body>
            <h3>Raw String Check</h3>
            <pre>{JSON.stringify(jsonCard, null, 2)}</pre>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
