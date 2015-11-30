var epzOrderConstants = (function () {

    var mod = {
        extSearch: {
            extSearchLaw223LotHint: undefined,
            extSearchLawOtherHint: undefined
        },
        searchByAttributes: {
            NOTIFICATION: {
                name: undefined,
                title: undefined
            },
            PROTOCOL: {
                name: undefined,
                title: undefined
            }
        }
    };

    mod.initOrderConstants = function (config) {
        mod.extSearch.extSearchLaw223LotHint = config.extSearch.extSearchLaw223LotHint;
        mod.extSearch.extSearchLawOtherHint = config.extSearch.extSearchLawOtherHint;
    };

    return mod;
}());
