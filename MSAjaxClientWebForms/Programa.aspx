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
                    <asp:RequiredFieldValidator ControlToValidate="txtNombre" ID="reqValNombre" runat="server" ErrorMessage="*" ForeColor="red"></asp:RequiredFieldValidator>
                    
                </div>
                <div class="col-md-6" >
                    Siglas: <asp:TextBox ID="txtSiglas" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ControlToValidate="txtSiglas" ID="reqValSigla" runat="server" ErrorMessage="*" ForeColor="red" ></asp:RequiredFieldValidator>
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
                        
                    </div>
                </fieldset>
                
            </div>


        </div>
        <asp:Button ID="btnGuardar"  OnClick="btnGuardar_Click"  runat="server" Text="Guardar" />

    
    </div>
        <script>
            function pageLoad() {

                var service = {
                    holaMundo: MSAjaxClientWebForms.WS.ProgramaWs.HelloWorld,
                    institucionPorPais: MSAjaxClientWebForms.WS.ProgramaWs.insttitucionePorPais,
                    institucionPorOrganismo: MSAjaxClientWebForms.WS.ProgramaWs.institucionesPorOrganismo,
                    validarNombre: MSAjaxClientWebForms.WS.ProgramaWs.validarNombre
                    
                }
                var paginaControls = {
                    chkAsociarW:"chkAsociar",
                    comboConvenioW:'<%=ddlTipo.ClientID%>',
                    comboPaisW: '<%=paisCombo.ClientID%>',
                    comboOrganismoW: "<%=orgsCombo.ClientID%>",
                    comboInstitucion: "instCombo",
                    btnGuardar: '<%= btnGuardar.ClientID%>',
                    txtNombre:'<%= txtNombre.ClientID%>'
                    
                }
                ProgramaApp.inicializar(paginaControls,service);
                
            }
            
        </script>
    </form>
</body>
</html>
