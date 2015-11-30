var orderOrganization = function (import_epzCommonChooseOrganization, import_epzCommonConfig) {

    function buildPlaceOfSearchListParam(placeOfSearchList) {
        var searchPlaceParam = $.map(placeOfSearchList,function (item) {
            return "placeOfSearch=" + item;
        }).join("&");
        return searchPlaceParam;
    }

    var initChooseOrganization = function(inputId, getPlaceOfSearchListFunc, selectListener) {
        import_epzCommonChooseOrganization.initCommonChooseOrganizationByFunc(inputId, getPlaceOfSearchListFunc, selectListener);
    };

    return {
        initChooseOrganization: initChooseOrganization
    }
}(epzCommonChooseOrganization, epzCommonConfig);