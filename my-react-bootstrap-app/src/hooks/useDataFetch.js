import { useEffect, useState } from "react";
import { fetchData } from "../utils/api"; // Adjust the path as necessary
import { dataFormat } from "../utils/dataStructures";

const useDataFetch = () => {
  const [jsonCard, setJsonCard] = useState({
    data: dataFormat,
  });

  const refreshJsonCard = async () => {
    try {
      const newData = await fetchData();
      console.log(newData);
      setJsonCard(newData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setJsonCard({ data: dataFormat });
    }
  };

  useEffect(() => {
    refreshJsonCard(); // Initial fetch
  }, []);

  return [jsonCard, setJsonCard, refreshJsonCard]; // Return refreshData as part of the hook's output
};

export default useDataFetch;
