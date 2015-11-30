var epzOrderLawCommonForm = function (import_epzCommonChooseOrganization, import_orderOrganization, import_purchaseMethod, import_federalDistrict) {

    var customerChangedListenerList = [];
    var addCustomerChangedListener = function(callback) {
        customerChangedListenerList.push(callback);
    };

    var selectListener = function(newData) {
        $.each(customerChangedListenerList, function(index, value) {
            value.call(undefined, newData);
        });
    };

    var updateCommonFormInputsOnChangeLaw = function(placeOfSearchList) {

        import_epzCommonChooseOrganization.updateOrganizationOnChangeLaw('customerNameInput', placeOfSearchList);
        import_epzCommonChooseOrganization.updateOrganizationOnChangeLaw('agencyNameInput', placeOfSearchList);

        var purchaseMethods = $("#tdPurchaseMethods").find(".selectChose");
        if (placeOfSearchList.length < 1) {
            purchaseMethods.addClass("emptySelect").hide();
            $("#tdPurchaseMethods").find(".collapsed").unbind("click");
        } else if (purchaseMethods.hasClass("emptySelect")) {
            purchaseMethods.removeClass("emptySelect");
            toggleManySelect("#tdPurchaseMethods .collapsed");
        }
        showHideSearchInAttachmentsBlock();
    };

    var showHideSearchInAttachmentsBlock = function() {
        if (getPlaceOfSearchList().length == 1) {
            $('#searchInAttachmentsBlock').hide();
        }
        else {
            $('#searchInAttachmentsBlock').show();
        }
    }

    var getPlaceOfSearchListFunc = function() {
        return getPlaceOfSearchList();
    };

    function getPlaceOfSearchList() {
        var checkedList = $("#radioContainer input[name='placeOfSearch']:checked");
        var placeOfSearchList = $.map(checkedList, function (item) {
            return $(item).val();
        });
        return placeOfSearchList;
    }

    var initCommonFormInputs = function(placeOfSearchList) {
        import_orderOrganization.initChooseOrganization("customerNameInput", getPlaceOfSearchListFunc, selectListener);
        import_orderOrganization.initChooseOrganization("agencyNameInput", getPlaceOfSearchListFunc);
        import_purchaseMethod.initPurchaseMethod();
    };

    var restorePlaceOfSearchAndSearchType223 = function(placeOfSearchList, searchType) {
        $("#searchType input[type='radio'][value='" + searchType + "']").attr('checked', 'checked');
        $.each(placeOfSearchList, function(index, value) {
            $("#radioContainer input[name='placeOfSearch'][value='" + value + "']").attr('checked', 'checked');
        });
    };

    var resetOrderStage = function() {
        $("#extendedSearchForm2 input[type='checkbox'][name='orderStages'][value='AF']").attr('checked', 'checked');
        $("#extendedSearchForm2 input[type='checkbox'][name='orderStages'][value='CA']").attr('checked', 'checked');

        //Заполняем значениями по умолчанию поле "Этап размещения"
        var orderStageSelect = $("#extendedSearchForm2 input[type='checkbox'][name='orderStages']").parents("td.manySelect").children("div.collapsed").children("span.msPlaceholder");
        orderStageSelect.html('Подача заявок' + ", " + 'Работа комиссии');
        orderStageSelect.addClass("choseColor");
    };

    var resetPlaceOfSearch = function() {
        $("#placeOfSearch44").attr('checked', 'checked');
        $("#placeOfSearch223").attr('checked', 'checked');

    };

    var resetCommonFormInputs = function() {
        resetOrderStage();
        import_purchaseMethod.resetInputsPurchaseMethod();
        epzCommonChooseOrganization.clearOrganizationFields("customerNameInput");
        epzCommonChooseOrganization.clearOrganizationFields("agencyNameInput");
        import_federalDistrict.changeRegions();

    };

    return {
        restorePlaceOfSearchAndSearchType223: restorePlaceOfSearchAndSearchType223,
        initCommonFormInputs: initCommonFormInputs,
        resetCommonFormInputs: resetCommonFormInputs,
        updateCommonFormInputsOnChangeLaw: updateCommonFormInputsOnChangeLaw,
        resetOrderStage: resetOrderStage,
        resetPlaceOfSearch: resetPlaceOfSearch,
        showHideSearchInAttachmentsBlock: showHideSearchInAttachmentsBlock,
        addCustomerChangedListener: addCustomerChangedListener
    }
}(epzCommonChooseOrganization, orderOrganization, purchaseMethod, federalDistrict);