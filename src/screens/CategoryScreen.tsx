import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { RootStackParamList, ScreenName } from "../types/Screen";
import styled from "@emotion/native";
import { useMemo } from "react";
import Header from "../components/Header";
import PhraseImageButton from "../components/PhraseImageButton";
import usePhraseImageInfiniteQuery from "../hooks/queries/usePhraseImageInfiniteQuery";
import SkeletonBox from "../components/SkeletonBox";

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.padding.horizontal};
  background-color: ${({ theme }) => theme.colors.white};
`;

const SkeletonImage = styled(SkeletonBox)`
  flex: 0.5;
  aspect-ratio: 160 / 224;
`;

const NextPageLoaderWrap = styled.View`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NextPageLoader = () => (
  <NextPageLoaderWrap>
    <ActivityIndicator size={20} color="rgba(0, 0, 0, 0.2)" />
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
    if (isLoading) {
      const DUMMY_PLACEHOLDER = ["1", "2", "3", "4", "5", "6", "7", "8"];
      return DUMMY_PLACEHOLDER;
    }
    return data?.pages?.flat() ?? [];
  }, [data, isLoading]);

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
        scrollEnabled={!isLoading}
        renderItem={({ item: imageUrl }) => {
          return isLoading ? (
            <SkeletonImage />
          ) : (
            <PhraseImageButton imageUrl={imageUrl} />
          );
        }}
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
