<?php
include_once "simple_html_dom.php";


function getItemsByKey($key)
{
    $page = loadPage($key, 1);
    $result = getItemContainer($page);
    $pageCount = getPageCount($page);
    for ($pageNumber = 2; $pageNumber <= 5/*$pageCount*/; $pageNumber++) {
        $page = loadPage($key, $pageNumber);
        $result = $result . getItemContainer($page);
        $newPageCount = getPageCount($page);
        if ($newPageCount > $pageCount) $pageCount = $newPageCount;
    }
    return $result;
}

function getItemContainer($page)
{
    $html = str_get_html($page);
    foreach ($html->find('div#exceedSphinxPageSizeDiv') as $e)
        return $e->innertext;
    return null;
}

function loadPage($key, $pageNumber)
{
    $query = urlencode($key);
    //TODO &regionIds=5277321&regionIds=5277325&regionIds=5277326&regionIds=5277331
    $url = "http://www.zakupki.gov.ru/epz/order/extendedsearch/search.html?sortDirection=false&sortBy=UPDATE_DATE&recordsPerPage=_10&pageNo=$pageNumber&searchString=$query&placeOfSearch=FZ_44,FZ_223%2CFZ_223&searchType=ORDERS&morphology=true&strictEqual=false&orderPriceCurrencyId=-1&okdpWithSubElements=false&districtIds=5277317&orderStages=AF%2CCA&headAgencyWithSubElements=false&smallBusinessSubject=I&rnpData=I&executionRequirement=I&penalSystemAdvantage=I&disabilityOrganizationsAdvantage=I&russianGoodsPreferences=I&orderPriceCurrencyId=-1&okvedWithSubElements=false&jointPurchase=false&byRepresentativeCreated=false&selectedMatchingWordPlace223=NOTICE_AND_DOCS&matchingWordPlace94=NOTIFICATIONS&matchingWordPlace44=NOTIFICATIONS&searchAttachedFile=false&searchTextInAttachedFile=$query&changeParameters=true&showLotsInfo=false&extendedAttributeSearchCriteria.searchByAttributes=NOTIFICATION&law44.okpd.withSubElements=false&regionIds=5277321&regionIds=5277325&regionIds=5277326&regionIds=5277331";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $page = curl_exec($ch);
    curl_close($ch);
    return $page;
}

function getResultsNumber($page)
{
    $pageNumbersStr = "1 1";
    $html = str_get_html($page);
    foreach ($html->find('div.allRecords') as $e)
        $pageNumbersStr = $e->innertext;

    //echo $pageNumbersStr."<br>";
    preg_match_all('/[0-9]+/', $pageNumbersStr, $matches);
    //print_r($matches);
    return isset($matches[0][1]) ? $matches[0][1] : $matches[0][0];
}

function getPageCount($page)
{
    $itemsPerPage = 10;
    $resultsNumbers = getResultsNumber($page);
    echo "Items Number: " . $resultsNumbers . "<br>";
    return ceil($resultsNumbers / $itemsPerPage);
}

?>

<!--
Ключевые слова:

сигнализация
охранно-пожарной сигнализации
охранной сигнализации
пожарной сигнализации
противопожарной защиты

систем оповещения
звукового оповещения
тревожной сигнализации

контроля доступом
СКУД
управления доступом
КПП
проходная

видеонаблюдение
видеокамеры
-->

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0607)http://www.zakupki.gov.ru/epz/order/extendedsearch/search.html?placeOfSearch=FZ_44&placeOfSearch=FZ_223&orderPriceFrom=&orderPriceTo=&orderPriceCurrencyId=-1&deliveryAddress=&participantName=&orderPublishDateFrom=&orderPublishDateTo=&orderUpdateDateFrom=&orderUpdateDateTo=&customer.title=&customer.code=&customer.fz94id=&customer.fz223id=&customer.inn=&agency.title=&agency.code=&agency.fz94id=&agency.fz223id=&agency.inn=&districtIds=5277317&orderStages=AF&orderStages=CA&searchTextInAttachedFile=&applSubmissionCloseDateFrom=&applSubmissionCloseDateTo=&searchString=2015&morphology=true&strictEqual=false -->
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Результаты расширенного поиска</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">


    <link href="http://www.zakupki.gov.ru/epz/order/extendedsearch/images/icons/Portal.ico" rel="shortcut icon">
    <link type="text/css" rel="stylesheet" media="all" href="./index_files/style.css">
    <link type="text/css" rel="stylesheet" href="./index_files/jquery.datepick.css">
    <link type="text/css" rel="stylesheet" href="./index_files/barChart.css">
    <link rel="stylesheet" type="text/css" href="./index_files/jquery_msgbox.css">
    <link rel="stylesheet" type="text/css" href="./index_files/ui.dynatree.css">
    <link rel="stylesheet" type="text/css" href="./index_files/simplemodal.css">
    <link rel="stylesheet" type="text/css" href="./index_files/skin.css">

    <!--[if IE 7]>
    <html class="ie7" lang="en"> <![endif]-->
    <!--[if IE 8]>
    <html class="ie8" lang="en"> <![endif]-->


</head>
<body>
<div id="header">

</div>

<div class="outerWrapper mainPage">
    <div class="wrapper">
        <div class="rightCol">
            <div class="content">
                <h1>Реестр закупок и заказов</h1>

                <div id="exceedSphinxPageSizeDiv">

                    <?php
                    echo getItemsByKey("пожарной сигнализации");
                    ?>

                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</div>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("#header").html("Size: " + $(".registerBox").size());
    });
</script>

</body>

</html>