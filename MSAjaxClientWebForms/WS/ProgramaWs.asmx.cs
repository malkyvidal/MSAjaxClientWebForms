using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using MSAjaxClientWebForms.Models;

namespace MSAjaxClientWebForms.WS
{
    /// <summary>
    /// Descripción breve de ProgramaWs
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class ProgramaWs : System.Web.Services.WebService
    {

        public enum tipoAsiciacion{
            pais,
            organismo
        }


        [WebMethod]
        public string HelloWorld()
        {
            return "Hola a todos los piolas!";
        }


         [WebMethod]
        public List<ComboView> paises()
        {
            List<Pais> paises = paisesStub();
            List<ComboView> listaCombos = AdapterEntityToComboView.adaptarListaDos(paises);
            return listaCombos;

            
        }


        [WebMethod]
         public List<ComboView> insttitucionePorPais(int idPais)
         {
             return AdapterEntityToComboView.adaptarLista<Institucion>(institucionesStub(), "IdInstitucion", "NombreInstitucion");
         }






        [WebMethod]
        public List<AsociacionConvenio> conveniosPorPais(int idPais, int idIntitucion)
        {
            return convenios(tipoAsiciacion.pais);
        }


        [WebMethod]
        public List<AsociacionConvenio> conveniosPorOrganismo(int idOrg, int idInstitucion)
        {
            return convenios(tipoAsiciacion.organismo);
        }

        private List<AsociacionConvenio> convenios(tipoAsiciacion tipo)
        {
            List<AsociacionConvenio> lista = new List<AsociacionConvenio>();
            if (tipo==tipoAsiciacion.pais)
            {
                lista.Add(new AsociacionConvenio { pais = "unPais", idConvenio = 1, nroExpediente = "A235" });
                lista.Add(new AsociacionConvenio { pais = "otroPais", idConvenio = 2, nroExpediente = "A2t5" });
                lista.Add(new AsociacionConvenio { pais = "otroMAsPais", idConvenio = 3, nroExpediente = "Aw35" });
            }
            if (tipo==tipoAsiciacion.organismo)
            {
                lista.Add(new AsociacionConvenio { organismo="unOrganismo", idConvenio = 1, nroExpediente = "AP235" });
                lista.Add(new AsociacionConvenio { organismo = "otroOrganismo", idConvenio = 2, nroExpediente = "O235" });
                lista.Add(new AsociacionConvenio { organismo = "nuevoOrganismo", idConvenio = 3, nroExpediente = "B235" });
            }
            return lista;
        }

        [WebMethod]
        public Boolean validarNombre(string nombreConvenio)
        {
           return  String.Equals(nombreConvenio, "pepeConvenio", StringComparison.OrdinalIgnoreCase);
        }

        [WebMethod]
        public List<ComboView> institucionesPorOrganismo(int idOrganismo)
        {
            return AdapterEntityToComboView.adaptarLista<Institucion>(institucionesPorOrganismoStub(), "IdInstitucion", "NombreInstitucion");
        }


        private List<Institucion> institucionesPorOrganismoStub()
        {
            return new List<Institucion>{
                 new Institucion{
                     IdInstitucion=1,
                     NombreInstitucion="InstitutoOrganismo1"
                 },
                  new Institucion{
                     IdInstitucion=2,
                     NombreInstitucion="InstitutoOrganismo2"
                 }
             };
        }
         private List<Institucion> institucionesStub()
         {
             return new List<Institucion>{
                 new Institucion{
                     IdInstitucion=1,
                     NombreInstitucion="Instituto1"
                 },
                  new Institucion{
                     IdInstitucion=2,
                     NombreInstitucion="Instituto2"
                 }
             };
         }

     
        private List<Pais> paisesStub()
        {
            return new List<Pais>() {
                
                new Pais{IdPais=1,NombrePais="Argentina"},
                new Pais{IdPais=2,NombrePais="Brazil"},
                new Pais{IdPais=3,NombrePais="China"}
            };
        }
        
    }
}
