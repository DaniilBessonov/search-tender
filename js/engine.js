function SearchEngine() {
    this.loadPage = function (key, page) {
        var result = $.Deferred();
        $.get("pageLoader.php", { key: key, page: page })
            .done(function (response) {
                $("#items-container").append(response);

                var regexp = new RegExp('[0-9]+', '');
                var pageCount = regexp.exec(response.substr(0, 14));
                //console.log(parseInt(pageCount[0]));
                result.resolve(parseInt(pageCount[0]));
            }).fail(function (response) {
                console.error(response);
                result.resolve(0); //TODO add error handler
            });
        return result;
    };
    this.findItemsRecursive = function (key, page, maxPage, scanning) {
        var that = this;
        console.log(page, maxPage);
        this.refreshProgressBar(key, page, maxPage + 1);
        this.refreshResultsCount();

        if (page <= maxPage) {
            this.loadPage(key, page).done(function (countPages) {
                if (countPages > maxPage) {
                    maxPage = countPages;
                }
                page++;
                that.findItemsRecursive(key, page, maxPage, scanning);
            });
        } else {
            scanning.resolve();
        }
    };
    this.findItemsForKeyword = function (key) {
        var result = $.Deferred();
        this.findItemsRecursive(key, 1, 1, result);
        return result;
    };
    this.findItemsForKeywordsRecursive = function (keys, index, scanning) {
        var that = this;
        this.findItemsForKeyword(keys[index]).done(function () {
            console.log("finish", keys[index]);
            index++;
            if (index < keys.length) {
                console.log("start ", keys[index]);
                that.findItemsForKeywordsRecursive(keys, index, scanning);
            } else {
                scanning.resolve();
            }
        });
    };
    this.findItemsForKeywords = function (keys) {
        var result = $.Deferred();
        console.log("start ", keys[0]);
        this.findItemsForKeywordsRecursive(keys, 0, result);
        return result;
    };
    this.refreshProgressBar = function (key, done, all) {
        var pbId = "#pb-" + this.getWordWithoutSpaces(key);
        $(pbId).parent().css("display", "block")
        $(pbId).css("width", (done / all * 100) + "%");
    }
    this.getWordWithoutSpaces = function (keyword) {
        return keyword.replace(new RegExp(" ", 'g'), "_");
    }
    this.refreshResultsCount = function () {
        var count = $("#items-container .registerBox").size();
        $("#full-items-count").html(count);
    }
}