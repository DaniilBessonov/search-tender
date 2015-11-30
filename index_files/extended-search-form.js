var epzOrderExtSearch = function (import_orderNsi, import_epzCommonChooseOrganization, import_epzOrderConstants,
                                  import_epzOrderLawCommonForm, import_epzOrderPurchaseInfoForm, import_law223Form,
                                  import_law44Form, import_law94Form, import_epzCommonChooseHeadAgency) {

    var FZ_44 = 'FZ_44';
    var FZ_94 = 'FZ_94';
    var FZ_223 = 'FZ_223';

    var fzTypeCssMap = {};
    fzTypeCssMap[FZ_44] = 'displayArea44';
    fzTypeCssMap[FZ_94] = 'displayArea94';
    fzTypeCssMap[FZ_223] = 'displayArea223';

    function isFz(placeOfSearchList, fzType) {
        return $.inArray(fzType,placeOfSearchList) >= 0;
    }

    function isFz94(placeOfSearchList) {
        return isFz(placeOfSearchList, FZ_94);
    }

    function isFz44(placeOfSearchList) {
        return isFz(placeOfSearchList, FZ_44);
    }

    function isFz223(placeOfSearchList) {
        return isFz(placeOfSearchList, FZ_223);
    }

    function isFz94and223BothOr94Only(placeOfSearchList) {
        return ((placeOfSearchList.length == 2) && isFz223(placeOfSearchList) && isFz94(placeOfSearchList))
            || ((placeOfSearchList.length == 1) && isFz94(placeOfSearchList));
    }

    function isFz223Only(placeOfSearchList) {
        return (placeOfSearchList.length == 1) && isFz223(placeOfSearchList);
    }

    function getPlaceOfSearchListCss(placeOfSearchList) {
        var placeOfSearchListCss = $.map(placeOfSearchList, function (item) {
            return fzTypeCssMap[item];
        });
        return placeOfSearchListCss;
    }

    function showHide(selector, show) {
        if (show) {
            $(selector).show();
        } else {
            $(selector).hide();
        }
    }

    function removeOrNot(selector, remove) {
        if (remove) {
            $(selector).remove();
        }
    }

    function showHideOptionsPurchaseInfo(show) {
        if (show) {
            $("#optionsPurchaseInfo").show();
            $("#optionsPurchaseInfoBottomBr").show();
        } else {
            $("#optionsPurchaseInfo").hide();
            $("#optionsPurchaseInfoBottomBr").hide();
        }
    }

    function showCorrectPlaceOfSearch() {
        var placeOfSearchList = getPlaceOfSearchList();
        var placeOfSearchListCss = getPlaceOfSearchListCss(placeOfSearchList);
        checkSearchType();

        showHide("#okdpBlock94and223or94", isFz94and223BothOr94Only(placeOfSearchList));
        showHide("#okdpBlock223Only", isFz223Only(placeOfSearchList));

        if (isFz223(placeOfSearchList) && isFz94(placeOfSearchList) && isFz44(placeOfSearchList)) {
            showHideOptionsPurchaseInfo(false);
        } else {
            $("#low94_223").find("input:checked").removeAttr("checked");
            showHideOptionsPurchaseInfo(true);
        }

        if (placeOfSearchListCss.length > 0) {
            $(".displayArea44, .displayArea94, .displayArea223").each(function() {
                var elem = $(this);
                var found = $.grep(placeOfSearchListCss, function (value, index) {
                    return elem.hasClass(value);
                });
                if (placeOfSearchListCss.length == found.length) {
                    elem.show();
                } else {
                    elem.hide();
                }
            });
        } else {
            $(".displayArea44, .displayArea94, .displayArea223").hide();
            showHideOptionsPurchaseInfo(false);
        }

        if (
            (isFz223(placeOfSearchList) && isFz94(placeOfSearchList)) ||
            (isFz44(placeOfSearchList) && isFz223(placeOfSearchList) && isFz94(placeOfSearchList))
           ) {
            $("#low94_223").show();
        } else {
            $("#low94_223").hide();
        }

        $('.show_FZ_223, .show_FZ_94, .show_FZ_44').hide();
        if (isFz223(placeOfSearchList)) {
            $('.show_FZ_223').show();
            $("#addPurchaseMethodBtn").show();
        } else {
            $("#addPurchaseMethodBtn").hide();
            $("#extendedSearchForm2").find(".purchaseMethod223").remove();
        }
        if (isFz94(placeOfSearchList)) {
            $('.show_FZ_94').show();
        }
        if (isFz44(placeOfSearchList)) {
            $('.show_FZ_44').show();
        }
        _clearPurchaseMethodSelectionAndHide('.show_FZ_223, .show_FZ_94, .show_FZ_44');
        _rebuildInputLabels("#tdPurchaseMethods .collapsed");
    }

    function getSelectedSearchType() {
        return $("#searchType input[type='radio']:checked").val();
    }

    var checkSearchType = function() {
        if (isLotSearch()) {
            $("#ordersOptions").hide();
            $("#lotsOptions").show();
        } else {
            $("#lotsOptions").hide();
            $("#ordersOptions").show();
        }
        updateQuickSearchHint();
    };

    function getPlaceOfSearchList() {
        var checkedList = $("#radioContainer input[name='placeOfSearch']:checked");
        var placeOfSearchList = $.map(checkedList, function (item) {
            return $(item).val();
        });
        return placeOfSearchList;
    }

    function _setupRadioOnChange() {
        $("#radioContainer input[name='placeOfSearch']").change(function() {
            var searchType = getSelectedSearchType();
            if (searchType != 'ORDERS') {
                $("#searchType input[type='radio'][value='ORDERS']").attr('checked', 'checked');
            }

            showCorrectPlaceOfSearch();

            var placeOfSearchList = getPlaceOfSearchList();
            import_epzOrderLawCommonForm.updateCommonFormInputsOnChangeLaw(placeOfSearchList);
            import_law94Form.updateLaw94FormInputsOnChangeLaw(placeOfSearchList);
            import_law223Form.updateLaw223FormInputsOnChangeLaw(placeOfSearchList);

            updateQuickSearchHint();

            showHints();
        });
    }

    function updateQuickSearchHint() {
        var hint;
        if (isLotSearch()) {
            hint = import_epzOrderConstants.extSearch.extSearchLaw223LotHint;
        } else {
            hint = import_epzOrderConstants.extSearch.extSearchLawOtherHint;
        }
        var title = $("#extendedSearchForm1_searchString").attr("title");
        if (title !== hint) {
            var val = $("#extendedSearchForm1_searchString").val();
            $("#extendedSearchForm1_searchString").attr("title", hint);
            if (val === title) {
                $("#extendedSearchForm1_searchString").val('');
            }
            showHints();
        }
    }

    function _clearPurchaseMethodSelectionAndHide(selector) {
        $(selector).each(function () {
            if($(this).css("display").toLowerCase()  == "none") {
                $(this).find("input:checked").removeAttr("checked");
            }
        });
    }

    var _rebuildInputLabels = function(selector) {
        $(selector).each(function () {
            var checkedInputs = $(this).siblings("div.selectChose").find("input:checked");
            var inputLabel = _buildInputLabel(checkedInputs);
            var placeholderText = $(this).find(".msPlaceholder").data("initial");
            if (inputLabel == '') {
                $(this).find(".msPlaceholder").text(placeholderText).removeClass("choseColor")
            } else {
                $(this).find(".msPlaceholder").text(inputLabel).addClass("choseColor");
            }
        });
    };

    var initForm = function() {
        _setupRadioOnChange();
        showCorrectPlaceOfSearch();
        _rebuildInputLabels("td.manySelect .collapsed");

        $(".msPlaceholder").each(function () {
            $(this).parents("div.collapsed").parents("td.manySelect").attr("title", $(this).attr('data-initial'));
        });

        $(".hint").focus(function () {
            if (this.value === this.title || this.value === $(this).data("lastValue")) {
                $(this).attr("value", "").css("color", "#000000");
            }
        }).blur(function () {
                var newValue = this.title;
                if ($(this).attr('id') == "extendedSearchForm1_searchString") {
                    newValue = reduceTextByWidth($(this));
                }
                if (this.value === this.title || this.value === $(this).data("lastValue") || this.value == '') {
                    $("div .clearButton").hide();
                    $(this).attr("value", newValue).css("color", "#999999");
                    $(this).data("lastValue", newValue);
                }
            });

        $(".numeric").numeric({ decimal: false, negative: false });

        // Указываем дейтпикеру что выводить все нужно на русском
        $.datepicker.setDefaults($.datepicker.regional['ru']);
        $(".datepicker_ru").datepicker({
            dateFormat: 'dd.mm.yy'
        });

        $("#searchType input[type='radio']").change(function(){
            checkSearchType();
        });

        $("#extendedSearchForm2").validate({
            errorElement: "p",
            errorClass: "errorRed",
            errorPlacement: function(error, element) {
                if(element.attr("id") != null){
                    var errorPlace = $("#" + element.attr("id").replace(/\|/g, "\\|") + "_error");
                    error.appendTo(errorPlace);
                    errorPlace.parent("tr").css("display", "table-row");
                }else{
                    error.insertAfter(element);
                    error.css("padding","5px 0");
                }
            }
        });

        var placeOfSearchList = getPlaceOfSearchList();
        import_epzOrderLawCommonForm.initCommonFormInputs(placeOfSearchList);
        import_law44Form.initLaw44FormInputs();
        import_law223Form.initLaw223FormInputs();
        import_law94Form.initLaw94FormInputs();

        import_epzCommonChooseHeadAgency.doInitCommonChooseHeadAgency('chooseHeadAgencyAnchor', 'epzCommonChooseHeadAgency.addHeadAgencyCallback');

        var purchaseMethodZK = $("[name='purchaseMethodList'][value='ZK']");
        visibleNewOfferOpenDates(purchaseMethodZK);
        purchaseMethodZK.on('change',function(value){
            visibleNewOfferOpenDates(purchaseMethodZK);
        });
    };

    var submitExtendedSearchForm2 = function () {
        /*if (!$("#placeOfSearch223").attr("checked") && !$("#placeOfSearch94").attr("checked") && !$("#placeOfSearch44").attr("checked")) {
            $.msgBox({
                type: "alert",
                content: "Внимание! Выберите хотя бы один закон (44-ФЗ или 223-ФЗ, или 94-ФЗ), по данным которого должен осуществляться поиск.",
                buttons: [
                    {type: "cancel", value: "Ок"}
                ],
                success: function (result) {
                    return false;
                }
            });
            $("div.msgBoxTitle").remove();
            $("div.msgBoxBackGround").off('click');
            return;
        }*/
		deleteHints();
        if (onSubmitValidateForm('extendedSearchForm2')) {
            $("[type=hidden][name^=_]").prop("disabled", true);
            showSpinnerOnSubmit();
            if (ifOrganizationInputNotCorrect("#customerNameInput")) {
                import_epzCommonChooseOrganization.clearOrganizationFields("customerNameInput");
            }
            if (ifOrganizationInputNotCorrect("#agencyNameInput")) {
                import_epzCommonChooseOrganization.clearOrganizationFields("agencyNameInput");
            }

            import_epzOrderPurchaseInfoForm.preparePurchaseInfoInputsForSubmit();
            import_law223Form.prepareInputs223ForSubmit();
            import_law44Form.prepareInputs44ForSubmit();

            $("#extendedSearchForm2_searchString").val($('#extendedSearchForm1_searchString').val());
            $("#extendedSearchForm2_morphology").val($("#extendedSearchForm1_morphology").is(":checked"));
            $("#extendedSearchForm2_strictEqual").val($("#extendedSearchForm1_strictEqual").is(":checked"));

			showSpinnerOnSubmit();

			removeHiddenDisplayAreas();
			$("#extendedSearchForm2").submit();

        } else {
			showHints();
		}
    };

    function removeHiddenDisplayAreas() {
        var placeOfSearchList = getPlaceOfSearchList();
        var placeOfSearchListCss = getPlaceOfSearchListCss(placeOfSearchList);

        removeOrNot("#okdpBlock94and223or94", !isFz94and223BothOr94Only(placeOfSearchList));
        removeOrNot("#okdpBlock223Only", !isFz223Only(placeOfSearchList));

        if (isLotSearch()) {
            $("#ordersOptions").remove();
        } else {
            $("#lotsOptions").remove();
        }
        if (placeOfSearchListCss.length > 0) {
            $(".displayArea44, .displayArea94, .displayArea223").each(function() {
                var elem = $(this);
                var found = $.grep(placeOfSearchListCss, function (value, index) {
                    return elem.hasClass(value);
                });
                if (!(placeOfSearchListCss.length == found.length)) {
                    elem.remove();
                }
            });
        } else {
            $(".displayArea44, .displayArea94, .displayArea223").remove();
        }
        if($('input[name=placeOfSearch]:checked').length == 1){
            $('#searchInAttachmentsBlock').remove();
        }
    }

    function isLotSearch() {
        var placeOfSearchList = getPlaceOfSearchList();
        var searchType = getSelectedSearchType();
        return (placeOfSearchList.length == 1) &&
            (placeOfSearchList[0] == 'FZ_223') &&
            (searchType == 'LOTS');
    }

    var clearForm = function(form, afDesc, caDesc, defaultMatchingWordCheckbox94, epzOrderUrl) {
        var placeOfSearchList = getPlaceOfSearchList();

        var searchType = getSelectedSearchType();

        form.reset();

        $("#extendedSearchForm2 input[type='checkbox']").each(function () {
            $(this).removeAttr('checked');
        });

        import_epzOrderLawCommonForm.restorePlaceOfSearchAndSearchType223(placeOfSearchList, searchType);

        epzCommonChooseOrganization.clearOrganizationAutocomplete(true);

        $("select option").removeAttr("selected");
        $("select option:first-child").attr("selected", true);
        $("span.select").each(function(){
            $(this).remove();
        });
        customSelect();

        $("td.manySelect .collapsed").each(function() {
            $(this).siblings("div.selectChose").find("input:checked").removeAttr("checked");
            var placeholderText=$(this).find(".msPlaceholder").data("initial");
            $(this).find(".msPlaceholder").text(placeholderText).removeClass("choseColor")
        });

        $("div.listOrg ul").empty();

        $("#extendedSearchForm2 input[type='text']").each(function () {
            $(this).attr("value", "");
        });
        $("#extendedSearchForm1_searchString").val("");
        $("#extendedSearchForm1_morphology").removeAttr('checked');
        $("#extendedSearchForm1_strictEqual").removeAttr('checked');
        $("#extendedSearchForm1_morphology").removeAttr('disabled');
        $("#extendedSearchForm1_strictEqual").removeAttr('disabled');

        import_epzOrderLawCommonForm.resetCommonFormInputs();
        import_epzOrderPurchaseInfoForm.resetPurchaseInfoFormInputs();
        import_law44Form.reset1Inputs44();
        import_law223Form.resetInputs223();
        import_law94Form.resetInputs94();


        $("#extendedSearchForm2 input[type='checkbox'][name='matchingWordPlace94'][value='" + defaultMatchingWordCheckbox94 + "']").attr('checked', 'checked');


        $("tr td span.errorRed").each(function () {
            $(this).css("display", "none");
        });

        $("#selectedMatchingWordPlace223Li0").attr('checked', 'checked');

        if (searchType == 'LOTS') {
            initLotsOptions();
        }

        $("#placeOfSearch44").attr("checked", true);
        $("#placeOfSearch223").attr("checked", true);
        $("#placeOfSearch94").attr("checked", false);
        showCorrectPlaceOfSearch();

        showHints();
        $("#addPurchaseMethodBtn").removeClass("resetBtn");
        $("#addPurchaseMethodBtn").attr("href", epzOrderUrl + "/purchase/open.html");
    };

    function visibleNewOfferOpenDates(purchaseMethodZK){
        if(purchaseMethodZK.is(':checked')){
            $('#newOfferOpenDates').show();
        }else{
            $('#newOfferOpenDates').hide();
        }
    }

    return {
        checkSearchType: checkSearchType,
        initForm: initForm,
        clearForm: clearForm,
        _rebuildInputLabels: _rebuildInputLabels,
        submitExtendedSearchForm2: submitExtendedSearchForm2
    }
}(orderNsi, epzCommonChooseOrganization, epzOrderConstants, epzOrderLawCommonForm, epzOrderPurchaseInfoForm,
        law223Form, law44Form, law94Form, epzCommonChooseHeadAgency);