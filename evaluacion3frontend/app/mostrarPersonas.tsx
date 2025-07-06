'use client'
import React from "react"
import { Persona } from "./InterfacePersonas"

interface Props {
    personas: Persona[];
    traerPersona: (p: Persona, index: number)=> void;
    eliminarPersona: (index: number)=> void;
}

const MostrarPersonas = ({personas, traerPersona, eliminarPersona }:Props) =>{
    return (
    <div>
      <h2>PERSONAS REGISTRADAS</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p, index) => (
            <tr key={index}>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
              <td>{p.edad}</td>
              <td>{p.categoria}</td>
              <td>{p.descripcion}</td>
              <td>{p.fecha}</td>
              <td>
                <button onClick={() => traerPersona(p, index)}>Editar</button>
                <button onClick={() => eliminarPersona(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

export default MostrarPersonas