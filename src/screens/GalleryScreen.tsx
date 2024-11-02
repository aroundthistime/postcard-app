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

const ContainerWithBackground = styled.ImageBackground`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhraseImage = styled.Image`
  aspect-ratio: 296 / 460;
  border-radius: 16px;
`;

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.Gallery>;

const CAROUSEL_HORIZONTAL_PADDING = 32;

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

  const imageWidth = screenWidth - CAROUSEL_HORIZONTAL_PADDING * 2;

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
          paddingHorizontal: CAROUSEL_HORIZONTAL_PADDING,
        }}
        style={{
          flexGrow: 0,
        }}
      />
      <View
        style={{
          width: "100%",
          height: 50,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCurrentIndex((prev) => Math.max(prev - 1, 0));
          }}
          style={{
            backgroundColor: "red",
            width: 50,
            height: 50,
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentIndex((prev) => Math.min(imageUrls.length - 1, prev + 1));
          }}
          style={{
            backgroundColor: "red",
            width: 50,
            height: 50,
          }}
        ></TouchableOpacity>
      </View>
    </ContainerWithBackground>
  );
};

export default GalleryScreen;
