namespace BackVulnerabilidades.Models
{
    public class DatosPuerto
    {
        /// <summary>
        /// Puerto
        /// </summary>
        /// <example>21</example>
        public int Puerto { get; set; }

        /// <summary>
        /// Indica si es Tcp (en caso de ser false es UDP)
        /// </summary>
        /// <example>true</example>
        public bool Tcp { get; set; }

        /// <summary>
        /// Estado
        /// </summary>
        /// <example>Abierto</example>
        public string Estado { get; set; }

        /// <summary>
        /// Servicio
        /// </summary>
        /// <example>ftp-data</example>
        public string Servicio { get; set; }
    }
}
