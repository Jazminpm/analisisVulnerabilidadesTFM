import { Component, OnInit } from '@angular/core';
import {Dispositivo} from "../../../interfaces/dispositivo";

@Component({
  selector: 'app-descubrimiento-activos',
  templateUrl: './descubrimiento-activos.component.html',
  styleUrls: ['./descubrimiento-activos.component.scss']
})
export class DescubrimientoActivosComponent implements OnInit {

  constructor() { }
  listadoActivos: undefined | Array<Dispositivo>;

  ngOnInit(): void {
  }

}
