import styled from "@emotion/native/macro";
import { Category } from "../../types/Category";
import { ImageBackground } from "react-native";
import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../types/Screen";

const Container = styled.TouchableOpacity`
  border: 2px solid #1d3421;
  aspect-ratio: 4/5;
  border-radius: 48px;
  flex: 1;
  overflow: hidden;
`;

const Background = styled(ImageBackground)`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const LetterBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  border: 1px solid #488252;
`;

const Letter = styled.Text`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 800;
  line-height: 28.64px;
  color: #2c7d3a;
`;

interface Props {
  category: Category;
}

const images: Record<Category, any> = {
  [Category.Birthday]: require("../../assets/images/category/birthday.png"),
  [Category.Season]: require("../../assets/images/category/season.png"),
  [Category.Health]: require("../../assets/images/category/health.png"),
  [Category.Happiness]: require("../../assets/images/category/happiness.png"),
  [Category.Comfort]: require("../../assets/images/category/comfort.png"),
  [Category.Love]: require("../../assets/images/category/love.png"),
};

const CategoryButton = ({ category }: Props) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate(ScreenName.Category, {
      category,
    });
  };

  return (
    <Container onPress={onPress}>
      <Background source={images[category]} resizeMode="cover">
        {category.split("").map((letter, index) => (
          <LetterBox key={index}>
            <Letter>{letter}</Letter>
          </LetterBox>
        ))}
      </Background>
    </Container>
  );
};

export default memo(CategoryButton);
