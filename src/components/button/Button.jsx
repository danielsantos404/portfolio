import "./Button.css";

function Button({ id, imgUrl, altText, onClick, text, showArrow }) {
  return (
    <button className="btn" id={id} onClick={onClick} >
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
