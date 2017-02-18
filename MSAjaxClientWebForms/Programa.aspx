<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Programa.aspx.cs" Inherits="MSAjaxClientWebForms.Programa" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Programa</title>
    <script src="Scripts/jquery-3.1.1.js"></script>
    <link href="Content/bootstrap.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
            <Services>
                <asp:ServiceReference Path="~/WS/ProgramaWs.asmx" />
            </Services>
            <Scripts>
                <asp:ScriptReference Path="~/Scripts/Helpers/Helpers.js" />
                <asp:ScriptReference Path="~/Scripts/App/programaPage.js" />
            </Scripts>
        </asp:ScriptManager>
        <div class="container" >
            <div class="row">
                <div class="col-md-6" >
                    Nombre: <asp:TextBox ID="txtNombre" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ControlToValidate="txtNombre" ID="reqValNombre" runat="server" ErrorMessage="Requerido" ForeColor="red"></asp:RequiredFieldValidator>
                    
                </div>
                <div class="col-md-6" >
                    Siglas: <asp:TextBox ID="txtSiglas" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ControlToValidate="txtSiglas" ID="reqValSigla" runat="server" ErrorMessage="REquerido" ForeColor="red" ></asp:RequiredFieldValidator>
                </div>

            </div>
            <div class="row">
                <fieldset>
                    <legend>Asociado a Convenio 
                        <input id="chkAsociar" type="checkbox"  />
                    </legend>
                    <div>
                        <label for="ddlTipo">Convenios</label>
                        <asp:DropDownList ID="ddlTipo" runat="server" Enabled="false" ></asp:DropDownList>
                        <label for="paisCombo">Pais</label>
                        <asp:DropDownList ID="paisCombo" Enabled="false"  runat="server"></asp:DropDownList>

                        
                        <label for="orgsCombo">Organizacion</label>
                        <asp:DropDownList ID="orgsCombo" Enabled="false"  runat="server"></asp:DropDownList>
                       
                        <label for="instCombo">Institucion</label>
                        <select disabled="disabled"  id="instCombo" name="instCombo">
                            <option value="0">
                                Seleccione
                            </option>
                        </select>

                        <input type="button" disabled="disabled"  value="buscar" name="btnBuscar" id="btnBuscar"/>
                        
                    </div>
                    <div id="grid">
          
        </div>
                </fieldset>
                
            </div>


        </div>
        <div>
            <asp:FileUpload ID="flUmarco" runat="server" />
            <asp:RequiredFieldValidator ID="reqValFluMarco" ControlToValidate="flUmarco" ForeColor="Red" runat="server" ErrorMessage="Requerido"></asp:RequiredFieldValidator>
            <asp:FileUpload ID="fluConvenio" runat="server" />
        </div>
        <div >
            <asp:Button CssClass="col-lg-offset-8" ID="btnGuardar"  OnClick="btnGuardar_Click"  runat="server" Text="Guardar" />
        </div>
        
        
    
    </div>
        <script>
            function pageLoad() {

                var service = {
                    holaMundo: MSAjaxClientWebForms.WS.ProgramaWs.HelloWorld,
                    institucionPorPais: MSAjaxClientWebForms.WS.ProgramaWs.insttitucionePorPais,
                    institucionPorOrganismo: MSAjaxClientWebForms.WS.ProgramaWs.institucionesPorOrganismo,
                    validarNombre: MSAjaxClientWebForms.WS.ProgramaWs.validarNombre,
                    conveniosPorPais: MSAjaxClientWebForms.WS.ProgramaWs.conveniosPorPais,
                    conveniosPorOrganismo: MSAjaxClientWebForms.WS.ProgramaWs.conveniosPorOrganismo
                    
                }
                var paginaControls = {
                    chkAsociarW:"chkAsociar",
                    comboConvenioW:'<%=ddlTipo.ClientID%>',
                    comboPaisW: '<%=paisCombo.ClientID%>',
                    comboOrganismoW: "<%=orgsCombo.ClientID%>",
                    comboInstitucion: "instCombo",
                    btnGuardar: '<%= btnGuardar.ClientID%>',
                    txtNombre: '<%= txtNombre.ClientID%>',
                    btnBuscar: "btnBuscar",
                    divGrid:"grid"
                    
                }
                ProgramaApp.inicializar(paginaControls,service);
                
            }
            
        </script>
    </form>
</body>
</html>
