import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Dispositivo} from "../../../interfaces/dispositivo";
import {VulnerabilidadesService} from "../../../servicios/vulnerabilidades/vulnerabilidades.service";
import {ModalManager} from "ngb-modal";


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

  @ViewChild('detallesActivo') modalInformacion: any;
  private modalRef: any;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.vulnerabilidadesService.obtenerActivos().subscribe(
      (data: any) => {
        this.listadoActivos = data;
      }
    )
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

  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
  }
}
