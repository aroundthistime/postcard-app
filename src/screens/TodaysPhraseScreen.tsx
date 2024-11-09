import styled from "@emotion/native";
import TitleTextBase from "../components/TitleText";
import { Image, Platform, StatusBar } from "react-native";
import { useLayoutEffect, useMemo, useState } from "react";
import { getColors } from "react-native-image-colors";
import { hexToHSL } from "../utils/color";
import IcArrowRightBase from "../assets/images/icons/icArrowRight.svg";
import HslDebugger from "../components/HslDebugger";
import PhraseImageDownloadButton from "../components/PhraseImageCtaButton/PhraseImageDownloadButton";
import PhraseImageShareButton from "../components/PhraseImageCtaButton/PhraseImageShareButton";
import SkeletonBox from "../components/SkeletonBox";

const Container = styled.View`
  flex: 1;
  padding: 24px ${({ theme }) => theme.padding.horizontal};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const TitleText = styled(TitleTextBase)`
  color: ${({ theme }) => theme.colors.white};
`;

const SkeletonTitle = styled(SkeletonBox)`
  width: 180px;
  height: 40px;
`;

const PhraseImage = styled(Image)`
  flex: 1;
  border-radius: 16px;
  width: 100%;
`;

const SkeletonImage = styled(SkeletonBox)`
  flex: 1;
  width: 100%;
`;

const SkeletonButtonRow1 = styled(SkeletonBox)`
  width: 100%;
  height: 48px;
`;

const SkeletonButtonRow2 = styled(SkeletonBox)`
  width: 100%;
  height: 56px;
`;

const ButtonRow = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 12px;
`;
const ExitButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 16px;
  height: 56px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0 36px;
`;

const ExitButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
`;

const IcArrowRight = styled(IcArrowRightBase)`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 16px;
`;

/**
 * @TODO Replace with actual image
 */
const SAMPLE_IMAGE_URL =
  "https://s3-alpha-sig.figma.com/img/b91c/a30f/b329e7ab19bbba782380ab34686a3a6f?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kXegrZHhNbuYXZDUbG0llNdLqoLGDuAs9vUQqXQ1P~dSNMc~jqicw0t5mqJMjXU7KRmZeoX6JecROqvQm20NdSse9AwjJgiidAGo-6VlZ6KGRh2zlxg5-IpcIqC17791urOFwTWDWiWajFwKEGjJRkdUmLLGz~~5uehjWRx3qDlkzt0wmAB5QC5WPVF87c3X4KSpTWJ-CvifI~AH04MSmic--jHd8dAErlFr4CQjeRTLxdESLplI127KTc3OeAA7eXZAUdCc3QUplqPplGtYVROHt8d8xzviDvZcdqLTbwam5124ObNf-tMDtvzVd7PHp1Cc3LIWpTO~X2HFevw0uQ__";

interface Props {
  handleClose: () => void;
}

const TodaysPhraseScreen = ({ handleClose }: Props) => {
  const [h, setH] = useState<number>();
  const [s, setS] = useState("29");
  const [l, setL] = useState("41");

  const imageUrl = SAMPLE_IMAGE_URL;

  const themeColor = useMemo(() => {
    if (h === undefined) return;

    return `hsl(${h}, ${s}%, ${l}%)`;
  }, [h, s, l]);

  const isLoading = useMemo(() => themeColor === undefined, [themeColor]);

  const extractHueValueFromImage = async () => {
    const result = await getColors(imageUrl);
    if (result.platform === "web") return;

    const dominantColor =
      result.platform === "android" ? result.dominant : result.background;
    const { h: extractedS } = hexToHSL(dominantColor);
    setH(extractedS);
  };

  useLayoutEffect(() => {
    extractHueValueFromImage();
  }, []);

  return (
    <Container
      style={{
        backgroundColor: themeColor,
      }}
    >
      {isLoading ? (
        <>
          <SkeletonTitle />
          <SkeletonImage />
          <SkeletonButtonRow1 />
          <SkeletonButtonRow2 />
        </>
      ) : (
        <>
          <StatusBar backgroundColor={themeColor} />
          <TitleText>오늘의 문구 추천</TitleText>
          <PhraseImage
            source={{
              uri: SAMPLE_IMAGE_URL,
            }}
            style={{
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
          />
          <ButtonRow>
            <PhraseImageDownloadButton imageUrl={imageUrl} />
            <PhraseImageShareButton imageUrl={imageUrl} />
          </ButtonRow>
          <ExitButton onPress={handleClose}>
            <ExitButtonText>다른 문구 찾기</ExitButtonText>
            <IcArrowRight />
          </ExitButton>
          <HslDebugger s={s} setS={setS} l={l} setL={setL} />
        </>
      )}
    </Container>
  );
};

export default TodaysPhraseScreen;
