using System.Collections.Generic;

namespace BackVulnerabilidades.Models
{
    public class Dispositivo
    {
        /// <summary>
        /// Estado (1_-> UP, 0 -> DOWN)
        /// </summary>
        /// <example>1</example>
        public bool Encendido { get; set; }

        /// <summary>
        /// Nombre (Hostname)
        /// </summary>
        /// <example>Galaxy-S9.home</example>
        public string Nombre { get; set; }

        /// <summary>
        /// Direccion Ip
        /// </summary>
        /// <example>192.168.1.127</example>
        public string DirIp { get; set; }

        /// <summary>
        /// Direccion Mac
        /// </summary>
        /// <example>48:8D:36:E9:09:76</example>
        public string DirMac { get; set; }

        /// <summary>
        /// Fabricante
        /// </summary>
        /// <example>Samsung Electro-mechanics(thailand)</example>
        public string Fabricante { get; set; }

        /// <summary>
        /// Listado de puertos
        /// </summary>
        public List<DatosPuerto> Puertos { get; set; }

        /// <summary>
        /// Sistema Operativo corriendo
        /// </summary>
        /// <example>Samsung Electro-mechanics(thailand)</example>
        public string CorriendoSO { get; set; }

        /// <summary>
        /// CPE del Sitema Operativo
        /// </summary>
        /// <example>Linux 2.6.X|3.X</example>
        public string CpeSO { get; set; }

        /// <summary>
        /// Detalles del Sistema Operativo
        /// </summary>
        /// <example>Linux 2.6.32 - 3.13</example>
        public string DetallesSO { get; set; }

        /// <summary>
        /// Numero de pasos al que se encuentra el dispositvo
        /// </summary>
        /// <example>2 pasos</example>
        public string Distancia { get; set; }
    }

    public class ListaDispositivos
    {
        /// <summary>
        /// Listado de dispositivos
        /// </summary>
        /// <example>Samsung Electro-mechanics(thailand)</example>
        public List<Dispositivo> Dispositivos { get; set; }
    }
}
