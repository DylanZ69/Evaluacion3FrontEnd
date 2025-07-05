'use client'
import React,{useEffect,useState} from "react"
import { Persona } from "./InterfacePersonas"
import MostrarPersonas from "./mostrarPersonas"

const miStorage = window.localStorage

const initialState: Persona ={
  nombre : "",
  apellido :"",
  edad :0,
  categoria: "",
  descripcion: "",
  fecha: ""
}


export default function Home() {
  const[persona, setPersona]= useState<Persona>(initialState);
  const[personas, setPersonas]= useState<Persona[]>([]);

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
  };

  const handleGuardar = ()=>{
    const nuevaLista = [...personas, persona];
    guardarStorage(nuevaLista);
    setPersona(initialState);
  };

  return (
    <div>
      <form>
        <h1>Registro de Personas</h1>

        <label>Nombre</label><br />
        <input
          name="nombre"
          type="text"
          value={persona.nombre}
          onChange={(e) => handleCambiar(e.target.name, e.target.value)}
        /><br /><br />

        <label>Apellido</label><br />
        <input
          name="apellido"
          type="text"
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

        <button type="button" onClick={handleGuardar}>Registrar</button>
      </form>

      <MostrarPersonas personas={personas} />
    </div>
  );
}
