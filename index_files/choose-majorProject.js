var epzCommonChooseMajorProject = (function (import_epzCommonConfig) {

    var mod = {
    };

    mod.majorProjectSelected = function(name, parentFieldName, code) {
        $("#" + parentFieldName).val(name);
        $("#" + parentFieldName).keyup();
        $("#" + parentFieldName + "Code").val(code);

        // При выборе менять цвет поля
        $("#" + parentFieldName).css("color", "#383838");

        hideError(parentFieldName);

        var newValue = {
            code: code
        };
    };

    function hideError(inputId) {
        $("#" + inputId + "Error .errorRed").hide();
    }

    function jq( myid ) {
        return "#" + myid.replace( /(:|\.|\[|\])/g, "\\$1" );

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

    function clearMajorProjectHiddenFields(inputName) {
        $.each([inputName+"Code"], function (key, value) {
            $("#"+value).attr("value", '');
        });
    }

    mod.initCommonChooseMajorProject = function(inputId) {
        doInitCommonChooseMajorProject(inputId, false, undefined, undefined);
    };

    var doInitCommonChooseMajorProject = function(inputId) {
        $("a#" + inputId + "Link").click(function(event) {
            event.preventDefault();
            var url = $("a#" + inputId + "Link").attr("href");
            var params = [];
            addSearchTextParam(params, inputId);
            url += "&" + $.param(params);
            openPopupDialog(url, true, "okdpPopUp");
        });

        mod.initMajorProjectAutocompleteById("#" + inputId, true);
    };

    mod.initMajorProjectAutocompleteById = function(id, isUseAlikeLinkName) {
        var isEnable = import_epzCommonConfig.smartSearchEnable;
        $(id).autocomplete({
            source: function(req, resp) {
                var trimLength = $.trim(req.term.replace(/\s/g, '')).length;
                if (trimLength < 3) {
                    resp(null);
                } else {
                    var params = [];
                    params.push({
                        name: 'term',
                        value: req.term
                    });
                    dataParams = params;
                    url = import_epzCommonConfig.urls.epzCustomerReportsUrl + "majorProject/autocompleteReturnsCodes.html";
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
                var link = (isUseAlikeLinkName != undefined && isUseAlikeLinkName == true) ? $("#" + $(this).attr('id') + "Link") : $("#openChooseMajorProjectLink");
                link.attr("href", link.attr("initialHref") + encodeURIComponent(ui.item.value));

                var inputId = $(this).attr("id");

                $("#" + inputId + "Code").attr("value", ui.item.data.code);
            },
            search: function (event, ui) {
                clearMajorProjectHiddenFields($(this).attr("id"));
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

    mod.clearMajorProjectAutocomplete = function(isUseAlikeLinkName) {
        if (isUseAlikeLinkName != undefined && isUseAlikeLinkName == true) {
            $('input.majorProjectAutocomplete').each(function() {
                var link = $("#" + $(this).attr('id') + "Link");
                link.attr("href", link.attr("initialHref"));
            });
        } else {
            var chooseMajorProjectLink = $("#openChooseMajorProjectLink");
            chooseMajorProjectLink.attr("href", chooseMajorProjectLink.attr("initialHref"));
        }
    };

    mod.clearMajorProjectFields = function(inputName) {
        $.each([inputName+"Code"], function (key, value) {
            $("#"+value).attr("value", '');
        });
    };

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    return mod;
}(epzCommonConfig));
