import { useState } from "react";
import { shareImage } from "../../utils/file";
import { PhraseImageCtaButton, PhraseImageCtaButtonText } from "./styles";
import { ActivityIndicator } from "react-native";

interface Props {
  imageUrl: string;
}

const PhraseImageShareButton = ({ imageUrl }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    try {
      setIsLoading(true);
      await shareImage(imageUrl);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PhraseImageCtaButton onPress={handlePress} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size={24} color={"#000000"} />
      ) : (
        <PhraseImageCtaButtonText>공유하기</PhraseImageCtaButtonText>
      )}
    </PhraseImageCtaButton>
  );
};

export default PhraseImageShareButton;
