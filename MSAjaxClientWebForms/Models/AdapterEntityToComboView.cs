using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;

namespace MSAjaxClientWebForms.Models
{
    public class AdapterEntityToComboView
    {
        public static ComboView adaptar<T>(T entidad,String dataValue,String dataText)
        {
            
            Type en = entidad.GetType();

            var valorPropiedad = en.GetProperty(dataValue);
            var textPropiedad = en.GetProperty(dataText);

           

            return new ComboView() { Valor = valorPropiedad.GetValue(entidad).ToString(), Texto = textPropiedad.GetValue(entidad).ToString() };

        }
        public static List<ComboView> adaptarLista<T>(List<T> entidades, String dataValue, String dataText)
        {
            List<ComboView> listaCombos = new List<ComboView>();

            entidades.ForEach((t) => listaCombos.Add(adaptar<T>(t, dataValue, dataText)));
            return listaCombos;
        }


        public static List<ComboView> adaptarListaDos(List<Pais> paises)
        {
            List<ComboView> listaCombos = new List<ComboView>();
            paises.ForEach((t) => listaCombos.Add(adaptarDos(t)));
            return listaCombos;
        }
        public static ComboView adaptarDos(Pais pais)
        {
            ComboView cw = new ComboView() { Valor = pais.IdPais.ToString(), Texto = pais.NombrePais };
            return cw;
        }
    }
}