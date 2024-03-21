import React from "react";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import PropTypes from "prop-types";

function BadgeTags({ jsonCard }) {
  return (
    <Stack direction="horizontal" gap={2}>
      {jsonCard.data.tags.map((element, index) => {
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
  jsonCard: PropTypes.object.isRequired,
};
