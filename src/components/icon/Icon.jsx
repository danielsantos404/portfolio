import "./Icon.css";

function Icon({ src, alt = "ícone" }) {
  return (
    <div className="icon-container" title="Teste">
      <img src={src} alt={alt} className="icon-img" />
    </div>
  );
}

export default Icon;
