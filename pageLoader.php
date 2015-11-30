<?php
include_once "simple_html_dom.php";

$key = isset($_GET['key']) ? $_GET['key'] : null;
$page = isset($_GET['page']) ? $_GET['page'] : null;

if ($key == null || $page == null) {
    echo "Error in params<br> Key=$key <br>Page=$page";
} else {
    echo getItemsByKey($key, $page);

}

function getItemsByKey($key, $pageNumber)
{
    $page = loadPage($key, $pageNumber);
    $result = "<!--{".getPageCount($page)."}-->";
    $result = $result . getItemContainer($page);
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
    //TODO VRN &regionIds=5277321 &regionIds=5277325&regionIds=5277326&regionIds=5277331
    $url = "http://www.zakupki.gov.ru/epz/order/extendedsearch/search.html?sortDirection=false&sortBy=UPDATE_DATE&recordsPerPage=_10&pageNo=$pageNumber&searchString=$query&placeOfSearch=FZ_44,FZ_223%2CFZ_223&searchType=ORDERS&morphology=true&strictEqual=false&orderPriceCurrencyId=-1&okdpWithSubElements=false&districtIds=5277317&orderStages=AF%2CCA&headAgencyWithSubElements=false&smallBusinessSubject=I&rnpData=I&executionRequirement=I&penalSystemAdvantage=I&disabilityOrganizationsAdvantage=I&russianGoodsPreferences=I&orderPriceCurrencyId=-1&okvedWithSubElements=false&jointPurchase=false&byRepresentativeCreated=false&selectedMatchingWordPlace223=NOTICE_AND_DOCS&matchingWordPlace94=NOTIFICATIONS&matchingWordPlace44=NOTIFICATIONS&searchAttachedFile=false&searchTextInAttachedFile=$query&changeParameters=true&showLotsInfo=false&extendedAttributeSearchCriteria.searchByAttributes=NOTIFICATION&law44.okpd.withSubElements=false&regionIds=5277321";

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
    //echo "Items Number: " . $resultsNumbers . "<br>";
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
