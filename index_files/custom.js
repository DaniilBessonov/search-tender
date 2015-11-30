//отобаражает окно по центру экрана
function showPopup(url, width, height, params, popupName, features) {
    if (!width) width = 915;
    if (!height) height = 600;
    if (!popupName) popupName = "popup";

    var left = parseInt((screen.availWidth / 2) - (width / 2));
    var top = parseInt((screen.availHeight / 2) - (height / 2));
    var windowFeatures = "scrollbars=yes,width=" + width + ",height=" + height + ",status,left=" + left + ",top=" + top + ",screenX=" + left + ",screenY=" + top;
    if (features) {
        windowFeatures += ("," + features);
    }
    var openWindow = null;

    if (params != undefined) {
        var sData = "<form name='submitform' id='submitform' action='" + url + "' method='post'>";
        for (var key in params) {
            sData = sData + "<input type='hidden' name='" + key + "' value='" + params[key] + "' />";
        }
        sData = sData + "</form>";
        sData = sData + "<script type='text/javascript'>";
        sData = sData + "document.submitform.submit();</script>";
        openWindow = window.open("", popupName, windowFeatures);
        if (openWindow!=null&&!openWindow.closed) {
            try {
                openWindow.document.write(sData);
            } catch (e) {
                //do nothing.
            }
        }
    } else {
        windowFeatures += ',resizable';
        // Fix for IE - remove from popupName All '-'
        popupName = popupName.replace(/-/g, "");
        openWindow = window.open(url, popupName, windowFeatures);
    }
    if (typeof(blockWindow) !== 'undefined') {
        blockWindow(openWindow);
    }
    if(typeof(unBlockWindow) !== 'undefined'){
        if (openWindow!=null&&!openWindow.closed) {
            try {
                openWindow.onBeforeUnload = unBlockWindow();
            } catch (e) {
                //do nothing.
            }
        }
    }
	return openWindow;
}

//Функция добавления в строку STR через заданное количество слов WORLDSCOUNT разделителя '\n'
function prepareStirng(str, worldsCount) {

    if (str === '' || worldsCount === 0) {
        return '';
    }

    var words = str.split(' ');

    if (worldsCount >= words.length) {
        return str;
    }

    var result = '';
    var countStrings = parseInt(words.length / worldsCount);
    var endWorldsCount = words.length % worldsCount;

    for (var i = 0; i < countStrings; i++) {
        for (var j =  i * worldsCount; j < (i + 1) * worldsCount; j++) {
            result += words[j] + ' ';
        }
        if($.browser.msie && document.documentMode == 8) {
            result += '\n';
        }else{
            result += '\n\r';
        }
    }

    for (var k = words.length - endWorldsCount; k < words.length; k++) {
        result += words[k] + ' ';
    }

    return result;
}

function customConfirm(msg, succesFunc) {
    customConfirm(msg, succesFunc, null);
}

function customConfirm(msg, succesFunc, title) {
    customConfirm(msg, succesFunc, title, "Продолжить", "Отменить");
}
function customDeleteConfirm(msg, succesFunc, title) {
    customConfirm(msg, succesFunc, title, "Удалить", "Отмена"); // "Удалить", "Отмена" - стандартные названия кнопок по спекам в диалоге удаления.
}

function customConfirm(msg, succesFunc, title, submitTitle, cancelTitle, rh) {
    customConfirm(msg, succesFunc, title, submitTitle, cancelTitle, rh, null);
}

function customConfirm(msg, succesFunc, title, submitTitle, cancelTitle, rh, cancelFunc) {
    if (msg) {
        msg = msg.replace(/\n/g, "<br/>");
    }
/*    if (title)
    {
        if (rh) {
            msg = "<div class='msg_red_title'>" + title + "</div><br/>" + msg;
        } else {
            msg = "<div class='msg_title'>" + title + "</div><br/>" + msg;
        }
    }*/
    submitTitle = submitTitle || "Продолжить";
    cancelTitle = cancelTitle || "Отмена";

    $.msgBox({
        type:"confirm",
        title:title,
        content:msg,
        buttons: [
            {type: "submit", value: submitTitle},
            {type: "cancel", value: cancelTitle}
        ],
        success: function(result) {
            if (result === submitTitle) {
                succesFunc.call();
            } else {
                if (cancelFunc != undefined) {
                    cancelFunc.call();
                }
            }
        }
    });
    if (title != undefined) {
        $("div.msgBoxTitle").remove();
    }
    $("div.msgBoxBackGround").off('click');
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

// Функция для исправления данных инпутов, если в них должны быть только числа, а валидация не работает
function parseStringToInt(id) {
    var selector = "#" + id;
    $(selector).number(true);
    if (isBlank($(selector).val())) {
        $(selector).attr("value", '');
    } else {
        $(selector).attr("value", parseInt($(selector).val()));
    }
}

// Функция валидации для сабмита формы
function onSubmitValidateForm(id){
    var valid =  $('#' + id).validate().form();

    //если валидация не прошла восстанавливаем подсказки
    if (!valid) {
        showHint();
    }

    return valid;
}

// Функция восстановления подсказок в незаполненных полях
function showHint() {
    $(".hint").each(function() {
        if (this.value === this.title || this.value == '') {
            $(this).attr("value", this.title).css("color", "#999999");
        }
    });
}

function showPopUpHint() {
    $(".popUp .hint").each(function() {
        if (this.value === this.title || this.value == '') {
            $(this).attr("value", this.title).css("color", "#999999");
        }
    });
}

function deletePopUpHint() {
    $(".popUp .hint").each(function() {
        if (this.value === this.title || this.value == '') {
            $(this).attr("value", '').css("color", "#000000");
        }
    });
}

function openPrintForm(printFormUrl) {
    var uniqueBudgetCodes = [];
    $("input.entityId[type=hidden]").each(function() {
        var budgetCode = $(this).attr("budgetCode");
        if ($.inArray(budgetCode, uniqueBudgetCodes) < 0) {
            uniqueBudgetCodes.push(budgetCode);
        }
    });
    if (uniqueBudgetCodes.length == 1) {
        openPFWindows(uniqueBudgetCodes, printFormUrl);
    } else {
        var windowLabel;
        if (uniqueBudgetCodes.length <= 4) {
            windowLabel = 'окна/вкладки';
        } else {
            windowLabel = 'окон/вкладок';
        }
        var message = "Печатные формы сформированы по уровням бюджета.<br/> Будет открыто "+ uniqueBudgetCodes.length + " " + windowLabel;

        var submitTitle = 'Продолжить';
        var cancelTitle = 'Отменить';

        $.msgBox({
            content:message,
            type:"info",
            buttons: [
                { value: submitTitle }, {value:cancelTitle}
            ],
            success: function (result) {
                if (result == submitTitle) {
                    openPFWindows(uniqueBudgetCodes, printFormUrl);
                    return true;
                }
            }
        });
        $("div.msgBoxBackGround").off('click');
    }
}

function openPFWindows(uniqueBudgetCodes, printFormUrl) {
    $.each(uniqueBudgetCodes, function(index, value) {
        var cids = [];
        $("input.entityId[type=hidden]").each(function() {
            if ($(this).attr("budgetCode") == value) {
                cids.push($(this).val());
            }
        });
        var timestamp = Number(new Date());
        window.open(printFormUrl + "pgz/printForm?type=CONTRACTS&bid="+ parseInt(value == '' ? 0 : value) + "&cids=" + cids, "ContractsRegisterPF_" + timestamp);
    });
}

function downloadCsv(pgzUrl, criteria) {
    var userId=readCookie("contractCsvSettingsId");
    var url = pgzUrl + "/contractCsvSettings/download.html" + criteria + "&userId=" + userId;
    window.open(url);
}

function reloadWidgetTab(url, element){
    $.ajax({
        url:url,
        type:'GET',
        headers: {'Cache-Control': 'max-age=3600'},
        dataType: 'html',
        beforeSend: function () {
            addLoadingClass(element);
        },
        success: function (html) {
            $(element).html(html);
            removeLoadingClass(element);
            customSelect();
            carouselOther();
            sizeLiOther();
            lowChoice();
            checkSwitcher();
            jQuery('select').each(function() {
                jQuery(this).removeAttr('title');
            });
        }
    });
}

function checkCountAndDownloadCsv(serverHost, criteria_url, isExt, count, maxExported, callback) {
    if (count > maxExported) {
        var submitTitle = 'Продолжить';
        var cancelTitle = 'Отменить';
        $.msgBox({
            content:"Результаты поиска превышают допустимое количество записей для выгрузки. В случае продолжения операции будут выгружены " + maxExported + " реестровых записей (последних по дате обновления).",
            type:"info",
            buttons: [
                { value: submitTitle }, {value:cancelTitle}
            ],
            success: function (result) {
                if (result == submitTitle) {
                    if(!callback) {
                        loadContractCsvSettings(serverHost, criteria_url);
                    } else {
                        callback(serverHost, criteria_url);
                    }
                    return true;
                }
            }
        });
        $("div.msgBoxBackGround").off('click');
    } else {
        if (!callback) {
            loadContractCsvSettings(serverHost, criteria_url);
        } else {
            callback(serverHost, criteria_url);
        }
    }
}

function loadContractCsvSettings(serverHost, criteria_url){
    var url = serverHost + '/contractCsvSettings/loadSettings.html' + criteria_url;
    var userId = readCookie("contractCsvSettingsId");
    $('.loadSettings').attr('href', url);
    $('.loadSettings').click();
}

function showMsBox(msg){

    $.msgBox({
        type:"info",
        content:msg,
        buttons:{type: "cancel", value: "Ок"},
        success:function(result){
            return true;
        }
    });
    $("div.msgBoxTitle").remove();
    $("div.msgBoxBackGround").off('click');
}

function infoMsBox(msg, callback){
    $.msgBox({
        type:"info",
        content:msg,
        buttons:{type: "cancel", value: "Ок"},
        success:function(result){
            callback;
        }
    });
    $("div.msgBoxTitle").remove();
    $("div.msgBoxBackGround").off('click');
}

function addLoadingClass(selector) {
    $("#analyticsTabs").append("<div class='loading' />");
    $("#analyticsTabs").addClass("make-relative");

    $("div.loading").width($("#analyticsTabs").width());
    $("div.loading").height($("#analyticsTabs").height());
}

function removeLoadingClass(selector) {
    $("#analyticsTabs").removeClass("make-relative");
    $("div.loading").remove();
}

//Функция добавления в строку STR через заданное количество слов WORLDSCOUNT разделителя DELIMITER
function prepareStringByCharsCount(str, stringLength, delimiter) {
    if (str.length <= stringLength) {
        return str;
    }
    if (!delimiter) {
        if ($.browser.msie && document.documentMode == 8) {
            delimiter = '\n';
        } else {
            delimiter = '\n\r';
        }
    }

    var words = str.split(' ');

    var result = '';
    var stringResult = '';
    for (var i = 0; i < words.length; i++) {
        stringResult += words[i] + ' ';
        if (i != (words.length - 1) && (stringResult.length + words[i + 1].length) >= stringLength) {
            result += stringResult + delimiter;
            stringResult = "";
        }
    }
    if ($.browser.msie && document.documentMode == 8) {
        result += stringResult;
    } else {
        result += stringResult;
    }
    return result;
}

function getStringCount(str, stringLength) {
    if (str.length <= stringLength) {
        return 1;
    }
    var words = str.split(' ');
    var stringResult = '';
    var stringCount = 0;
    for (var i = 0; i < words.length; i++) {
        stringResult += words[i] + ' ';
        if (i != (words.length - 1) && (stringResult.length + words[i + 1].length) >= stringLength) {
            stringCount += 1;
            stringResult = "";
        }
    }
    if (stringResult.length > 0) {
        stringCount += 1;
    }
    return stringCount;
}

String.prototype.pad = function(_char, len, to) {
    if (!this || !_char || this.length >= len) {
        return this;
    }
    to = to || 0;

    var ret = this;

    var max = (len - this.length)/_char.length + 1;
    while (--max) {
        ret = (to) ? ret + _char : _char + ret;
    }

    return ret;
};

function clearOrganizationHiddenFields(inputName) {
    $.each([inputName+"Cpz", inputName+"Fz94Id", inputName+"Fz223Id", inputName+"Inn", inputName+"DraftId"], function (key, value) {
        $("#"+value).attr("value", '');
    });
}

function ifOrganizationInputNotCorrect(inputId) {
    if ($(inputId).val() === $(inputId).attr("title") ||
        $.trim($(inputId).val()) === '' ||
        $(inputId).val().length < 3) {
        return true;
    } else return false;
}

function showSpinnerOnSubmit(){
    var heightVal = $(document).height() + "px";
    $(document.body).append('<div class="loading" id="loadingDiv"/>');
    $("#loadingDiv").css("width", "100%");
    $("#loadingDiv").css("height", heightVal);

}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function createUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function closeContractCSVSettingsDiallog() {
    $('.csvSettingsSelect .msPlaceholder').attr("data-initial", "Выберите личные настройки выгрузки");
    $('.csvSettingsSelect .msPlaceholder').html("Выберите личные настройки выгрузки");
    $("#csvDialog").remove();
}

function resizePopUpWrapperDiv() {
    var popUpHeight = $("div.popUpWrapper").outerHeight();
    var popUpDiv = $("div.popUp");
    if ($.browser.msie && $.browser.version == 7) {
        popUpHeight += 20;
    }
    popUpDiv.css("height", popUpHeight + "px");
    var popUpScroll = $(document).scrollTop();
    popUpDiv.css("margin-top", popUpScroll - popUpHeight / 2 + "px");
    var windowHeight = $(window).height();
    if (popUpHeight > windowHeight) {
        popUpDiv.css("height", windowHeight + "px");
        popUpDiv.css("margin-top", popUpScroll + "px");
        popUpDiv.css("top", "0px");
    }
    popUpDiv.addClass("ElDigSign");
}

function initPasswordHint() {
    $('input.passwordHint')
        .focus(function() {
            $(this).parent().children("label.passwordHint").css('z-index', '-1');
        })
        .blur(function() {
            if($.trim($(this).val()) == '') {
                $(this).parent().children("label.passwordHint").css('z-index', '1');
            }
        });

    $('input.passwordHint').each(function() {
        if($.trim($(this).val()) == '') {
            $(this).parent().children("label.passwordHint").css('z-index', '1');
        } else {
            $(this).parent().children("label.passwordHint").css('z-index', '-1');
        }
    });

}function isLocalStorageAvailable() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

//Функция обрезания строки STR через заданное количество символов SYMBOLSSCOUNT и добавления "..."
function cutStringAddDots(str, symbolsCount) {

    if (str === '' || symbolsCount === 0) {
        return '';
    }

    if (str.length <= symbolsCount) {
        return str;
    }

    // Получаем массив строк, при этом искусственно увеличиваем его на среднюю длину слова в русском языке
    // чтобы не получить обрезанных слов в результате
    var words = str.substr(0, symbolsCount + 20).split(' ');
    var result = '';

    for (var i = 0; i < words.length; i++) {
        if (result.length < symbolsCount) {
            result += words[i] + ' ';
        }
        else {
            result += '&nbsp;...';
            break;
        }

    }

    return result;
}

function cutStringAddDotsWordBreaks(str, symbolsCount) {

    if (str === '' || symbolsCount === 0) {
        return '';
    }

    if (str.length <= symbolsCount) {
        return str;
    }

    var result = '';

    for (var i = 0; i < symbolsCount; i++) {
        if (result.length < symbolsCount) {
            result += str.charAt(i);
        }
    }

    return result + ' ...';
}

function replaceAll(string, token, newtoken) {
    if(token != newtoken) {
        while(string.indexOf(token) > -1) {
            string = string.replace(token, newtoken);
        }
    }
    return string;
}

