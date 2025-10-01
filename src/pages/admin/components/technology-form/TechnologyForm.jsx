import React, { useState, useEffect } from "react";
import "./TechnologyForm.css";
import { toast } from "react-toastify";
import { db, storage } from "../../../../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function TechnologyForm({ isOpen, onClose, onSuccess, technologyToEdit }) {
  if (!isOpen) return null;
  const [name, setName] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!technologyToEdit;

  useEffect(() => {
    if (isEditing) {
      setName(technologyToEdit.name);
    } else {
      setName("");
      setIconFile(null);
    }
  }, [technologyToEdit, isOpen]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setIconFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || (!iconFile && !isEditing)) {
      toast.warn("Por favor, preencha todos os campos.");
      return;
    }
    setIsLoading(true);

    try {
      let iconUrl = technologyToEdit?.iconUrl;

      if (iconFile) {
        const storageRef = ref(storage, `technologies/${iconFile.name}`);
        const snapshot = await uploadBytes(storageRef, iconFile);
        iconUrl = await getDownloadURL(snapshot.ref);
      }

      const data = { name, iconUrl };

      if (isEditing) {
        const docRef = doc(db, "technologies", technologyToEdit.id);
        await updateDoc(docRef, data);
        toast.success("Tecnologia atualizada com sucesso!");
      } else {
        await addDoc(collection(db, "technologies"), data);
        toast.success("Tecnologia adicionada com sucesso!");
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Ocorreu um erro.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleSubmit}>
          <h2>{isEditing ? "Editar" : "Adicionar"} Tecnologia</h2>
          <label>
            Ícone da tecnologia: (Opcional ao editar)
            <input type="file" onChange={handleFileChange} accept="image/*" />
          </label>
          <input
            placeholder="Nome da tecnologia"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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

export default TechnologyForm;
