﻿using System;
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
