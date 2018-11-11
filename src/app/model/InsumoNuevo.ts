import { Categoria } from "./categoria";

export interface InsumoNuevo {
    descripcion: string;
    cantidad: number;
    idUnidadMedida: number;
    categoria: Categoria;
  }