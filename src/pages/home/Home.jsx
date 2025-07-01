import Header from "../../components/header/Header";
import "./Home.css";

function Home() {
  return (
    <>
      <Header />

      <main className="home">
        <section className="home__intro">
          <h1>Bem-vindo ao meu portfólio!</h1>
          <p>
            Sou um desenvolvedor apaixonado por criar soluções inovadoras e
            impactantes. Explore meus projetos e descubra como posso ajudar a
            transformar suas ideias em realidade.
          </p>
        </section>
        <section className="home__projects">
          <h2>Projetos Recentes</h2>
          {/* Aqui você pode adicionar uma lista de projetos */}
        </section>
      </main>
    </>
  );
}

export default Home;
