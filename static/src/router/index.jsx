import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import LoginPage from '../page/Login/login';
import NotFound from '../page/NotFound/index';
import App from '../page/index';
import { getCookie } from "../util/index";

export default class Routers extends Component {
    requireAuth = (permission, component) => {
        let token = getCookie('token');
        let operName = getCookie('operName');
        let operAccount = getCookie('operAccount');
        if(!token || !operName || !operAccount) hashHistory.replace('/login');
        return component;
    }
    render() {
        return (
            <Router history = {hashHistory}>
                <Route path={'/'} component={App}>
                </Route>
                <Route path={'/login'} component={LoginPage} />
                <Route path={'/404'} component={NotFound} />
            </Router>
        )
    }
}