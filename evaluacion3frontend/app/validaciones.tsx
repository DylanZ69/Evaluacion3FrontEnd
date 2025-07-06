export const validarNombre= (nombre: string): string=>{
    if(nombre.trim().length<3)return "nombre muy corto, ingrese al menos 3 letras";
    return "";
};

export const validarApellido= (apellido: string): string=> {
  if (apellido.trim().length<3) return "Apellido muy corto, ingrese al menos 3 letras";
  return "";
};

export const validarEdad= (edad: number): string=> {
  if (isNaN(edad) || edad<=0) return "Edad debe ser mayor a 0";
  return "";
};

export const validarDescripcion= (desc: string): string=> {
  if (desc.trim().length<10) return "Descripción muy corta (mínimo 10 caracteres)";
  return "";
};

export const validarFecha= (fecha: string): string=> {
  if (!fecha) return "Debe seleccionar una fecha";
  return "";
};
