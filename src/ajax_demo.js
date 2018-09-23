/* eslint-disable indent */

// 月份缩写
var monthAbb = [{
    month: '0',
    abb: 'Jan'
  },
  {
    month: '1',
    abb: 'Feb'
  },
  {
    month: '2',
    abb: 'Mar'
  },
  {
    month: '3',
    abb: 'Apr'
  },
  {
    month: '4',
    abb: 'May'
  },
  {
    month: '5',
    abb: 'Jun'
  },
  {
    month: '6',
    abb: 'Jul'
  },
  {
    month: '7',
    abb: 'Aug'
  },
  {
    month: '8',
    abb: 'Sept'
  },
  {
    month: '9',
    abb: 'Oct'
  },
  {
    month: '10',
    abb: 'Nov'
  },
  {
    month: '11',
    abb: 'Dec'
  }
];

var doc = document;
var dataString = {
  date: doc.getElementById('sample1_0'),
  temp: doc.getElementById('sample2_0'),
  city: doc.getElementById('sample3_0'),
  weather: doc.getElementById('sample4_0'),
  headerCity: doc.getElementById('header_city'),
  showbox1: doc.getElementById('showbox1'),
  showbox2: doc.getElementById('showbox2'),
  showbox3: doc.getElementById('showbox3'),
  showbox4: doc.getElementById('showbox4'),
  windDegreeControl:doc.getElementById('wind-degree-control'),
  windSpeedControl:doc.getElementById('wind-speed-control'),
  checkbox: doc.myForm.date_select
};

//获取查询字符串
var searchString = location.search;
console.log(searchString);
var args = getQueryStringArgs();
console.log(args);

// 请求天气api
var url = 'https://free-api.heweather.com/v5/weather',
  key = '987bc68871c94142ae815b39a1081e63',
  cityname = args[0],
  hourlyForecast = '',
  dailyForecast = '',
  ftboxTime = '',
  ftboxWeather = '',
  ftboxTemp = '',
  ftboxTempMin = '',
  html = '';
dataString.city.innerText = cityname.toUpperCase();
dataString.headerCity.innerText = cityname.toUpperCase();

// 获取天气
url = addURLParam(url, 'city', cityname);
url = addURLParam(url, 'key', key);
/************重构****************/
const myHttpClient = url => {
  return new Promise((resolve, reject) => {
    let client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });
};
myHttpClient(url)
  .then(res => {
    console.log(res);
    handlerWeather(res);
  })
  .catch(error => {
    console.log(error);
  });
/****************************/
function handlerWeather(res) {
  var weather = res,
  weatherCurrent = weather.HeWeather5[0],
  weatherNow = weatherCurrent.now, // 现在天气预报
  updateTime = weatherCurrent.basic.update.loc, // 服务器 api 数据更新时间
  parseTime = new Date(Date.parse(updateTime));
  hourlyForecast = weatherCurrent.hourly_forecast; // 分时天气预报
  dailyForecast = weatherCurrent.daily_forecast; // 分天天气预报
  // 获取现在天气具体数值
  dataString.temp.innerText = weatherNow.fl + '°'; // 现在温度
  dataString.date.innerText = getAbb(parseTime.getMonth()) + ' ' + parseTime.getDate() + ', ' + parseTime.getFullYear();
  dataString.weather.innerText = weatherNow.cond.txt; // 现在天气描述
  dataString.showbox1.innerText = weatherNow.pcpn + ' %'; // 现在降雨概率
  dataString.showbox2.innerText = weatherNow.wind.dir; // 现在风向
  dataString.windDegreeControl.classList.add("from-"+weatherNow.wind.deg+"-deg"); // 改变风向图标
  dataString.showbox3.innerText = weatherNow.wind.spd + ' km/h'; // 现在风速
  dataString.windSpeedControl.classList.add("wi-wind-beaufort-"+weatherNow.wind.spd); // 改变风速图标
  dataString.showbox4.innerText = weatherNow.pres + ' hPa'; // 现在气压

  getDetailWeather(hourlyForecast, 'today');

}

// 当点击 “Today” 、“Week” 或 “Month” 按钮时进行判断
var currentCheckbox = dataString.checkbox;
for (var i = 0; i < currentCheckbox.length; i++) {
  currentCheckbox[i].onclick = function () {
    switch (this.value) {
      case 'today':
        getDetailWeather(hourlyForecast, 'today');
        break;
      case 'week':
        getDetailWeather(dailyForecast, 'week');
        break;
      case 'month':
        getDetailWeather(hourlyForecast, 'month');
        break;

      default:
        getDetailWeather(hourlyForecast, 'today');
        break;
    }
  };
}

// 对URL进行编码
function addURLParam(url, name, value) {
  url += url.indexOf('?') == -1 ? '?' : '&';
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
  return url;
}

// 获取查询字符串参数
function getQueryStringArgs() {
  if (location.search.length) {
    var qs = location.search.substring(1),
      args = [],
      items = qs.split('&'),
      item = null,
      name = null,
      value = null;

    for (let len = 0; len <= items.length - 1; len++) {
      item = items[len].split('=');
      name = decodeURIComponent(item[0]);
      value = decodeURIComponent(item[1]);
      if (name.length) {
        args.push(value);
      }
    }
    return args;
  }
}

// 获取月份缩写
function getAbb(month) {
  for (var i = 0; i < monthAbb.length; i++) {
    if (monthAbb[i].month == month) {
      month = monthAbb[i].abb;
    }
  }
  return month;
}

// 获取小时
function getHour(date) {
  var parseDate = new Date(Date.parse(date));
  return parseDate.getHours();
}

// 获取详细天气
function getDetailWeather(Forecast, date) {
  var i = 0;
  switch (date) {
    case 'today':
      for (i = 0; i < 8; i++) {
        ftboxTime = Forecast[i].date;
        ftboxWeather = Forecast[i].cond.txt;
        ftboxTemp = Forecast[i].tmp;
        html +=
          '<p class="ftbox_time">' +
          getHour(ftboxTime) +
          ':00<span class="ftbox_temp">' +
          ftboxTemp +
          '°</span><span class="ftbox_weather">' +
          ftboxWeather +
          '</span></p>';
      }
      break;
    case 'week':
      for (i = 0; i < 3; i++) {
        ftboxTime = Forecast[i].date;
        ftboxWeather = Forecast[i].cond.txt_d;
        ftboxTemp = Forecast[i].tmp.max;
        ftboxTempMin = Forecast[i].tmp.min;
        html +=
          '<p class="ftbox_time">' +
          ftboxTime +
          '<span class="ftbox_temp">' +
          ftboxTempMin +
          '° - ' +
          ftboxTemp +
          '°</span><span class="ftbox_weather">' +
          ftboxWeather +
          '</span></p>';
      }
      break;
    case 'month':
      html += '<p class="ftbox_time">暂无数据</p>';

      break;

    default:
      break;
  }
  doc.getElementById('ftbox').innerHTML = html;
  html = '';
}