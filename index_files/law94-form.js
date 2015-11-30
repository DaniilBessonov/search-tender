var law94Form = function (import_epzCommonChooseOrganization, import_orderOrganization) {

    var getPlaceOfSearchListFunc = function() {
        return ['FZ_94'];
    };

    var updateLaw94FormInputsOnChangeLaw = function(placeOfSearchList) {
        import_epzCommonChooseOrganization.updateOrganizationOnChangeLaw('complaintCustomerInput', placeOfSearchList);
        import_epzCommonChooseOrganization.updateOrganizationOnChangeLaw('controlCustomerTitleInput', placeOfSearchList);
        import_epzCommonChooseOrganization.updateOrganizationOnChangeLaw('inspectionSubjectInput', placeOfSearchList);
        import_epzCommonChooseOrganization.updateOrganizationOnChangeLaw('inspectionAuthorityInput', placeOfSearchList);
    };

    var initLaw94FormInputs = function() {
        import_orderOrganization.initChooseOrganization("complaintCustomerInput", getPlaceOfSearchListFunc);
        import_orderOrganization.initChooseOrganization("controlCustomerTitleInput", getPlaceOfSearchListFunc);
        import_orderOrganization.initChooseOrganization("inspectionSubjectInput", getPlaceOfSearchListFunc);
        import_orderOrganization.initChooseOrganization("inspectionAuthorityInput", getPlaceOfSearchListFunc);
    };

    var resetInputs94 = function() {
        import_epzCommonChooseOrganization.clearOrganizationFields("complaintCustomerInput");
        import_epzCommonChooseOrganization.clearOrganizationFields("controlCustomerTitleInput");
        import_epzCommonChooseOrganization.clearOrganizationFields("inspectionSubjectInput");
        import_epzCommonChooseOrganization.clearOrganizationFields("inspectionAuthorityInput");

        if ($("div.expandBlock").has("#orderPlacement").find("div.expandBox").css("display") == "block") {
            $("#orderPlacement").click();
        }
        if ($("div.expandBlock").has("#contractPrice").find("div.expandBox").css("display") == "block") {
            $("#contractPrice").click();
        }
        if ($("div.expandBlock").has("#contracts").find("div.expandBox").css("display") == "block") {
            $("#contracts").click();
        }
        if ($("div.expandBlock").has("#complaints").find("div.expandBox").css("display") == "block") {
            $("#complaints").click();
        }
        if ($("div.expandBlock").has("#inspection").find("div.expandBox").css("display") == "block") {
            $("#inspection").click();
        }
    };

    return {
        initLaw94FormInputs: initLaw94FormInputs,
        updateLaw94FormInputsOnChangeLaw: updateLaw94FormInputsOnChangeLaw,
        resetInputs94: resetInputs94
    }
}(epzCommonChooseOrganization, orderOrganization);