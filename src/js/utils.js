export const isNumber = (num) => {
  return !Number.isNaN(parseFloat(num)) && Number.isFinite(parseFloat(num));
}

export const getClientWidth = () => {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

export const formatDecimal = function (f, n, sep) {
  var num = parseFloat(f)
  if (!isNumber(num)) {
    return f
  }
  if ((sep || 0) === 0) {
    return num.toFixed(n)
  }

  num = num.toFixed(n)
  var result = ''

  var split = num.split('.')
  var fraction = split.length > 1 ? split[1] : ''
  num = split[0]

  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }

  if (fraction.length > 0) {
    result = result + '.' + fraction
  }
  return result
}

export const formatTime = (t) => {
  let unixtime = t;
  let unixTimestamp = new Date(unixtime);
  let Y = unixTimestamp.getFullYear();
  let M =
      unixTimestamp.getMonth() + 1 >= 10
        ? unixTimestamp.getMonth() + 1
        : "0" + (unixTimestamp.getMonth() + 1);
  let D =
      unixTimestamp.getDate() >= 10
        ? unixTimestamp.getDate()
        : "0" + unixTimestamp.getDate();
  let H = unixTimestamp.getHours();
  let toDay = Y + "-" + M + "-" + D + "  " + H + ":00";
  return toDay;
}

export const getLanguage = function () {
  let languageType = localStorage.getItem("languageType")
  let message;
  if(languageType === 'zh') {
    message = require('../i18n/zh-CN')
  }else if(languageType === 'en'){
    message = require('../i18n/en-GB')
  }
  return message;
}