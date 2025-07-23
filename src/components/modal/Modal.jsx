import "./Modal.css";
import { createPortal } from "react-dom";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import cesarIcon from "../../assets/cesarIcon.png";
import githubIcon from "../../assets/githubIcon.svg";
import deployIcon from "../../assets/deployIcon.svg";

function Modal({ onClose }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>

        <div className="modal-content">
          <div className="modal-img-container"></div>
          <div className="modal-text-container">
            <h1>Titulo do Projeto</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
              consectetur adipiscing elit, sed do eiusmod tempor incididunt.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
              consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
          </div>
          <div className="modal-icon-container">
            <Icon src={cesarIcon} bgColor="var(--white)" />
            <Icon src={cesarIcon} bgColor="var(--white)" />
            <Icon src={cesarIcon} bgColor="var(--white)" />
            <Icon src={cesarIcon} bgColor="var(--white)" />
            <Icon src={cesarIcon} bgColor="var(--white)" />
            <Icon src={cesarIcon} bgColor="var(--white)" />
            <Icon src={cesarIcon} bgColor="var(--white)" />
            <Icon src={cesarIcon} bgColor="var(--white)" />
          </div>
          <div className="modal-btt-container">
            <Button
              imgUrl={githubIcon}
              text={"GitHub"}
              id={"github-modal-button"}
            />
            <Button
              imgUrl={deployIcon}
              text={"Deploy"}
              id={"deploy-modal-button"}
            />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
