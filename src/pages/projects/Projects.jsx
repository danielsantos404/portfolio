import "./Projects.css";
import Header from "../../components/header/Header";
import Card from "../../components/card/Card";

function Projects() {
  return (
    <>
      <Header navItems={[{ label: "VOLTAR", href: "/" }]} />
      <main className="all-projects">
        <h1>TODOS OS PROJETOS</h1>
        <section className="projects-container">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </main>
    </>
  );
}

export default Projects;
