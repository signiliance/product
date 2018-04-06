import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import LoginPage from '../page/Login/login';
import NotFound from '../page/NotFound/index';
import App from '../page/index';
import Product from '../page/List/index';
import AboutUs from '../page/companny/index';
import ChangePwd from '../page/Aboutme/ChangePwd';
import MyProduct from '../page/Aboutme/MyProduct';
import Manage from '../page/Manage/index'
import { getCookie } from "../util/index";

export default class Routers extends Component {
    requireAuth = (permission, component) => {
        let token = getCookie('token');
        let operName = getCookie('operName');
        let operAccount = getCookie('operAccount');
        if(!token || !operName || !operAccount) browserHistory.replace('/login');
        return component;
    }
    render() {
        return (
            <Router history = {browserHistory}>
                <Route path={'/'} component={App}>
                    <IndexRedirect to="/product" />
                    <Route path={'product'} component={Product} />
                    <Route path={'companny'} component={AboutUs} />
                    <Route path={'changepwd'} component={ChangePwd} />
                    <Route path={'aboutme'} component={MyProduct} />
                    <Route path={'manage'} component={Manage} />
                </Route>
                <Route path={'/login'} component={LoginPage} />
                <Route path={'/404'} component={NotFound} />
                <Route path="*" component={NotFound} />
            </Router>
        )
    }
}