var federalDistrict = function (import_epzCommonConfig, import_epzOrderCommonUtil) {

    var changeDistricts = function(paramsDivId) {
        var districtsInputName= $("#" + paramsDivId + " .districtsInputName").val();
        var regionsInputName= $("#" + paramsDivId + " .regionsInputName").val();
        var regionsId = $("#" + paramsDivId + " .regionsId").val();
        var updateCities = $("#" + paramsDivId + " .updateCities").val();
        var onclickok = $("#" + paramsDivId + " .onclickok").val();
        var ajaxUrl = import_epzCommonConfig.urls.epzOrderUrl + 'extendedsearch/changeDistricts.html?onclickok=' + onclickok;
        $('[name=' + escapeSelector(districtsInputName) + ']').each(function (i, el) {
            if (el.checked) {
                ajaxUrl += "&" + "districtId=" + el.value;
            }
        });
        $.ajax({
            url:ajaxUrl,
            dataType:'html',
            success:function (html) {
                $("#" + escapeSelector(regionsId)).html(html);
                manySelectRegions(regionsId);
                changeRegions(regionsInputName, updateCities);
            }
        });
    };

    function escapeSelector(str) {
        if (str) {
            return str.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
        } else {
            return str;
        }
    }

    var changeRegions = function(regionsInputName, updateCities) {
        var enableCities = false;
        var ajaxUrl = import_epzCommonConfig.urls.epzOrderUrl + 'extendedsearch/changeRegions.html?';
        $('[name=' + escapeSelector(regionsInputName) + ']').each(function (i, el) {
            if (el.checked) {
                ajaxUrl += "regionId=" + el.value + "&";
                enableCities = true;
            }
        });
        if (updateCities == 'true') {
            $.ajax({
                url:ajaxUrl,
                dataType:'html',
                success:function (html) {
                    $("#manySelect_cities").html(html);
                    manySelectCities();

                    if (enableCities) {
                        showCities();
                    }
                    else {
                        hideCities();
                    }
                }
            });
        }
    };

    function manySelectCities() {
        if ($("#manySelect_cities div.expanded li").length > 0) {
            $("#manySelect_cities .collapsed").toggle(function () {
                    $(this).find("span.msExpandButton").addClass("active");
                    $(this).siblings("div.selectChose").slideDown(300);
                },
                function () {
                    $(this).find("span.msExpandButton").removeClass("active");
                    $(this).siblings("div.selectChose").slideUp(300);
                    var inputLength = $(this).siblings("div.selectChose").find("input:checked").length;
                    var inputLabel = $(this).siblings("div.selectChose").find("input:checked").parents("li").map(
                        function () {
                            return $(this).text();
                        }).get().join(", ");

                    var placeholderText = $(this).find(".msPlaceholder").data("initial");
                    $(this).siblings("div.selectChose").slideUp(300);
                    $(this).siblings(".selectChose").find("span.msExpandButton").click();
                    if (inputLength === 0) {
                        $(this).find(".msPlaceholder").text(placeholderText).removeClass("choseColor")
                    } else {
                        $(this).find(".msPlaceholder").text(inputLabel).addClass("choseColor");
                    }
                }
            );


            $("#manySelect_cities p.msButtonIn .btnBtn").click(function () {
                var inputLength = $(this).parent().siblings("div.expanded").find("input:checked").length;
                var inputLabel = $(this).parent().siblings("div.expanded").find("input:checked").parents("li").map(
                    function () {
                        return $(this).text();
                    }).get().join(", ");

                var placeholderText = $(this).parents(".selectChose").siblings(".collapsed").find(".msPlaceholder").data("initial");
                $(this).parents("div.selectChose").slideUp(300);
                $(this).parents(".selectChose").siblings(".collapsed").find("span.msExpandButton").click();
                if (inputLength === 0) {
                    $(this).parents(".selectChose").siblings(".collapsed").find(".msPlaceholder").text(placeholderText).removeClass("choseColor")
                } else {
                    $(this).parents(".selectChose").siblings(".collapsed").find(".msPlaceholder").text(inputLabel).addClass("choseColor");
                }
            });
            updateManySelect("#manySelect_cities .collapsed");
        } else {
            $("#manySelect_cities .collapsed").unbind("click");
        }
    }

    function updateManySelect(selector) {
        $(selector).each(function () {
            import_epzOrderCommonUtil.setManySelectLabel(this);
        });
    }

    function showCities() {
        jQuery('#citiesTr').css('display', '');
    }

    function hideCities() {
        jQuery('#citiesTr').css('display', 'none');
    }

    function manySelectRegions(regionsId) {
        $("#" + escapeSelector(regionsId) + " .collapsed").toggle(function () {
                $(this).find("span.msExpandButton").addClass("active");
                $(this).siblings("div.selectChose").slideDown(300);
            },
            function () {
                $(this).find("span.msExpandButton").removeClass("active");
                $(this).siblings("div.selectChose").slideUp(300);
                var inputLength = $(this).siblings("div.selectChose").find("input:checked").length;
                var inputLabel = $(this).siblings("div.selectChose").find("input:checked").parents("li").map(function () {
                    return $(this).text();
                }).get().join(", ");

                var placeholderText = $(this).find(".msPlaceholder").data("initial");
                $(this).siblings("div.selectChose").slideUp(300);
                $(this).siblings(".selectChose").find("span.msExpandButton").click();
                if (inputLength === 0) {
                    $(this).find(".msPlaceholder").text(placeholderText).removeClass("choseColor")
                } else {
                    $(this).find(".msPlaceholder").text(inputLabel).addClass("choseColor");
                }
            }
        );

        $("#" + escapeSelector(regionsId) + " p.msButtonIn .btnBtn").click(function () {
            var inputLength = $(this).parent().siblings("div.expanded").find("input:checked").length;
            var inputLabel = $(this).parent().siblings("div.expanded").find("input:checked").parents("li").map(function () {
                return $(this).text();
            }).get().join(", ");

            var placeholderText = $(this).parents(".selectChose").siblings(".collapsed").find(".msPlaceholder").data("initial");
            $(this).parents("div.selectChose").slideUp(300);
            $(this).parents(".selectChose").siblings(".collapsed").find("span.msExpandButton").click();
            if (inputLength === 0) {
                $(this).parents(".selectChose").siblings(".collapsed").find(".msPlaceholder").text(placeholderText).removeClass("choseColor")
            } else {
                $(this).parents(".selectChose").siblings(".collapsed").find(".msPlaceholder").text(inputLabel).addClass("choseColor");
            }
        });

        updateManySelect("#" + escapeSelector(regionsId) + " .collapsed");
    }

    return {
        changeDistricts: changeDistricts,
        changeRegions: changeRegions
    }
}(epzCommonConfig, epzOrderCommonUtil);