import { useEffect, useState } from "react";
import { fetchData } from "../utils/api"; // Adjust the path as necessary
import { dataFormat } from "../utils/dataStructures";

const useDataFetch = () => {
  const [data, setData] = useState({
    data: dataFormat,
  });

  const refreshData = async () => {
    try {
      const newData = await fetchData();
      console.log(newData);
      setData(newData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setData({ data: dataFormat });
    }
  };

  useEffect(() => {
    refreshData(); // Initial fetch
  }, []);

  return [data, setData, refreshData]; // Return refreshData as part of the hook's output
};

export default useDataFetch;
