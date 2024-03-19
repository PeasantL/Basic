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

export default function ButtonStringProcess({ setData }) {
  const { node } = useNodeContext();

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

  const handleStringBoth = () => {
    fetchFileList()
      .then((fileList) => {
        if (fileList.length !== 1) {
          for (let i = 0; i < fileList.length; i++) {
            /*Multiple files processing */
            fetchData(fileList[i]);
            saveData(processFields(processStringBoth));
          }
        } else {
          processFields(processStringBoth);
        }
      })
      .catch((error) => {
        console.error("Error fetching file list", error);
      });
  };
  const handleStringAsterisk = () => {
    fetchFileList()
      .then((fileList) => {
        if (fileList.length !== 1) {
          for (let i = 0; i < fileList.length; i++) {
            /*Multiple files processing */
            fetchData(fileList[i]);
            saveData(processFields(processStringAsterisk));
          }
        } else {
          processFields(processStringAsterisk);
        }
      })
      .catch((error) => {
        console.error("Error fetching file list", error);
      });
  };

  const handleStringQuote = () => {
    fetchFileList()
      .then((fileList) => {
        if (fileList.length !== 1) {
          for (let i = 0; i < fileList.length; i++) {
            /*Multiple files processing */
            fetchData(fileList[i]);
            saveData(processFields(processStringQuotes));
          }
        } else {
          processFields(processStringQuotes);
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
  setData: PropTypes.func.isRequired,
};
