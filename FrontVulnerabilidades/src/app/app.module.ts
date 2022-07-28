import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { DescubrimientoActivosComponent } from './@core/componentes/analisis/descubrimiento-activos/descubrimiento-activos.component';
import { EscanerPuertosComponent } from './@core/componentes/analisis/escaner-puertos/escaner-puertos.component';
import { EscanerSistemaOperativoComponent } from './@core/componentes/analisis/escaner-sistema-operativo/escaner-sistema-operativo.component';
import { ContenedorComponent } from './@core/componentes/contenedor/contenedor.component';
import {AppConfig} from "./app.config";
import {HttpClientModule} from "@angular/common/http";
import {DataTablesModule} from "angular-datatables";
import {ModalModule} from "ngb-modal";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NgbModule,
    DataTablesModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
