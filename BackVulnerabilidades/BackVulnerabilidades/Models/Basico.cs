using System.ComponentModel.DataAnnotations;
using static BackVulnerabilidades.Validadores.Validador;

namespace BackVulnerabilidades.Models
{
    public class Texto
    {
        /// <summary>
        /// Datos en formato de texto
        /// </summary>
        /// <example>192.168.1.1-127</example>
        [Required()]
        [RegularExpression(@"(10.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}([\-][0-9]{1,3})?|192.168.[0-9]{1,3}.[0-9]{1,3}([\-][0-9]{1,3})?|172.((16|17|18|30|31)|(2[0-9]{1})){1}.[0-9]{1,3}.[0-9]{1,3}([\-][0-9]{1,3})?){1}")]
        [MaxValue255()]
        public string Valor { get; set; }
    }
}
