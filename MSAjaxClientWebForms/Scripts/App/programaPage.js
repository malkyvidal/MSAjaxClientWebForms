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
    
    

    

    function getInstitucion(servicio, id) {


        Helper.refrescarComboDefault(comboInst, id > 0);
        if (id > 0) {
            servicio(id, function (resultado) {
                Helper.cargarCombo(comboInst, resultado);

                Helper.deshabilitarElemento(comboInst, false);


            }, function () { alert("error") });
        }
       

    }

    

    


    function manejarDependenciaDeCombos(comboADesahabilitar,refrescar) {
        Helper.refrescarComboDefault(comboADesahabilitar);
        notificarCombos(comboADesahabilitar, refrescar);
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
    
    function asociarLogica() {


      
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

                refrescarListaCombos(listaCombos);
            }

           

        });
        $(comboPais.getJQId()).change(function () {
           
            var idPais = parseInt($(this).val());
            
           
            getInstitucion(webService.institucionPorPais,idPais)

            
            manejarDependenciaDeCombos(comboOrganismo, idPais > 0);
            

           
        });

        $(comboOrganismo.getJQId()).change(function () {
            var idORganismo = parseInt($(this).val());
            //obtnerInstitucion(obtenerInstitucionPorOrganismo, idORganismo);
            getInstitucion(webService.institucionPorOrganismo,idORganismo)
            //Helper.refrescarComboDefault(comboPais)
            //notificarCombos(comboPais,idORganismo > 0);
            manejarDependenciaDeCombos(comboPais, idORganismo > 0);


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
            webService = service;

            //Sys.Debug.traceDump(chkAsociar);
            asociarLogica();
        }
        
    }


})()