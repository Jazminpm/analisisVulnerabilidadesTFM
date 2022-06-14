import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContenedorComponent} from "./@core/componentes/contenedor/contenedor.component";
import {EscanerSistemaOperativoComponent} from "./@core/componentes/analisis/escaner-sistema-operativo/escaner-sistema-operativo.component";
import {EscanerPuertosComponent} from "./@core/componentes/analisis/escaner-puertos/escaner-puertos.component";
import {DescubrimientoActivosComponent} from "./@core/componentes/analisis/descubrimiento-activos/descubrimiento-activos.component";

export const routes: Routes = [
  { path: '', component: ContenedorComponent },
  { path: 'descubrimiento-activos', component: DescubrimientoActivosComponent },
  { path: 'escaner-puertos', component: EscanerPuertosComponent },
  { path: 'escaner-sistema-operativo', component: EscanerSistemaOperativoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
