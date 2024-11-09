import styled from "@emotion/native/";
import { Platform } from "react-native";
import PhraseImageDownloadButton from "../PhraseImageCtaButton/PhraseImageDownloadButton";
import PhraseImageShareButton from "../PhraseImageCtaButton/PhraseImageShareButton";
import { useState } from "react";

const PhraseImage = styled.ImageBackground`
  aspect-ratio: 296 / 460;
  border-radius: 16px;
  position: relative;
  // required for setting border-radius on ImageBackground
  // @see https://stackoverflow.com/a/57616397
  overflow: hidden;
  background-color: #eeeeee;
`;

const PhraseImageCtaButtonRow = styled.View`
  position: absolute;
  bottom: 0;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 8px;
  padding: 18px;
`;

interface Props {
  imageUrl: string;
  imageWidth: number;
}

const GalleryPhraseImage = ({ imageUrl, imageWidth }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <PhraseImage
      source={{ uri: imageUrl }}
      style={{
        width: imageWidth,
      }}
      onLoadEnd={() => setIsLoading(false)}
      imageStyle={{
        ...Platform.select({
          ios: {
            shadowColor: "rgba(0, 0, 0, 0.15",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4,
          },
          android: {
            elevation: 4,
          },
        }),
      }}
    >
      {!isLoading && (
        <PhraseImageCtaButtonRow>
          <PhraseImageDownloadButton imageUrl={imageUrl} />
          <PhraseImageShareButton imageUrl={imageUrl} />
        </PhraseImageCtaButtonRow>
      )}
    </PhraseImage>
  );
};

export default GalleryPhraseImage;
