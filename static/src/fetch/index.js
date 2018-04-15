
import API from './config'
import {buildParams} from "../util/index";
//import fetch from 'whatwg-fetch'

export const login = (form = {}) => {
    return fetch(API.loginUrl,{
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const changepass = (form = {}) => {
    return fetch(API.changepassword,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const buyprod = (form = {}) => {
    return fetch(API.buyprod,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const getprodlist = (form = {}) => {
    return fetch(API.prodlist,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const getmoney = (form = {}) => {
    return fetch(API.shouyimoney,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const getmoneylist = (form = {}) => {
    return fetch(API.myprodlist,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}

export const searchlist = (form = {}) => {
    return fetch(API.searchlist,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}

export const chongzhi = (form = {}) => {
    return fetch(API.chongzhi,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}

export const tixian = (form = {}) => {
    return fetch(API.tixian,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const zixun = () => {
    return fetch(API.zixun,{
        credentials: 'include',
        method: 'GET',
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const record = (form = {}) => {
    return fetch(API.record,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const guanjia = (form = {}) => {
    return fetch(API.guanjia,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const fabuprod = (form = {}) => {
    return fetch(API.fabuprod,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const getuserlist = (form = {}) => {
    return fetch(API.getuserlist,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const changeusertype = (form = {}) => {
    return fetch(API.changeusertype,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const getguziprodlist = (form = {}) => {
    return fetch(API.getguziprodlist,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}

export const changeguziprod = (form = {}) => {
    return fetch(API.changeguziprod,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const getfuziprodlist = (form = {}) => {
    return fetch(API.getfuziprodlist,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}

export const changefuziprod = (form = {}) => {
    return fetch(API.changefuziprod,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}

export const zixunfabu = (form = {}) => {
    return fetch(API.zixunfabu,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}

export const getguanjiazixun = (form = {}) => {
    return fetch(API.guanjiazixun,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const guanjiazixunsc = (form = {}) => {
    return fetch(API.guanjiazixunsc,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}

export const guanjiashouyilist = (form = {}) => {
    return fetch(API.guanjiashouyilist,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const guanjiatixian = (form = {}) => {
    return fetch(API.guanjiatixian,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}

export const getguanjialist = () => {
    return fetch(API.getguanjialist,{
        credentials: 'include',
        method: 'GET',
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const zhuce = (form = {}) => {
    return fetch(API.zhuceyonghu,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}