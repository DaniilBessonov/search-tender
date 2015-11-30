var law223LotForm = function (import_orderNsi, import_epzCommonChooseOrganization, import_orderOrganization) {

    var getPlaceOfSearchListFunc = function() {
        return ['FZ_223'];
    };

    var initLaw223LotFormInputs = function() {
        import_orderOrganization.initChooseOrganization("lotCustomerNameInput", getPlaceOfSearchListFunc);
    };

    var resetInputs223Lots = function() {
        $("#okved_223_lot_hidden_ids_input").val("");
        $("#okdp_223_lot_hidden_ids_input").val("");
        import_epzCommonChooseOrganization.clearOrganizationFields("lotCustomerNameInput");
    };

    var prepareInputs223LotForSubmit = function() {
        $("#okved_223_lot_hidden_ids_input").val(import_orderNsi.getIdList('okved_223_lot_selected_items_container'));
        $("#okdp_223_lot_hidden_ids_input").val(import_orderNsi.getIdList('okdp_223_lot_selected_items_container'));
    };

    var updateLaw223FormInputsOnChangeLaw = function(placeOfSearchList) {
        import_epzCommonChooseOrganization.updateOrganizationOnChangeLaw('lotCustomerNameInput', placeOfSearchList);
    };

    return {
        initLaw223LotFormInputs: initLaw223LotFormInputs,
        resetInputs223Lots: resetInputs223Lots,
        updateLaw223FormInputsOnChangeLaw: updateLaw223FormInputsOnChangeLaw,
        prepareInputs223LotForSubmit: prepareInputs223LotForSubmit
    }
}(orderNsi, epzCommonChooseOrganization, orderOrganization);