import { useEffect, useState } from "react";
import { fetchData } from "../utils/api"; // Adjust the path as necessary
import { dataFormat } from "../utils/dataStructures";

const useDataFetch = () => {
  const [data, setData] = useState({
    data: dataFormat,
  });

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch((error) => console.error("Failed to fetch data:", error));
  }, []);

  return [data, setData];
};

export default useDataFetch;
