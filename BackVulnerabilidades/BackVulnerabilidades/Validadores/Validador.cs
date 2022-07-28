using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

namespace BackVulnerabilidades.Validadores
{
    public class Validador
    {
        public class MaxValue255 : ValidationAttribute
        { 

            protected override ValidationResult IsValid(object valor, ValidationContext validationContext)
            {
                if (valor != null) {
                    Regex regex = new Regex("[-.]+");         // Split on hyphens.
                    string[] numeros = regex.Split(valor.ToString());

                    bool valido = true;
                    foreach (string numero in numeros)
                    {
                        try
                        {
                            if (Convert.ToInt32(numero) > 255)
                            {
                                valido = false;
                            }
                        } catch { }
                    }

                    if (valor.ToString().Contains('-'))
                    {
                        try
                        {
                            if (Convert.ToInt32(numeros[numeros.Length - 2]) >= Convert.ToInt32(numeros[numeros.Length - -1]))
                            {
                                valido = false;
                            }
                        }
                        catch { }
                    }

                    if (!valido)
                    {
                        return new ValidationResult(String.Format("Formato de la variable {0} no válido (>255)", validationContext.DisplayName)); 
                    }
                    
                }
                return ValidationResult.Success;
            }
        }
    }
}
