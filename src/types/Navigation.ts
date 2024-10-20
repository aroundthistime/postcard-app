import { RootStackParamList } from "./Screen";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
