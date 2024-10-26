import styled, { css } from "@emotion/native";
import TitleTextBase from "../components/TitleText";
import { Image, Platform, StatusBar } from "react-native";
import { useLayoutEffect, useMemo, useState } from "react";
import { getColors } from "react-native-image-colors";
import { hexToHSL } from "../utils/color";
import IcArrowRightBase from "../assets/images/icons/icArrowRight.svg";
import HslDebugger from "../components/HslDebugger";

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

const PhraseImage = styled(Image)`
  flex: 1;
  border-radius: 16px;
  width: 100%;
`;

const ButtonRow = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 12px;
`;

const ButtonTextBase = styled.Text`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
`;

const ButtonCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 16px;
`;

const PrimaryButton = styled.TouchableOpacity`
  ${ButtonCss}
  height: 48px;
  background-color: ${({ theme }) => theme.colors.white};
  color: #000000;
  flex: 1;
`;

const PrimaryButtonText = styled(ButtonTextBase)`
  color: #222222;
`;

const SecondaryButton = styled.TouchableOpacity`
  ${ButtonCss}
  height: 56px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0 36px;
`;

const SecondaryButtonText = styled(ButtonTextBase)`
  color: ${({ theme }) => theme.colors.white};
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
  "https://s3-alpha-sig.figma.com/img/e244/9a7d/6401dc27f0f326432608f8badcf833b2?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WlPRf~cGMCVlb66ssYuw0~CBgV~SSoQ6YAf2VmUYlAPOUgvZNf7MOm6J9tn7wghRCISewoXZ8z-oQ2cPq32rFSPM8fDe3rfozI9JPyLeOg3F7o-6IvMiPlH4-fnTNj4d-nabHmkfcBkkujVBKNKzBlBNUC0Vu2poj~QD-MawkVEN6w9ak9H~RsAxWvaCVPN1XPUBE7bmiykl8tFJ5u8z52V402OE8oo2J-K5vve1hKY0IueR2lPmCDnxgaIenqHMRJZHdY9HFvpFs1NZnR-5c8Dko-YRgdtmE-GFyMpgdsM0l1P-v7mQ0Ci~qLA9HoVSzxC-e4FfZG-AR-DklUbAQg__";

interface Props {
  handleClose: () => void;
}

const TodaysPhraseScreen = ({ handleClose }: Props) => {
  const [h, setH] = useState<number>();
  const [s, setS] = useState("29");
  const [l, setL] = useState("41");

  const themeColor = useMemo(() => {
    if (h === undefined) return;

    return `hsl(${h}, ${s}%, ${l}%)`;
  }, [h, s, l]);

  const extractHueValueFromImage = async () => {
    const result = await getColors(SAMPLE_IMAGE_URL);
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
        <PrimaryButton>
          <PrimaryButtonText>다운로드</PrimaryButtonText>
        </PrimaryButton>
        <PrimaryButton>
          <PrimaryButtonText>공유하기</PrimaryButtonText>
        </PrimaryButton>
      </ButtonRow>
      <SecondaryButton onPress={handleClose}>
        <SecondaryButtonText>다른 문구 찾기</SecondaryButtonText>
        <IcArrowRight />
      </SecondaryButton>
      <HslDebugger s={s} setS={setS} l={l} setL={setL} />
    </Container>
  );
};

export default TodaysPhraseScreen;
