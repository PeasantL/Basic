import {
  processStringBoth,
  processStringAsterisk,
  processStringQuotes,
  mes_exampleStringProcess,
} from "../utils/stringProcessing";
import { Button } from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";

export function StringProcessButtons({ data, setData }) {
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

  return (
    <>
      <Button
        variant="primary"
        onClick={handleStringAsterisk}
        data={data}
        setData={setData}
      >
        Convert Asterisk
      </Button>
      <Button
        variant="primary"
        onClick={handleStringQuote}
        data={data}
        setData={setData}
      >
        Convert Quote
      </Button>
      <Button
        variant="primary"
        onClick={handleStringBoth}
        data={data}
        setData={setData}
      >
        Convert Both
      </Button>
    </>
  );
}

StringProcessButtons.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};
