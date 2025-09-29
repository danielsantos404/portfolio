import "./ProjectForm.css";
import React, { useState } from "react";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react"; // Você já tinha isso, ótimo!

const techOptions = [
  /* ... */
];
const customStyles = {
  /* ... */
};

function ProjectForm({ isOpen, onClose }) {
  const [selectedTechs, setSelectedTechs] = useState([]);
  // NOVO: Estado para a descrição do projeto
  const [description, setDescription] = useState("");

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
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={description}
            onEditorChange={(content) => setDescription(content)}
            init={{
              height: 300,
              menubar: false,
              placeholder: "Descrição do projeto",
              plugins: "lists link image code help wordcount",
              toolbar:
                "undo redo | bold italic | bullist numlist | link | code | help",
            }}
          />
          <Select
            isMulti
            name="techs"
            options={techOptions}
            styles={customStyles}
            placeholder="Selecione as tecnologias"
            onChange={setSelectedTechs}
            value={selectedTechs}
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
