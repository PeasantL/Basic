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
  const [data, setData, refreshData] = useDataFetch();
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
              data={data}
              refreshData={refreshData}
              refreshImage={refreshImage}
            />
          </Col>
          <Col>
            <Row>
              <PanelFileContent setData={setData} />
            </Row>
            <Row>
              <PanelCloud
                refreshData={refreshData}
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
            <h2>{data.data.name}</h2>
            <div className="mt-3 mb-3">
              {/*take this out */}
              <BadgeTags data={data} />
            </div>
            <AccordianTextFrame textValues={data.data} setData={setData} />
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
