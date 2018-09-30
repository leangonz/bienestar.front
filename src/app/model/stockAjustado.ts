import { InsumoMenu } from "./insumo";

export interface StockAjustado {
    fecha: string,
    motivo: number,
    insumos: InsumoMenu[]
  }