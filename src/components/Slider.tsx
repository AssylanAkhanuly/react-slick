import { forwardRef, ReactNode } from "react";
import InnerSlider from "./InnerSlider";

export type SliderRefType = {
  next: () => void;
  prev: () => void;
};
export type SliderPropType = {
  children: ReactNode;
  speed?: number;
  fade?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  infinite?: boolean;
};
const Slider = forwardRef<SliderRefType, SliderPropType>(
  (
    {
      children,
      speed = 500,
      fade = false,
      slidesToShow = 1,
      slidesToScroll = 1,
      infinite = false,
    },
    ref
  ) => {
    return (
      <InnerSlider
        ref={ref}
        infinite={infinite}
        speed={speed}
        fade={fade}
        slidesToView={slidesToShow}
        slidesToScroll={slidesToScroll}
      >
        {children}
      </InnerSlider>
    );
  }
);
Slider.displayName = "Slider";
export default Slider;
