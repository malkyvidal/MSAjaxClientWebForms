using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MSAjaxClientWebForms.Models;



namespace MSAjaxClientWebForms
{
    public partial class Programa : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                inicializar();
            }
        }


        private void inicializar()
        {
            cargarComboConvenio();
            cargarOrganismos();
            cargarPaises();
        }
        private void cargarComboConvenio()
        {
            ddlTipo.Items.Add(new ListItem { Value = "0", Text = "Seleccione" });
            ddlTipo.Items.Add(new ListItem { Value = "1", Text = "Marco" });
            ddlTipo.Items.Add(new ListItem { Value = "2", Text = "Marco2" });
            ddlTipo.Items.Add(new ListItem { Value = "3", Text = "Marco3" });

        }
        private void cargarPaises()
        {
            paisCombo.Items.Add(new ListItem { Value = "0", Text = "Seleccione" });
            paisCombo.Items.Add(new ListItem { Value = "1", Text = "Argentina" });
            paisCombo.Items.Add(new ListItem { Value = "2", Text = "Brasil" });
            paisCombo.Items.Add(new ListItem { Value = "3", Text = "China" });
        }
        private void cargarOrganismos()
        {
            orgsCombo.Items.Add(new ListItem { Value = "0", Text = "Seleccione" });
            orgsCombo.Items.Add(new ListItem { Value = "1", Text = "OrganismoUno" });
            orgsCombo.Items.Add(new ListItem { Value = "2", Text = "OrganismoDos" });

        }

        protected void btnGuardar_Click(object sender, EventArgs e)
        {
            var con = Request.Form["rbtnConvenio"];

            Response.Write(con);
        }
    }
}