import React from "react";
import "./ProjectForm.css";

function ProjectForm({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <form>
          <h2>Adicionar Projeto</h2>
          <label>
            Imagem do projeto:
            <input type="file" name="projectImage" accept="image/*" required />
          </label>
          <input
            placeholder="Nome do projeto"
            type="text"
            name="projectName"
            required
          />
          <textarea
            placeholder="Descrição do projeto"
            name="projectDescription"
            rows={4}
            required
          />
          <input
            placeholder="Tecnologias do projeto (separadas por vírgula)"
            type="text"
            name="projectTechnologies"
            required
          />
          <input
            placeholder="URL do repositório do projeto"
            type="url"
            name="projectRepository"
            required
          />
          <input
            placeholder="URL do deploy do projeto"
            type="url"
            name="projectDeploy"
          />
          <div className="buttonContainer">
            <button>Deletar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
