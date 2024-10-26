import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { RootStackParamList, ScreenName } from "../types/Screen";

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.Category>;

const CategoryScreen = ({
  route: {
    params: { category },
  },
}: Props) => {
  return <Text>{category}</Text>;
};

export default CategoryScreen;
