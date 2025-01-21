import { forwardRef, ReactNode, useImperativeHandle } from "react";
import { useInnerSlider } from "../hooks/useInnerSlider";
import Track from "./Track";

export type InnerSliderPropsType = {
  children: ReactNode;
  speed: number;
  fade: boolean;
  slidesToView: number
  slidesToScroll: number
};

const InnerSlider = forwardRef((props: InnerSliderPropsType, ref) => {
  const { children } = props;
  const { listProps, trackProps, next, prev } = useInnerSlider(props);

  useImperativeHandle(ref, () => ({ next, prev }), [next, prev]);

  return (
    <div {...listProps} id="list" className="slick-list">
      <Track {...trackProps}>{children}</Track>
    </div>
  );
});
InnerSlider.displayName = "InnerSlider";

export default InnerSlider;
