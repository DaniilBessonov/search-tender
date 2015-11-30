var epzOrderPurchaseInfoForm = function (import_epzOrderCommonUtil, import_orderNsi) {

    var updatePurchaseInfoFormInputsOnChangeLaw = function(placeOfSearchList) {
    };

    var initPurchaseInfoFormInputs = function(placeOfSearchList) {
    };

    var resetPurchaseInfoFormInputs = function() {
        $("#okdpIds").val("");
        $("#okdp_223_hidden_ids_input").val("");
        $("#headAgencyId").val("");
        $("#okdpGroupIds").val("");

        $("#manySelect_etp .collapsed").each(function(){
            import_epzOrderCommonUtil.setManySelectLabel(this);
        });
    };

    var preparePurchaseInfoInputsForSubmit = function() {
        $("#okdpGroupIds").val(import_orderNsi.getIdList('okdp_group_list'));
        $("#okdpIds").val(import_orderNsi.getIdList('okdp_list'));
        $("#okdp_223_hidden_ids_input").val(import_orderNsi.getIdList('okdp_223_selected_items_container'));
        $("#headAgencyId").val(import_orderNsi.getIdList('head_agency'));
    };

    return {
        initPurchaseInfoFormInputs: initPurchaseInfoFormInputs,
        resetPurchaseInfoFormInputs: resetPurchaseInfoFormInputs,
        updatePurchaseInfoFormInputsOnChangeLaw: updatePurchaseInfoFormInputsOnChangeLaw,
        preparePurchaseInfoInputsForSubmit: preparePurchaseInfoInputsForSubmit
    }
}(epzOrderCommonUtil, orderNsi);