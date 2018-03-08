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