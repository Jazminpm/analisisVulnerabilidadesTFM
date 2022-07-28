import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../../app.config";
import {endpoints} from "../../../../environments/endpoints";

@Injectable({
  providedIn: 'root'
})
export class VulnerabilidadesService {
  environmentUrl;
  constructor(private httpClient: HttpClient, private config: AppConfig) {
    this.environmentUrl = this.config.getConfig('host');
  }

  obtenerActivos(valor: string) {
    return this.httpClient.post(this.environmentUrl + endpoints.obtenerActivos, {valor});
  }

  obtenerPuertosAbiertos(valor: string) {
    return this.httpClient.post(this.environmentUrl + endpoints.obtenerPuertosAbiertos, {
      valor
    });
  }

  obtenerSistemasOperativos(valor: string) {
    return this.httpClient.post(this.environmentUrl + endpoints.obtenerSistemasOperativos, {
      valor
    });
  }
}
