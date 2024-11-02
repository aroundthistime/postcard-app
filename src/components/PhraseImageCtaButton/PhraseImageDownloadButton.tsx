import { downloadImageFromUrl } from "../../utils/file";
import { PhraseImageCtaButton, PhraseImageCtaButtonText } from "./styles";

interface Props {
  imageUrl: string;
}

const PhraseImageDownloadButton = ({ imageUrl }: Props) => {
  return (
    <PhraseImageCtaButton onPress={() => downloadImageFromUrl(imageUrl)}>
      <PhraseImageCtaButtonText>다운로드</PhraseImageCtaButtonText>
    </PhraseImageCtaButton>
  );
};

export default PhraseImageDownloadButton;
