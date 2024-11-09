import styled, { css } from "@emotion/native/";
import { useNavigation, useRoute } from "@react-navigation/native";
import { memo, useEffect, useState } from "react";
import { RootRouteProps, ScreenName } from "../../types/Screen";
import SkeletonBox from "../SkeletonBox";
import { Image } from "react-native";

const ContainerBaseCss = css`
  aspect-ratio: 160 / 224;
  flex: 0.5;
`;

const SkeletonContainer = styled(SkeletonBox)`
  ${ContainerBaseCss}
`;

const Container = styled.TouchableOpacity`
  ${ContainerBaseCss}
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 16px;
  overflow: hidden;
  box-sizing: border-box;
`;

const PhraseImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

interface Props {
  imageUrl: string;
}

const PhraseImageButton = ({ imageUrl }: Props) => {
  const navigation = useNavigation();
  const route = useRoute<RootRouteProps<ScreenName.Category>>();
  const [isLoading, setIsLoading] = useState(true);

  const onPress = () => {
    navigation.navigate(ScreenName.Gallery, {
      enteredImageUrl: imageUrl,
      category: route.params.category,
    });
  };

  useEffect(() => {
    Image.prefetch(imageUrl).finally(() => {
      setIsLoading(false);
    });
  }, [imageUrl]);

  if (isLoading) {
    return <SkeletonContainer />;
  }

  return (
    <Container onPress={onPress} disabled={isLoading}>
      <PhraseImage
        source={{ uri: imageUrl }}
        // onLoadEnd={() => setIsLoading(false)}
      />
    </Container>
  );
};

export default memo(PhraseImageButton);
