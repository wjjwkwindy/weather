/* eslint-disable indent */
// 城市列表
// var countriesList = [{
//     'county': 'Auto Locate',
//     'id': '0000000'
// },
// {
//     'county': 'Chengdu',
//     'id': '1815286'
// },
// {
//     'county': 'Beijing',
//     'id': '1816670'
// }
// ];

// 将用户选中的城市名更新到底栏
var radRadio = document.selectform.DCID;
for (var i = 0; i < radRadio.length; i++) {
    radRadio[i].onclick = function () {
        var dataCity = this.getAttribute('data-city');
        console.log('city:' + dataCity);
        // var cityName;
        // for (var i = 0; i < countriesList.length; i++) {
        //     if (countriesList[i].id == dataCity) {
        //         cityName = countriesList[i].county;
        //         break;
        //     }
        // }
        document.getElementById('city').innerText = dataCity.toUpperCase();
        document.getElementById('city').setAttribute('data-city', dataCity);
    };
}

// 将用户选中的温度更新到底栏
var degreeRadio = document.selectform.degree;
for (var j = 0; j < degreeRadio.length; j++) {
    degreeRadio[j].onclick = function () {
        var dataTemId = this.getAttribute('data-tem');
        console.log('tem:' + dataTemId);
        if (dataTemId == false) {
            document.getElementById('tem').innerText = '°C';
            document.getElementById('tem').setAttribute('data-tem', '0');
        } else {
            document.getElementById('tem').innerText = '°F';
            document.getElementById('tem').setAttribute('data-tem', '1');
        }
    };
}

// DOM0级事件处理程序
var confirm = document.getElementById('confirm');
confirm.onclick = function () {
    var dataCity = document.getElementById('city').getAttribute('data-city');
    var dataTemId = document.getElementById('tem').getAttribute('data-tem');
    console.log('you clicked confirm: city="' + dataCity + '" temid="' + dataTemId + '"');
    var url = 'ajax_demo.html';
    url = addURL(url, 'city', dataCity);
    url = addURL(url, 'temid', dataTemId);
    location.href = url;
};

// DOM2级时间处理程序

// url处理
function addURL(url, name, value) {
    url += (url.indexOf('?') == -1) ? '?' : '&';
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
}