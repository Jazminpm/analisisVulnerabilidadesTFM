import {DatosPuerto} from "./datos-puerto";

export interface Dispositivo {
  encendido: boolean;
  nombre: string;
  dirIp: string;
  dirMac: string;
  fabricante: string;
  puertos: Array<DatosPuerto>;
  corriendoSO: string;
  cpeSO: string;
  detallesSO: string;
  distancia: string;
}

export interface ListaDispositivos {
  dispositivos: Array<Dispositivo>;
}
