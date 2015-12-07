function SearchEngine() {
    this.optionalParams = "";
    this.loadPage = function (key, page, regions) {
        var result = $.Deferred();
        $.get("pageLoader.php", { key: key, page: page, region: regions.join(), optionalParams: JSON.stringify(this.optionalParams)})
            .done(function (response) {
                //console.log("SE response: ",response);
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
    this.findItemsRecursive = function (key, regions, page, maxPage, scanning) {
        var that = this;
        console.log("Parsing page #" + page + " of " + maxPage);
        this.refreshProgressBar(key, page, maxPage + 1);
        this.refreshResultsCount();

        if (page <= maxPage) {
            this.loadPage(key, page, regions).done(function (countPages) {
                if (countPages > maxPage) {
                    maxPage = countPages;
                }
                page++;
                that.findItemsRecursive(key, regions, page, maxPage, scanning);
            });
        } else {
            scanning.resolve();
        }
    };
    this.findItemsForKeyword = function (key, regions) {
        var result = $.Deferred();
        this.findItemsRecursive(key, regions, 1, 1, result);
        return result;
    };
    this.findItemsForKeywordsRecursive = function (keys, regions, index, scanning) {
        var that = this;
        this.findItemsForKeyword(keys[index], regions).done(function () {
            console.log("finish", keys[index]);
            index++;
            if (index < keys.length) {
                console.log("start ", keys[index]);
                that.findItemsForKeywordsRecursive(keys, regions, index, scanning);
            } else {
                scanning.resolve();
            }
        });
    };
    this.findItemsForKeywords = function (keys, regions) {
        var result = $.Deferred();
        console.log("start ", keys[0]);
        this.findItemsForKeywordsRecursive(keys, regions, 0, result);
        return result;
    };
    this.refreshProgressBar = function (key, done, all) {
        var pbId = "#pb-" + this.getWordWithoutSpaces(key);
        $(pbId).parent().css("display", "block");
        $(pbId).css("width", (done / all * 100) + "%");
    };
    this.getWordWithoutSpaces = function (keyword) {
        return keyword.replace(new RegExp(" ", 'g'), "_");
    };
    this.refreshResultsCount = function () {
        var count = $("#items-container .registerBox").size();
        $("#full-items-count").html(count);
    }
}

function DBEngine() {
    this.systemCall = function (method, params) {
        var result = $.Deferred();
        var sendParams = (params == undefined) ? {method: method} : { method: method, params: JSON.stringify(params) };
        $.post("controller.php", sendParams)
            .done(function (response) {
                console.log("DBEngine response:", response);
                result.resolve(JSON.parse(response));
            }).fail(function (response) {
                console.error("DBEngine response:", response);
                //result.resolve(); //TODO add error handler
            });
        return result;
    };
    this.addToIgnoreList = function (id) {
        return this.systemCall("addItemToIgnoreList", id);
    };
    this.removeFromIgnoreList = function (id) {
        return this.systemCall("removeItemFromIgnoreList", id);
    };
    this.getIgnoreList = function () {
        return this.systemCall("getIgnoreList");
    }
}