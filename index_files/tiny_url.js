function checkURILength(longUrlValue, maxUrlLength) {
    var serverName = window.location.protocol + "//" + window.location.host;
    var fullUrl = serverName + longUrlValue;

    if(fullUrl.length > maxUrlLength) {

        $(document.body).append('<form id="tinyUrlForm"/>');

        $("#tinyUrlForm").append(
            $( '<input type="hidden" name="longurl"/>').val(fullUrl),
            $( '<input type="hidden" name="homeurl"/>').val("/epz/main/public/home.html")
        );

        //var heightVal = ;
        $(document.body).append('<div class="msgBoxBackGround" id="loadingDiv"/>');
        $("#loadingDiv").css("width", "100%");
        $("#loadingDiv").css("height", $(document).height() + "px");

        request = $.ajax({
            url: "/tinyurl",
            type: "post",
            data: $("#tinyUrlForm").serialize(),
            dataType: "text",
            isShown: true,
            complete: function(){
                $("#loadingDiv").remove();
            },
            success: function(data){
                var buttonContinue = "Продолжить";
                var msgBox1 = $.msgBox({
                    type: "info",
                    title: 'Сообщение',
                    content: 'Для RSS-подписки в браузере нажмите<br>"Продолжить".<br><br>Для RSS-подписки в почтовом клиенте<br>скопируйте ссылку:<br>',
                    buttons: [
                        {value:buttonContinue},
                        {value:"Отменить"}
                    ],
                    success: function(result) {
                        if (result === buttonContinue) {
                            window.open(longUrlValue, '_blank');
                        }
                    },
                    beforeShow: function () {
                        $("div.msgBoxContent").find( "p").find( "span" ).append(
                            $('<input type=" text" size="47" readonly="readonly" onClick="selectText(this, 0, this.value.length);"/>').val(data)
                        );
                    }
                });

                $("div.msgBoxBackGround").off('click');
            },
            error: function(){
                window.open(longUrlValue, '_blank');
            }
        });

        $("#tinyUrlForm").remove();
    } else {
        window.open(longUrlValue, '_blank');
    }
}

function selectText(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}
