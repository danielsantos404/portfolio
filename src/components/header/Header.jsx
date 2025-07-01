import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <ul>
          <li>
            <a href="/">SOBRE</a>
          </li>
          <li>
            <a href="/about">PROJETOS</a>
          </li>
          <li>
            <a href="/technologies">TECNOLOGIAS</a>
          </li>
          <li>
            <a href="/contact">CONTATO</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
