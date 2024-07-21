import { ImageSourcePropType } from "react-native";
import { CHOOSE_PRODUCT, GET_YOUR_ORDER, MAKE_PAYMENT } from "./images";

export interface IOnboarding {
  img: ImageSourcePropType;
  title: string;
  describe: string;
}

export const ON_BOARDING_DATA: IOnboarding[] = [
  {
    img: CHOOSE_PRODUCT,
    title: "Choose Products",
    describe:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  },
  {
    img: MAKE_PAYMENT,
    title: "Make Payment",
    describe:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  },
  {
    img: GET_YOUR_ORDER,
    title: "Get Your Order",
    describe:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  },
];
