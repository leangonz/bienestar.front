import { CompraItem } from "./compraItem";

export interface Compra {
    fecha: string,
    factura: string,
    proveedor: string,
    descProveedor: string,
    area: string,
    categoria: string,
    items: CompraItem[]
  }