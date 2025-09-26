import "./Admin.css";
import Button from "../../components/button/Button";
import ProjectForm from "./components/project-form/ProjectForm";
import TechnologyForm from "./components/technology-form/TechnologyForm";
import githubIcon from "../../assets/githubIcon.svg";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  onAuthStateChanged,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function Admin() {
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isTechnologyModalOpen, setTechnologyModalOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const loginTimestamp = localStorage.getItem("loginTimestamp");
        const now = new Date().getTime();
        const maxSessionTime = 24 * 60 * 60 * 1000;

        if (loginTimestamp && now - loginTimestamp > maxSessionTime) {
          toast.info("Sessão expirada. Fazendo logout automático.");
          signOut(auth);
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGithubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success(`Login efetuado com sucesso, ${result.user.displayName}!`);
        localStorage.setItem("loginTimestamp", new Date().getTime());
      })
      .catch((error) => {
        const errorMessage = `Houve um erro ao tentar fazer o login: ${error.code}`;
        toast.error(errorMessage);
        console.error("Erro ao fazer login: ", error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout efetuado com sucesso.");
        localStorage.removeItem("loginTimestamp");
      })
      .catch((error) => {
        toast.error("Houve um erro ao tentar fazer o logout.");
        console.log("Erro ao fazer logout: ", error);
      });
  };

  if (loading) {
    return <div className="loading-screen">Carregando...</div>;
  }

  return (
    <>
      {!user ? (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2>Autentique-se 🔐</h2>
            <Button
              imgUrl={githubIcon}
              text="GitHub"
              onClick={handleGithubLogin}
              style={{ margin: "24px auto", display: "block" }}
            />
          </div>
        </div>
      ) : (
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
