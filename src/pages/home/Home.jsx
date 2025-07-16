import "./Home.css";
import { Link } from "react-router-dom";
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
          <div className="left-container">
            <img src={myPic} alt="" />
          </div>
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
                <p>
                  <span>Análise e Desenvolvimento de Sistemas</span> <br />
                  Uninassau - Fevereiro 2022 / Dezembro 2023
                </p>
              </div>

              <div className="education-content">
                <Icon src={softexIcon} alt="ícone de educação" />
                <p>
                  <span>Formação Acelerada em Programação</span> <br />
                  Softex Pernambuco - Julho 2024 / Dezembro 2024
                </p>
              </div>

              <div className="education-content">
                <Icon src={cesarIcon} alt="ícone de educação" />
                <p>
                  <span>Formação Acelereda em Soluções de Techdesign</span>{" "}
                  <br />
                  Cesar School - Setembro 2024 / Novembro 2024
                </p>
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
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
            <Icon src={cesarIcon} bgColor="var(--pri-gray)" size="large" />
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
