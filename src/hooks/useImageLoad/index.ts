import { useLayoutEffect, useState } from "react";
import { Image } from "react-native";

const useImageLoad = (imageUrl?: string) => {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (!imageUrl) return;
    Image.prefetch(imageUrl).finally(() => {
      setIsLoading(false);
    });
  }, [imageUrl]);

  return {
    isLoading,
  };
};

export default useImageLoad;
