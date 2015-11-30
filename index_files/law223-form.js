var law223Form = function(import_orderNsi, import_law223LotForm, import_extAttr) {

    function initChooseOrg() {
    }

    var updateLaw223FormInputsOnChangeLaw = function(placeOfSearchList) {
        import_law223LotForm.updateLaw223FormInputsOnChangeLaw(placeOfSearchList);
    };

    var initLaw223FormInputs = function() {
        import_law223LotForm.initLaw223LotFormInputs();
        import_extAttr.initExtAttr();
    };

    var prepareInputs223ForSubmit = function() {
        $("#okved_223_hidden_ids_input").val(import_orderNsi.getIdList('okved_223_selected_items_container'));
        import_law223LotForm.prepareInputs223LotForSubmit();
        import_extAttr.prepareInputs223ExtendedForSubmit();
    };

    var resetInputs223 = function() {
        $("#okved_223_hidden_ids_input").val("");
        $("#searchByAttributes input[type='radio'][value='NOTIFICATION']").attr('checked', 'checked');
        import_law223LotForm.resetInputs223Lots();
    };

    return {
        initLaw223FormInputs: initLaw223FormInputs,
        updateLaw223FormInputsOnChangeLaw: updateLaw223FormInputsOnChangeLaw,
        prepareInputs223ForSubmit: prepareInputs223ForSubmit,
        resetInputs223: resetInputs223
    }
}(orderNsi, law223LotForm, extAttr);