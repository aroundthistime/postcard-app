import { Category } from "./Category";

export enum ScreenName {
  Categories = "카테고리",
  Category = "Category",
}

export interface RootStackParamList
  extends Record<ScreenName, object | undefined> {
  [ScreenName.Categories]: undefined;
  [ScreenName.Category]: { category: Category };
}
