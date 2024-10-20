import styled from "@emotion/native/macro";
import { type Category as CategoryType } from "../../types/Category";
import { ImageBackground } from "react-native";
import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../types/Screen";

const Container = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4;
  border: 2 solid #1d3421;
  border-radius: 48;
`;

const Background = styled(ImageBackground)`
  flex: 1;
  justify-content: "center";
`;

const LetterBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44;
  height: 48;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8;
  border: 1 solid #488252;
`;

const Letter = styled.Text`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 800;
  line-height: 28.64px;
  color: #2c7d3a;
`;

interface Props {
  category: CategoryType;
}

const Category = ({ category }: Props) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate(ScreenName.Category, {
      category,
    });
  };

  return (
    <Container onPress={onPress}>
      <Background
        src={require(`../../assets/images/category/${category}.png`)}
        resizeMode="cover"
      >
        {category.split("").map((letter, index) => (
          <LetterBox key={index}>
            <Letter>{letter}</Letter>
          </LetterBox>
        ))}
      </Background>
    </Container>
  );
};

export default memo(Category);
