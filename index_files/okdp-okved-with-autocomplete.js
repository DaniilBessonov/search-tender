var epzOkdpOkvedWithAutocomplete = (function (import_epzCommonConfig) {

    var mod = {
    };

    mod.setupAutoComplete = function(inputId, autoCompleteUrl, codePattern, getSelectedIdsCallback, insertCallback) {
        var inputElement = $('#' + inputId);

        $("a#" + inputId + "Link").click(function(event) {
            event.preventDefault();
            var url = $("a#" + inputId + "Link").attr("href");
            openPopupDialog(url, true, "okdpPopUp");
        });

        $(".hint", inputElement).focus(function () {
            if (this.value === this.title) {
                $(this).attr("value", "").removeClass("colorValue");
                $("ul.ui-widget-content").addClass('popupAutocomplete');
            }
        }).blur(function () {
            if (this.value === this.title || this.value == '') {
                $(this).attr("value", this.title).addClass("colorValue");
            }
        });

        $(".hint", inputElement).each(function () {
            if (this.value === this.title || this.value == '') {
                $(this).attr("value", this.title).addClass("colorValue");
            }
        });

        $(inputElement).keyup(function (e) {
            if ($(this).val() === '') {
                _hideAutoComplete();
            }
            if (e.keyCode == 13) {
                if (e.preventDefault) {
                    e.preventDefault();
                }// non-IE browsers
                else {
                    e.returnValue = false;
                } // IE Only
            }
        });

        $(window).scroll(function () {
            _hideAutoComplete();
        });

        $(document).scroll(function () {
            _hideAutoComplete();
        });

        $(window).resize(function() {
            _hideAutoComplete();
        });

        var isEnable = import_epzCommonConfig.smartSearchEnable;
        $(inputElement).autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: autoCompleteUrl,
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded;charset=utf-8",
                    type: "POST",
                    data:{
                        "term": request.term
                    },
                    success:function (data) {
                        if (data.length >= 0) {
                            response($.map(data, function(item){
                                item.value = item.label;
                                return item;
                            }));
                        }
                    },
                    async:true
                });

                yandexCounterHit(autoCompleteUrl);
            },
            disabled: !isEnable,
            minLength:1,
            open: function(event, ui) {
                $("ul.ui-widget-content").addClass("popupAutocomplete");
            },
            select:function (event, ui) {

                var sourceIds = getSelectedIdsCallback();
                if (!isValueInArray(ui.item.id, sourceIds)) {
                    insertCallback(ui);
                }

                this.value = "";
                $(this).blur();
                return false;
            },
            close:function (e, ui) {
                if ($.browser.msie) {
                    return false;
                } else {
                    e.preventDefault();
                }
            },
            search:function (event, ui) {
                var term = $(this).val();
                var codeRegexp = new RegExp(codePattern);
                if (!(codeRegexp.test(term))) {
                    $("ul.ui-autocomplete").css("display", "none").stop();
                    if (!$.browser.msie) {
                        event.preventDefault();
                    } else {
                        return false;
                    }
                }
            }
        });
    };

    function isValueInArray(id, selectedIdsArr) {
        for (var i in selectedIdsArr) {
            var value = selectedIdsArr[i];
            if (id == value) {
                return true
            }
        }
        return false;
    }

    mod.getIdArray = function(divId) {
        var elems = $("div#" + divId + " ul li:visible");
        var arr = jQuery.makeArray(elems);
        return $.map(arr, function (val, i) {
            return $(val).attr('id');
        });
    };

    mod.insertSelectedItems = function(inputId, fieldHiddenIdsId, divListId, selKeys) {
        $("#" + fieldHiddenIdsId).val($.map(selKeys, function (a) {
            return a.id;
        }));

        var htmlContent = '';
        $.map(selKeys, function (a) {
            htmlContent += '<li id=' + a.id + '><span></span><strong>' + a.code + ':</strong> ' + a.name + '</li>';
        });

        $('div#' + divListId + ' ul').append(htmlContent);
        listOrgRemove();
    };

    function _hideAutoComplete() {
        $(".ui-autocomplete").hide();
    }

    return mod;
}(epzCommonConfig));
