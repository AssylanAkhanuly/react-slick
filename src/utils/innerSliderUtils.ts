import { InnerSliderPropsType } from "../components/InnerSlider";

export const getPreClone = (spec: InnerSliderPropsType) => {
  if (spec.infinite) return 6;
  else return 0;
};
