import React from "react";
import { Card } from "react-bootstrap";
import ButtonStringProcess from "./ButtonStringProcess";
import "./PanelFile.component.css";
import PropTypes from "prop-types";
import ButtonChangeImage from "./ButtonChangeImage";

export default function PanelFileContent({
  data,
  setData,
  refreshData,
  refreshImage,
}) {
  return (
    <Card className="custom-glassy">
      <Card.Header>File Content</Card.Header>
      <Card.Body>
        <div className="custom-grid">
          <ButtonStringProcess setData={setData} />
          <ButtonChangeImage
            data={data}
            refreshData={refreshData}
            refreshImage={refreshImage}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

PanelFileContent.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
  refreshImage: PropTypes.func.isRequired,
};
