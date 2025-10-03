import "./Icon.css";

function Icon({ src, bgColor, iconColor, title, size = "small" }) {
  const containerStyle = {
    width: size,
    height: size,
    backgroundColor: bgColor,
  };

  const iconStyle = {
    backgroundColor: iconColor,
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };

  const sizeClass = size === "large" ? "icon-large" : "icon-small";

  return (
    <div
      style={containerStyle}
      title={title}
      className={`icon-container ${sizeClass}`}
    >
      <div style={iconStyle} className="icon-vector" />
    </div>
  );
}

export default Icon;
