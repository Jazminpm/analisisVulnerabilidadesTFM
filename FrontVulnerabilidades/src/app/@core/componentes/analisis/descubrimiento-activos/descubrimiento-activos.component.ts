import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Dispositivo} from "../../../interfaces/dispositivo";
import {VulnerabilidadesService} from "../../../servicios/vulnerabilidades/vulnerabilidades.service";
import {ModalManager} from "ngb-modal";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";


@Component({
  selector: 'app-descubrimiento-activos',
  templateUrl: './descubrimiento-activos.component.html',
  styleUrls: ['./descubrimiento-activos.component.scss']
})
export class DescubrimientoActivosComponent implements OnInit {

  constructor(private vulnerabilidadesService: VulnerabilidadesService, private modalService: ModalManager) { }

  languageSettings = {
    processing: "Procesando...",
    search: "Buscar:",
    lengthMenu: "Mostrar _MENU_ elementos",
    info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
    infoEmpty: "Mostrando ningún elemento.",
    infoFiltered: "(filtrado _MAX_ elementos total)",
    infoPostFix: "",
    loadingRecords: "Cargando registros...",
    zeroRecords: "No se encontraron registros",
    emptyTable: "No hay datos disponibles en la tabla",
    paginate: {
      first: "Primero",
      previous: "Anterior",
      next: "Siguiente",
      last: "Último"
    },
    aria: {
      sortAscending: ": Activar para ordenar la tabla en orden ascendente",
      sortDescending: ": Activar para ordenar la tabla en orden descendente"
    }
  }
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    searching: false,
    pageLength: 10,
    processing: true,
    language: this.languageSettings,
    order: [[0, 'desc'], [2, 'asc']]
  };

  listadoActivos: undefined | Array<Dispositivo>;
  dispositivoSeleccionado: undefined | Dispositivo;
  innerWidth = 0;
  ipsForm = new FormGroup({
    valor: new FormControl(null, [Validators.required ,this.incorrectFormat(), Validators.pattern('^(10.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}([\\-][0-9]{1,3})?|192.168.[0-9]{1,3}.[0-9]{1,3}([\\-][0-9]{1,3})?|172.((16|17|18|30|31)|(2[0-9]{1})){1}.[0-9]{1,3}.[0-9]{1,3}([\\-][0-9]{1,3})?){1}$')])
  });

  buscando = false;
  busqueda = 0; // 0 -> no se ha buscado nada, 1 -> se ha buscado y no encontrado, 2 -> se ha buscado y encontrado



  @ViewChild('detallesActivo') modalInformacion: any;
  private modalRef: any;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

  }

  buscarActivos() {
    this.buscando = true;
    this.listadoActivos = undefined;
    this.vulnerabilidadesService.obtenerActivos(this.ipsForm.controls['valor'].value ).subscribe(
      (data: any) => {
        this.listadoActivos = data;
        if (this.listadoActivos?.length == 0) {
          this.busqueda = 2;
          this.listadoActivos = undefined;
        }
        this.buscando = false;
      }, () => {
        this.buscando = false;
        this.busqueda = 2;
      }
    );
  }

  abrirModal() {
    this.modalRef = this.modalService.open(this.modalInformacion, {
      size: "md",
      hideCloseButton: false,
      centered: true,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop"
    });
  }

  get f(){
    return this.ipsForm.controls;
  }

  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  // ----------------------------Validation functions ------------------------------
  incorrectFormat(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (this.ipsForm != null) {
        if (control.value != undefined) {
          let numeros = control.value.split(/[-.]+/);
          let error = false;
          numeros.forEach((num: string) =>
            {
              try {
                if (parseInt(num) > 255) {
                  error = true;
                }
              } catch {}
            }
          );


          if (control.value.match(/[-]/)) {
            try {
              if (parseInt(numeros[numeros.length -2]) >= parseInt(numeros[numeros.length -1])) {
                error = true;
              }
            } catch {}
          }
          if (!error) {
            return null;
          }
        } else {
          return null;
        }
      }
      return {'incorrectFormat': {value: control.value}};
    };
  }
}
