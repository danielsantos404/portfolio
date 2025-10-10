import "./Admin.css";
import Button from "../../components/button/Button";
import ProjectForm from "./components/project-form/ProjectForm";
import TechnologyForm from "./components/technology-form/TechnologyForm";
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
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";

function Admin() {
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isTechnologyModalOpen, setTechnologyModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [technologies, setTechnologies] = useState([]);
  const [editingTechnology, setEditingTechnology] = useState(null);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

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

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    } catch (error) {
      toast.error("Erro ao buscar projetos.");
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
          fetchProjects();
        }
      } else {
        setUser(null);
        setTechnologies([]);
        setProjects([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenTechForm = (tech = null) => {
    setEditingTechnology(tech);
    setTechnologyModalOpen(true);
  };

  const handleOpenProjectForm = (project = null) => {
    setEditingProject(project);
    setProjectModalOpen(true);
  };

  const handleDeleteProject = async (project) => {
    if (
      !window.confirm(
        `Tem certeza que deseja deletar o projeto "${project.name}"?`
      )
    ) {
      return;
    }

    try {
      await deleteDoc(doc(db, "projects", project.id));

      const imageRef = ref(storage, project.imageUrl);
      await deleteObject(imageRef);

      toast.success("Projeto deletado com sucesso!");
      fetchProjects();
    } catch (error) {
      toast.error("Erro ao deletar projeto.");
      console.error(error);
    }
  };

  const handleDeleteTechnology = async (tech) => {
    if (window.confirm("Tem certeza que deseja deletar esta tecnologia?")) {
      try {
        await deleteDoc(doc(db, "technologies", tech.id));
        const iconRef = ref(storage, tech.iconUrl);
        await deleteObject(iconRef);
        toast.success("Tecnologia e imagem deletadas com sucesso!");
        fetchTechnologies();
      } catch (error) {
        toast.error("Erro ao deletar tecnologia.");
        console.error("Erro ao deletar:", error);
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
              imgUrl="/assets/githubIcon.svg"
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
            {projects.map((project) => (
              <div key={project.id} className="project-container">
                <p>{project.name}</p>
                <div>
                  <button onClick={() => handleOpenProjectForm(project)}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteProject(project)}>
                    Deletar
                  </button>
                </div>
              </div>
            ))}
            <div className="add-button-container">
              <Button
                text={"ADICIONAR"}
                onClick={() => handleOpenProjectForm()}
              />
              <ProjectForm
                isOpen={isProjectModalOpen}
                onClose={() => setProjectModalOpen(false)}
                onSuccess={fetchProjects}
                projectToEdit={editingProject}
                availableTechnologies={technologies}
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
                  <button onClick={() => handleDeleteTechnology(tech)}>
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
