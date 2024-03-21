import React from "react";
import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { fetchFileList } from "../utils/api";

const NodeContext = createContext();

const useNode = (initialState = "none") => {
  const [node, setNodeState] = useState(initialState);

  checkServer().then((serverState) => {
    setNodeState(serverState);
  });

  const setNode = (newValue) => {
    if (["none", "file", "folder"].includes(newValue)) {
      setNodeState(newValue);
    } else {
      console.error("Invalid node value.");
    }
  };

  return [node, setNode];
};

// finds out what state the uploads folder on the server is in
// "none" - no files on server
// "file" - single file on server[1]
// "folder" - multiple files on server [1](or single file in a folder)
async function checkServer() {
  try {
    const fileList = (await fetchFileList()).files;
    const fileCount = fileList.length;

    // this code would be awarded an instant fail at Curtin University of Technology
    switch (fileCount) {
      case 0:
        return "none";
      case 1:
        if (fileList[0].includes("/")) {
          return "folder";
        }
        return "file";
      default:
        return "folder";
    }
  } catch {
    // console logged in api function already
    console.log("Error fetching file list from the backend");
  }
  return "none";
}

export const NodeProvider = ({ children }) => {
  const [node, setNode] = useNode();

  return (
    <NodeContext.Provider value={{ node, setNode }}>
      {children}
    </NodeContext.Provider>
  );
};

export const useNodeContext = () => {
  const context = useContext(NodeContext);
  if (context === undefined) {
    throw new Error("useNodeContext must be used within a NodeProvider");
  }
  return context;
};

NodeProvider.propTypes = {
  children: PropTypes.node,
};
