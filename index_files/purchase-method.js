var purchaseMethod = function (import_epzCommonConfig) {

    var showHideAddPurchaseMethodBtn = function() {
        if (get_purchase_methods().length > 9) {
            $("#addPurchaseMethodBtn").addClass("resetBtn");
            $("#addPurchaseMethodBtn").removeAttr("href");
        } else {
            $("#addPurchaseMethodBtn").removeClass("resetBtn");
            $("#addPurchaseMethodBtn").attr("href", import_epzCommonConfig.contextPath + "/purchase/open.html");
        }
    };

    var _setupPurchaseMethodRemoveOnclick = function() {
        $("#ulPurchaseMethods li span.closePopUp").click(function () {
            var parent = $(this).parent("li");
            parent.slideUp(200, function () {
                parent.remove();
                showHideAddPurchaseMethodBtn();
            });
        });
    };

    var initPurchaseMethod = function() {
        _setupPurchaseMethodRemoveOnclick();
        showHideAddPurchaseMethodBtn();

        $("#tdPurchaseMethods .collapsed .msPlaceholder").change(function() {
            $("#purchaseMethod select").change();
        });
    };

    var get_purchase_methods = function() {
        return $("#ulPurchaseMethods").find("li label input:checked");
    };

    var insert_purchase_methods = function(selKeys) {
        $(selKeys).each(function (i, el) {
            var newElem = $("#customPurchaseMethodTemplate ul li").clone(true);
            $("input[type='checkbox']", newElem).val(el.id).attr("checked", "checked");
            $("input[type='hidden']", newElem).val(el.id);
            $("label", newElem).append(el.name);
            $('#ulPurchaseMethods').append(newElem);
        });

        showHideAddPurchaseMethodBtn();
        _setupPurchaseMethodRemoveOnclick();
    };

    var resetInputsPurchaseMethod = function() {
        $("li.purchaseMethod223 span.closePopUp").click();
        $("li.purchaseMethod94 span.closePopUp").click();
    };

    return {
        initPurchaseMethod: initPurchaseMethod,
        resetInputsPurchaseMethod: resetInputsPurchaseMethod,
        get_purchase_methods: get_purchase_methods,
        insert_purchase_methods: insert_purchase_methods,
        showHideAddPurchaseMethodBtn: showHideAddPurchaseMethodBtn
    }
}(epzCommonConfig);