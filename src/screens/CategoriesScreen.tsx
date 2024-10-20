import styled from "@emotion/native";
import Header from "../components/Header";
import { Category as CategoryType } from "../types/Category";
import Category from "../components/Category";

const Container = styled.View`
  flex: 1;
`;

const CategoryList = styled.ScrollView`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8;
`;

const CategoriesScreen = () => {
  return (
    <Container>
      <Header title={"카테고리를 고르세요."} />
      <CategoryList>
        {Object.values(CategoryType).map((category) => (
          <Category key={category} category={category} />
        ))}
      </CategoryList>
    </Container>
  );
};

export default CategoriesScreen;
