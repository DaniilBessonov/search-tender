$(document).ready(function(){
    run_all_scripts();
});

function run_all_scripts() {
//Вкладки
    var tabsB = "ul.catalogTabs li";
    var tabsP = "table.purchaseTabs td";

    $("table.purchaseTabs td").click(function(){
        var tabsP = "table.purchaseTabs td";
        var eL = this;
        var index = $(tabsP).index(eL);
        $(eL).siblings("td").removeClass("currentTab");
        $(eL).addClass("currentTab");
        $(eL).parents("table").next(".tabsBox").children("div").css("display","none");
        $(eL).parents("table").next(".tabsBox").children("div").eq(index).css("display","block");
    });

    setupPollMenu();

    $("ul.tabsStatus li").click(function(){
        var el = this;
        var index = $("ul.tabsStatus li").index(el);
        $(el).siblings("li").removeClass("currentStatus");
        $(el).addClass("currentStatus");
        $(el).parents("ul").siblings("div.tabsBlock").css("display","none");
        $(el).parents("ul").siblings("div.tabsBlock").eq(index).css("display","block");
    });

    $("#expandLotsInfo").click(function(){
        expandLots($(this));
    });

    $(".lowFz94").click(function(){
        if($(this).is(":checked")){
            $("tr.fz94hide").css("display","none");
            $("tr.fz94show").css("display","table-row");
        }
    });

    $(".lowFz94Fz223, .lowFz223").click(function(){
        if($(this).is(":checked")){
            $("tr.fz94show").css("display","none");
            $("tr.fz94hide").css("display","table-row");
        }
    });

    checkSwitcher();
    lowChoice();

    $("ul.listTop li").click(function(){
        var indexLi = $(this).index();
        $(this).siblings("li").removeClass("selectPos");
        $(this).addClass("selectPos");
        $(this).parent("ul.listTop").siblings("div.carouselInfo").find("table.listTopClients").find("tr").find("td.changeTd").hide();
        $(this).parent("ul.listTop").siblings("div.carouselInfo").find("table.listTopClients").find("tr").each(function(){
            $(this).find("td").eq(indexLi+2).show();
        });
    });

    $("table.ratingLots .listTop li").click(function(){
        var indexLi = $(this).index();
        $(this).parents("td").siblings("td").find("p").hide();
        $(this).parents("td").siblings("td").find("p").eq(indexLi).show();
        $(this).parents("table").siblings("table.listTopClients").hide();
        $(this).parents("table").siblings("table.listTopClients").eq(indexLi).show();
    });

    diagramBox();

    preparePopupDialogLinks("a.linkPopUp");

    $("a.addBtn").click(function(event){
        $("div.popUp").addClass("okdpPopUp");
    });

    $("a.eds").click(function(event){
        $("div.popUp").addClass("ElDigSign");
    });

    $("body").on("click", "div.overlay, span.closePopUp, div.edsContainer .btn", function(){
        $("div.overlay, div.popUp").remove();
    });



    $(window).scroll(function() {
        var popUpScroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        var popUpHeight = $("div.popUp").outerHeight();
        if(popUpHeight < windowHeight){
            $("div.popUp").css("margin-top", popUpScroll-popUpHeight/2+"px");

        }else{$("div.popUp").css("margin-top",popUpScroll+"px");
            $("div.popUp").css("top","0px");
        }
    });

    $(window).resize(function () {
        resizePopupDialog();
    });

//Личный кабинет popUp

    $("li.cabinet span").hover(
        function(){
            $("div.personalCabinetPopUp").fadeIn();
        },
        function(){
            var lk = setTimeout(function(){$("div.personalCabinetPopUp").fadeOut();},300);
            $("div.personalCabinetPopUp div").hover(
                function(){
                    clearTimeout(lk);
                    $(this).parent("div.personalCabinetPopUp").show();
                    $(this).addClass("hoverBox");
                    if($("div.personalCabinetPopUp .topBox").hasClass("hoverBox")){
                        $(this).siblings("div.imgArr").addClass("hoverArr");
                    }
                },
                function(){
                    $(this).removeClass("hoverBox");
                    $(this).siblings("div.imgArr").removeClass("hoverArr");
                }
            );


        }
    );





//expand/collapce

    $("div.expCol h1").toggle(function(){
            $(this).removeClass("expand").addClass("collapse").find("span").text("Свернуть меню");
            $("div.expandMenu").fadeIn(2000);
            $("div.collapseMenu").hide();
        },
        function(){
            $(this).removeClass("collapse").addClass("expand").find("span").text("Развернуть меню");
            $("div.collapseMenu").fadeIn(2000);
            $("div.expandMenu").hide();
        }
    );

    $("div.expandBlock h2 span").toggle(function(){
            $(this).addClass("collapse");
            $(this).parent().siblings("div.expandBox").slideDown(300);
            $(this).parent().trigger("onExpand");
        },
        function(){
            $(this).removeClass("collapse");
            $(this).parent().siblings("div.expandBox").slideUp(300);
            $(this).parent().siblings("div.expandBox").delay(0).hide(0);
        }
    );

    $("div.questionBox .question span.questionText").toggle(function(){
            $(this).parent().siblings(".collapseBtn").addClass("collapse");
            $(this).parents("div.questionBox").siblings("div.expandBox").slideDown(300);
        },
        function(){
            $(this).parent().siblings(".collapseBtn").removeClass("collapse");
            $(this).parents("div.questionBox").siblings("div.expandBox").slideUp(300);
        }
    );

    $("div.questionBox .collapseBtn").toggle(function(){
            $(this).addClass("collapse");
            $(this).siblings("div.question").find("span.questionText").click();
        },
        function(){
            $(this).removeClass("collapse");
            $(this).siblings("div.question").find("span.questionText").click();
        }
    );





    $("div.purchaseComments .question span").toggle(function(){
            $(this).addClass('collapsed');
            $(this).parent().parent().removeClass("collapsed");
            $(this).parent().siblings(".body").slideDown(300);
            $(this).parent().parent().siblings(".answer").slideDown(300);
            $(this).parent().attr("title", "Свернуть");
        },
        function(){
            $(this).removeClass('collapsed');
            $(this).parent().parent().addClass("collapsed");
            $(this).parent().siblings(".body").slideUp(300);
            $(this).parent().parent().siblings(".answer").hide(0);
            $(this).parent().attr("title", "Развернуть");
        }
    );



    markerCheck();

    function markerCheck(){
        $("div.markerCheck h2 span").unbind('toggle');
    }

    $("#structured").click(function(){

        if($(this).is(":checked") && !$("#notStructured").is(':checked')){
            $("div.markerCheck h2 span").toggle(function(){
                    $(this).addClass("collapse");
                    $(this).parent().siblings("div.expandBox").slideDown(300);
                },
                function(){
                    $(this).removeClass("collapse");
                    $(this).parent().siblings("div.expandBox").slideUp(300);
                }
            );
        } else {
            $("div.markerCheck h2 span").unbind();
        }
    });

    $("#notStructured").click(function(){
        if(!$(this).is(":checked") && $("#structured").is(':checked')){
            $("div.markerCheck h2 span").toggle(function(){
                    $(this).addClass("collapse");
                    $(this).parent().siblings("div.expandBox").slideDown(300);
                },
                function(){
                    $(this).removeClass("collapse");
                    $(this).parent().siblings("div.expandBox").slideUp(300);
                }
            );
        } else {
            $("div.markerCheck h2 span").unbind();
        }
    });

    collapseInitialize();

    manySelect();

    $("table.lowSearch>tbody>tr>td:nth-child(1)").addClass("firstTd");
    $("table.versionLogList tr:nth-child(odd)").addClass("colorTR");





//close btn
    listOrgRemove();


//фокус input, textarea

    $("div.searchField input[type='text']").focus(function () {
        var valueText = $("div.searchField input[type='text']").val();
        if (this.title == valueText) {
            this.value = '';
        }
        $(this).removeClass("colorValue");
    });

    $("div.searchField input[type='text']").blur(function () {
        var valueText = $("div.searchField input[type='text']").data("initial");
        if (this.value == '') {
            this.value = valueText;
            $(this).addClass("colorValue");
        }
    });

    setupHint(".lowSearch input[type='text']");

    $("dl.pollDown textarea").val("Опишите свое мнение");

    $("dl.pollDown textarea").focus(function(){
        if ($(this).val() === "Опишите свое мнение") {$(this).val("").removeClass("colorValue");};
    });

    $("dl.pollDown textarea").blur(function(){
        if ($(this).val() === "") {$(this).val("Опишите свое мнение").addClass("colorValue");}
    });

    $("p.accounting :checkbox").click(function(){
        if($(this).is(":checked")){

            $(this).parents("label").siblings("label").children("input").attr("disabled", "disabled");
        } else{
            $(this).parents("label").siblings("label").children("input").removeAttr("disabled", "disabled");
            $(this).parents("label").siblings("label").children("input").attr("enabled", "enabled");}
    });


// ---- datePicker -----
    $(".datePicker").each(function(index,element){
        $(element).datepick({
            rangeSelect: false
        });
    });

    $(function() {
// ---- autocomplete -----
        var availableTags = ["1","12","123","1234","12345","1234","234","2345","345","3456"];
        $('input.autocompleteOrder').autocomplete({
            source: availableTags,
            minLength: 1
        });
    });

// выбор закона на срранице расширенного поиска
    $("input.low").click(function(){
        var index= $("input.low").index(this);
        if(index==0){
            $("div.low94, div.low223").hide();
        }
        if(index==1){
            $("div.low94").show();
            $("div.low223").hide();
        }
        if(index==2){
            $("div.low94").hide();
            $("div.low223").show();
        }
    });


//Изменение размеров блока новостей, карусель

    function carousel() {
        var carouselItem = $("#mycarousel .pagingList ul li");
        $(carouselItem).click(
            function(){
                var eL = this;
                var index = $(carouselItem).index(eL);
                var liWidth = $(this).parents("div.pagingList").siblings("ul.carousel").find("li").width();
                $(eL).siblings("li").removeClass("active");
                $(eL).addClass("active");
                var posUl = index*liWidth;
                $(this).parents("div.pagingList").siblings("ul.carousel").animate({left: -posUl}, 500);
            });
    }
    $(window).resize(function(){
        sizeLi();
        var eL = $("#mycarousel div.pagingList ul li.active");
        var index = $(eL).index();
        var liWidth = $("#mycarousel ul.carousel").find("li").width();
        var posUl = index*liWidth;
        $("#mycarousel ul.carousel").css("left",-posUl+"px");
    });

    $(window).resize(function(){
        sizeLiOther();
        var eL = $("div.topClients:visible .pagingList ul li.active");
        var index = $(eL).index()-1;
        var liWidth = $("div.topClients:visible .carousel li").width();
        var posUl = index*liWidth;
        $("div.topClients:visible ul.carousel").css("left",-posUl+"px");
    });



//$(window).resize(function(){
//        sizeLiOther();
//        $("div.carouselInfo .pagingList ul.carousel").each(function(){
//        var index = $(this).find("li.active").index()-1;
//        var liWidth = $("div.topClients:visible .carousel li").width();
//         var posUl = index*liWidth;
//        $(this).css("left",-posUl+"px");
//        });
//});

    function sizeLi(){
        var parentWidth =$("#mycarousel").width();
        $("ul.carousel li").css("width",parentWidth+"px");
        var childWidth = $("ul.carousel li").width();
        var childLength = $("ul.carousel li").length;
        var ulWidth = childWidth*childLength;
        $("ul.carousel").css("width",ulWidth+"px");
    };


    $(sizeLi);
    $(sizeLiOther);
    $(carouselWithoutArrow);
    $(carouselOther);
    $(carousel);


    $("#slider").slider({
        range: true,
        min: 0,
        max: 2000000000,
        values: [ 0, 2000000000 ],
        slide: function(event, ui) {
            $("#minPrice").val(ui.values[ 0 ]);
            $("#maxPrice").val(ui.values[ 1 ]);
            Mask();
        },

        change: function(event, ui) {
            Mask();
        }
    });
    $("#amountmin").val($("#slider").slider("values", 0));
    $("#amountmax").val($("#slider").slider("values", 1));
    $("#minPrice").val($("#slider").slider("values", 0));
    $("#maxPrice").val($("#slider").slider("values", 1));

    /*$("#minPrice").blur(
        function(event) {
            if ($("#slider").slider("values", 1) < deleteSpaces($(this).val())) {
                $(this).val($("#slider").slider("values", 1));
            }
            $("#slider").slider("values", 0, deleteSpaces(this.value));
        });
    $("#maxPrice").blur(
        function(event) {
            if ($("#slider").slider("values", 0) > deleteSpaces($(this).val())) {
                $(this).val($("#slider").slider("values", 0));
            }
            if (deleteSpaces($("#amountmax").val()) < deleteSpaces($(this).val())) {
                $(this).val(deleteSpaces($("#amountmax").val()));
            }
            $("#slider").slider("values", 1, deleteSpaces(this.value));
        });*/
    $(Mask);

    function deleteSpaces(str) {
        var RegEx=/\s/g;
        return parseInt(str.replace(RegEx,""));
    }

    function Mask() {
        $(".mask").priceFormat({
            prefix: '',
            centsSeparator: '',
            thousandsSeparator: ' '
        });
    };

    customSelect();
}

String.prototype.htmlEscape = function() {
    return $('<div/>').text(this.toString()).html();
};

//Custom select
function customSelect(){
    jQuery('select').not(".chosenSelect").each(function(){
        var title = jQuery(this).attr('title');
        if( jQuery('option:selected', this).val() != ''  ) title = jQuery('option:selected',this).text().htmlEscape();
        jQuery(this)
            .css({'z-index':10,'opacity':0,'-khtml-appearance':'none','margin-left':'1px'})
            .after('<span class="select"><span class="selectRight"></span>' + title + '</span>')
            .change(function(){
                val = jQuery('option:selected',this).text().htmlEscape();
                jQuery(this).attr("title", val);
                val = "<span class='selectRight'></span>" + val;
                jQuery(this).next().html(val);
            })
        jQuery(this).attr("title", title);
    });
}

// Sets selection index for selects inside section with provided id - parentId;
function customSelectSetValue(parentId, selectedIndex){
    if(!parentId){
        customSelect();
        return;
    }
    // select required option
    $('#'+parentId).find('select').prop("selectedIndex", selectedIndex);
    // remove overlapping span area
    $('#'+parentId).find('span').each(function(){$(this).remove();});
    // repaint select (add span)
    applyCustomSelect(parentId);
}

//Creates custom selects for selects inside section with provided id - parentId;
function applyCustomSelect(parentId){

    if(!parentId){
        customSelect();
        return;
    }

    $('#'+parentId).find('select').not(".chosenSelect").each(function(){
        var title = jQuery(this).attr('title');
        if( jQuery('option:selected', this).val() != ''  ) title = jQuery('option:selected',this).text().htmlEscape();
        jQuery(this)
            .css({'z-index':10,'opacity':0,'-khtml-appearance':'none','margin-left':'1px'})
            .after('<span class="select"><span class="selectRight"></span>' + title + '</span>')
            .change(function(){
                val = jQuery('option:selected',this).text().htmlEscape();
                jQuery(this).attr("title", val);
                val = "<span class='selectRight'></span>" + val;
                jQuery(this).next().html(val);
            })
        jQuery(this).attr("title", title);
    });
}

// carousel other
function carouselOther() {
    $("div.carouselInfo .pagingList ul li").not(".leftArrow, .rightArrow").click(
        function(){
            var eL = this;
            var index = $(this).index()-1;
            var liWidth = $(this).parents("div.pagingList").siblings("ul.carousel").find("li").width();
            var liSize = $(this).parents("div.pagingList").siblings("ul.carousel").find("li").size();
            $(eL).siblings("li").removeClass("active");
            $(eL).addClass("active");
            var posUl = index*liWidth;
            $(this).parents("div.pagingList").siblings("ul.carousel").animate({left: -posUl}, 500);
            $('.leftArrow span').removeClass("disableArrow");
            $('.rightArrow span').removeClass("disableArrow");
            if (index == 0){$('.leftArrow span').addClass("disableArrow");}
            if (index == liSize - 1){$('.rightArrow span').addClass("disableArrow");}
        });
}

function carouselWithoutArrow() {
    $("div.carouselInfo .withoutArrow ul li").not(".leftArrow, .rightArrow").click(
        function(){
            var eL = this;
            var index = $(this).index();
            var liWidth = $(this).parents("div.withoutArrow").siblings("ul.carousel").find("li").width();
            var liSize = $(this).parents("div.withoutArrow").siblings("ul.carousel").find("li").size();
            $(eL).siblings("li").removeClass("active");
            $(eL).addClass("active");
            var posUl = index*liWidth;
            $(this).parents("div.withoutArrow").siblings("ul.carousel").animate({left: -posUl}, 500);
        });
}

function sizeLiOther(){
    var parentWidthOther = $("div.purchaseBox .tabsBox>div:visible").width();
    $("div.carouselInfo .carousel li").css("width",parentWidthOther+"px");
    var childWidthOther = $("div.carouselInfo .carousel li").width();
    var childLengthOther = $("div.carouselInfo .carousel li").length;
    var ulWidthOther = childWidthOther*childLengthOther;
    $("div.carouselInfo .carousel").css("width",ulWidthOther+"px");
}


function lowChoice() {
    $("ul.lowChoice li").click(function () {
        var indexLi = $(this).index();
        $(this).parent("ul.lowChoice").siblings("div").css("visibility","hidden");
        $(this).parent("ul.lowChoice").siblings("div").eq(indexLi).css("visibility","visible");
    });
}

//switchers on Info about
function checkSwitcher() {
    $("span.switcher").click(function () {
        var indexSwitcher = $(this).index();
        $(this).siblings("span").removeClass("checkSwitcher");
        $(this).addClass("checkSwitcher");
        $(this).parent(".switcherBox").siblings("dl").find("dd").hide();
        $(this).parent(".switcherBox").siblings("dl").find("dd").eq(indexSwitcher).show();
    });
}

function diagramBox() {
    $("div.diagramBox span").click(function(){
        var indexSpan = $(this).index();
        $(this).siblings("span").removeClass("active");
        $(this).addClass("active");
        $(this).siblings("div").hide();
        $(this).siblings("div").eq(indexSpan).show();
    });
}

function manySelect() {
    toggleManySelect(".manySelect .collapsed");

    $("p.msButtonIn span.btnBtn").click(function () {
        var checkedInputs = $(this).parent().siblings("div.expanded").find("input:checked");
        var inputLabel = _buildInputLabel(checkedInputs);
        var placeholderText = $(this).parents(".selectChose").siblings(".collapsed").find(".msPlaceholder").data("initial");
        $(this).parents("div.selectChose").slideUp(300);
        $(this).parents(".selectChose").siblings(".collapsed").find("span.msExpandButton").click();
        if (inputLabel == '') {
            $(this).parents(".selectChose").siblings(".collapsed").find(".msPlaceholder").text(placeholderText).removeClass("choseColor")
        } else {
            $(this).parents(".selectChose").siblings(".collapsed").find(".msPlaceholder").text(inputLabel).addClass("choseColor");
        }
    });
}

function toggleManySelect(selector) {
    $(selector).toggle(function () {
            $(this).find("span.msExpandButton").addClass("active");
            $(this).siblings("div.selectChose").slideDown(300);
        },
        function () {
            $(this).find("span.msExpandButton").removeClass("active");
            $(this).siblings("div.selectChose").slideUp(300);
            var checkedInputs = $(this).siblings("div.selectChose").find("input:checked");
            var inputLabel = _buildInputLabel(checkedInputs);
            var placeholderText = $(this).find(".msPlaceholder").data("initial");
            $(this).siblings("div.selectChose").slideUp(300);
            $(this).siblings(".selectChose").find("span.msExpandButton").click();
            if (inputLabel == '') {
                $(this).find(".msPlaceholder").text(placeholderText).removeClass("choseColor");
            } else {
                $(this).find(".msPlaceholder").text(inputLabel).addClass("choseColor");
            }
            $(this).find(".msPlaceholder").change();
        }
    )
}

function _buildInputLabel(checkedInputs) {
    var inputLabel = checkedInputs.parent("li").map(
        function () {
            return $(this).text();
        }).get().join(", ");
    if (!inputLabel) {
        var valueList = checkedInputs.parent().parent("li").map(
            function () {
                var customValueElem = $("input[type='text']", this);
                if (customValueElem.length == 1) {
                    var title = customValueElem.attr("title");
                    var val = customValueElem.val();
                    if (val == title) {
                        val = '';
                    }
                    return val;
                }
                return jQuery.trim($(this).text());
            }).get();
        valueList = $.grep(valueList, function (n, i) {
            return n != '';
        });
        inputLabel = valueList.join(", ");
    }
    return inputLabel;
}

function listOrgRemove() {
    $("div.listOrg ul li span").click(function () {
        $(this).parent("li").slideUp(200);
        var lengthLi = $(this).parents("div.listOrg").find("li:visible").length;
        if (lengthLi === 1) {
            $(this).parents("div.listOrg").children("p").children("input").attr("checked", false);
        }
        $(this).parent("li").remove();
    });

    /*$("span.deleteDoc").click(function () {
     $(this).parents("tr").remove();

     });*/
}

function getIdArray(divId) {
    var elems = $("div#" + divId + " ul li:visible");
    var arr = jQuery.makeArray(elems);
    return $.map(arr, function (val, i) {
        return $(val).attr('id');
    });
}

function collapseInitialize() {
    $("h1.headerPanel.collapse").toggle(function() {
            $(this).removeClass("collapse").addClass("expand");
            $(this).next("div.tableEditor").slideDown(300);
        },
        function() {
            $(this).removeClass("expand").addClass("collapse");
            $(this).next("div.tableEditor").slideUp(300);
        });


    $("span.editDoc").click(function() {
        $("h1.headerPanel.collapse").click();
        $("div.tableEditor").slideDown(300);
    });
}

function showFirst5Comments() {
    var additionalTableHeight = 0;
    for(var i = 0; i < 5; i++){
        if($('#commentTd' + i) != null){
            var commentLength = $('#spanComment' + i).text().length;
            additionalTableHeight = additionalTableHeight + (commentLength/130 + 1)*15;
        }
    }
    additionalTableHeight =  (additionalTableHeight + 100);
    $('#commentsTable').css('height', additionalTableHeight + 'px');
}

function setupPollMenu() {
    $("ul.tabPollMenu li").click(function () {
        var el = this;
        var index = $("ul.tabPollMenu li").index(el);
        $(el).siblings("li").removeClass("currentPoll");
        $(el).addClass("currentPoll");
        $(el).parents("ul").siblings("div.pollBlock").css("display", "none");
        $(el).parents("ul").siblings("div.pollBlock").eq(index).css("display", "block");
    });
}

function setupHint(selector) {
    $(selector).focus(function(){
        var valueText = $(this).val()
        if (this.title == valueText) {this.value=''};
        $(this).removeClass("colorValue");
    });

    $(selector).not(".datepicker_ru").blur(function(){
        var valueText = $(this).data("initial");
        if (this.value == '' && !(typeof valueText === 'undefined')) {this.value=valueText;
            $(this).addClass("colorValue");}
    });
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

function expandLots(t) {
    $("input#showLotsInfoHidden").attr("value", t.is(":checked"));
    if(t.is(":checked")){
        $("td.lotsInfo").each(function() {
            $(this).find("p").addClass("collapse");
            $(this).find("div").slideDown(300);
        });
    }
    else{
        $("td.lotsInfo").each(function() {
            $(this).find("p").removeClass("collapse");
            $(this).find("div").slideUp(300);
        });
    }
}

//overlay+popUp
// You can add width param for popUp class
// Example:
// <a class="linkPopUp pWidth_740" href="${contextPath}/quiz/participation.html?timestamp=${date.time}">
function popupLinkOnclick(elem, event, popupCss, ajaxUseCache) {
    var linkA = $(elem).attr("href");
    if (event.preventDefault) {// non-IE browsers
        event.preventDefault();
    } else { // IE Only
        event.returnValue = false;
    }
    if (!linkA) {
        return;
    }
    var widthParam = "";
    var classList =$(elem).attr('class').split(/\s+/);
    $.each( classList, function(index, item){
        if (item == 'linkPopUp') {
            return;
        }
        if (item.substring(0, 7) == "pWidth_") {
            widthParam = item.substring(7);
        }
    });

    var styleParam = "";
    if (widthParam != "") {
        styleParam = styleParam + " width:" + widthParam + "px;";
    }

    openPopupDialog(linkA, ajaxUseCache, popupCss, styleParam);
}
function openPopupDialog(url, ajaxUseCache, popupCss, styleParam) {
    if (styleParam && styleParam != "") {
        styleParam = " style='" + styleParam + "'";
    }
    if (ajaxUseCache == undefined) {
        ajaxUseCache = true;
    }

    $("div.overlay, div.popUp").remove();
    $("body").append("<div class='overlay'>").append("<div class='popUp'" + styleParam + ">");
    $.ajax({
        url: url,
        type:'GET',
        cache: ajaxUseCache,
        dataType: 'html',
        success: function (html) {
            $('div.popUp').html(html);

            if (popupCss) {
                $("div.popUp").addClass(popupCss);
            }
            resizePopupDialog();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Произошла ошибка");
        }
    });
}

function resizePopupDialog() {
    var windowHeight = $(window).height();
    var containerHeight = $("div.outerWrapper").outerHeight();
    var popUpHeight = $("div.popUpWrapper").outerHeight();
    var popUpScroll = $(document).scrollTop();

    if (popUpHeight > windowHeight) {
        $("div.popUp").css("height", containerHeight < windowHeight ? containerHeight + "px" : windowHeight + "px");
        $("div.popUp").css("margin-top", popUpScroll + "px");
        $("div.popUp").css("top", "0px");
    } else {
        $("div.popUp").css("height", popUpHeight + 2 + "px");
        $("div.popUp").css("margin-top", popUpScroll - popUpHeight / 2 + "px");
        $("div.popUp").css("top", "");
    }
}

function prepareVoteDialogLinks(selector) {
    preparePopupDialogLinks(selector, false, 'votePopupDialog');
}
function preparePopupDialogLinks(selector, ajaxUseCache, popupCss) {
    $(selector).click(function(event) {
        popupLinkOnclick($(this), event, popupCss, ajaxUseCache);
    });
}

function loadWidgetPage(url) {
    $.ajax({
        type: "GET",
        url: url,
        headers: {'Cache-Control': 'max-age=3600'},
        dataType: 'html',
        beforeSend: function () {
            addLoadingClass('div.diagramBox');
        },
        success: function (html) {
            $('div.topClients').html(html);
            removeLoadingClass('div.diagramBox');
        },
        error: function () {
            removeLoadingClass('div.diagramBox');
        }
    });
}
