var orderNsi = function (import_epzCommonConfig) {

    function getIdArray(divId) {
        var elems = $("div#" + divId + " ul li:visible");
        var arr = jQuery.makeArray(elems);
        return $.map(arr, function (val, i) {
            return $(val).attr('id');
        });
    }

    function getOkdpSelectedIds() {
        return getIdArray('okdp_list');
    }

    function getOkdpGroupSelectedIds()  {
        return   getIdArray('okdp_group_list');
    }

    function insert_okdp(selKeys) {
        insert_okdp_by_id(selKeys, 'okdp_list');
    }

    function insert_okdp_by_id(selKeys, divListId) {
        var htmlContent = '';
        $.map(selKeys, function (a) {
            htmlContent += '<li id=' + a.id + '><span></span><strong>' + a.code + ':</strong> ' + a.name + '</li>';
        });

        $('div#' + divListId + ' ul').append(htmlContent);
        listOrgRemove();
    }

    function insert_okdp_group(selKeys) {
        var htmlContent = '';
        $.map(selKeys, function (a) {
            htmlContent += '<li id=' + a.id + '><span></span>' + a.name + '</li>';
        });

        $('div#okdp_group_list ul').append(htmlContent);
        listOrgRemove();
    }

    function getOkdpLink() {
        document.getElementById('okdp_open_link').href= import_epzCommonConfig.urls.epzNsiUrl + 'okdp/open.html?'+
            'okdpGroupIds=' + getIdList('okdp_group_list');
    }

    var getOkpdSelectedIds = function() {
        return getIdArray('okpd_list');
    };

    var insert_okpd = function(selKeys) {
        var htmlContent = '';
        $.map(selKeys, function (a) {
            htmlContent += '<li id=' + a.id + '><span title="Удалить"></span><strong>' + a.code + ':</strong> ' + a.name + '</li>';
        });

        $('div#okpd_list ul').append(htmlContent);
        listOrgRemove();
    };

    //TODO duplicate
    function getOkpdList() {
        var codeList = "";
        $("div#okpd_list ul li").each(function () {
            if (codeList != "") {
                codeList += ",";
            }
            codeList += $(this).attr('id');
        });
        return  codeList;
    }

    //TODO duplicate
    function getIdList(divId) {
        var codeList = "";
        var elems = $("div#" + divId + " ul li:visible");

        $("div#" + divId + " ul li:visible").each(function () {
            if (codeList != "") {
                codeList += ",";
            }
            codeList += $(this).attr('id');
        });
        return  codeList;
    }

    return {
        getOkdpLink: getOkdpLink,
        getOkdpSelectedIds: getOkdpSelectedIds,
        getOkdpGroupSelectedIds: getOkdpGroupSelectedIds,
        insert_okdp: insert_okdp,
        insert_okdp_group: insert_okdp_group,
        getOkpdSelectedIds: getOkpdSelectedIds,
        insert_okpd: insert_okpd,
        insert_okdp_by_id: insert_okdp_by_id,
        getIdList: getIdList,
        getIdArray: getIdArray
    }
}(epzCommonConfig);