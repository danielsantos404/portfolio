import "./Icon.css";

function Icon({ src, alt = "ícone", bgColor = "var(--white)" }) {
  return (
    <div
      className="icon-container"
      title="Teste"
      style={{ background: bgColor }}
    >
      <img src={src} alt={alt} className="icon-img" />
    </div>
  );
}

export default Icon;
