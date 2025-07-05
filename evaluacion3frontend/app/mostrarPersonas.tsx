'use client'
import React from "react"
import { Persona } from "./InterfacePersonas"

interface Props {
    personas: Persona[];
}

const MostrarPersonas = ({personas}:Props) =>{
    return (
    <div>
      <h2>Personas Registradas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p, index) => (
            <tr key={index}>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
              <td>{p.edad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

export default MostrarPersonas