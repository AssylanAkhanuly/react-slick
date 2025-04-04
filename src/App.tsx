import { useRef } from "react";
import "./App.css";
import Slider, { SliderRefType } from "./components/Slider";

// Task 5:
// add functionality to view multiple slides per view & to move between multiple slides
// Assumption 1: 1 slide to view
// Assumption 3: 1 slide to scroll per click

function App() {
  const sliderRef = useRef<SliderRefType>(null);
  return (
    <div>
      <Slider
      infinite={false}
        fade={false}
        slidesToScroll={1}
        slidesToShow={1}
        speed={1000}
        ref={sliderRef}
      >
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
        <div>Slide 4</div>
        <div>Slide 5</div>
        <div>Slide 6</div>
      </Slider>

      <button onClick={() => sliderRef.current?.prev()}>previous</button>
      <button onClick={() => sliderRef.current?.next()}>next</button>
    </div>
  );
}

export default App;
