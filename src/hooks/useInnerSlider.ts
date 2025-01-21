import {
  Children,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { InnerSliderPropsType } from "../components/InnerSlider";

export const useInnerSlider = (spec: InnerSliderPropsType) => {
  const { children, fade, speed } = spec;
  const slidesToScroll = fade ? 1 : spec.slidesToScroll;
  const slidesToView = fade ? 1 : spec.slidesToView;
  const listRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDialogElement>(null);

  const slideCount = Children.count(children);
  const [listWidth, setListWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState<number | string>(
    `${slideCount * 100}%`
  );
  const [slideWidth, setSlideWidth] = useState<number | string>(
    `${100 / slideCount / slidesToView}%`
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const onWindowResize = useCallback(() => {
    if (listRef.current) {
      const listWidth = listRef.current.offsetWidth;
      const slideWidth = listWidth / slidesToView;
      setListWidth(listWidth);
      setTrackWidth(slideWidth * slideCount);
      setSlideWidth(slideWidth);
    }
  }, [slideCount, slidesToView]);
  useEffect(() => {
    if (listRef.current && trackRef.current) {
      const ro = new ResizeObserver(onWindowResize);
      ro.observe(listRef.current);

      return () => {
        ro.disconnect();
      };
    }
  }, [onWindowResize]);

  const listProps = {
    ref: listRef,
  };
  const trackProps = {
    ref: trackRef,
    style: {
      width: trackWidth,
      transform:
        typeof slideWidth === "number" &&
        !fade &&
        `translate3d(${-currentSlide * slideWidth}px,0px,0px)`,
      transition: animating && `${speed}ms`,
    },
    slideWidth,
    currentSlide,
    speed: speed,
    fade: fade,
    animating,
  };

  const slideHandler = (nextSlide: SetStateAction<number>) => {
    const validSlide = (slide: number) => slide >= 0 && slide < slideCount;

    if (animating) return;
    if (typeof nextSlide === "function" && !validSlide(nextSlide(currentSlide)))
      return;
    else if (typeof nextSlide === "number" && !validSlide(nextSlide)) return;
    setAnimating(true);
    setCurrentSlide(nextSlide);
    setTimeout(() => {
      setAnimating(false);
    }, speed);
  };
  const next = () => slideHandler((prev) => prev + slidesToScroll);
  const prev = () => slideHandler((prev) => prev - slidesToScroll);
  return {
    listProps,
    trackProps,
    next,
    prev,
  };
};
