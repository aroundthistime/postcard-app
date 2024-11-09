import { useState } from "react";
import { downloadImageFromUrl } from "../../utils/file";
import { PhraseImageCtaButton, PhraseImageCtaButtonText } from "./styles";
import { ActivityIndicator } from "react-native";

interface Props {
  imageUrl: string;
}

const PhraseImageDownloadButton = ({ imageUrl }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    try {
      setIsLoading(true);
      await downloadImageFromUrl(imageUrl);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PhraseImageCtaButton onPress={handlePress} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size={24} color={"#000000"} />
      ) : (
        <PhraseImageCtaButtonText>다운로드</PhraseImageCtaButtonText>
      )}
    </PhraseImageCtaButton>
  );
};

export default PhraseImageDownloadButton;
