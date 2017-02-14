/// <reference path="../jquery-3.1.1.js" />

/// <reference name="MicrosoftAjax.js"/>
var Helper = (function () {
    var seleccionDefault = "0";
    var widget = {
        setId: function (idw) {
            this.id = idw
        },
        getId: function () {
            return this.id;
        },
        getJQId: function () {
            return "#" + this.id;
        }
    }

    return {
        refrescarComboDefault: function (combo) {
            $(combo.getJQId()).val(seleccionDefault);
        },
        deshabilitarElemento: function (elemento,habilitar) {
           $(elemento.getJQId()).prop("disabled", habilitar);
        },
        ocultarElemnto: function (elemento,ocultar) {
            if (ocultar) {
                elemento.hide()
            } else {
                elemento.show();
            }
        },
        cargarCombo: function (combo,lista) {
            var sb = new Sys.StringBuilder();
            sb.append("<option value='0' >Seleccione</option>");
            $.each(lista, function (index, value) {
                sb.append("<option value=" + value.Valor + ">" + value.Texto + "</option>");
            })
            $get(combo.getId()).innerHTML = "";
            $get(combo.getId()).innerHTML = sb.toString();
        },
        crearWidget: function (id) {
            var w = Object.create(widget)
            w.setId(id);
            return w;
        }
        
    }

})();