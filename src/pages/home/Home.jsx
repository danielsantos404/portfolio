import "./Home.css";
import Header from "../../components/header/Header";

function Home() {
  return (
    <>
      <Header
        navItems={[
          { label: "SOBRE", href: "/" },
          { label: "PROJETOS", href: "/" },
          { label: "TECNOLOGIAS", href: "/" },
          { label: "CONTATO", href: "/" },
        ]}
      />

      <main className="home">

        <section className="about">
        </section>

        <section className="projects">
        </section>

        <section className="technologies">
        </section>

        <section className="contact">
        </section>
        
      </main>
    </>
  );
}

export default Home;
