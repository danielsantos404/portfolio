import Icon from "../icon/Icon";
import "./Card.css";
import cesarIcon from "../../assets/cesarIcon.png";

function Card() {
  return (
    <div className="card">
      <h4 className="card-title">Projeto Teste</h4>
      <div className="card-content">
        <div className="card-img-container"></div>
        <div className="card-icons-container">
          <Icon src={cesarIcon} bgColor="var(--white)" />
          <Icon src={cesarIcon} bgColor="var(--white)" />
          <Icon src={cesarIcon} bgColor="var(--white)" />
          <Icon src={cesarIcon} bgColor="var(--white)" />
          <Icon src={cesarIcon} bgColor="var(--white)" />
          <Icon src={cesarIcon} bgColor="var(--white)" />
          <Icon src={cesarIcon} bgColor="var(--white)" />
          <Icon src={cesarIcon} bgColor="var(--white)" />
        </div>
        <div className="card-btt-container">
          <button className="card-button">VER MAIS</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
