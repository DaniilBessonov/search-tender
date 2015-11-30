var epzCommonChooseHeadAgency = (function (import_epzCommonConfig) {

    var addHeadAgencyCallback = function(sel) {
        $("#headAgencyId").val(sel.id);

        var htmlContent = '<li id=' + sel.id + '><span></span><strong>' + sel.name + '</strong></li>';
        $('div#head_agency ul').html(htmlContent);
        listOrgRemove();
    };

    var doInitCommonChooseHeadAgency = function(linkId, callback) {
        $("a#" + linkId).click(function(event) {
            event.preventDefault();
            var url = import_epzCommonConfig.urls.epzOrganizationUrl + 'headagency/open.html?jsCallback=' + callback;
            openPopupDialog(url, true, "okdpPopUp");
        });
    };

    return {
        addHeadAgencyCallback: addHeadAgencyCallback,
        doInitCommonChooseHeadAgency: doInitCommonChooseHeadAgency
    };
}(epzCommonConfig));
