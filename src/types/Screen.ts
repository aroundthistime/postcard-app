import { Category } from "./Category";

export enum ScreenName {
  Categories = "Categories",
  Category = "Category",
}

export type RootStackParamList = {
  [ScreenName.Categories]: undefined;
  [ScreenName.Category]: { category: Category };
};
