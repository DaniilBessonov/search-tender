var epzCommonChooseOrganization = (function (import_epzCommonConfig) {

    var mod = {
    };

    var listenersMap = [];

    mod.organizationSelected = function(name, parentFieldName, cpz, idFz94, idFz223, inn, draftId) {
        $("#" + parentFieldName).val(name);
        $("#" + parentFieldName).keyup();
        $("#" + parentFieldName + "Cpz").val(cpz);
        $("#" + parentFieldName + "Fz94Id").val(idFz94);
        $("#" + parentFieldName + "Fz223Id").val(idFz223);
        $("#" + parentFieldName + "Inn").val(inn);
        $("#" + parentFieldName + "DraftId").val(draftId);

        // При выборе менять цвет поля
        $("#" + parentFieldName).css("color", "#383838");

        hideError(parentFieldName);

        var newValue = {
            fz223id: idFz223,
            fz94id: idFz94,
            cpz: cpz
        };

        var selectListener = listenersMap[parentFieldName];
        if (selectListener != undefined) {
            selectListener.call(undefined, newValue);
        }
    };

    function hideError(inputId) {
        $("#" + inputId + "Error .errorRed").hide();
    }

    function jq( myid ) {
        return "#" + myid.replace( /(:|\.|\[|\])/g, "\\$1" );

    }
    function addPlaceOfSearchParam(params, placeOfSearchListFunc) {
        if (placeOfSearchListFunc != undefined) {
            var placeOfSearchList = placeOfSearchListFunc.call(undefined);
            $.each(placeOfSearchList, function(index, value) {
                params.push({
                    name: 'placeOfSearch',
                    value: value
                });
            });
        }
    }

    function addSearchTextParam(params, inputId) {
        var orgInput = $("#" + inputId);
        var val = orgInput.val();
        if (val && (orgInput.attr("title") != val)) {
            params.push({
                name: 'searchText',
                value: val
            });
        }
    }

    function addOrgTypeParam(params, inputIdSelector) {
        var val = $(inputIdSelector + "Params .organizationType").val();
        params.push({
            name: 'organizationType',
            value: val
        });
    }

    mod.initCommonChooseOrganization = function(inputId, placeOfSearch) {
        doInitCommonChooseOrganizationByFunc(inputId, false, placeOfSearch, undefined, undefined, 'autocompleteReturnsCodes');
    };

    mod.initCommonChooseOrganizationAutocomplete = function(inputId, placeOfSearch, autocompleteRecords) {
        doInitCommonChooseOrganizationByFunc(inputId, false, placeOfSearch, undefined, undefined, 'autocompleteReturnsCodes', autocompleteRecords);
    };

    mod.initCommonChooseRegOrDraftOrganization = function(inputId, placeOfSearch) {
        doInitCommonChooseOrganizationByFunc(inputId, false, placeOfSearch, undefined, undefined, 'autocompleteRegOrDraftReturnsCodes');
    };

    mod.initCommonChooseOrganizationByFunc = function(inputId, placeOfSearchListFunc, selectListener) {
        doInitCommonChooseOrganizationByFunc(inputId, true, undefined, placeOfSearchListFunc, selectListener, 'autocompleteReturnsCodes');
    };

    var doInitCommonChooseOrganizationByFunc = function(inputId, useFunc, placeOfSearch, placeOfSearchListFunc, selectListener, mapping, autocompleteRecords) {
        if (selectListener != undefined) {
            listenersMap[inputId] = selectListener;
        }

        $("a#" + inputId + "Link").click(function(event) {
            event.preventDefault();
            var url = $("a#" + inputId + "Link").attr("href");
            var params = [];
            if (useFunc) {
                addPlaceOfSearchParam(params, placeOfSearchListFunc);
            } else {
                params.push({
                    name: 'placeOfSearch',
                    value: placeOfSearch
                });
            }
            addSearchTextParam(params, inputId);
            url += "&" + $.param(params);
            openPopupDialog(url, true, "okdpPopUp");
        });

        if (useFunc) {
            mod.initOrganizationAutocompleteById("#" + inputId, undefined, true, selectListener, placeOfSearchListFunc, mapping);
        } else {
            var func = function () {
                return [placeOfSearch];
            };
            mod.initOrganizationAutocompleteById("#" + inputId, undefined, true, undefined, func, mapping, autocompleteRecords);
        }
    };

    mod.initOrganizationAutocompleteById = function(id, requestParams, isUseAlikeLinkName, selectListener, placeOfSearchListFunc, mapping, autocompleteRecords) {
        var isEnable = import_epzCommonConfig.smartSearchEnable;
        $(id).autocomplete({
            source: function(req, resp) {
                var trimLength = $.trim(req.term.replace(/\s/g, '')).length;
                if (trimLength < 3) {
                    resp(null);
                } else {
                    var rp = requestParams;
                    var dataParams = "term=" + encodeURIComponent(req.term);
                    var url = import_epzCommonConfig.urls.epzOrganizationUrl + "chooseOrganization/" + mapping + ".html" + (rp ? "?" + rp : "");
                    if (placeOfSearchListFunc != undefined) {
                        var params = [];
                        params.push({
                            name: 'term',
                            value: req.term
                        });
                        if (autocompleteRecords != undefined) {
                            params.push({
                                name: 'recordsPerPage',
                                value: autocompleteRecords
                            });
                        }
                        addPlaceOfSearchParam(params, placeOfSearchListFunc);
                        addOrgTypeParam(params, id);
                        dataParams = params;
                        url = import_epzCommonConfig.urls.epzOrganizationUrl + "chooseOrganization/" + mapping + ".html";
                    }
                    var res = $.ajax({
                        url: url,
                        data: dataParams,
                        type:"GET"
                    }).done(function(ajaxResp) {
                            var result = $.map(ajaxResp.result, function(item){
                                    return {
                                        value: item.name,
                                        data: item
                                    }}
                            );
                            setTimeout(function(){ resp(result)}, ajaxResp.delay);
                        });

                    yandexCounterHit(url);
                }
            },
            disabled: !isEnable,
            minLength:3,
            open: function(event, ui) {
                $("ul.ui-widget-content").addClass("popupAutocomplete");
            },
            select: function(event, ui) {
//                var link = (isUseAlikeLinkName != undefined && isUseAlikeLinkName == true) ? $("#" + $(this).attr('id') + "Link") : $("#openChooseOrganizationLink");
//                link.attr("href", link.attr("initialHref") + encodeURIComponent(ui.item.value));

                var inputId = $(this).attr("id");

                $("#" + inputId + "Fz223Id").attr("value", ui.item.data.fz223id);
                $("#" + inputId + "Fz94Id").attr("value", ui.item.data.fz94id);
                $("#" + inputId + "Cpz").attr("value", ui.item.data.cpz);
                $("#" + inputId + "DraftId").attr("value", ui.item.data.draftId);

                if (selectListener != undefined) {
                    selectListener.call(undefined, ui.item.data);
                }
            },
            search: function (event, ui) {
                clearOrganizationHiddenFields($(this).attr("id"));
            }
        });

        $(id).keyup(function () {
            var currentValue = $(this).val();
            if (currentValue === '') {
                $(".ui-autocomplete").hide();
            }
        });

        $(id).keyup();

        $(window).resize(function() {
            $(".ui-autocomplete").hide();
        });
    };

    mod.clearOrganizationAutocomplete = function(isUseAlikeLinkName) {
        if (isUseAlikeLinkName != undefined && isUseAlikeLinkName == true) {
            $('input.organizationAutocomplete').each(function() {
                var link = $("#" + $(this).attr('id') + "Link");
                link.attr("href", link.attr("initialHref"));
            });
        } else {
            var chooseOrganizationLink = $("#openChooseOrganizationLink");
            chooseOrganizationLink.attr("href", chooseOrganizationLink.attr("initialHref"));
        }
    };

    mod.clearOrganizationFields = function(inputName) {
        $.each([inputName+"Cpz", inputName+"Fz94Id", inputName+"Fz223Id", inputName, inputName+"Inn", inputName+"DraftId"], function (key, value) {
            $("#"+value).attr("value", '');
        });
        $("#" + inputName + "Fz223Id").change();
    };

    mod.resetOrganizationFields = function(inputName) {
        $.each([inputName+"Cpz", inputName+"Fz94Id", inputName+"Fz223Id", inputName, inputName+"Inn"], function (key, value) {
            $("#"+value).attr("value", '');
        });
        $("#" + inputName).val($("#" + inputName).attr("title")).css("color", "#999999");
        $("#" + inputName + "Fz223Id").change();
        hideError(inputName);
    };

    mod.updateOrganizationOnChangeLaw = function(inputName) {
        mod.resetOrganizationFields(inputName);
    };

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    function isFz94(placeOfSearchList) {
        return isFz(placeOfSearchList, 'FZ_94');
    }

    function isFz44(placeOfSearchList) {
        return isFz(placeOfSearchList, 'FZ_44');
    }

    function isFz223(placeOfSearchList) {
        return isFz(placeOfSearchList, 'FZ_223');
    }

    function isFz(placeOfSearchList, fzType) {
        return $.inArray(fzType,placeOfSearchList) >= 0;
    }

    return mod;
}(epzCommonConfig));
