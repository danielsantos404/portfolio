import "./Button.css";

function Button({ text, imgUrl, altText, showArrow, id }) {
  return (
    <button className="btn" id={id} >
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
