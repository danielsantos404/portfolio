import "./Admin.css";
import { useState } from "react";
import Button from "../../components/button/Button";
import ProjectForm from "./components/project-form/ProjectForm";
import TechnologyForm from "./components/technology-form/TechnologyForm";

function Admin() {
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isTechnologyModalOpen, setTechnologyModalOpen] = useState(false);

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
            <Button
              text={"ADICIONAR"}
              onClick={() => setProjectModalOpen(true)}
            />
            <ProjectForm
              isOpen={isProjectModalOpen}
              onClose={() => setProjectModalOpen(false)}
            />
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
            <Button
              text={"ADICIONAR"}
              onClick={() => setTechnologyModalOpen(true)}
            />
            <TechnologyForm
              isOpen={isTechnologyModalOpen}
              onClose={() => setTechnologyModalOpen(false)}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Admin;
