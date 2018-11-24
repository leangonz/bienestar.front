import { Categoria } from "./categoria";

export interface InsumoMenu {
    id: number;
    descripcion: string;
    cantidad: number;
    unidadDeMedida: string;
    categoria: Categoria;
  }