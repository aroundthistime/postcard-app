import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { RootStackParamList, ScreenName } from "../types/Screen";

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.Gallery>;

const GalleryScreen = ({
  route: {
    params: { category, enteredImageUrl },
  },
}: Props) => {
  return <View />;
};

export default GalleryScreen;
