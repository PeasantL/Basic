import React from "react";
import { Card } from "react-bootstrap";
import ButtonBase from "./ButtonBase";
import ButtonStringProcess from "./ButtonStringProcess";
import "./PanelFile.component.css";
import PropTypes from "prop-types";
import { useNodeContext } from "../hooks/useNode";

export default function PanelFileContent({ setData }) {
  const { node } = useNodeContext();

  return (
    <Card className="custom-glassy">
      <Card.Header>File Content</Card.Header>
      <Card.Body>
        <div className="custom-grid">
          <ButtonStringProcess setData={setData} />
          <ButtonBase
            text="Change Image"
            disabled={node === "none" || node === "folder"}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

PanelFileContent.propTypes = {
  setData: PropTypes.func.isRequired,
};
