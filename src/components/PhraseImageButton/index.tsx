import styled from "@emotion/native/";
import { useNavigation, useRoute } from "@react-navigation/native";
import { memo, useState } from "react";
import { RootRouteProps, ScreenName } from "../../types/Screen";

const Container = styled.TouchableOpacity`
  aspect-ratio: 160 / 224;
  flex: 0.5;
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

  return (
    <Container onPress={onPress} disabled={isLoading}>
      <PhraseImage
        source={{ uri: imageUrl }}
        onLoadEnd={() => setIsLoading(false)}
        style={{
          backgroundColor: "#EEEEEE",
        }}
      />
    </Container>
  );
};

export default memo(PhraseImageButton);
