import "./Projects.css";
import Header from "../../components/header/Header";
import Card from "../../components/card/Card";
import { useEffect, useState  } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Header navItems={[{ label: "VOLTAR", href: "/" }]} />
      <main className="all-projects">
        <h1>TODOS OS PROJETOS</h1>
        <section className="projects-container">
          {loading ? (
            <p className="loading-message">Carregando projetos...</p>
          ) : (
            projects.map((project) => (
              <Card key={project.id} project={project} />
            ))
          )}
        </section>
      </main>
    </>
  );
}

export default Projects;
