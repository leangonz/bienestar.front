import { InsumoMenu } from "./insumo";

export interface Menu {
    id: number;
    nombreMenu: string;
    tipoMenu: number;
    insumos: InsumoMenu[];
  }