import "./ProjectForm.css";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { storage, db } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted silver",
    color: state.isSelected ? "white" : "var(--black)",
    backgroundColor: state.isSelected
      ? "#007bff"
      : state.isFocused
      ? "var(--ter-gray)"
      : "white",
    padding: 15,
  }),
  control: (provided) => ({
    ...provided,
    borderColor: "#ccc",
    boxShadow: "none",
    borderRadius: "16px",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "var(--ter-gray)",
    borderRadius: "16px",
  }),
  multiValueLabel: (styles) => ({ ...styles, color: "var(--black)" }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "var(--black)",
    borderRadius: "0 16px 16px 0",
    ":hover": { backgroundColor: "var(--pri-red)", color: "white" },
  }),
};

function ProjectForm({
  isOpen,
  onClose,
  onSuccess,
  projectToEdit,
  availableTechnologies,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [repoUrl, setRepoUrl] = useState("");
  const [deployUrl, setDeployUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!projectToEdit;

  const techOptions = useMemo(
    () =>
      availableTechnologies.map((tech) => ({
        value: tech.id,
        label: tech.name,
        ...tech,
      })),
    [availableTechnologies]
  );

  useEffect(() => {
    if (isEditing && isOpen) {
      setName(projectToEdit.name || "");
      setDescription(projectToEdit.description || "");
      setSelectedTechs(projectToEdit.technologies || []);
      setRepoUrl(projectToEdit.repoUrl || "");
      setDeployUrl(projectToEdit.deployUrl || "");
    } else {
      setName("");
      setDescription("");
      setProjectImageFile(null);
      setSelectedTechs([]);
      setRepoUrl("");
      setDeployUrl("");
    }
  }, [projectToEdit, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = projectToEdit?.imageUrl;

      if (projectImageFile) {
        const storageRef = ref(storage, `projects/${projectImageFile.name}`);
        const snapshot = await uploadBytes(storageRef, projectImageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      if (!imageUrl) {
        toast.warn("Por favor, adicione uma imagem para o projeto.");
        setIsLoading(false);
        return;
      }

      const projectData = {
        name,
        description,
        imageUrl,
        technologies: selectedTechs,
        repoUrl,
        deployUrl,
      };

      if (isEditing) {
        const projectRef = doc(db, "projects", projectToEdit.id);
        await updateDoc(projectRef, projectData);
        toast.success("Projeto atualizado com sucesso!");
      } else {
        await addDoc(collection(db, "projects"), projectData);
        toast.success("Projeto adicionado com sucesso!");
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar o projeto.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleSubmit}>
          <h2>{isEditing ? "Editar" : "Adicionar"} Projeto</h2>
          <label>
            Imagem do projeto:
            <input
              type="file"
              onChange={(e) => setProjectImageFile(e.target.files[0])}
              accept="image/*"
            />
          </label>
          <input
            placeholder="Nome do projeto"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            placeholder="Selecione as tecnologias..."
            onChange={setSelectedTechs}
            value={selectedTechs}
            styles={customStyles}
          />
          <input
            placeholder="URL do repositório do projeto"
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />
          <input
            placeholder="URL do deploy do projeto"
            type="url"
            value={deployUrl}
            onChange={(e) => setDeployUrl(e.target.value)}
          />
          <div className="buttonContainer">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
