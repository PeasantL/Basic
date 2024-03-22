import { useEffect, useState } from "react";
import { fetchData } from "../utils/api"; // Adjust the path as necessary
import { jsonCardFormat } from "../utils/dataStructures";

const useDataFetch = () => {
  const [jsonCard, setJsonCard] = useState({
    data: jsonCardFormat,
  });

  const refreshJsonCard = async () => {
    try {
      const newJsonCard = await fetchData();
      console.log(newJsonCard);
      setJsonCard(newJsonCard);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setJsonCard({ data: jsonCardFormat });
    }
  };

  useEffect(() => {
    refreshJsonCard(); // Initial fetch
  }, []);

  return [jsonCard, setJsonCard, refreshJsonCard]; // Return refreshData as part of the hook's output
};

export default useDataFetch;
