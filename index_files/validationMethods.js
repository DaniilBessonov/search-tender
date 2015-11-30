$(document).ready(function() {
    jQuery.validator.addMethod("fieldLength", function(value, element, params) {
        return this.optional(element) || value.length == params;
    }, jQuery.format("Пожалуйста, введите значение длиной {0} символов"));
    jQuery.validator.addMethod("fieldLength23", function(value, element, params) {
        return this.optional(element) || value.length == params;
    }, jQuery.format("Пожалуйста, введите значение длиной {0} символа"));

    jQuery.validator.addMethod("fieldLengthWithSpaces", function(value, element, params) {
        //Проверка, что элемент не пустой и нуждается в валидации
        if (this.optional(element) && value) {
            return true;
        }

        if (value.length <= params) {
            return true;
        }
        else {
            return false;
        }
    }, jQuery.format("Пожалуйста, введите не больше {0} символов"));

    jQuery.validator.addMethod("currencyRu", function(value, element) {
        if (this.optional(element) && value == "") {
            return true;
        }
        var v = value.replace(/ /g, "");
        var regexp = /^(\d+\d*)(,\d{2})?$/;
        var match = regexp.exec(v);
        if (match == null) {
            return false;
        }
        var part1 = match[1];
        for (var index = 0; part1.charAt(index) == '0' && index < part1.length; index++) {
        }
        var numberLength = part1.length - index;
        var valid = numberLength <= 18;
        return valid;
    }, jQuery.format("Пожалуйста, введите число в диапозоне от 0 до 999999999999999999,99 с двумя знаками после запятой"));
    jQuery.validator.addMethod("digitsIfFilled", function(value, element) {
        if (this.optional(element) && value == "") {
            return true;
        }
        return /^\d+$/.test(value);
    }, jQuery.format("Пожалуйста, вводите только целые числа!"));

    jQuery.validator.addMethod("dateRu", function(value, element) {
        if (this.optional(element) && value == "") {
            return true;
        }
        return checkDateRu(value);
    }, jQuery.format("Пожалуйста, введите корректную дату"));

    jQuery.validator.addMethod("documentDate", function(value, element) {
        return isDateMoreThenCurrent(value);
    }, jQuery.format("Дата документа должна быть не позднее текущей"));

    jQuery.validator.addMethod("isEmail", function(value, element) {
        if (this.optional(element) && value == "") {
            return true;
        }
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }, jQuery.format("Пожалуйста, корректно введите Электронную почту"));

    jQuery.validator.addMethod("requiredRadio", function(value, element) {
        var ch = false;
        $("input[name='"+element.name+"']").each(function (k, v) {
            if ($(v).is(":checked")) ch = true;
        });
        return ch;
    }, jQuery.format("Необходимо указать одно из значений"));

    jQuery.validator.addMethod("integer", function(value, element) {
        return value == parseInt(value, 10);
    }, jQuery.format("Пожалуйста, введите целое число"));

    jQuery.validator.addMethod("dateTimeGroup", function (value, element, params) {

        var hours;
        var minutes;

        if ($(element).attr("name").indexOf("valueFrom") > 0) {
            hours = parseInt($(element).parent().parent().find("input[type=text][name$=hoursFrom]").attr("value"));
            minutes = parseInt($(element).parent().parent().find("input[type=text][name$=minutesFrom]").attr("value"));

        } else {
            hours = parseInt($(element).parent().parent().find("input[type=text][name$=hoursTo]").attr("value"));
            minutes = parseInt($(element).parent().parent().find("input[type=text][name$=minutesTo]").attr("value"));
        }

        return checkDateRu(value) && checkMin(minutes) && checkHrs(hours) ;
    }, jQuery.format("Пожалуйста, введите дату и время в формате ДД.ММ.ГГГГ ЧЧ:ММ"));

    // метод для валидации полей datatime на форме поиска по расширенным атрибутам.
    jQuery.validator.addMethod("dateTimeGroupBefore", function (value, element, params) {

        var dateFrom = value;
        var hrsFrom = parseInt($(element).parent().parent().find("input[type=text][name$=hoursFrom]").attr("value"));
        var minFrom = parseInt($(element).parent().parent().find("input[type=text][name$=minutesFrom]").attr("value"));
        var dateFromObj = new Date(dateFrom.substring(6, 10), dateFrom.substring(3, 5) - 1, dateFrom.substring(0, 2), hrsFrom, minFrom);

        var dateTo = $(element).parent().parent().parent().find("input[type=text][name$=valueTo]").attr("value");
        var hrsTo = parseInt($(element).parent().parent().parent().find("input[type=text][name$=hoursTo]").attr("value"));
        var minTo = parseInt($(element).parent().parent().parent().find("input[type=text][name$=minutesTo]").attr("value"));
        var dateToObj = new Date(dateTo.substring(6, 10), dateTo.substring(3, 5) - 1, dateTo.substring(0, 2), hrsTo, minTo);

        if (dateFromObj > dateToObj) return false;
        else return true;

    }, jQuery.format("Дата начала должна быть раньше даты окончания"));

    jQuery.validator.addMethod("dateLessThan", function (value, element, params) {
        var dateToCheckWith = $("#"+params).attr("value");
        if (checkDateRu(dateToCheckWith)) {
            if (buildDate(value) > buildDate(dateToCheckWith)) return false;
        }
        return true;
    }, jQuery.format("Дата начала должна быть раньше даты окончания"));

    jQuery.validator.addMethod("numberLessThan", function (value, element, params) {
        var numberToCheckWith = $("#" + params).attr("value");
        var valueFrom = parseInt(value.replace(/\s/g, ''));
        var valueTo = parseInt(numberToCheckWith.replace(/\s/g, ''));
        if (valueFrom !== null && valueTo !== null && !isNaN(valueFrom) && !isNaN(valueTo)) {
            return valueFrom <= valueTo;
        } else {
            return true;
        }
    }, jQuery.format("Начало диапазона не может быть больше окончания диапазона"));

    jQuery.validator.addMethod("numberGreatThan", function (value, element, params) {
        var numberToCheckWith = $("#" + params).attr("value");
        var valueFrom = parseInt(value.replace(/\s/g, ''));
        var valueTo = parseInt(numberToCheckWith.replace(/\s/g, ''));
        if (valueFrom !== null && valueTo !== null && !isNaN(valueFrom) && !isNaN(valueTo)) {
            return valueFrom >= valueTo;
        } else {
            return true;
        }
    }, jQuery.format("Начало диапазона не может быть больше окончания диапазона"));

});

// format dd.mm.YYYY
function buildDate(str) {
    return new Date(str.substring(6, 10), str.substring(3, 5) - 1, str.substring(0, 2));
}

function checkHrs(value) {
    return (value >= 0 && value <=24);
}

function checkMin(value) {
    return (value >= 0 && value <=59);
}

function checkDateRu(value) {
    var validformat = /^\d{2}\.\d{2}\.\d{4}$/; //Basic check for format validity
    if (!validformat.test(value)){
        return false;
    }else { //Detailed check for valid date ranges
        var dayfield = value.split(".")[0];
        var monthfield = value.split(".")[1];
        var yearfield = value.split(".")[2];
        var dayobj = new Date(yearfield, monthfield - 1, dayfield);
        if ((dayobj.getMonth() + 1 != monthfield) || (dayobj.getDate() != dayfield) || (dayobj.getFullYear() != yearfield)){
           return false;
        }
    }
    return true;
}
// value format xx.xx.xxxx!!!
function isDateMoreThenCurrent(strDate) {
    return (new Date(strDate.substring(6, 10), strDate.substring(3, 5) - 1, strDate.substring(0, 2)) < new Date());
}
