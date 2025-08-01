import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
// import {useState, useEffect} from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [aniostrabajo, setAniosTrabajo] = useState("");
  const [id, setId] = useState("");

  const [empleadosList, setEmpleados] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [editar, setEditar] = useState(false);

  //FUNCION AGREGAR REGISTRO
  //Axios es una librería que permite hacer peticiones HTTP desde el navegador o Node.js
  //En este caso, se utiliza para enviar una solicitud POST al servidor Express que se ejecuta en el puerto 3001.
  //La solicitud incluye los datos del nuevo empleado que se van a agregar a la base de datos.
  //Cuando la solicitud se completa con éxito, se muestra una alerta indicando que el empleado se ha registrado correctamente.
  //Si ocurre un error durante la solicitud, se captura y se muestra en la consola.
  //El evento preventDefault() se utiliza para evitar que el formulario se envíe de forma predeterminada, lo que recargaría la página.
  //Esto permite que la función add maneje el envío del formulario de manera personalizada.
  //El evento onClick se utiliza para llamar a la función add cuando se hace clic en el botón de registro.
  //El evento onChange se utiliza para actualizar el estado de los campos del formulario a medida
  //que el usuario ingresa datos en ellos.
  //El estado se actualiza utilizando las funciones setNombre, setEdad, setPais,

  //limpiar datos
  const limpiarDatos = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setOcupacion("");
    setAniosTrabajo("");
    setId("");
    setEditar(false);
  };

  const add = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      ocupacion: ocupacion,
      anios: aniostrabajo,
      
    }).then((response) => {
      getEmpleados(); // Llamar a la función para obtener empleados después de agregar uno nuevo

      // useEffect(() => {
      // App.getEmpleados();
      // }, []);

      MySwal.fire({
        title: 'Empleado registrado con éxito',
        html: "<p>El empleado "+ nombre + " se ha registrado</p>",
        icon: 'success',
        draggable: true,
        confirmButtonText: 'Aceptar',
      });
      limpiarDatos();
    });
  };

  //funcion actualizar
const update = (event) => {
  event.preventDefault();            // opcional aquí
  Axios.put("http://localhost:3001/update", {
    id, nombre, edad, pais, ocupacion, aniostrabajo
  })
  .then((response) => {
    //alert("Empleado actualizado correctamente");
    getEmpleados(); 

      MySwal.fire({
        title: 'Empleado actualizado con éxito',
        html: "<p>El empleado "+ nombre + " se ha actualizado</p>",
        icon: 'success',
        draggable: true,
        confirmButtonText: 'Aceptar',
      });

    limpiarDatos();
  })
  .catch((error) => {
    console.error("Error al actualizar:", error);
    alert("Falló la actualización — mira la consola");
  });
};


//FUNCION ELIMINAR USUARIO
const deleteE = (id) => {
  MySwal.fire({
    title: "¿Estás seguro?",
    text: "No puedes revertir esto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, deseo eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`http://localhost:3001/delete/${id}`)
        .then((response) => {
          listarEmpleados(); 
          limpiarDatos();    
          MySwal.fire({
            title: "Eliminado",
            text: "El empleado ha sido eliminado",
            icon: "success"
          });
        })
        .catch((error) => {
          console.error("Error al eliminar:", error);
          MySwal.fire({
            title: "Error",
            text: "No se pudo eliminar el empleado",
            icon: "error"
          });
        });
    }
  });
};

  //FUNCION PARA TRAER Y LISTAR EMPLEADOS
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
    console.log(response.data); 
     });
   };
 
  //FUNCION PARA LISTAR EMPLEADOS
  const listarEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
      setShowTable(true);
    });
  };

  //FUNCION PARA ACTUALIZAR
  const editarE=(val) => {
    setEditar(true);
      setNombre(val.nombres);
      setEdad(val.edad);
      setPais(val.pais);
      setOcupacion(val.ocupacion);
      setAniosTrabajo(val.anios);
      setId(val.id);
  }

  useEffect(() => {
    getEmpleados();
  }, []);


  // const mostrarDatos = (event) => {
  //   event.preventDefault();
  //   alert("Nombre:", nombre);
  // };

  
  return (

<div className="App py-5">

<div className="card text-center">
  <div className="card-header">
    <h1 className="text-primary">CRUD Empleados</h1>
    <h2 className="text-secondary">Registro y Listado</h2>
  </div>
  <div className="card-body">
  <div className="container my-5 d-flex justify-content-center">
  <form className="row g-4 px-5 py-5 bg-text-secondary-emphasis rounded-3 shadow-lg col-12 col-md-8" onSubmit={add}>
    <h3 className="w-100 text-center mb-4 fw-semibold">Registro de Empleado</h3>

    <div className="row mb-3 col-md-12">
      <label className="col-sm-4 col-form-label text-end fw-semibold" htmlFor="nombre">Nombre completo:</label>
      <div className="col-sm-8">
        <input type="text" className="form-control form-control-lg border-primary is-valid" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <div className="valid-feedback">¡Correcto!</div>
      </div>
    </div>

    <div className="row mb-3 col-md-12">
      <label className="col-sm-4 col-form-label text-end fw-semibold" htmlFor="edad">Edad:</label>
      <div className="col-sm-8">
        <input type="number" className="form-control form-control-lg border-primary is-valid" id="edad" value={edad} onChange={(e) => setEdad(e.target.value)} required />
        <div className="valid-feedback">¡Correcto!</div>
      </div>
    </div>

    <div className="row mb-3 col-md-12">
      <label className="col-sm-4 col-form-label text-end fw-semibold" htmlFor="pais">País:</label>
      <div className="col-sm-8">
        <input type="text" className="form-control form-control-lg border-primary is-valid" id="pais" value={pais} onChange={(e) => setPais(e.target.value)} required />
        <div className="valid-feedback">¡Correcto!</div>
      </div>
    </div>

    <div className="row mb-3 col-md-12">
      <label className="col-sm-4 col-form-label text-end fw-semibold" htmlFor="ocupacion">Ocupación:</label>
      <div className="col-sm-8">
        <input type="text" className="form-control form-control-lg border-primary is-valid" id="ocupacion" value={ocupacion} onChange={(e) => setOcupacion(e.target.value)} required />
        <div className="valid-feedback">¡Correcto!</div>
      </div>
    </div>

    <div className="row mb-3 col-md-12">
      <label className="col-sm-4 col-form-label text-end fw-semibold" htmlFor="aniostrabajo">Años de trabajo:</label>
      <div className="col-sm-8">
        <input type="number" className="form-control form-control-lg border-primary is-valid" id="aniostrabajo" value={aniostrabajo} onChange={(e) => setAniosTrabajo(e.target.value)} required />
        <div className="valid-feedback">¡Correcto!</div>
      </div>
    </div>

  </form>
</div>

  </div>
  <div className="card-footer text-body-secondary">
    <div className="col-12 text-center">
      {
        editar?
        <div>
          <button className="btn btn-primary btn-lg" type="button" onClick={update}>Editar</button>
          <button type="button" className="btn btn-secondary btn-lg" onClick={limpiarDatos}>Cancelar</button>
      
        </div>
        :<button type="button" className="btn btn-primary btn-lg" onClick={add}>Registrar</button>
      }
    </div>

    <div className='lista'>
      <button type="button" className="btn btn-secondary btn-lg mt-3" onClick={listarEmpleados}>Listar Empleados</button>
      {/* Mostrar tabla solo al presionar Listar */}
      {showTable && (
        <div className="table-group-divider">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Pais</th>
                <th scope="col">Ocupación</th>
                <th scope="col">Años de trabajo</th>
                <th scope="col">Acciones</th>

              </tr>
            </thead>
            <tbody>
              {empleadosList.map((val, key) => (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{val.nombres}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.ocupacion}</td>
                  <td>{val.anios}</td>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                       onClick={(event) =>{
                        editarE(val)}}
                       class="btn btn-info px-3">Editar</button>


                    <button type="button"
                        onClick={() =>{
                        deleteE(val.id)}}
                     class="btn btn-danger px-3">Eliminar</button>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
</div>

  
      
    </div>
  );
}

export default App;