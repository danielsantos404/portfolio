import { useState } from "react";
import Icon from "../icon/Icon";
import Modal from "../Modal/Modal";
import "./Card.css";
import cesarIcon from "../../assets/cesarIcon.png";

function Card() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card">
        <h4 className="card-title">Projeto Teste</h4>
        <div className="card-content">
          <div className="card-img-container"></div>
          <div className="card-icons-container">
            {[...Array(8)].map((_, i) => (
              <Icon key={i} src={cesarIcon} bgColor="var(--white)" />
            ))}
          </div>
          <div className="card-btt-container">
            <button className="card-button" onClick={() => setShowModal(true)}>
              VER MAIS
            </button>
          </div>
        </div>
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Card;
