using BackVulnerabilidades.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;

namespace BackVulnerabilidades.Controllers
{    
    /// <summary>
    /// Endpoints para obtener información de las vulnerabilidades
    /// </summary> 
    [Route("api")]
    public class VulnerabilidadesController : Controller
    {
        /// <summary>
        /// Obtener listado de activos en la red
        /// </summary>
        [HttpPost("[action]", Name = "Obtener listado de activos en la red")]
        [SwaggerResponse(200, "Devuelve una lista con los activos en la red", typeof(List<Dispositivo>))]
        [SwaggerResponse(400, "Error con los datos de introducidos.")]
        [SwaggerResponse(500, "Error interno del servidor.")]
        public ActionResult ObtenerActivos([FromBody] Texto request)
        {
            if (ModelState.IsValid)
            {

                var cmdsi = new ProcessStartInfo("C:\\Program Files (x86)\\Nmap\\nmap.exe");
                cmdsi.Arguments = "-sn " + request.Valor;
                cmdsi.RedirectStandardOutput = true;
                cmdsi.UseShellExecute = false;
                var cmd = Process.Start(cmdsi);
                var output = cmd.StandardOutput.ReadToEnd();

                cmd.WaitForExit();


                string[] outputs = output.Split("\r\n");
                List<string> salidas = outputs.OfType<string>().ToList();
                if (salidas.Count < 4)
                {
                    return Ok(new List<Dispositivo>());
                }

                salidas.RemoveRange(0, 1);
                salidas.RemoveRange(salidas.Count - 2, 2);

                List<Dispositivo> dispositivos = new List<Dispositivo>();
                for (int i = 0; i <= salidas.Count / 3; i++)
                {
                    string nombre = null;
                    string ip;
                    salidas[i * 3] = salidas[i * 3].Replace("Nmap scan report for ", "");
                    string[] nombreIp = salidas[i * 3].Split(" ");
                    if (nombreIp.Length == 1)
                    {
                        ip = nombreIp[0].Replace("(", "").Replace(")", "");
                    }
                    else
                    {
                        nombre = nombreIp[0];
                        ip = nombreIp[1].Replace("(", "").Replace(")", "");
                    }

                    if (nombre == null || nombre == "")
                    {
                        nombre = "Desconocido";
                    }

                    bool encendido = false;
                    if (salidas[i * 3 + 1].Contains("up"))
                    {
                        encendido = true;
                    }

                    string dirMac = null;
                    string fabricante = null;
                    if (i != salidas.Count / 3)
                    {
                        salidas[i * 3 + 2] = salidas[i * 3 + 2].Replace("MAC Address: ", "");
                        string[] dirMacFabricante = salidas[i * 3 + 2].Split(" ");
                        dirMac = dirMacFabricante[0];
                        fabricante = dirMacFabricante[1].Replace("(", "").Replace(")", "");
                    }
                    if (fabricante == "Unknown" || fabricante == "" || fabricante == null)
                    {
                        fabricante = "Desconocido";
                    }


                    dispositivos.Add(
                        new Dispositivo()
                        {
                            Nombre = nombre,
                            DirIp = ip,
                            Encendido = encendido,
                            DirMac = dirMac,
                            Fabricante = fabricante
                        }
                    );
                }

                return Ok(dispositivos);
            } else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Obtener listado de puertos abiertos en uno/varios dispositivos
        /// </summary>
        [HttpPost("[action]", Name = "Obtener listado de puertos abiertos en uno/varios dispositivos")]
        [SwaggerResponse(200, "Devuelve una lista con los puertos abiertos en uno/varios dispositivos", typeof(List<Dispositivo>))]
        [SwaggerResponse(400, "Error con los datos de introducidos.")]
        [SwaggerResponse(500, "Error interno del servidor.")]
        public ActionResult ObtenerPuertosAbiertos([FromBody] Texto request)
        {
            string puertoscomunes = "20,21,22,23,25,53,80,110,119,123,143,161,194,443,445,465,631,902,912,7070,993,995,1433,1434,3389,5357,8080";
            var cmdsi = new ProcessStartInfo("C:\\Program Files (x86)\\Nmap\\nmap.exe");
            cmdsi.Arguments = "-p" + puertoscomunes + " " + request.Valor;
            cmdsi.RedirectStandardOutput = true;
            cmdsi.UseShellExecute = false;
            var cmd = Process.Start(cmdsi);
            var output = cmd.StandardOutput.ReadToEnd();
            cmd.WaitForExit();

            List<Dispositivo> listaPuertosPorDispositivo = new List<Dispositivo>();
            string[] outputs = output.Split("Nmap scan report for ");
            List<string> salidas = outputs.OfType<string>().ToList();
            salidas.RemoveRange(0, 1);
            for (int i = 0; i < salidas.Count; i++)
            {
                string[] lineas = salidas[i].Split("\r\n");
                List<string> listaLineas = lineas.OfType<string>().ToList();

                // Nombre e IP del dispositivo
                string nombre = null;
                string ip;
                listaLineas[0] = listaLineas[0].Replace("Nmap scan report for ", "");
                string[] nombreIp = listaLineas[0].Split(" ");
                if (nombreIp.Length == 1)
                {
                    ip = nombreIp[0].Replace("(", "").Replace(")", "");
                }
                else
                {
                    nombre = nombreIp[0];
                    ip = nombreIp[1].Replace("(", "").Replace(")", "");
                }

                bool encendido = false;
                if (listaLineas[1].Contains("up"))
                {
                    encendido = true;
                }

                // Lineas 2 y 3 no me sirven
                List<DatosPuerto> puertos = new List<DatosPuerto>();
                int j = 4;
                bool continuar = true;
                while (continuar)
                {
                    if (listaLineas[j].Trim() == "" || listaLineas[j].Contains("MAC Address"))
                    {
                        continuar = false;
                    } else
                    {
                        string[] columnas = Regex.Split(listaLineas[j], @"\s+");
                        int puerto = Convert.ToInt32(columnas[0].Split("/")[0]);
                        bool tcp = columnas[0].Split("/")[1] == "tcp";

                        string estado = "Abierto";
                        switch (columnas[1])
                        {
                            case "closed":
                                estado = "Cerrado";
                                break;

                            case "filtered":
                                estado = "Filtrado";
                                break;

                            case "unfiltered":
                                estado = "Sin filtrar";
                                break;

                            case "open/filtered":
                                estado = "Abierto/Filtrado";
                                break;

                            case "closed/filtered":
                                estado = "Cerrado/Filtrado";
                                break;
                        }

                        string servicio = columnas[2];
                        puertos.Add(new DatosPuerto() { Puerto = puerto, Tcp = tcp, Estado = estado, Servicio = servicio });

                        j++;
                    }
                }

                string dirMac = null;
                string fabricante = null;
                if (listaLineas[j].Contains("MAC Address"))
                {
                    listaLineas[j] = listaLineas[j].Replace("MAC Address: ", "");
                    string[] dirMacFabricante = listaLineas[j].Split(" ");
                    dirMac = dirMacFabricante[0];
                    fabricante = dirMacFabricante[1].Replace("(", "").Replace(")", "");
                }

                listaPuertosPorDispositivo.Add(
                    new Dispositivo()
                    {
                        Nombre = nombre,
                        DirIp = ip, 
                        Encendido = encendido, 
                        Puertos = puertos,
                        DirMac = dirMac,
                        Fabricante = fabricante
                    }
                );
            }

            return Ok(listaPuertosPorDispositivo);
        }

        /// <summary>
        /// Obtener listado de sistemas operativos
        /// </summary>
        [HttpPost("[action]", Name = "Obtener listado de sistemas operativos en uno/varios dispositivos")]
        [SwaggerResponse(200, "Devuelve una lista con los sistemas operativos abiertos en uno/varios dispositivos", typeof(List<Dispositivo>))]
        [SwaggerResponse(400, "Error con los datos de introducidos.")]
        [SwaggerResponse(500, "Error interno del servidor.")]
        public ActionResult ObtenerSistemasOperativos([FromBody] Texto request)
        {
            string puertoscomunes = "20,21,22,23,25,53,80,110,119,123,143,161,194,443,465,631,993,995,1433,1434,3389,8080";
            var cmdsi = new ProcessStartInfo("C:\\Program Files (x86)\\Nmap\\nmap.exe");
            cmdsi.Arguments = "-p" + puertoscomunes + " -O " + request.Valor;
            cmdsi.RedirectStandardOutput = true;
            cmdsi.UseShellExecute = false;
            var cmd = Process.Start(cmdsi);
            var output = cmd.StandardOutput.ReadToEnd();
            cmd.WaitForExit();

            List<Dispositivo> listaSistemasOperativosPorDispositivo = new List<Dispositivo>();
            string[] outputs = output.Split("Nmap scan report for ");
            List<string> salidas = outputs.OfType<string>().ToList();
            salidas.RemoveRange(0, 1);
            for (int i = 0; i < salidas.Count; i++)
            {
                string[] lineas = salidas[i].Split("\r\n");
                List<string> listaLineas = lineas.OfType<string>().ToList();

                // Nombre e IP del dispositivo
                string nombre = null;
                string ip;
                string[] nombreIp = listaLineas[0].Split(" ");
                if (nombreIp.Length == 1)
                {
                    ip = nombreIp[0].Replace("(", "").Replace(")", "");
                }
                else
                {
                    nombre = nombreIp[0];
                    ip = nombreIp[1].Replace("(", "").Replace(")", "");
                }

                bool encendido = false;
                if (listaLineas[1].Contains("up"))
                {
                    encendido = true;
                }

                // Lineas 2 y 3 no me sirven
                List<DatosPuerto> puertos = new List<DatosPuerto>();
                string dirMac = null;
                string fabricante = null;
                string CorriendoSO = "Desconocido";
                string CpeSO = "Desconocido";
                string detallesSO = "Desconocido";
                string Distancia = "Desconocida";

                if (listaLineas[2].Trim() == "")
                {
                    int j = 4;
                    bool continuar = true;
                    while (continuar)
                    {
                        if (listaLineas[j].Trim() == "" || Regex.Split(listaLineas[j], @"\s+").Length != 3)
                        {
                            continuar = false;
                        }
                        else
                        {
                            string[] columnas = Regex.Split(listaLineas[j], @"\s+");
                            int puerto = Convert.ToInt32(columnas[0].Split("/")[0]);
                            bool tcp = columnas[0].Split("/")[1] == "tcp";

                            string estado = "Abierto";
                            switch (columnas[1])
                            {
                                case "closed":
                                    estado = "Cerrado";
                                    break;

                                case "filtered":
                                    estado = "Filtrado";
                                    break;

                                case "unfiltered":
                                    estado = "Sin filtrar";
                                    break;

                                case "open/filtered":
                                    estado = "Abierto/Filtrado";
                                    break;

                                case "closed/filtered":
                                    estado = "Cerrado/Filtrado";
                                    break;
                            }

                            string servicio = columnas[2];
                            puertos.Add(new DatosPuerto() { Puerto = puerto, Tcp = tcp, Estado = estado, Servicio = servicio });

                            j++;
                        }
                    }
                }

                listaLineas.ForEach(
                    linea =>
                    {
                        if (linea.Contains("MAC Address:"))
                        {
                            linea = linea.Replace("MAC Address: ", "");
                            string[] dirMacFabricante = linea.Split(" ");
                            dirMac = dirMacFabricante[0];
                            fabricante = dirMacFabricante[1].Replace("(", "").Replace(")", "");
                        }

                        if (linea.Contains("Running:"))
                        {
                            CorriendoSO = linea.Replace("Running: ", "");
                        }

                        if (linea.Contains("OS CPE: "))
                        {
                            CpeSO = linea.Replace("OS CPE: ", "");
                        }

                        if (linea.Contains("OS details: "))
                        {
                            detallesSO = linea.Replace("OS details:  ", "");
                        }

                        if (linea.Contains("Network Distance: "))
                        {
                            Distancia = linea.Replace("Network Distance: ", "").Replace("hop", "");
                            if (Distancia == "1")
                            {
                                Distancia += " paso";
                            } else
                            {
                                Distancia += " pasos";
                            }
                        }
                    }
                );

                listaSistemasOperativosPorDispositivo.Add(
                    new Dispositivo()
                    {
                        Nombre = nombre,
                        DirIp = ip,
                        Encendido = encendido,
                        Puertos = puertos,
                        DirMac = dirMac,
                        Fabricante = fabricante,
                        CorriendoSO = CorriendoSO,
                        CpeSO = CpeSO,
                        DetallesSO = detallesSO,
                        Distancia = Distancia
                    }
                );
            }

            return Ok(listaSistemasOperativosPorDispositivo);
        }
    }
}
