import { Categoria } from "./categoria";

export interface InsumoNuevo {
    id: number;
    descripcion: string;
    cantidad: number;
    idUnidadMedida: number;
    categoria: Categoria;
  }