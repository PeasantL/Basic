import React from "react";
import ButtonBase from "./ButtonBase";
import {
  processStringBoth,
  processStringAsterisk,
  processStringQuotes,
  mes_exampleStringProcess,
} from "../utils/stringProcessing";
import { useNodeContext } from "../hooks/useNode";
import { fetchData, fetchFileList, saveData } from "../utils/api";
import PropTypes from "prop-types";

export default function ButtonStringProcess({ setJsonCard }) {
  const { node } = useNodeContext();

  const processFields = (processingFunction) => {
    setJsonCard((prevJsonCard) => {
      return processJsonCard(processingFunction, prevJsonCard);
    });
  };

  const processJsonCard = (processingFunction, prevJsonCard) => {
    // Destructuring to extract the array and any other fields you wish to process
    const { first_mes, mes_example, alternate_greetings } = prevJsonCard.data;

    // Apply processingFunction to first_mes and mes_example directly
    const processedFirstMes = processingFunction(first_mes);
    const processedMesExample = mes_exampleStringProcess(
      mes_example,
      processingFunction,
    );

    // Apply processingFunction to each element in alternate_greeting if it exists

    let processedAlternateGreetings = [];

    if (typeof alternate_greetings === Array) {
      processedAlternateGreetings = alternate_greetings.map((item) =>
        processingFunction(item),
      );
    } else {
      console.log(
        "Error, card not properly formatted : " + prevJsonCard.data.name,
      );
    }

    return {
      ...prevJsonCard,
      data: {
        ...prevJsonCard.data,
        first_mes: processedFirstMes,
        mes_example: processedMesExample,
        alternate_greetings: processedAlternateGreetings,
      },
    };
  };

  const handleStringBoth = () => {
    handleString(processStringBoth);
  };
  const handleStringAsterisk = () => {
    handleString(processStringAsterisk);
  };
  const handleStringQuote = () => {
    handleString(processStringQuotes);
  };

  const handleString = (processingFunction) => {
    fetchFileList()
      .then((fileList) => {
        if (fileList.files.length !== 1) {
          for (let i = 0; i < fileList.files.length; i++) {
            /*Multiple files processing */
            console.log(`saving: ${fileList.files[i]}`);
            fetchData(fileList.files[i]).then((data) =>
              saveData(
                processJsonCard(processingFunction, data),
                fileList.files[i],
              ),
            );
          }
        } else {
          processFields(processingFunction);
        }
      })
      .catch((error) => {
        console.error("Error fetching file list", error);
      });
  };

  return (
    <>
      <ButtonBase
        text="Convert Asterisk File(s)"
        onClick={handleStringAsterisk}
        disabled={node === "none"}
      />
      <ButtonBase
        text="Convert Quote File(s)"
        onClick={handleStringQuote}
        disabled={node === "none"}
      />
      <ButtonBase
        text="Convert Both File(s)"
        onClick={handleStringBoth}
        disabled={node === "none"}
      />
    </>
  );
}

ButtonStringProcess.propTypes = {
  setJsonCard: PropTypes.func.isRequired,
};
