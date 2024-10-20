import { Category } from "./Category";

export enum ScreenName {
  Categories = "Categories",
  Category = "Category",
}

export interface RootStackParamList
  extends Record<ScreenName, object | undefined> {
  [ScreenName.Categories]: undefined;
  [ScreenName.Category]: { category: Category };
}
