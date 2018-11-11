import { InsumoMenu } from "src/app/model/insumo";

export interface MenuRealizado {
    fecha: string,
    lactarios: string,
    unAnio: string,
    dosAnios: string,
    tresAnios: string,
    cuatroCincoAnios: string,
    adultos: string,
    momentoDelDia: string,
    insumos: InsumoMenu[]
  }