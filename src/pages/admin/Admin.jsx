import "./Admin.css";
import Button from "../../components/button/Button";

function Admin() {
  return (
    <>
      <main className="admin">
        <section className="project-list">
          <h1>PROJETOS</h1>
          <div className="project-container">
            <p>NOME DO PROJETO</p>
          </div>
          <div className="project-container">
            <p>NOME DO PROJETO</p>
          </div>
          <div className="add-button-container">
            <Button text={"ADICIONAR"} />
          </div>
        </section>

        <hr />

        <section className="technology-list">
          <h1>TECNOLOGIAS</h1>
          <div className="technology-container">
            <p>NOME DA TECNOLOGIA</p>
          </div>
          <div className="technology-container">
            <p>NOME DA TECNOLOGIA</p>
          </div>
          <div className="add-button-container">
            <Button text={"ADICIONAR"} />
          </div>
        </section>
      </main>
    </>
  );
}

export default Admin;
