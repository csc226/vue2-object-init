var apiUrl, imageUrl, fileUrl, jsonUrl, ssoUrl, mapApi, templateDown, qgMapUrl, qyxtMapUrl, gjqyMapUrl, tcqyMapUrl, provinceMapUrl, cityMapUrl, geoserverUrl;

function loadXMLDoc() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // console.log(xmlhttp.responseText);
            apiUrl = JSON.parse(xmlhttp.responseText).apiUrl
            imageUrl = JSON.parse(xmlhttp.responseText).imageUrl
            ssoUrl = JSON.parse(xmlhttp.responseText).ssoUrl
            jsonUrl = JSON.parse(xmlhttp.responseText).jsonUrl
            fileUrl = JSON.parse(xmlhttp.responseText).fileUrl
            mapApi = JSON.parse(xmlhttp.responseText).mapApi
            templateDown = JSON.parse(xmlhttp.responseText).templateDown
                // "qgMapUrl": "http://tod.caupdcloud.com/server/rest/services/Hosted/%E8%BE%B9%E7%95%8C0918_%E6%8A%BD%E7%A8%80/FeatureServer/4",
                // "qyxtMapUrl": "http://tod.caupdcloud.com/server/rest/services/Hosted/%E8%BE%B9%E7%95%8C0918_%E6%8A%BD%E7%A8%80/FeatureServer/3",
                // "gjqyMapUrl": "http://tod.caupdcloud.com/server/rest/services/Hosted/%E8%BE%B9%E7%95%8C0918_%E6%8A%BD%E7%A8%80/FeatureServer/2",
                // "tcqyMapUrl": "http://tod.caupdcloud.com/server/rest/services/Hosted/%E8%BE%B9%E7%95%8C0918_%E6%8A%BD%E7%A8%80/FeatureServer/6",
                // "provinceMapUrl": "http://tod.caupdcloud.com/server/rest/services/Hosted/%E8%BE%B9%E7%95%8C0918_%E6%8A%BD%E7%A8%80/FeatureServer/1",
                // "cityMapUrl": "http://tod.caupdcloud.com/server/rest/services/Hosted/%E8%BE%B9%E7%95%8C0918_%E6%8A%BD%E7%A8%80/FeatureServer/5"
            qgMapUrl = JSON.parse(xmlhttp.responseText).qgMapUrl;
            qyxtMapUrl = JSON.parse(xmlhttp.responseText).qyxtMapUrl;
            gjqyMapUrl = JSON.parse(xmlhttp.responseText).gjqyMapUrl;
            tcqyMapUrl = JSON.parse(xmlhttp.responseText).tcqyMapUrl;
            provinceMapUrl = JSON.parse(xmlhttp.responseText).provinceMapUrl;
            cityMapUrl = JSON.parse(xmlhttp.responseText).cityMapUrl;
            geoserverUrl = JSON.parse(xmlhttp.responseText).geoserverUrl;

            // apiUrl = xmlhttp.responseText.apiUrl
            // imageUrl = xmlhttp.responseText.imageUrl
            // ssoUrl = xmlhttp.responseText.ssoUrl
            // mapApi = xmlhttp.responseText.mapApi
            // templateDown = xmlhttp.responseText.templateDown

        }

    }
    xmlhttp.open("GET", "./js/data.json", false);
    xmlhttp.send();

}
loadXMLDoc()
export {
    apiUrl,
    fileUrl,
    imageUrl,
    ssoUrl,
    jsonUrl,
    mapApi,
    templateDown,
    qgMapUrl,
    qyxtMapUrl,
    gjqyMapUrl,
    tcqyMapUrl,
    provinceMapUrl,
    cityMapUrl,
    geoserverUrl
}