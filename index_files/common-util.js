var epzOrderCommonUtil = function () {

    function setManySelectLabel(element){
        var inputLength = $(element).siblings("div.selectChose").find("input:checked").length;
        var inputLabel = $(element).siblings("div.selectChose").find("input:checked").parents("li").map(function () {
            return $(this).text();
        }).get().join(", ");

        var placeholderText = $(element).find(".msPlaceholder").data("initial");
        if (inputLength === 0) {
            $(element).find(".msPlaceholder").text(placeholderText).removeClass("choseColor")
        } else {
            $(element).find(".msPlaceholder").text(inputLabel).addClass("choseColor");
        }
    }

    return {
        setManySelectLabel: setManySelectLabel
    }
}();