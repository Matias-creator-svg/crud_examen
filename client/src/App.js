import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CrudEstudiantes from "./CrudEstudiantes";
import "bootstrap/dist/css/bootstrap.min.css";
import Carrusel from "./Carrusel";


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/barra">Menú de navegación</Link>
          <div className="d-flex gap-2">
            <a className="btn btn-primary" href="https://www.espe.edu.ec/" target="_blank" rel="noopener noreferrer">Inicio</a>
            <Link className="btn btn-secondary" to="/crud">Registro de estudiantes</Link>
            <Link className="btn btn-secondary" to="/">Gestión de estudiantes</Link>
          </div>

        </div>
      </nav>

      <Routes>
        <Route path="/barra" element={<Carrusel/>} />
        <Route path="/crud" element={<CrudEstudiantes />} />
      </Routes>
    </Router>
  );
}

export default App;
