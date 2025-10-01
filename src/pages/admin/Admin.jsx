import "./Admin.css";
import Button from "../../components/button/Button";
import ProjectForm from "./components/project-form/ProjectForm";
import TechnologyForm from "./components/technology-form/TechnologyForm";
import githubIcon from "../../assets/githubIcon.svg";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase";
import {
  onAuthStateChanged,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

function Admin() {
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isTechnologyModalOpen, setTechnologyModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [technologies, setTechnologies] = useState([]);
  const [editingTechnology, setEditingTechnology] = useState(null);

  const fetchTechnologies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "technologies"));
      const technologiesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTechnologies(technologiesData);
    } catch (error) {
      toast.error("Erro ao buscar tecnologias.");
    }
  };

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
          fetchTechnologies();
        }
      } else {
        setUser(null);
        setTechnologies([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenTechForm = (tech = null) => {
    setEditingTechnology(tech);
    setTechnologyModalOpen(true);
  };

  const handleDeleteTechnology = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar esta tecnologia?")) {
      try {
        await deleteDoc(doc(db, "technologies", id));
        toast.success("Tecnologia deletada com sucesso!");
        fetchTechnologies();
      } catch (error) {
        toast.error("Erro ao deletar tecnologia.");
      }
    }
  };

  const handleGithubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success(
          `Login efetuado com sucesso, ${result.user.displayName}!`
        );
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
            {technologies.map((tech) => (
              <div key={tech.id} className="technology-container">
                <p>{tech.name}</p>
                <div>
                  <button onClick={() => handleOpenTechForm(tech)}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteTechnology(tech.id)}>
                    Deletar
                  </button>
                </div>
              </div>
            ))}
            <div className="add-button-container">
              <Button text={"ADICIONAR"} onClick={() => handleOpenTechForm()} />
              <TechnologyForm
                isOpen={isTechnologyModalOpen}
                onClose={() => setTechnologyModalOpen(false)}
                onSuccess={fetchTechnologies}
                technologyToEdit={editingTechnology}
              />
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default Admin;
