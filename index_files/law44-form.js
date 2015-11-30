var law44Form = function (import_orderNsi) {

    var prepareInputs44ForSubmit = function() {
        $("#okpdIds").val(import_orderNsi.getIdList('okpd_list'));
    };

    var updateLaw44FormInputsOnChangeLaw = function(placeOfSearchList) {
        //do nothing
    };

    var initLaw44FormInputs = function() {
        //do nothing
    };

    var resetInputs44 = function() {
        $("#okpdIds").val("");

        if ($("div.expandBlock").has("#law44Advantages").find("div.expandBox").css("display") == "block") {
            $("#orderPlacement").click();
        }
    };

    return {
        initLaw44FormInputs: initLaw44FormInputs,
        updateLaw44FormInputsOnChangeLaw: updateLaw44FormInputsOnChangeLaw,
        prepareInputs44ForSubmit: prepareInputs44ForSubmit,
        resetInputs44: resetInputs44
    }
}(orderNsi);