import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { RootStackParamList, ScreenName } from "../types/Screen";
import styled from "@emotion/native";
import { useMemo } from "react";
import Header from "../components/Header";
import PhraseImageButton from "../components/PhraseImageButton";
import usePhraseImageInfiniteQuery from "../hooks/queries/usePhraseImageInfiniteQuery";
import FullScreenLoader from "../components/FullScreenLoader";

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.padding.horizontal};
  background-color: ${({ theme }) => theme.colors.white};
`;

const NextPageLoaderWrap = styled.View`
  padding: 15px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NextPageLoader = () => (
  <NextPageLoaderWrap>
    <ActivityIndicator />
  </NextPageLoaderWrap>
);

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.Category>;

const CategoryScreen = ({
  route: {
    params: { category },
  },
}: Props) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    usePhraseImageInfiniteQuery(category);

  const imageUrls = useMemo(() => {
    return data?.pages.flat() ?? [];
  }, [data]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Container>
      <FlatList
        ListHeaderComponent={<Header title="원하는 이미지를 찾아보세요" />}
        ListHeaderComponentStyle={{
          marginBottom: 8,
        }}
        data={imageUrls}
        numColumns={2}
        keyExtractor={(imageUrl) => imageUrl}
        renderItem={({ item: imageUrl, index }) => (
          <PhraseImageButton imageUrl={imageUrl} imageIndex={index} />
        )}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 8,
        }}
        contentContainerStyle={{
          gap: 8,
          paddingBottom: 16,
          flexGrow: 1,
        }}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={1}
        ListFooterComponent={isFetchingNextPage ? <NextPageLoader /> : null}
      />
    </Container>
  );
};

export default CategoryScreen;
