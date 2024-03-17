import React from "react";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import PropTypes from "prop-types";

function BadgeTags({ data }) {
  return (
    <Stack direction="horizontal" gap={2}>
      {data.data.tags.map((element, index) => {
        return (
          <Badge className="custom-glassy" bg="none" key={index}>
            {element}
          </Badge>
        );
      })}
    </Stack>
  );
}

export default BadgeTags;

BadgeTags.propTypes = {
  data: PropTypes.object.isRequired,
};
