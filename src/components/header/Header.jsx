import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header({ navItems }) {
  const navigate = useNavigate();

  const handleNavClick = (href) => {
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <ul>
          {navItems.map((item, idx) => (
            <li key={idx} onClick={() => handleNavClick(item.href)}>
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
