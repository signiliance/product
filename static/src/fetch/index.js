
import API from './config'
import {buildParams} from "../util/index";
//import fetch from 'whatwg-fetch'

export const login = (form = {}) => {
    return fetch(API.loginUrl,{
        credentials: 'include',
        method: 'POST',
        headers: {
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
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: buildParams(form)
    }).then((res) => res.json()).catch(err => console.log(err))
}