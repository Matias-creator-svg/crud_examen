import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MySwal = withReactContent(Swal);

function App() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [materia, setMateria] = useState("");
  const [nota_1p, setNota1] = useState("");
  const [nota_2p, setNota2] = useState("");
  const [id, setId] = useState("");

  // Estados para validaciones
  const [nombreValido, setNombreValido] = useState(false);
  const [apellidoValido, setApellidoValido] = useState(false);
  const [materiaValido, setMateriaValido] = useState(false);
  const [nota1Valido, setNota1Valido] = useState(false);
  const [nota2Valido, setNota2Valido] = useState(false);

  // Estados para datos y UI
  const [estudiantesList, setEstudiantes] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [editar, setEditar] = useState(false);

  // Validar campos en tiempo real
  useEffect(() => {
    setNombreValido(nombre.trim().length >= 3);
  }, [nombre]);

    useEffect(() => {
    setApellidoValido(apellido.trim().length >= 3);
  }, [apellido]);

      useEffect(() => {
    setMateriaValido(materia.trim().length >= 3);
  }, [materia]);

  useEffect(() => {
    setNota1Valido(nota_1p >= 0 && edad <= 20);
  }, [nota_1p]);

    useEffect(() => {
    setNota2Valido(nota_2p >= 0 && edad <= 20);
  }, [nota_2p]);

  // Limpiar datos del formulario
  const limpiarDatos = () => {
    setNombre("");
    setApellido("");
    setMateria("");
    setNota1("");
    setNota2("");
    setId("");
    setEditar(false);
    
    // Resetear validaciones
    setNombreValido(false);
    setApellidoValido(false);
    setMateriaValido(false);
    setNota1Valido(false);
    setNota2Valido(false);
  };

  // Validar todos los campos antes de enviar
  const validarFormulario = () => {
    return (
      nombreValido &&
      apellidoValidoValido &&
      materiaValidoValido &&
      nota1ValidoValido &&
      nota2ValidoValido
    );
  };

  // Agregar nuevo estudiante
  const add = (event) => {
    event.preventDefault();
    
    if (!validarFormulario()) {
      MySwal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, completa todos los campos correctamente',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      apellido: apellido,
      materia: materia,
      nota_1p: nota_1p,
      nota_2p: nota_2p,
    }).then((response) => {
      getEstudiantes();
      MySwal.fire({
        title: 'Estudiante registrado con éxito',
        html: `<p>El estudiante ${nombre} se ha registrado</p>`,
        icon: 'success',
        draggable: true,
        confirmButtonText: 'Aceptar',
      });
      limpiarDatos();
    }).catch(error => {
      MySwal.fire({
        title: 'Error',
        text: 'No se pudo registrar el estudiante',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    });
  };

  // Actualizar empleado existente
  const update = (event) => {
    event.preventDefault();
    
    if (!validarFormulario()) {
      MySwal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, completa todos los campos correctamente',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    
    Axios.put("http://localhost:3001/update", {
      id, nombre, apellido, materia, nota_1p, nota_2p
    }).then((response) => {
      getEstudiantes();
      MySwal.fire({
        title: 'Estudiante actualizado con éxito',
        html: `<p>El estudiante ${nombre} se ha actualizado</p>`,
        icon: 'success',
        draggable: true,
        confirmButtonText: 'Aceptar',
      });
      limpiarDatos();
    }).catch((error) => {
      MySwal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el estudiante',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    });
  };

  // Eliminar estudiante
  const deleteE = (id) => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}`)
          .then((response) => {
            listarEstudiantes();
            limpiarDatos();
            MySwal.fire({
              title: "Eliminado",
              text: "El estudiante ha sido eliminado",
              icon: "success"
            });
          })
          .catch((error) => {
            MySwal.fire({
              title: "Error",
              text: "No se pudo eliminar el empleado",
              icon: "error"
            });
          });
      }
    });
  };

  // Obtener lista de estudiantes
  const getEstudiantes = () => {
    Axios.get("http://localhost:3001/estudiantes").then((response) => {
      console.log(response.data);
    });
  };

  // Listar estudiantes en la tabla
  const listarEstudiantes = () => {
    Axios.get("http://localhost:3001/estudiantes").then((response) => {
      setEstudiantes(response.data);
      setShowTable(true);
    });
  };

  // Preparar formulario para edición
  const editarE = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setApellido(val.apellido);
    setMateria(val.materia);
    setNota1(val.nota_1p);
    setNota2(val.nota_2p);
    setId(val.id);
    
    // Establecer validaciones como verdaderas
    setNombreValido(true);
    setApellidoValido(true);
    setMateriaValido(true);
    setNota1Valido(true);
    setNota2Valido(true);
  };

  // Cargar empleados al inicio
  useEffect(() => {
    getEstudiantes();
  }, []);

  return (
    <div className="App py-5" style={{ 
      background: 'linear-gradient(135deg, #e0f7fa, #bbdefb)',
      minHeight: '100vh'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
              <div className="card-header py-4" style={{ 
                background: 'linear-gradient(to right, #4361ee, #3f37c9)',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px'
              }}>
                <h1 className="text-white mb-3">
                  <i className="bi bi-people-fill me-3"></i>
                  CRUD ESTUDIANTES
                </h1>
                <h2 className="text-light fs-4 fw-light">Sistema de Gestión de Estudiantes</h2>
              </div>
              
              <div className="card-body px-4">
                <div className="p-4 rounded-3 shadow-sm mb-5" style={{ backgroundColor: '#ffffff' }}>
                  <h3 className="text-center mb-4 fw-bold text-primary position-relative pb-3">
                    <i className="bi bi-person-plus-fill me-2"></i>
                    Registro de Estudiantes
                    <div className="position-absolute bottom-0 start-50 translate-middle-x bg-primary" 
                         style={{ width: '80px', height: '3px', borderRadius: '3px' }}></div>
                  </h3>
                  
                  <form className="row g-4" onSubmit={editar ? update : add}>
                    {/* Campo Nombre */}
                    <div className="col-md-12">
                      <div className="row align-items-center mb-4">
                        <label className="col-sm-4 col-form-label text-end fw-semibold" htmlFor="nombre">
                          <i className="bi bi-person-fill me-2 text-primary"></i>
                          Nombre:
                        </label>
                        <div className="col-sm-8 position-relative">
                          <input 
                            type="text" 
                            className={`form-control form-control-lg ${nombre ? (nombreValido ? 'is-valid' : 'is-invalid') : ''}`}
                            id="nombre" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            placeholder="Ingrese su nombre"
                            required
                          />
                          {nombre && nombreValido && (
                            <div className="valid-feedback d-flex align-items-center">
                              <i className="bi bi-check-circle-fill me-2"></i>
                              ¡Correcto!
                            </div>
                          )}
                          {nombre && !nombreValido && (
                            <div className="invalid-feedback d-flex align-items-center">
                              <i className="bi bi-exclamation-circle-fill me-2"></i>
                              Mínimo 3 caracteres
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row align-items-center mb-4">
                        <label className="col-sm-4 col-form-label text-end fw-semibold" htmlFor="nombre">
                          <i className="bi bi-person-fill me-2 text-primary"></i>
                          Apellido:
                        </label>
                        <div className="col-sm-8 position-relative">
                          <input 
                            type="text" 
                            className={`form-control form-control-lg ${apellido ? (apellidoValido ? 'is-valid' : 'is-invalid') : ''}`}
                            id="nombre" 
                            value={apellido} 
                            onChange={(e) => setApellido(e.target.value)} 
                            placeholder="Ingrese su apellido"
                            required
                          />
                          {apellido && apellidoValido && (
                            <div className="valid-feedback d-flex align-items-center">
                              <i className="bi bi-check-circle-fill me-2"></i>
                              ¡Correcto!
                            </div>
                          )}
                          {apellido && !apellidoValido && (
                            <div className="invalid-feedback d-flex align-items-center">
                              <i className="bi bi-exclamation-circle-fill me-2"></i>
                              Mínimo 3 caracteres
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row align-items-center mb-4">
                        <label className="col-sm-4 col-form-label text-end fw-semibold" htmlFor="nombre">
                          <i className="bi bi-person-fill me-2 text-primary"></i>
                          Materia:
                        </label>
                        <div className="col-sm-8 position-relative">
                          <input 
                            type="text" 
                            className={`form-control form-control-lg ${materia ? (materiaValido ? 'is-valid' : 'is-invalid') : ''}`}
                            id="nombre" 
                            value={materia} 
                            onChange={(e) => setMateria(e.target.value)} 
                            placeholder="Ingrese la materia correspondiente"
                            required
                          />
                          {materia && materiaValido && (
                            <div className="valid-feedback d-flex align-items-center">
                              <i className="bi bi-check-circle-fill me-2"></i>
                              ¡Correcto!
                            </div>
                          )}
                          {materia && !materiaValido && (
                            <div className="invalid-feedback d-flex align-items-center">
                              <i className="bi bi-exclamation-circle-fill me-2"></i>
                              Mínimo 3 caracteres
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Campo nota1 */}
                      <div className="row align-items-center mb-4">
                        <label className="col-sm-4 col-form-label text-end fw-semibold" htmlFor="edad">
                          <i className="bi bi-calendar3 me-2 text-primary"></i>
                          Nota 1:
                        </label>
                        <div className="col-sm-8 position-relative">
                          <input 
                            type="number" 
                            className={`form-control form-control-lg ${nota_1p ? (nota1Valido ? 'is-valid' : 'is-invalid') : ''}`}
                            id="edad" 
                            value={nota_1p} 
                            onChange={(e) => setNota1(e.target.value)} 
                            placeholder="Ingrese la nota 1 (0-20)"
                            min="0"
                            max="20"
                            required
                          />
                          {nota_1p && nota1Valido && (
                            <div className="valid-feedback d-flex align-items-center">
                              <i className="bi bi-check-circle-fill me-2"></i>
                              ¡Correcto!
                            </div>
                          )}
                          {nota_1p && !nota1Valido && (
                            <div className="invalid-feedback d-flex align-items-center">
                              <i className="bi bi-exclamation-circle-fill me-2"></i>
                              Nota debe ser entre 0 y 20
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Campo nota2 */}
                      <div className="row align-items-center mb-4">
                        <label className="col-sm-4 col-form-label text-end fw-semibold" htmlFor="edad">
                          <i className="bi bi-calendar3 me-2 text-primary"></i>
                          Nota 2:
                        </label>
                        <div className="col-sm-8 position-relative">
                          <input 
                            type="number" 
                            className={`form-control form-control-lg ${nota_2p ? (nota2Valido ? 'is-valid' : 'is-invalid') : ''}`}
                            id="edad" 
                            value={nota_2p} 
                            onChange={(e) => setNota2(e.target.value)} 
                            placeholder="Ingrese la nota 2 (0-20)"
                            min="0"
                            max="20"
                            required
                          />
                          {nota_2p && nota2Valido && (
                            <div className="valid-feedback d-flex align-items-center">
                              <i className="bi bi-check-circle-fill me-2"></i>
                              ¡Correcto!
                            </div>
                          )}
                          {nota_2p && !nota2Valido && (
                            <div className="invalid-feedback d-flex align-items-center">
                              <i className="bi bi-exclamation-circle-fill me-2"></i>
                              Nota debe ser entre 0 y 20
                            </div>
                          )}
                        </div>
                      </div>
                      
                {/* Botones de acción */}
                <div className="d-flex justify-content-center gap-3 mb-4">
                  {editar ? (
                    <>
                      <button 
                        className="btn btn-primary btn-lg d-flex align-items-center px-4" 
                        type="button" 
                        onClick={update}
                      >
                        <i className="bi bi-pencil-fill me-2"></i>
                        Actualizar
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary btn-lg d-flex align-items-center px-4" 
                        onClick={limpiarDatos}
                      >
                        <i className="bi bi-x-circle-fill me-2"></i>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button 
                      type="button" 
                      className="btn btn-primary btn-lg d-flex align-items-center px-4" 
                      onClick={add}
                    >
                      <i className="bi bi-person-plus-fill me-2"></i>
                      Registrar
                    </button>
                  )}
                </div>
                
                {/* Botón para listar estudiantes */}
                <div className="text-center mb-4">
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-lg d-flex align-items-center mx-auto" 
                    onClick={listarEstudiantes}
                  >
                    <i className="bi bi-list-check me-2"></i>
                    {showTable ? 'Ocultar Empleados' : 'Listar Empleados'}
                  </button>
                </div>
                
                {/* Tabla de estudiantes */}
                {showTable && (
                  <div className="table-responsive rounded-3 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-primary">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Apellido</th>
                          <th scope="col">Materia</th>
                          <th scope="col">Nota1</th>
                          <th scope="col">Nota 2</th>
                          <th scope="col" className="text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {estudiantesList.map((val, key) => (
                          <tr key={key} className={editar && id === val.id ? 'table-warning' : ''}>
                            <th scope="row" className="fw-normal">{key + 1}</th>
                            <td>{val.nombre}</td>
                            <td>{val.apellido}</td>
                            <td>{val.materia}</td>
                            <td>{val.nota_1p}</td>
                            <td>{val.nota_2p}</td>
                            <td className="text-center">
                              <div className="btn-group" role="group">
                                <button 
                                  type="button"
                                  onClick={() => editarE(val)}
                                  className="btn btn-sm btn-outline-info d-flex align-items-center"
                                >
                                  <i className="bi bi-pencil-square me-1"></i>
                                  Editar
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => deleteE(val.id)}
                                  className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                >
                                  <i className="bi bi-trash-fill me-1"></i>
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              
              <div className="card-footer py-3 text-center" style={{ backgroundColor: 'rgba(67, 97, 238, 0.05)' }}>
                <small className="text-muted">Sistema CRUD de Estudiantes © {new Date().getFullYear()}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;