import CarouselSlide from "./CarouselSlide";
// import EditableText from "./EditTableText";
import reactImage from "./assets/react.svg";

const slides = [reactImage, reactImage];

function App() {
  // const sentence = "React에서 값을 편집할 수 있도록 입력창을 구현하는 방법";

  return (
    <div>
      {/* <h2>편집 가능한 문장:</h2>
      <EditableText text={sentence} /> */}
      <CarouselSlide slides={slides} />
    </div>
  );
}

export default App;
