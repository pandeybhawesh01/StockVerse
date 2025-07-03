import { Stock } from "../../screens/exploreScreen/types";
export type Props = {
  stock: Stock;
  onAdded?: () => void;
};