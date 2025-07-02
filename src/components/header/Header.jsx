import "./Header.css";

function Header({ navItems }) {
  return (
    <header className="header">
      <nav className="header-nav">
        <ul>
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
