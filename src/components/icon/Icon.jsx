import "./Icon.css";

function Icon({ src, alt = "ícone", bgColor = "var(--white)", size = "small" }) {
  const sizeClass = size === "large" ? "icon-large" : "icon-small";
  return (
    <div
      className={`icon-container ${sizeClass}`}
      title="Teste"
      style={{ background: bgColor }}
    >
      <img src={src} alt={alt} className="icon-img" />
    </div>
  );
}

export default Icon;
