import { RouteProp } from "@react-navigation/native";
import { Category } from "./Category";

export enum ScreenName {
  Categories = "Categories",
  Category = "Category",
  Gallery = "Gallery",
}

export type RootStackParamList = {
  [ScreenName.Categories]: undefined;
  [ScreenName.Category]: { category: Category };
  [ScreenName.Gallery]: { enteredImageUrl: string; category: Category };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
