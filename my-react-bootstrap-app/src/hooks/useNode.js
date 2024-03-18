import React from "react";
import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

const NodeContext = createContext();

const useNode = (initialValue = "none") => {
  const [node, setNodeState] = useState(initialValue);

  const setNode = (newValue) => {
    if (["none", "file", "folder"].includes(newValue)) {
      setNodeState(newValue);
    } else {
      console.error("Invalid node value.");
    }
  };

  return [node, setNode];
};

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
