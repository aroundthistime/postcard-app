import styled from "@emotion/native";
import Header from "../components/Header";
import { Category } from "../types/Category";
import CategoryButton from "../components/CategoryButton";
import { FlatList } from "react-native";

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.padding.horizontal};
  background-color: ${({ theme }) => theme.colors.white};
`;

const CategoriesScreen = () => {
  return (
    <Container>
      <Header title={"카테고리를 고르세요."} />
      <FlatList
        data={Object.values(Category)}
        numColumns={2}
        keyExtractor={(category) => category}
        renderItem={({ item: category }) => (
          <CategoryButton key={category} category={category} />
        )}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 8,
        }}
        contentContainerStyle={{
          gap: 8,
          paddingVertical: 16,
        }}
      />
    </Container>
  );
};

export default CategoriesScreen;
