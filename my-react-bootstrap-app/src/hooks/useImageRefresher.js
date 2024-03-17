import { useState, useCallback } from "react";

// Custom hook for managing image refresh
const useImageRefresher = (initialUrl) => {
  const [imageUrl, setImageUrl] = useState(initialUrl);

  const refreshImage = useCallback(() => {
    const newImageUrl = `${initialUrl}?timestamp=${Date.now()}`;
    setImageUrl(newImageUrl);
  }, [initialUrl]);

  return [imageUrl, refreshImage];
};

export default useImageRefresher;
