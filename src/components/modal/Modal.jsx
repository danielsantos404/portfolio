import { createPortal } from "react-dom";
import "./Modal.css";

function Modal({ onClose }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Título do Projeto</h2>
        <p>Descrição do projeto fixa (por enquanto).</p>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
