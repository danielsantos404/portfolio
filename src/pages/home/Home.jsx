import "./Home.css";
import { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 464);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 464);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                sunt, omnis, voluptatem nostrum atque assumenda mollitia
                repudiandae ex.
              </p>
            </div>
            <div className="education-container">
              <div className="education-content">
                <Icon src={uninassauIcon} alt="ícone de educação" />
                <div className="education-infos">
                  <h5>Análise e Desenvolvimento de Sistemas</h5>
                  <p>Uninassau</p>
                </div>
              </div>

              <div className="education-content">
                <Icon src={softexIcon} alt="ícone de educação" />
                <div className="education-infos">
                  <h5>Formação Acelerada em Programação</h5>
                  <p>Softex Pernambuco</p>
                </div>
              </div>

              <div className="education-content">
                <Icon src={cesarIcon} alt="ícone de educação" />
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
          <Button text={"TODOS OS PROJETOS"} showArrow={true} />
        </section>

        <section className="technologies" id="technologies">
          <h1 className="sec-title">TECNOLOGIAS</h1>
          <div className="tec-icon-container">
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
            <Icon
              src={cesarIcon}
              bgColor="var(--pri-gray)"
              size={isMobile ? "small" : "large"}
            />
          </div>
        </section>

        <section className="contact" id="contact">
          <h1 className="sec-title">CONTATO</h1>

          <Button imgUrl={wppIcon} text={"WhatsApp"} id={"wppBtn"} />
          <Button imgUrl={linkedinIcon} text={"LinkedIn"} id={"linkedinBtn"} />

          <p style={{ color: "var(--black)", fontWeight: "bold" }}>OU</p>

          <div className="contact-form">
            <h1>MANDE UM E-MAIL</h1>
            <form>
              <input type="text" placeholder="Digite seu nome" required />
              <input type="email" placeholder="Digite seu e-mail" required />
              <input type="subject" placeholder="Informe o assunto" required />
              <textarea
                placeholder="Escreva sua mensagem com detalhes"
                rows="5"
                required
              ></textarea>
              <Button text={"ENVIAR"} />
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
