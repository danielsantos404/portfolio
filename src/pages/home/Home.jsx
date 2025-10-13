import "./Home.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import Header from "../../components/header/Header";
import Icon from "../../components/icon/Icon";
import Carousel from "../../components/carousel/Carousel";
import Button from "../../components/button/Button";

function Home() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const q = query(collection(db, "technologies"), orderBy("position"));
        const querySnapshot = await getDocs(q);

        const technologiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTechnologies(technologiesData);
      } catch (error) {
        console.log("Erro ao buscar tecnologias:", error);
        toast.error("Não foi possível carregar tecnologias.");
      }
    };

    fetchTechnologies();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
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
              backgroundImage: `url(/assets/myPic.webp)`,
            }}
          ></div>
          <div className="right-container">
            <div className="text-container">
              <h1 style={{ fontSize: "30px", marginTop: "2vh" }}>
                <span style={{ textShadow: "0px 0px 4px var(--white)" }}>
                  OLÁ
                </span>
                , ME CHAMO
              </h1>
              <h1 style={{ fontSize: "60px" }}>DANIEL SANTOS!</h1>
              <p>
                Sou tecnólogo em Análise e Desenvolvimento de Sistemas,
                programador Front-End e um grande entusiasta do desenvolvimento
                web, tendo como objetivo a criação de soluções robustas,
                escalonáveis e com foco na usabilidade do usuário.
              </p>
            </div>
            <div className="education-container">
              <div className="education-content">
                <div className="education-icon">
                  <img src="/assets/ficrIcon.webp" alt="" />
                </div>
                <div className="education-infos">
                  <h5>Análise e Desenvolvimento de Sistemas (em curso)</h5>
                  <p>FICR</p>
                </div>
              </div>

              <div className="education-content">
                <div className="education-icon">
                  <img src="/assets/uninassauIcon.webp" alt="" />
                </div>
                <div className="education-infos">
                  <h5>Análise e Desenvolvimento de Sistemas</h5>
                  <p>Uninassau</p>
                </div>
              </div>

              <div className="education-content">
                <div className="education-icon">
                  <img src="/assets/softexIcon.webp" alt="" />
                </div>
                <div className="education-infos">
                  <h5>Formação Acelerada em Programação</h5>
                  <p>Softex Pernambuco</p>
                </div>
              </div>

              <div className="education-content">
                <div className="education-icon">
                  <img src="/assets/cesarIcon.webp" alt="" />
                </div>
                <div className="education-infos">
                  <h5>Formação Acelerada em Soluções de Techdesign</h5>
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
            imgUrl="/assets/wppIcon.svg"
            text={"WhatsApp"}
            id={"wppBtn"}
            onClick={() => openSecureLink("https://wa.me/5581998051299")}
          />
          <Button
            imgUrl="/assets/linkedinIcon.svg"
            text={"LinkedIn"}
            id={"linkedinBtn"}
            onClick={() =>
              openSecureLink("https://www.linkedin.com/in/daniel-fsantos/")
            }
          />

          <p style={{ color: "var(--black)", fontWeight: "bold" }}>OU</p>

          <div className="contact-form">
            <h2>MANDE UM E-MAIL</h2>
            <form ref={form} onSubmit={sendEmail}>
              <input
                type="text"
                name="from_name"
                placeholder="Seu nome"
                required
              />
              <input
                type="email"
                name="from_email"
                placeholder="Seu e-mail"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Assunto"
                required
              />
              <textarea
                name="message"
                placeholder="Mensagem detalhada"
                rows="5"
                required
              ></textarea>

              <Button
                imgUrl="/assets/paperplaneIcon.svg"
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
