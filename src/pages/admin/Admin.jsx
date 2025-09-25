import "./Admin.css";
import { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import ProjectForm from "./components/project-form/ProjectForm";
import TechnologyForm from "./components/technology-form/TechnologyForm";
import githubIcon from "../../assets/githubIcon.svg";

// Importações do Firebase
import {
  onAuthStateChanged,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase"; // Verifique se o caminho está correto

function Admin() {
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isTechnologyModalOpen, setTechnologyModalOpen] = useState(false);

  // Estados para controlar o usuário e o carregamento
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =======================================================
  // BLOCO 'useEffect' CORRIGIDO
  // =======================================================
  useEffect(() => {
    // Apenas um useEffect é necessário aqui.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Se existe um usuário logado, vamos checar o tempo da sessão
        const loginTimestamp = localStorage.getItem("loginTimestamp");
        const now = new Date().getTime();
        const maxSessionTime = 24 * 60 * 60 * 1000;

        if (loginTimestamp && now - loginTimestamp > maxSessionTime) {
          // Se o tempo passou, desloga o usuário
          console.log("Sessão expirada. Fazendo logout automático.");
          signOut(auth); // A própria função signOut vai limpar o estado
        } else {
          // Se a sessão ainda é válida, define o usuário
          setUser(currentUser);
        }
      } else {
        // Se não há usuário, apenas define o estado como nulo
        setUser(null);
      }

      setLoading(false);
    });
    // A função de limpeza retorna o 'unsubscribe'
    return () => unsubscribe();
  }, []); // O array vazio garante que o efeito rode apenas uma vez

  // Função que inicia o popup de login do GitHub
  const handleGithubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Login bem-sucedido:", result.user.displayName);
        localStorage.setItem("loginTimestamp", new Date().getTime());
      })
      .catch((error) => {
        console.error("Erro no login:", error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Usuário deslogado com sucesso.");
        localStorage.removeItem("loginTimestamp");
      })
      .catch((error) => {
        console.log("Erro ao fazer logout: ", error);
      });
  };

  // Mostra uma tela de carregamento enquanto o Firebase verifica o status do login
  if (loading) {
    return <div className="loading-screen">Carregando...</div>;
  }

  return (
    <>
      {/* Lógica de renderização condicional */}
      {!user ? (
        // Se NÃO houver usuário, mostra a tela de login
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2>Autentique-se 🔐</h2>
            <Button
              imgUrl={githubIcon}
              text="GitHub"
              onClick={handleGithubLogin} // Chama a função de login
              style={{ margin: "24px auto", display: "block" }}
            />
          </div>
        </div>
      ) : (
        // Se HOUVER um usuário, mostra o painel de admin
        <main className="admin">
          <div className="sign-out-container">
            <Button text={"SAIR"} onClick={handleLogout} />
          </div>
          <section className="project-list">
            <h1>PROJETOS</h1>
            <div className="project-container">
              <p>NOME DO PROJETO</p>
            </div>
            <div className="project-container">
              <p>NOME DO PROJETO</p>
            </div>
            <div className="add-button-container">
              <Button
                text={"ADICIONAR"}
                onClick={() => setProjectModalOpen(true)}
              />
              <ProjectForm
                isOpen={isProjectModalOpen}
                onClose={() => setProjectModalOpen(false)}
              />
            </div>
          </section>

          <hr />

          <section className="technology-list">
            <h1>TECNOLOGIAS</h1>
            <div className="technology-container">
              <p>NOME DA TECNOLOGIA</p>
            </div>
            <div className="technology-container">
              <p>NOME DA TECNOLOGIA</p>
            </div>
            <div className="add-button-container">
              <Button
                text={"ADICIONAR"}
                onClick={() => setTechnologyModalOpen(true)}
              />
              <TechnologyForm
                isOpen={isTechnologyModalOpen}
                onClose={() => setTechnologyModalOpen(false)}
              />
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default Admin;
