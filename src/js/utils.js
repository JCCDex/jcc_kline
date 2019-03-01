export const isNumber = (num) => {
    return !Number.isNaN(parseFloat(num)) && Number.isFinite(parseFloat(num));
};

export const getClientWidth = () => {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

export const getClientHeight = () => {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
};

export const getDefaultChartSize = () => {
    let chartSize = {};
    let clientWidth = getClientWidth();
    let clientHeight = getClientHeight();
    chartSize.clientWidth = clientWidth;
    chartSize.clientHeight = clientHeight;
    let width;
    let height;
    if (clientWidth <= 1024) {
        width = 1000 * 0.7;
        height = 1000 * 0.44 * 0.8;
    } else if (clientWidth <= 1280) {
        width = 1203 * 0.7;
        height = 1203 * 0.37 * 0.8;
    } else if (clientWidth <= 1366) {
        width = 1284 * 0.7;
        height = 1284 * 0.44 * 0.8;
    } else if (clientWidth <= 1440) {
        width = 1354 * 0.7;
        height = 1354 * 0.4 * 0.8;
    } else if (clientWidth <= 1680) {
        width = 1504 * 0.7;
        height = 1504 * 0.36 * 0.8;
    } else if (clientWidth <= 1920) {
        width = 1804 * 0.7;
        height = 1804 * 0.37 * 0.8;
    } else if (clientWidth <= 2180) {
        width = 2048 * 0.7;
        height = 2048 * 0.37 * 0.8;
    } else if (clientWidth <= 2560) {
        width = 2560 * 0.7;
        height = 1385 * 0.37 * 0.8;
    } else if (clientWidth <= 3440) {
        width = 3440 * 0.7;
        height = 1426 * 0.37 * 0.8;
    } else if (clientWidth <= 3840) {
        width = 3840 * 0.7;
        height = 1426 * 0.37 * 0.8;
    }
    chartSize.width = width;
    chartSize.height = height;
    return chartSize;
};

export const formatDecimal = function (f, n, sep) {
    // var num = parseFloat(f);
    n = parseInt(n);
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