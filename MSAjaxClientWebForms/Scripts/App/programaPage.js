/// <reference path="../jquery-3.1.1.js" />
/// <reference path="../Helpers/Helpers.js" />
/// <reference name="MicrosoftAjax.js"/>

ProgramaApp = (function () {

    
    var chkAsociar = null;
    var comboConvenio = null;
    var comboPais = null;
    var comboOrganismo = null;
    var comboInst = null;
    var webService = null;
    var btnGuardar = null;
    var txtNombre = null;
    var btnBuscar = null;
    var divGrid = null;
    
    var seetingsTabla={
        setEncabezado:function (enc) {
            this.encabezado = enc;
        },
       
        getEncabezado: function () {
            return this.encabezado;
        },
       
         
        reset: function () {
            this.encabezado = null;
           
        }
    }
    
    var convenioObserver = {
       
        reset: function () {
            this.servicio = null;
            this.idInstitucion = null;
            this.OrgPais = null;
        },
        setService:function (servicio) {
            this.servicio=servicio;
        },
        setIdInstitucion:function (idInst) {
            this.idInstitucion = idInst;
        },
        setPaisOrg:function (OraPaisId) {
            this.OrgPais = OraPaisId;
        },
       
        ejecutar: function () {

            getConvenio(this.servicio, this.OrgPais, this.idInstitucion);
        }
    }
    

    function crearTablaConvenios(lista) {

        var sb = new Sys.StringBuilder();
        Helper.limpiarHtml(divGrid);
        crearEncabezado(sb)
        crearCuerpo(lista,sb)
        craerFooter(sb);
        Helper.setHtml(divGrid, sb);


    }

    function crearEncabezado( stringBuilder) {
        
        stringBuilder.append("<table><tr><th>"+seetingsTabla.getEncabezado()+"</th><th>Expediente</th></tr>");
      
    }

    function crearCuerpo(lista, stringBuilder) {
      
        
        $.each(lista, function (index,value) {
            stringBuilder.append("<tr><td>" + getValor(value)+ "</td><td>" + value.nroExpediente + "</td><td><input type='radio' name='rbtnConvenio'  value='" + value.idConvenio + "'/></td></tr>");
        })
    }

    function getValor(value) {

        
        if (value.pais == null)  {
            return value.organismo;
        }
        return value.pais;
        
    }
    function craerFooter(stringBuilder) {
        stringBuilder.append("</table>");
    }

    function getConvenio(servicio,orgPais,idInsti) {

        if (idInsti > 0) {
            servicio(orgPais, idInsti, function (resultado) {

                Sys.Debug.traceDump(resultado);
                crearTablaConvenios(resultado);


            }, function () { alert("error"); });
        }
    }


    function getInstitucion(servicio, id) {


        Helper.refrescarComboDefault(comboInst);
        if (id > 0) {
            servicio(id, function (resultado) {
                Helper.cargarCombo(comboInst, resultado);

                //Helper.deshabilitarElemento(comboInst, false);

                //Helper.deshabilitarElemento(btnBuscar, false);
            }, function () { alert("error") });
        }
       

    }

    

    


    function manejarDependenciaDeCombos(comboADesahabilitar,refrescar) {
        Helper.refrescarComboDefault(comboADesahabilitar);
        notificarCombos(comboADesahabilitar, refrescar);

        habilitarDesahiblitarComboInstitucion(!refrescar);
        habilitarDeshabilitarBtnBuscar(!refrescar);
    }
    

    function notificarObserver(servicio, pasiOrg) {

        convenioObserver.reset();
        convenioObserver.setService(servicio);
        convenioObserver.setPaisOrg(pasiOrg);
    }

    function  notificarSettingsTable(encabezado) {
        seetingsTabla.reset();
        seetingsTabla.setEncabezado(encabezado);
    }
    
    function notificarCombos(combo,habilita) {
        Helper.deshabilitarElemento(combo, habilita);
    }

   
    function desHabilitarListaCombos(listaCombos, habilitar) {

        listaCombos.forEach(function (item) {
            Helper.deshabilitarElemento(item, habilitar);
        })

        
    }
    function refrescarListaCombos(listaCombos) {
        listaCombos.forEach(function (item) {
            Helper.refrescarComboDefault(item);
        })
    }

    function habilitarDeshabilitarBtnBuscar(deshabilita) {
        Helper.deshabilitarElemento(btnBuscar, deshabilita)
    }

    function habilitarDesahiblitarComboInstitucion(deshabilita) {
        Helper.deshabilitarElemento(comboInst,deshabilita)
    }
    function asociarLogica() {


      
        $(btnBuscar.getJQId()).click(function () {

            convenioObserver.ejecutar();
        });
        




        $(comboInst.getJQId()).change(function () {
            var idInstitucion = parseInt($(this).val());
            if (idInstitucion > 0) {
                convenioObserver.setIdInstitucion(idInstitucion);
            }
        })


        $(txtNombre.getJQId()).blur(function () {

            var nombreConvenio = $(this).val();
            Helper.deshabilitarElemento(btnGuardar, true);
            webService.validarNombre(nombreConvenio, function (resultado) {
               
                if (!resultado) {
                    Helper.deshabilitarElemento(btnGuardar, false);
                    
                }
                else {
                    alert("el nombre ya existe");
                }
            },
            
            function () {
                alert("error");
            });
        });
        $(chkAsociar.getJQId()).click(function () {
         
           
            var listaCombos = [comboConvenio, comboOrganismo, comboPais];
            if ($(this).prop("checked")) {

               
                desHabilitarListaCombos(listaCombos, false);
            }
            else {
                
                
                listaCombos.push(comboInst);
                desHabilitarListaCombos(listaCombos, true);

                Helper.deshabilitarElemento(btnBuscar, true);
                refrescarListaCombos(listaCombos);
                Helper.limpiarHtml(divGrid);
            }

           

        });
        $(comboPais.getJQId()).change(function () {
           
            var idPais = parseInt($(this).val());
            
           
            getInstitucion(webService.institucionPorPais,idPais)

            
            manejarDependenciaDeCombos(comboOrganismo, idPais > 0);
           
            //convenioObserver.reset();
            //convenioObserver.setService(webService.conveniosPorPais);
            //convenioObserver.setPaisOrg(idPais);
           

            //seetingsTabla.reset();
            //seetingsTabla.setEncabezado("Pais");


            notificarObserver(webService.conveniosPorPais, idPais);

            notificarSettingsTable("Pais");
           
        });




        $(comboOrganismo.getJQId()).change(function () {
            var idORganismo = parseInt($(this).val());
            //obtnerInstitucion(obtenerInstitucionPorOrganismo, idORganismo);
            getInstitucion(webService.institucionPorOrganismo,idORganismo)
            //Helper.refrescarComboDefault(comboPais)
            //notificarCombos(comboPais,idORganismo > 0);
            manejarDependenciaDeCombos(comboPais, idORganismo > 0);

            //convenioObserver.reset();
            //convenioObserver.setService(webService.conveniosPorOrganismo);
            //convenioObserver.setPaisOrg(idORganismo);

            notificarObserver(webService.conveniosPorOrganismo, idORganismo);

            notificarSettingsTable("Organismo");

            //seetingsTabla.reset();
            //seetingsTabla.setEncabezado("Organismo");
        });
    }
    return {
        inicializar: function (paginaControls,service) {
            
          
            chkAsociar = Helper.crearWidget(paginaControls.chkAsociarW);
            comboConvenio = Helper.crearWidget(paginaControls.comboConvenioW);
            comboOrganismo = Helper.crearWidget(paginaControls.comboOrganismoW);
            comboPais = Helper.crearWidget(paginaControls.comboPaisW);
            comboInst = Helper.crearWidget(paginaControls.comboInstitucion);
            btnGuardar = Helper.crearWidget(paginaControls.btnGuardar);
            txtNombre = Helper.crearWidget(paginaControls.txtNombre);
            btnBuscar = Helper.crearWidget(paginaControls.btnBuscar);
            divGrid = Helper.crearWidget(paginaControls.divGrid);
            webService = service;
            

            //Sys.Debug.traceDump(chkAsociar);
            asociarLogica();
        }
        
    }


})()