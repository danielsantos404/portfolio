import "./Button.css";

function Button({ text, imgUrl, altText, showArrow }) {
  return (
    <button className="btn">
      {imgUrl && <img src={imgUrl} alt={altText || "ícone"} />}
      {text}
      {showArrow && (
        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      )}
    </button>
  );
}

export default Button;
