(function ($, window) {

    var document = window.document;

    // Define a local copy
    var POPUP_COMMON = function () {
        return new POPUP_COMMON.fn.init();
    };

    POPUP_COMMON.fn = POPUP_COMMON.prototype = {
        constructor:POPUP_COMMON,
        init:function () {
            return this;
        },
        commonInit: function (param_autoCompleteClass, param_onEnterCallback) {
            _commonInit(param_autoCompleteClass, param_onEnterCallback);
        },
        validateSearchTerm: function (param_regexp, param_lengthErrorMsg) {
            return _validateSearchTerm(param_regexp, param_lengthErrorMsg);
        },
        showSearchError: function (msg) {
            _showSearchError(msg);
        },
        hideSearchError: function () {
            _hideSearchError();
        },
        closePopup: function() {
            _closePopup();
        },
        setupQuickSearch: function (quickSearchUrl, codePattern, selectCallback) {
            _setupQuickSearch(quickSearchUrl, codePattern, selectCallback);
        },
        hideAutoComplete: function() {
            _hideAutoComplete();
        }
    };

    // Give the init function the prototype for later instantiation
    POPUP_COMMON.fn.init.prototype = POPUP_COMMON.fn;

    // Expose to the global object
    window.POPUP_COMMON = POPUP_COMMON;

    function _commonInit(param_autoCompleteClass, param_onEnterCallback) {
        $(".hint").focus(function () {
            if (this.value === this.title) {
                $(this).attr("value", "").removeClass("colorValue");
                $("ul.ui-widget-content").addClass(param_autoCompleteClass);
            }
        }).blur(function () {
            if (this.value === this.title || this.value == '') {
                $(this).attr("value", this.title).addClass("colorValue");
            }
         });

        $(".hint").each(function () {
            if (this.value === this.title || this.value == '') {
                $(this).attr("value", this.title).addClass("colorValue");
            }
        });

        $('#goodssearch').keyup(function (e) {
            if (e.keyCode == 13) {
                if (e.preventDefault) {
                    e.preventDefault();
                }// non-IE browsers
                else {
                    e.returnValue = false;
                } // IE Only

                _hideAutoComplete();
                param_onEnterCallback.call(this);
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

    }

    function _validateSearchTerm(param_regexp, param_lengthErrorMsg) {
        var searchTitle = $("#goodssearch").attr('title');
        var searchValue = $("#goodssearch").val();
        var expr = new RegExp(param_regexp, 'g');
        if (searchValue == searchTitle || !expr.test(searchValue)) {
            var msg = param_lengthErrorMsg;
            _showSearchError(msg);
            return false;
        }
        return true;
    }

    function _showSearchError(msg) {
        $("#errorDiv").text(msg);
        $("#errorDiv").css('visibility', 'visible');
    }

    function _hideSearchError() {
        $("#errorDiv").css('visibility', 'hidden');
    }

    function _closePopup() {
        $("div.overlay, div.popUp").remove();
    }

    function _setupQuickSearch(quickSearchUrl, codePattern, selectCallback) {
        $('#goodssearch').autocomplete({

            source:function (request, response) {
                $.ajax({
                    url:quickSearchUrl,
                    dataType:'json',
                    contentType:"application/x-www-form-urlencoded;charset=utf-8",
                    type:"POST",
                    data:{
                        "term":request.term
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

                yandexCounterHit(quickSearchUrl);
            },
            minLength:1,
            select:function (event, ui) {
                selectCallback(ui);
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
        $('#goodssearch').keyup(function () {
            if ($(this).val() === '') {
                _hideAutoComplete();
            }
        });
    }

    function _hideAutoComplete() {
        $(".ui-autocomplete").hide();
    }

})(jQuery, window);