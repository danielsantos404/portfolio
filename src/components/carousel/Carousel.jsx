import "./Carousel.css";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Card from "../card/Card";

// Exemplo de dados para os cards (substitua pelos seus dados reais)
const cardsData = [
  {
    title: "Projeto 1",
    image:
      "https://images.unsplash.com/photo-1549989476-69a92fa57c36?auto=format&fit=crop&w=800&q=60",
    description: "Descrição do Projeto 1",
  },
  {
    title: "Projeto 2",
    image:
      "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?auto=format&fit=crop&w=800&q=60",
    description: "Descrição do Projeto 2",
  },
  {
    title: "Projeto 3",
    image:
      "https://images.unsplash.com/photo-1550133730-695473e544be?auto=format&fit=crop&w=800&q=60",
    description: "Descrição do Projeto 3",
  },
  {
    title: "Projeto 4",
    image:
      "https://images.unsplash.com/photo-1550167164-1b67c2be3973?auto=format&fit=crop&w=800&q=60",
    description: "Descrição do Projeto 4",
  },
  {
    title: "Projeto 5",
    image:
      "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?auto=format&fit=crop&w=800&q=60",
    description: "Descrição do Projeto 5",
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

export default function CustomCarousel() {
  return (
    <div className="carousel-wrapper">
      <div className="carousel-shadow left" />
      <div className="carousel-shadow right" />

      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={true}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {cardsData.map((card, idx) => (
          <Card
            key={idx}
            title={card.title}
            image={card.image}
            description={card.description}
          />
        ))}
      </Carousel>
    </div>
  );
}
