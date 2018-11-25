import { InsumoMenu } from "./insumo";

export interface Menu {
    id: number;
    idMenu: number;//deberia eliminar el id pero no se si esta asi por algo,
    nombreMenu: string;
    tipoMenu: number;
    descTipo: string;
    insumos: InsumoMenu[];
  }