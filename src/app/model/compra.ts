import { CompraItem } from "./compraItem";

export interface Compra {
    fecha: string,
    factura: string,
    proveedor: string,
    area: string,
    categoria: string,
    items: CompraItem[]
  }