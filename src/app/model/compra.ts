import { CompraItem } from "./compraItem";

export interface Compra {
    fecha: string,
    proveedor: string,
    area: string,
    categoria: string,
    items: CompraItem[]
  }