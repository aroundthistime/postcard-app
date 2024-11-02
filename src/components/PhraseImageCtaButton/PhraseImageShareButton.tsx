import { shareImage } from "../../utils/file";
import { PhraseImageCtaButton, PhraseImageCtaButtonText } from "./styles";

interface Props {
  imageUrl: string;
}

const PhraseImageShareButton = ({ imageUrl }: Props) => {
  return (
    <PhraseImageCtaButton onPress={() => shareImage(imageUrl)}>
      <PhraseImageCtaButtonText>공유하기</PhraseImageCtaButtonText>
    </PhraseImageCtaButton>
  );
};

export default PhraseImageShareButton;
