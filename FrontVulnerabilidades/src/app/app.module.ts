import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { DescubrimientoActivosComponent } from './@core/componentes/analisis/descubrimiento-activos/descubrimiento-activos.component';
import { EscanerPuertosComponent } from './@core/componentes/analisis/escaner-puertos/escaner-puertos.component';
import { EscanerSistemaOperativoComponent } from './@core/componentes/analisis/escaner-sistema-operativo/escaner-sistema-operativo.component';
import { ContenedorComponent } from './@core/componentes/contenedor/contenedor.component';

@NgModule({
  declarations: [
    AppComponent,
    DescubrimientoActivosComponent,
    EscanerPuertosComponent,
    EscanerSistemaOperativoComponent,
    ContenedorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
