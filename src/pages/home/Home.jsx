import "./Home.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import Header from "../../components/header/Header";
import Icon from "../../components/icon/Icon";
import myPic from "../../assets/myPic.png";
import uninassauIcon from "../../assets/uninassauIcon.png";
import softexIcon from "../../assets/softexIcon.png";
import cesarIcon from "../../assets/cesarIcon.png";
import Carousel from "../../components/carousel/Carousel";
import Button from "../../components/button/Button";
import wppIcon from "../../assets/wppIcon.svg";
import linkedinIcon from "../../assets/linkedinIcon.svg";

function Home() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "technologies"));
        const technologiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTechnologies(technologiesData);
      } catch (error) {
        console.log("Erro as buscar tecnologias:", error);
        toast.error("Não foi possível carregar tecnologias.");
      }
    };

    fetchTechnologies();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 464);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 464);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleNavigateProjects = () => {
    navigate("/projects");
  };

  const openSecureLink = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          toast.success("Mensagem enviada com sucesso!");
          form.current.reset();
          setIsLoading(false);
        },
        (error) => {
          toast.error("Ocorreu um erro ao enviar a mensagem.");
          console.log("ERRO EMAILJS: ", error.text);
          setIsLoading(false);
        }
      );
  };

  return (
    <>
      <Header
        navItems={[
          { label: "SOBRE", href: "#about" },
          { label: "PROJETOS", href: "#projects" },
          { label: "TECNOLOGIAS", href: "#technologies" },
          { label: "CONTATO", href: "#contact" },
        ]}
      />

      <main className="home">
        <section className="about" id="about">
          <div
            className="left-container"
            style={{
              backgroundImage: `url(${myPic})`,
            }}
          ></div>
          <div className="right-container">
            <div className="text-container">
              <h1>DANIEL SANTOS</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae itaque voluptas minima, quibusdam necessitatibus
                tempore unde nostrum. Dicta reprehenderit, necessitatibus eaque
                sunt, omnis, voluptatem nxostrum atque assumenda mollitia
                repudiandae ex.
              </p>
            </div>
            <div className="education-container">
              <div className="education-content">
                <div className="education-icon">
                  <Icon src={uninassauIcon} alt="ícone de educação" />
                </div>
                <div className="education-infos">
                  <h5>Análise e Desenvolvimento de Sistemas</h5>
                  <p>Uninassau</p>
                </div>
              </div>

              <div className="education-content">
                <div className="education-icon">
                  <Icon src={softexIcon} alt="ícone de educação" />
                </div>
                <div className="education-infos">
                  <h5>Formação Acelerada em Programação</h5>
                  <p>Softex Pernambuco</p>
                </div>
              </div>

              <div className="education-content">
                <div className="education-icon">
                  <Icon src={cesarIcon} alt="ícone de educação" />
                </div>
                <div className="education-infos">
                  <h5>Formação Acelereda em Soluções de Techdesign</h5>
                  <p>Cesar School</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="projects" id="projects">
          <h1 className="sec-title">PROJETOS</h1>
          <div className="carousel-container">
            <Carousel />
          </div>
          <Button
            text={"TODOS OS PROJETOS"}
            showArrow={true}
            onClick={handleNavigateProjects}
          />
        </section>

        <section className="technologies" id="technologies">
          <h1 className="sec-title">TECNOLOGIAS</h1>
          <div className="tec-icon-container">
            {technologies.map((tech) => (
              <Icon
                key={tech.id}
                src={tech.iconUrl}
                title={tech.name}
                bgColor="var(--pri-gray)"
                iconColor="var(--white)"
                size={isMobile ? "small" : "large"}
              />
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <h1 className="sec-title">CONTATO</h1>

          <Button
            imgUrl={wppIcon}
            text={"WhatsApp"}
            id={"wppBtn"}
            onClick={() => openSecureLink("https://wa.me/5581998051299")}
          />
          <Button
            imgUrl={linkedinIcon}
            text={"LinkedIn"}
            id={"linkedinBtn"}
            onClick={() =>
              openSecureLink("https://www.linkedin.com/in/daniel-fsantos/")
            }
          />

          <p style={{ color: "var(--black)", fontWeight: "bold" }}>OU</p>

          <div className="contact-form">
            <h1>MANDE UM E-MAIL</h1>
            <form ref={form} onSubmit={sendEmail}>
              <input
                type="text"
                name="from_name"
                placeholder="Digite seu nome"
                required
              />
              <input
                type="email"
                name="from_email"
                placeholder="Digite seu e-mail"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Informe o assunto"
                required
              />
              <textarea
                name="message"
                placeholder="Escreva sua mensagem com detalhes"
                rows="5"
                required
              ></textarea>

              <Button
                text={isLoading ? "ENVIANDO..." : "ENVIAR"}
                disabled={isLoading}
              />
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
