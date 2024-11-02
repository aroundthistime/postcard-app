import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";
import { RootStackParamList, ScreenName } from "../types/Screen";
import usePhraseImageInfiniteQuery from "../hooks/queries/usePhraseImageInfiniteQuery";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "@emotion/native/macro";
import { css } from "@emotion/react";
import IcArrowLeftBase from "../assets/images/icons/icArrowLeft.svg";
import IcArrowRightBase from "../assets/images/icons/icArrowRight.svg";

const HORIZONTAL_PADDING = 32;

const ContainerWithBackground = styled.ImageBackground`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const PhraseImage = styled.Image`
  aspect-ratio: 296 / 460;
  border-radius: 16px;
`;

const CarouselControlRow = styled.View`
  width: 100%;
  padding: 0px 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CarouselControlButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IcArrowLeft = styled(IcArrowLeftBase)`
  width: 24px;
  height: 24px;
`;

const IcArrowRight = styled(IcArrowRightBase)`
  width: 24px;
  height: 24px;
`;

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.Gallery>;

const GalleryScreen = ({
  route: {
    params: { category, enteredImageIndex },
  },
}: Props) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    usePhraseImageInfiniteQuery(category);
  const carouselRef = useRef<FlatList>(null);
  const { width: screenWidth } = useWindowDimensions();
  const scrolledToEnteredImageRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(enteredImageIndex);

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

  return (
    <ContainerWithBackground
      source={{
        uri: imageUrls[currentIndex],
      }}
      blurRadius={5}
    >
      <FlatList
        ref={carouselRef}
        horizontal
        data={imageUrls}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item: imageUrl }) => (
          <PhraseImage
            source={{ uri: imageUrl }}
            style={{
              width: imageWidth,
              ...Platform.select({
                ios: {
                  shadowColor: "rgba(0, 0, 0, 0.15",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowRadius: 4,
                },
                android: {
                  elevation: 4,
                },
              }),
            }}
          />
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
        <CarouselControlButton
          onPress={() => {
            setCurrentIndex((prev) => Math.max(prev - 1, 0));
          }}
        >
          <IcArrowLeft />
        </CarouselControlButton>
        <CarouselControlButton
          onPress={() => {
            setCurrentIndex((prev) => Math.min(imageUrls.length - 1, prev + 1));
          }}
        >
          <IcArrowRight />
        </CarouselControlButton>
      </CarouselControlRow>
    </ContainerWithBackground>
  );
};

export default GalleryScreen;
