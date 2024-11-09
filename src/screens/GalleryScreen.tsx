import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, useWindowDimensions, ActivityIndicator } from "react-native";
import { RootStackParamList, ScreenName } from "../types/Screen";
import usePhraseImageInfiniteQuery from "../hooks/queries/usePhraseImageInfiniteQuery";
import { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "@emotion/native/";
import IcArrowLeftBase from "../assets/images/icons/icArrowLeft.svg";
import IcArrowRightBase from "../assets/images/icons/icArrowRight.svg";
import SkeletonBox from "../components/SkeletonBox";
import GalleryPhraseImage from "../components/GalleryPhraseImage";

const HORIZONTAL_PADDING = 32;

const ContainerWithBackground = styled.ImageBackground`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: white;
`;

const SkeletonPhraseImage = styled(SkeletonBox)`
  aspect-ratio: 296 / 460;
`;

const CarouselControlRow = styled.View`
  width: 100%;
  padding: 0px 32px;
  display: flex;
  flex-direction: row;
`;

const CarouselControlButton = styled.TouchableOpacity<{
  $position: "left" | "right";
}>`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $position }) =>
    `margin-${$position === "left" ? "right" : "left"}: auto;`}
`;

const CarouselButtonIconCss = css`
  width: 24px;
  height: 24px;
`;

const IcArrowLeft = styled(IcArrowLeftBase)`
  ${CarouselButtonIconCss}
`;

const IcArrowRight = styled(IcArrowRightBase)`
  ${CarouselButtonIconCss}
`;

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.Gallery>;

const GalleryScreen = ({
  route: {
    params: { category, enteredImageUrl },
  },
}: Props) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    usePhraseImageInfiniteQuery(category);
  const carouselRef = useRef<FlatList>(null);
  const { width: screenWidth } = useWindowDimensions();
  const scrolledToEnteredImageRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageUrls = useMemo(() => {
    return data?.pages.flat() ?? [];
  }, [data]);

  const imageWidth = screenWidth - HORIZONTAL_PADDING * 2;

  const getOffsetByIndex = (index: number) => {
    return index * imageWidth + 16 * index;
  };

  useEffect(() => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollToOffset({
      animated: scrolledToEnteredImageRef.current,
      offset: getOffsetByIndex(currentIndex),
    });
    scrolledToEnteredImageRef.current = true;
  }, [currentIndex]);

  useEffect(() => {
    const enteredImageIndex = imageUrls.findIndex(
      (imageUrl) => imageUrl === enteredImageUrl
    );
    if (enteredImageIndex > 0) {
      setCurrentIndex(enteredImageIndex);
    }
  }, [enteredImageUrl]);

  const isShowLeftSwipeButton = currentIndex !== 0;
  const isLastImage = currentIndex !== imageUrls.length - 1;
  const isShowRightSwipeButton = isLastImage || isFetchingNextPage;

  return (
    <ContainerWithBackground
      source={{
        uri: imageUrls[currentIndex],
      }}
      blurRadius={20}
    >
      <FlatList
        ref={carouselRef}
        horizontal
        data={imageUrls}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={1}
        ListFooterComponent={
          isFetchingNextPage ? (
            <SkeletonPhraseImage
              style={{
                width: imageWidth,
              }}
            />
          ) : null
        }
        renderItem={({ item: imageUrl }) => (
          <GalleryPhraseImage imageUrl={imageUrl} imageWidth={imageWidth} />
        )}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: HORIZONTAL_PADDING,
        }}
        style={{
          flexGrow: 0,
        }}
      />
      <CarouselControlRow>
        {isShowLeftSwipeButton && (
          <CarouselControlButton
            onPress={() => {
              setCurrentIndex((prev) => Math.max(prev - 1, 0));
            }}
            $position="left"
          >
            <IcArrowLeft />
          </CarouselControlButton>
        )}
        {isShowRightSwipeButton && (
          <CarouselControlButton
            onPress={() => {
              setCurrentIndex((prev) =>
                Math.min(imageUrls.length - 1, prev + 1)
              );
            }}
            $position="right"
            disabled={!isLastImage}
          >
            {isLastImage && isFetchingNextPage ? (
              <ActivityIndicator size={20} color="#FFFFFF" />
            ) : (
              <IcArrowRight />
            )}
          </CarouselControlButton>
        )}
      </CarouselControlRow>
    </ContainerWithBackground>
  );
};

export default GalleryScreen;
