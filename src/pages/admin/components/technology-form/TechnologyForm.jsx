import React from "react";
import "./TechnologyForm.css";

function TechnologyForm({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <form>
          <h2>Adicionar Tecnologia</h2>
          <label>
            Icone da tecnologia:
            <input
              type="file"
              name="TechnologyIcon"
              accept="image/*"
              required
            />
          </label>
          <input
            placeholder="Nome da tecnologia"
            type="text"
            name="TechnologyName"
            required
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

export default TechnologyForm;
