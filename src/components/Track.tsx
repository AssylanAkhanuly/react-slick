import {
  Children,
  cloneElement,
  CSSProperties,
  DetailedReactHTMLElement,
  forwardRef,
  ReactNode,
} from "react";

type TrackPropsType = {
  children: ReactNode;
  slideWidth: number | string;
  currentSlide: number;
  fade: boolean;
  speed: number;
  animating: boolean;
};

const getSlideStyle = (spec: TrackPropsType, index: number) => {
  const style: CSSProperties = {};

  style.width = spec.slideWidth;
  if (spec.fade) {
    style.position = "relative";
    style.opacity = spec.currentSlide === index ? 1 : 0;
    style.zIndex = spec.currentSlide === index ? 999 : 998;
    if (spec.animating) {
      style.transition = `${spec.speed}ms`;
    }
    if (typeof spec.slideWidth === "number") {
      style.left = -index * spec.slideWidth;
    }
  }
  return style;
};
const renderSlides = (spec: TrackPropsType) => {
  const slides: DetailedReactHTMLElement<any, any>[] = [];
  Children.forEach(spec.children, (child, index) => {
    const style = getSlideStyle(spec, index);
    slides.push(
      cloneElement(child, {
        key: index,
        className: "slick-slide",
        style,
      })
    );
  });
  return slides;
};
const Track = forwardRef<HTMLDivElement, TrackPropsType>((props, ref) => {
  const slides = renderSlides(props);
  const { slideWidth, currentSlide, speed, fade, animating, ...divProps } =
    props;
  return (
    <div id="track" ref={ref} {...divProps} className="slick-track">
      {slides}
    </div>
  );
});
Track.displayName = "Track";
export default Track;
