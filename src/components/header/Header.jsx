import "./Header.css";

function Header({ navItems }) {
  const handleNavClick = (href) => {
    window.location.href = href;
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <ul>
          {navItems.map((item, idx) => (
            <li key={idx} onClick={() => handleNavClick(item.href)} className="nav-item">
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}


export default Header;
