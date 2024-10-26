import styled from "@emotion/native/";
import { useNavigation } from "@react-navigation/native";
import { memo } from "react";

const Container = styled.TouchableOpacity`
  aspect-ratio: 160 / 224;
  height: 200px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 16px;
  flex: 1;
  overflow: hidden;
`;

const PhraseImage = styled.Image`
  width: 100%;
  height: 100%;
`;

interface Props {
  imageUrl: string;
}

const PhraseImageButton = ({ imageUrl }: Props) => {
  const navigation = useNavigation();

  const onPress = () => {};

  return (
    <Container onPress={onPress}>
      <PhraseImage source={{ uri: imageUrl }} />
    </Container>
  );
};

export default memo(PhraseImageButton);
