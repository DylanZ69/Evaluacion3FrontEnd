'use client'
import React,{useEffect,useState} from "react"
import { Persona } from "./InterfacePersonas"
import MostrarPersonas from "./mostrarPersonas"


const categorias = ["Evento","Beneficiario","Proyecto"];
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
    if (name === "nombre"){
      if (value.length<3) setErrorNombre("Minimo 3 letras")
      else setErrorNombre("");
    }
  };

  const handleGuardar = ()=>{
    if (persona.nombre.length<3){
      setErrorNombre("nombre muy corto");
      return;
    }
    if (editarIndex === null){
      guardarStorage([...personas, persona]);
    }else{
      const copia = [...personas];
      copia[editarIndex]=persona;
      guardarStorage(copia);
      setEditarIndex(null);
    }
    setPersona(initialState);
  };

  const traerPersona= (p: Persona, index: number)=> {
    setPersona(p);
    setEditarIndex(index);
  }

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
        /><br /><br />

        <label>Edad</label><br />
        <input
          name="edad"
          type="number"
          value={persona.edad}
          onChange={(e) => handleCambiar(e.target.name, Number(e.target.value))}
        /><br /><br />

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
        /><br /><br />

        <label>Fecha</label><br />
        <input
          name="fecha"
          type="date"
          value={persona.fecha}
          onChange={(e) => handleCambiar(e.target.name, e.target.value)}
        /><br /><br />

        <button type="button" onClick={handleGuardar}>
          {editarIndex === null ? "Registrar" : "Actualizar"}</button>
      </form>

      <MostrarPersonas personas={personas} traerPersona={traerPersona}
      />
    </div>
  );
}
