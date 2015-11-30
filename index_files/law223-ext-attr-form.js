var extAttr = function (import_epzCommonConfig, import_epzOrderLawCommonForm) {

    var extendedAttributesAllowedToChooseCount = 10;

    var additionalAttrValidate = function() {
        $("#extendedAttributesDiv li").each(function (index, value) {
            if ($(value).hasClass("link")) {
                $(value).find("input[type=text]").rules("add", {
                    url: true,
                    required: true,
                    messages: {
                        required: jQuery.format("Пожалуйста, заполните поле")
                    }});
            } else if ($(value).hasClass("number")) {
                var valueFrom = $(value).find("input[type=text][name$=valueFrom]");
                var valueTo = $(value).find("input[type=text][name$=valueTo]");
                $(valueFrom).rules("add", {
                    number: true,
                    required: true,
                    numberLessThan: $(valueTo).attr("id"),
                    messages: {
                        number: jQuery.format("Пожалуйста, введите число"),
                        required: jQuery.format("Пожалуйста, введите число"),
                        numberLessThan: jQuery.format("Минимальное значение не может быть больше максимального значения")
                    }});

                $(valueTo).rules("add", {
                    number: true,
                    required: true,
                    messages: {
                        number: jQuery.format("Пожалуйста, введите число"),
                        required: jQuery.format("Пожалуйста, введите число")
                    }});
            } else if ($(value).hasClass("integer")) {
                var valueFrom = $(value).find("input[type=text][name$=valueFrom]");
                var valueTo = $(value).find("input[type=text][name$=valueTo]");
                $(valueFrom).rules("add", {
                    integer: true,
                    required: true,
                    numberLessThan: $(valueTo).attr("id"),
                    messages: {
                        number: jQuery.format("Пожалуйста, введите целое число"),
                        required: jQuery.format("Пожалуйста, введите целое число"),
                        numberLessThan: jQuery.format("Минимальное значение не может быть больше максимального значения")
                    }});

                $(valueTo).rules("add", {
                    integer: true,
                    required: true,
                    messages: {
                        number: jQuery.format("Пожалуйста, введите целое число"),
                        required: jQuery.format("Пожалуйста, введите целое число")
                    }});
            } else if ($(value).hasClass("date")) {
                var dateValueFrom = $(value).find("input[type=text][name$=valueFrom]");
                var dateValueTo = $(value).find("input[type=text][name$=valueTo]");
                $(dateValueFrom).rules("add", {
                    dateRu: true,
                    required: true,
                    dateLessThan: $(dateValueTo).attr("id").replace(/\|/g, "\\|"),
                    messages: {
                        dateRu: jQuery.format("Пожалуйста, введите дату в формате ДД.ММ.ГГГГ"),
                        required: jQuery.format("Пожалуйста, введите дату в формате ДД.ММ.ГГГГ"),
                        dateLessThan: jQuery.format("Дата начала периода не может быть больше даты окончания периода")
                    }});

                $(dateValueTo).rules("add", {
                    dateRu: true,
                    required: true,
                    messages: {
                        dateRu: jQuery.format("Пожалуйста, введите дату в формате ДД.ММ.ГГГГ"),
                        required: jQuery.format("Пожалуйста, введите дату в формате ДД.ММ.ГГГГ")
                    }});

            } else if ($(value).hasClass("datetime")) {

                var dateTimeValueFrom = $(value).find("input[type=text][name$=valueFrom]");
                var dateTimeValueTo = $(value).find("input[type=text][name$=valueTo]");

                $(dateTimeValueFrom).rules("add", {
                    dateTimeGroup: true,
                    required: true,
                    dateTimeGroupBefore: $(dateTimeValueTo).attr("id"),
                    messages: {
                        required: jQuery.format("Пожалуйста, введите дату и время в формате ДД.ММ.ГГГГ ЧЧ:ММ"),
                        dateTimeGroup: jQuery.format("Пожалуйста, введите дату и время в формате ДД.ММ.ГГГГ ЧЧ:ММ"),
                        dateTimeGroupBefore: jQuery.format("Дата начала периода не может быть больше даты окончания периода")
                    }});

                $(dateTimeValueTo).rules("add", {
                    dateTimeGroup: true,
                    required: true,
                    messages: {
                        required: jQuery.format("Пожалуйста, введите дату и время в формате ДД.ММ.ГГГГ ЧЧ:ММ"),
                        dateTimeGroup: jQuery.format("Пожалуйста, введите дату и время в формате ДД.ММ.ГГГГ ЧЧ:ММ")
                    }});
            }
//            else if ($(value).hasClass("boolean")) {
//                $(value).find("input[type=checkbox]").rules("add", {
//                    required: true,
//                    messages: {
//                        required: jQuery.format("Пожалуйста, заполните поле")
//                    }});
//            }
            else {
                $(value).find("input[type=text]").rules("add", {
                    required: true,
                    messages: {
                        required: jQuery.format("Пожалуйста, заполните поле")
                    }});
            }

        });
    };

    var prepareInputs223ExtendedForSubmit = function() {
        var searchByAttributes = $("#searchByAttributes input[type='radio']:checked").val();
        if (searchByAttributes == 'NOTIFICATION') {
            $("#protocolType select").val('');
        } else {
            $("#purchaseMethod select").val('');
        }
    };

//    Передача в popup-окно "Выбор расширенных атрибутов" выбранных значений полей "Способ закупки" и "Тип протокола"
    var updateSelectAttributesPopupUrl = function() {
        var destination;
        var parentId;
        $("#searchByAttributes input[type='radio']").each(function () {
            if ($(this).prop("checked")) {
                destination = $(this).val();
            }
        });
        if (destination === "NOTIFICATION") {
            parentId = $("#purchaseMethod select").val();
            $("#purchaseMethod").show();
            $("#protocolType").hide();
        } else if (destination === "PROTOCOL") {
            parentId = $("#protocolType select").val();
            $("#purchaseMethod").hide();
            $("#protocolType").show();
        }

        var link = $("#addExtendedAttributes");
        if (destination && parentId && parentId != '') {
            link.prop("href", import_epzCommonConfig.contextPath + "/chooseExtendedAttribute/chooseExtendedAttributeDialog.html?searchText=&parentId="
                + parentId + "&destination=" + destination);
            link.prop("disabled", false);
            link.removeClass("disabledBtn");
        } else {
            link.prop("href", "");
            link.prop("disabled", true);
            link.addClass("disabledBtn");
        }
    };

    function setupRadioOnChange() {
        $("#searchByAttributes input[type='radio']").change(function(){
            if (this.checked) {
                var selectValue = this.value;
                if (selectValue == 'NOTIFICATION') {
                    $("#purchaseMethod").show();
                    $("#protocolType").hide();
                } else {
                    $("#purchaseMethod").hide();
                    $("#protocolType").show();
                }
            }
            updateSelectAttributesPopupUrl();
            $("#extendedOptions select").change();
        });
    }

    var initExtAttr = function() {
        import_epzOrderLawCommonForm.addCustomerChangedListener(onCustomerOrganizationChanged);

        setupRadioOnChange();
        setupOnChange();

//        Запрет строки быстрого поиска с переключателями «С учетом морфологии» и «Строгое соответствие» для поиска по расширенным атрибутам
//        $(".searchBox").find("*").attr('disabled', 'disabled');
//        $("#extendedSearchForm1_searchString").data("lastTitle", $("#extendedSearchForm1_searchString").attr("title"));
//        $("#extendedSearchForm1_searchString").attr("title", "");
        changeSelectColor($("#purchaseMethod select"));
        changeSelectColor($("#protocolType select"));
        checkAttributesAccess($("#customerNameInputFz223Id").val());
        updateSelectAttributesPopupUrl();
        additionalAttrValidate();

        $("#extendedOptions").on("onExpand", function(event) {
            var agencyId = $("#customerNameInputFz223Id").val();
            if (agencyId == "" || agencyId == -1) {
                $("#customerError").removeClass('hideHint');
                $("#extendedOptionsBlock").addClass('hideHint');
            } else {
                $("#customerError").addClass('hideHint');
                $("#extendedOptionsBlock").removeClass('hideHint');
            }
        });
    };

    function checkAttributesAccess(agencyId) {
        if (agencyId != "" && agencyId > -1) {
            $("#extendedOptions select,span.select").removeAttr('disabled');
            if ($("#extendedOptions div.expandBox").css("display") == "none" && ($("#purchaseMethod select").val() != '' || $("#protocolType select").val() != '')) {
                // Разворачиваем блок "Расширенные атрибуты закупок" после "Изменить параметры поиска"
                $("#extendedOptions h2 span").click();
            }
            if ($("#extendedOptions div.expandBox").css("display") == "block" && $("#purchaseMethod select").val() == '' && $("#protocolType select").val() == '') {
                // Сворачиваем блок "Расширенные атрибуты закупок" при изменении Заказчика
                $("#extendedOptions h2 span").click();
            }
        } else {
            //$("#extendedOptions select,span.select").attr('disabled', 'disabled');
            if ($("#extendedOptions div.expandBox").css("display") == "block") {
                // Сворачиваем блок "Расширенные атрибуты закупок" при очистке Заказчика
                $("#extendedOptions h2 span").click();
            }
        }
    }

    function setupOnChange() {
        $("#extendedOptions select").change(function(){
            $("#extendedAttributesDiv").empty();
            changeSelectColor($(this));
        });

        $("#purchaseMethod select").change(function() {
            if (this.value == '') {
                return;
            }
            updateSelectAttributesPopupUrl();
            if ($("#ulPurchaseMethods").find("input:checked").length > 0) {
                $.msgBox({
                    type: "confirm",
                    content: "Поиск по расширенным атрибутам возможен только по выбранному способу закупки. Удалить значения, установленные в поле «Способ размещения закупки (заказа) \\ определения поставщика»?",
                    buttons: [{
                        type: "submit",
                        value: "Да"
                    }, {
                        type: "cancel",
                        value: "Нет"
                    }],
                    success: function(result) {
                        if (result === "Да") {
                            $("#ulPurchaseMethods").find("input:checked").removeAttr("checked");
                            epzOrderExtSearch._rebuildInputLabels("#tdPurchaseMethods .collapsed");
                        } else {
                            $("#purchaseMethod select").val('');
                            $("#purchaseMethod select").change();
                        }
                    }
                });
            }
        });

        $("#protocolType select").change(function() {
            updateSelectAttributesPopupUrl();
        })
    }

    var disableAddButton = function(){
        $('#addExtendedAttributes').addClass("disabledBtn");
        $('#addExtendedAttributes').removeAttr('href');
    };

    var enableAddButton = function(){
        if($('#addExtendedAttributes').hasClass("disabledBtn")){
            $('#addExtendedAttributes').removeClass("disabledBtn");
            updateSelectAttributesPopupUrl();
        }
    };

    function changeSelectColor(element) {
        var selectValue = element.val();
        if (selectValue == '') {
            element.next("span.select").css("color", "#999999");
        } else {
            element.next("span.select").css("color", "#000000");
        }
    }

    var customerNameInputFz223IdOldValue;
    var onCustomerOrganizationChanged = function(newData) {
        if (customerNameInputFz223IdOldValue != newData.fz223id) {
            customerNameInputFz223IdOldValue = newData.fz223id;
            changeOrganization();
        }
    };

//    Загрузка новых опций для полей "Способ закупки" и "Тип протокола" при изменении организации-заказчика через выпадающий список autocomplete или popup-окно "Выбор заказчика"
    function changeOrganization() {
        var agencyId = $("#customerNameInputFz223Id").val();
        $("#extendedOptions select option[value!='']").remove();
        $("#extendedOptions select").val('');
        $("#extendedOptions select").change();
        $("#extendedAttributesDiv").empty();
        $("#searchByAttributes input[type='radio'][value='NOTIFICATION']").attr('checked', 'checked');
        $("#searchByAttributes input[type='radio']").change();
        checkAttributesAccess(agencyId);
        $.ajax({
            url: import_epzCommonConfig.contextPath + '/changeOrganization.html?agencyId=' + agencyId,
            type:'GET',
            cache: false,
            dataType: 'json',
            success: function (res) {
                for (var key in res.purchaseMethodList){
                    $("#purchaseMethod select").append('<option value="' + res.purchaseMethodList[key].id + '">' + res.purchaseMethodList[key].name + '</option>');
                }
                for (var key in res.protocolTypeList){
                    $("#protocolType select").append('<option value="' + res.protocolTypeList[key].id + '">' + res.protocolTypeList[key].name + '</option>');
                }
                $("#extendedOptions").trigger("onExpand");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Произошла ошибка " + XMLHttpRequest.status + ': ' + errorThrown);
            }
        });
    }

    return {
        onCustomerOrganizationChanged: onCustomerOrganizationChanged,
        initExtAttr: initExtAttr,
        extendedAttributesAllowedToChooseCount: extendedAttributesAllowedToChooseCount,
        additionalAttrValidate: additionalAttrValidate,
        prepareInputs223ExtendedForSubmit: prepareInputs223ExtendedForSubmit,
        disableAddButton: disableAddButton,
        enableAddButton: enableAddButton
    }
}(epzCommonConfig, epzOrderLawCommonForm);