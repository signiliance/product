import Cookies from 'react-cookies';

export const setCookie = (key, value, day = 0) => {
    Cookies.save(key, value, {
        path: '/',
        expires: day * 24 * 60 * 60
    })
}

export const getCookie = (key) => {
    return Cookies.load(key);
}

export const removeCookie = (key) => {
    Cookies.save(key, '', {
        path: '/',
        expires: 0
    })

}


export const buildParams = (data) => {
    var i, params = [];
    for(i in data) {
        if(data.hasOwnProperty(i)){
            if(data[i]) {
                params.push(i + '=' + data[i]);
            }
        }
    }
    return params.join('&');
}

export const getTime = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

// 解决js浮点数计算不精确的问题


// 加法

export const add = (num1,num2) => {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
}

//减法

export const minus = (num1,num2) => {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum - num2 * baseNum) / baseNum;
}