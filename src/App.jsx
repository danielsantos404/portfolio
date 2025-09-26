import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <Router>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover={true}
        closeButton={true}
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
