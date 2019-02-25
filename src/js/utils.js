export const isNumber = (num) => {
    return !Number.isNaN(parseFloat(num)) && Number.isFinite(parseFloat(num));
};

export const getClientWidth = () => {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

export const getClientHeight = () => {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
};

export const formatDecimal = function (f, n, sep) {
    // var num = parseFloat(f);
    n = parseInt(n)
    if (isNaN(f)) {
        return f;
    }
    if ((sep || 0) === 0) {
        return formatNumber(f, n);
    }

    var num = formatNumber(f, n);
    var result = '';

    var split = num.split('.');
    var fraction = split.length > 1 ? split[1] : '';
    num = split[0];

    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }

    if (fraction.length > 0) {
        result = result + '.' + fraction;
    }
    return result;
};

export const formatNumber = (value, num) => {
    var a, b, c, i;
    a = value.toString();
    b = a.indexOf('.');
    c = a.length;
    if (num == 0) {
        if (b != -1) {
            a = a.substring(0, b);
        }
    } else {
        if (b == -1) {
            a = a + '.';
            for (i = 1; i <= num; i++) {
                a = a + '0';
            }
        } else {
            a = a.substring(0, b + num + 1);
            for (i = c; i <= b + num; i++) {
                a = a + '0';
            }
        }
    }
    return a;
};

export const formatTime = (t) => {
    let unixtime = t;
    let unixTimestamp = new Date(unixtime);
    let Y = unixTimestamp.getFullYear();
    let M =
        unixTimestamp.getMonth() + 1 >= 10
            ? unixTimestamp.getMonth() + 1
            : '0' + (unixTimestamp.getMonth() + 1);
    let D =
        unixTimestamp.getDate() >= 10
            ? unixTimestamp.getDate()
            : '0' + unixTimestamp.getDate();
    let H = unixTimestamp.getHours();
    let toDay = Y + '-' + M + '-' + D + '  ' + H + ':00';
    return toDay;
};

export const getLanguage = function () {
    let languageType = localStorage.getItem('languageType');
    let message;
    if (languageType === 'zh') {
        message = require('../i18n/zh-CN');
    } else if (languageType === 'en') {
        message = require('../i18n/en-GB');
    } else {
        message = require('../i18n/en-GB');
    }
    return message;
};