import "./Modal.css";
import { createPortal } from "react-dom";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import githubIcon from "../../assets/githubIcon.svg";
import deployIcon from "../../assets/deployIcon.svg";

function Modal({ onClose, project }) {
  const openSecureLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>

        <div className="modal-content">
          <div
            className="modal-img-container"
            style={{ backgroundImage: `url(${project.imageUrl})` }}
          ></div>

          <div className="modal-text-container">
            <h1 className="modal-project-title">{project.name}</h1>

            <div
              className="modal-description"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>

          <div className="modal-icon-container">
            {project.technologies.map((tech) => (
              <Icon
                key={tech.value}
                src={tech.iconUrl}
                title={tech.label}
                bgColor="var(--white)"
                iconColor="var(--black)"
              />
            ))}
          </div>

          <div className="modal-btt-container">
            {project.repoUrl && (
              <Button
                imgUrl={githubIcon}
                text={"GitHub"}
                id={"github-modal-button"}
                onClick={() => openSecureLink(project.repoUrl)}
              />
            )}
            {project.deployUrl && (
              <Button
                imgUrl={deployIcon}
                text={"Deploy"}
                id={"deploy-modal-button"}
                onClick={() => openSecureLink(project.deployUrl)}
              />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
