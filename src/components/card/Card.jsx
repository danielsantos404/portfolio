import { useState } from "react";
import Icon from "../icon/Icon";
import Modal from "../Modal/Modal";
import "./Card.css";

function Card({ project }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card">
        <h4 className="card-title">{project.name}</h4>
        <div className="card-content">
          <div
            className="card-img-container"
            style={{ backgroundImage: `url(${project.imageUrl})` }}
          ></div>
          <div className="card-icons-container">
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
          <div className="card-btt-container">
            <button className="card-button" onClick={() => setShowModal(true)}>
              VER MAIS
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} project={project} />
      )}
    </>
  );
}

export default Card;
