import { Category } from "./Category";

export enum ScreenName {
  Categories = "카테고리",
  Category = "Category",
}

export type RootStackParamList = {
  [ScreenName.Categories]: undefined;
  [ScreenName.Category]: { category: Category };
};
