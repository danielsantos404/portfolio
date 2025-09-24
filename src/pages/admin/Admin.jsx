import "./Admin.css";
import { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import ProjectForm from "./components/project-form/ProjectForm";
import TechnologyForm from "./components/technology-form/TechnologyForm";
import githubIcon from  "../../assets/githubIcon.svg";

function Admin() {
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isTechnologyModalOpen, setTechnologyModalOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  useEffect(() => {
    setShowWelcomeModal(true);
  }, []);

  return (
    <>
      {showWelcomeModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2>Autentique-se 🔐</h2>
            <Button
              imgUrl={githubIcon}
              text="GitHub"
              onClick={() => setShowWelcomeModal(false)}
              style={{ margin: "24px auto", display: "block" }}
            />
          </div>
        </div>
      )}
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