'use client'
import React,{useEffect,useState} from "react"
import { Persona } from "./Interfaz/InterfacePersonas"
import MostrarPersonas from "./Componentes/mostrarPersonas"
import { validarNombre,validarApellido,validarEdad,validarDescripcion,validarFecha } from "./Componentes/validaciones"


const categorias = ["Eventos","Beneficiarios","Proyectos"];
const miStorage = window.localStorage

const initialState: Persona ={
  nombre : "",
  apellido :"",
  edad :0,
  categoria: categorias[0],
  descripcion: "",
  fecha: ""
}


export default function Home() {
  const[persona, setPersona]= useState<Persona>(initialState);
  const[personas, setPersonas]= useState<Persona[]>([]);
  const[editarIndex, setEditarIndex]= useState<number | null>(null);
  const[errorNombre, setErrorNombre]= useState("");
  const[errorApellido, setErrorApellido]=useState("");
  const[errorEdad, setErrorEdad]= useState("");
  const[errorDescripcion, setErrorDescripcion]= useState("");
  const[errorFecha, setErrorFecha]= useState("");


  useEffect(()=>{
    const datos = miStorage.getItem("personas");
    if (datos){
      setPersonas(JSON.parse(datos));
    }
  },[]);
  const guardarStorage = (lista: Persona[])=>{
    miStorage.setItem("personas", JSON.stringify(lista));
    setPersonas(lista);
  };
  const handleCambiar = (name: string, value: any)=>{
    setPersona({...persona,[name]:value});
    switch (name){
      case "nombre":
        setErrorNombre(validarNombre(value));
        break;
      case "apellido":
        setErrorApellido(validarApellido(value));
        break;
        case "edad":
        setErrorEdad(validarEdad(value));
        break;
      case "descripcion":
        setErrorDescripcion(validarDescripcion(value));
        break;
      case "fecha":
        setErrorFecha(validarFecha(value));
        break;
      default:
        break;
    }
  };

  const handleGuardar = ()=>{
    const errores={
      nombre: validarNombre(persona.nombre),
      apellido: validarApellido(persona.apellido),
      edad: validarEdad(persona.edad),
      descripcion: validarDescripcion(persona.descripcion),
      fecha: validarFecha(persona.fecha),
    };

    setErrorNombre(errores.nombre);
    setErrorApellido(errores.apellido);
    setErrorEdad(errores.edad);
    setErrorDescripcion(errores.descripcion);
    setErrorFecha(errores.fecha);

    const hayErrores=Object.values(errores).some((error)=> error !== "");
    if (hayErrores) return;
    
    if (editarIndex !== null){
      const copia = [...personas];
      copia[editarIndex]=persona;
      guardarStorage(copia);
      alert("PERSONA ACTUALIZADA CON EXITO")
      setEditarIndex(null);
    }else{
      guardarStorage([...personas, persona]);
      alert("PERSONA REGISTRADA CON EXITO")
    }

   
    setPersona(initialState);
  };

  const traerPersona= (p: Persona, index: number)=> {
    setPersona(p);
    setEditarIndex(index);
  };

  const eliminarPersona = (index: number) => {
  const nuevaLista = personas.filter((_, i) => i !== index);
  guardarStorage(nuevaLista);
  setPersona(initialState);
  setEditarIndex(null);
};


  return (
    <div>
      <form>
        <h1>FORMULARIO DE REGISTRO DE PERSONAS</h1>

        <label>Nombre</label><br />
        <input
          name="nombre"
          type="text"
          placeholder="ingrese su nombre"
          value={persona.nombre}
          onChange={(e) => handleCambiar(e.target.name, e.target.value)}
        /><br />
        <span style={{ color: "red" }}>{errorNombre}</span><br /><br />

        <label>Apellido</label><br />
        <input
          name="apellido"
          type="text"
          placeholder="ingrese su apellido"
          value={persona.apellido}
          onChange={(e) => handleCambiar(e.target.name, e.target.value)}
        /><br />
        <span style={{ color: "red" }}>{errorApellido}</span><br /><br /><br />

        <label>Edad</label><br />
        <input
          name="edad"
          type="number"
          value={persona.edad}
          onChange={(e) => handleCambiar(e.target.name, Number(e.target.value))}
        /><br />
        <span style={{ color: "red" }}>{errorEdad}</span><br /><br /><br />

        <label>Categoría</label><br />
        <select
          name="categoria"
          value={persona.categoria}
          onChange={(e) => handleCambiar(e.target.name, e.target.value)}
        >
          {categorias.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select><br /><br />

        <label>Descripción</label><br />
        <textarea
          name="descripcion"
          placeholder="ingrese una breve descripcion"
          value={persona.descripcion}
          onChange={(e) => handleCambiar(e.target.name, e.target.value)}
        /><br />
        <span style={{ color: "red" }}>{errorDescripcion}</span><br /><br /><br />

        <label>Fecha</label><br />
        <input
          name="fecha"
          type="date"
          value={persona.fecha}
          onChange={(e) => handleCambiar(e.target.name, e.target.value)}
        /><br />
        <span style={{ color: "red" }}>{errorFecha}</span><br /><br /><br />

        <button type="button" onClick={handleGuardar}>
          {editarIndex === null ? "Registrar" : "Actualizar"}</button>
      </form>

      <MostrarPersonas 
       personas={personas} 
       traerPersona={traerPersona} 
       eliminarPersona={eliminarPersona}
      />
    </div>
  );
}
