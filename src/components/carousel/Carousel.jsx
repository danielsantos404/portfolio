import { useEffect, useState } from "react";
import "./Carousel.css";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Card from "../card/Card";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1366 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1366, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 790, min: 0 },
    items: 1,
    partialVisibilityGutter: 20,
  },
};

export default function CustomCarousel() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 464);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Erro ao buscar projetos para o carrossel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 464);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <p style={{ color: "white", textAlign: "center" }}>
        Carregando projetos...
      </p>
    );
  }

  return (
    <div className="carousel-wrapper">
      {/* <div className="carousel-shadow left" />
      <div className="carousel-shadow right" /> */}

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
        showDots={!isMobile}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {projects.map((project) => (
          <Card key={project.id} project={project} />
        ))}
      </Carousel>
    </div>
  );
}
