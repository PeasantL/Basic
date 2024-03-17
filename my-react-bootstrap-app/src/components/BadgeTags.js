import React from "react";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import PropTypes from "prop-types";

function VariationsExample({ data }) {
  return (
    <Stack direction="horizontal" gap={2}>
      {data.data.tags.map((element, index) => {
        return (
          <Badge bg="success" key={index}>
            {element}
          </Badge>
        );
      })}
    </Stack>
  );
}

export default VariationsExample;

VariationsExample.propTypes = {
  data: PropTypes.object.isRequired,
};
