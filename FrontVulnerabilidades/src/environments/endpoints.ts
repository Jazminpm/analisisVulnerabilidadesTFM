export const endpoints = {
  // Autentificación endpoints
  iniciarSesion: `/IniciarSesion`,
  validarToken: `/ValidarToken`,
  refrescarToken: `/RefrescarToken`,
  datosBasicos: `/DatosBasicos`,
  enviarClaveEmail: `/EnviarClaveEmail`,
  validarUrlClave: `/ValidarUrlClave`,
  renovarClave: `/RenovarClave`,
  obtenerPerfiles:  `/ObtenerPerfiles`,
  cambiarPerfil:  `/CambiarPerfil`,

  // Administrador endpoints
  obtenerMayoristas: `/ObtenerMayoristas`,
  crearMayorista: `/CrearMayorista`,
  obtenerMayorista: `/ObtenerMayorista`,
  modificarMayoristaAdministrador: `/ModificarMayoristaAdministrador`,
  modificarClaveMayorista: `/ModificarClaveMayorista`,
  obtenerCompradores: `/ObtenerCompradores`,
  crearComprador: `/CrearComprador`,
  obtenerComprador: `/ObtenerComprador`,
  obtenerCompradoresPruebas: `/ObtenerCompradoresPruebas`,
  modificarCompradorAdministrador: `/ModificarCompradorAdministrador`,
  pasarCompradorProduccion: `/PasarCompradorProduccion`,
  modificarClaveComprador: `/ModificarClaveComprador`,
  obtenerFirmas: `/ObtenerFirmas`,
  crearFirma: `/CrearFirma`,
  correoElectronicoBienvenida: `/CorreoElectronicoBienvenida`,
  cargarDiasFestivos: `/CargarDiasFestivos`,
  obtenerFestivos: `/obtenerFestivos`,
  insertarFestivo: `/InsertarFestivo`,
  eliminarFestivo: `/EliminarFestivo`,
  darBajaMayorista: `/DarBajaMayorista`,
  darBajaComprador: `/DarBajaComprador`,
  crearFirmasCompradorMayoristas: `/CrearFirmasCompradorMayoristas`,

  // Mayoristas endpoints
  subirRemesa: `/SubirRemesa`,
  perfilMayorista: `/PerfilMayorista`,
  modificarMayorista: `/ModificarMayorista`,
  obtenerRemesas: `/ObtenerRemesas`,
  obtenerPaises: `/ObtenerPaises`,
  obtenerNovedadesCompradores: `/ObtenerNovedadesCompradores`,
  obtenerNovedadesFirmas: `/ObtenerNovedadesFirmas`,
  obtenerNovedadesProductos: `/ObtenerNovedadesProductos`,
  conformeFacturaDevuelta: `/ConformeFacturaDevuelta`,
  noConformeFacturaDevuelta: `/NoConformeFacturaDevuelta`,
  obtenerFacturasPorComprador: `/ObtenerFacturasPorComprador`,
  obtenerFacturasDevueltasPorComprador: `/ObtenerFacturasDevueltasPorComprador`,
  obtenerRemesasPdf: `/ObtenerRemesasPdf`,
  obtenerRemesasCSV: `/ObtenerRemesasCSV`,
  obtenerFacturasMayoristaPDF: `/ObtenerFacturasMayoristaPDF`,
  obtenerFacturasMayoristaCSV: `/ObtenerFacturasMayoristaCSV`,
  obtenerDevolucionesMayoristaCSV: `/ObtenerDevolucionesMayoristaCSV`,
  obtenerDevolucionesMayoristaPDF: `/ObtenerDevolucionesMayoristaPDF`,
  obtenerCompradoresFirmadosPDF: `/ObtenerCompradoresFirmadosPDF`,
  obtenerCompradoresFirmadosCSV: `/ObtenerCompradoresFirmadosCSV`,
  obtenerCompradoresFirmadosExcel: `/ObtenerCompradoresFirmadosExcel`,
  obtenerProductosCSV: `/ObtenerProductosCSV`,
  obtenerProductosExcel: `/ObtenerProductosExcel`,
  revisarRemesa: `/RevisarRemesa`,
  quitarRevisarRemesa: `/QuitarRevisarRemesa`,
  revisarFacturaMayorista: `/RevisarFacturaMayorista`,

  // Compradores endpoints
  perfilComprador: `/PerfilComprador`,
  modificarComprador: `/ModificarComprador`,
  obtenerMotivosDevolucion: `/obtenerMotivosDevolucion`,
  obtenerFacturasModificables: `/ObtenerFacturasModificables`,
  devolverFactura: `/DevolverFactura`,
  deshacerDevolverFactura: `/DeshacerDevolverFactura`,
  obtenerFacturas: `/ObtenerFacturas`,
  obtenerFacturasDevueltasPorMayorista: `/ObtenerFacturasDevueltasPorMayorista`,
  obtenerMayoristasComprador: `/ObtenerMayoristasComprador`,
  obtenerProductos: `/ObtenerProductos`,
  obtenerFacturasPDF: `/ObtenerFacturasPDF`,
  obtenerFacturasListado: `/ObtenerFacturasListado`,
  obtenerFacturasCSV: `/obtenerFacturasCSV`,
  enviarCorreoFacturasPDF: `/EnviarCorreoFacturasPDF`,
  enviarCorreoFacturasCSV: `/EnviarCorreoFacturasCSV`,
  enviarCorreoFacturasListado: `/EnviarCorreoFacturasListado`,
  revisarFacturaComprador: `/RevisarFacturaComprador`,
  quitarRevisarFacturaComprador: `/QuitarRevisarFacturaComprador`,
  obtenerTotalesFacturasPorMayorista: `/ObtenerTotalesFacturasPorMayorista`,
  obtenerTotalesPorMayoristaPDF: `/ObtenerTotalesPorMayoristaPDF`,
  obtenerTotalesPorMayoristaCSV: `/ObtenerTotalesPorMayoristaCSV`,

  // Clave endpoints
  modificarClave: `/ModificarClave`,

  // Usuarios endpoints
  perfilUsuario: `/PerfilUsuario`,
  modificarUsuario: `/ModificarUsuario`,

  // Basicos endpoints
  versionMovil: `/VersionMovil`,
};

