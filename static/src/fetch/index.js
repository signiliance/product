
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
    return fetch(API.getmoney,{
        credentials: 'include',
        method: 'POST',
        headers: {
            "Origin": '*',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}
export const getmoneylist = () => {
    return fetch(API.getmoneylist,{
        credentials: 'include',
        method: 'GET',
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