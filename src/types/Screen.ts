import { Category } from "./Category";

export enum ScreenName {
  Categories = "Categories",
  Category = "Category",
  Gallery = "Gallery",
}

export type RootStackParamList = {
  [ScreenName.Categories]: undefined;
  [ScreenName.Category]: { category: Category };
  [ScreenName.Gallery]: { enteredImageIndex: number };
};
