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
import Guanjia from '../page/List/Guanjia';
import ZiXUn from '../page/zixun/index';
import Record from '../page/Aboutme/Record'
import { getCookie } from "../util/index";

export default class Routers extends Component {
    requireAuth = (permission, component) => {
        let token = getCookie('username');
        let operName = getCookie('userid');
        if(!token || !operName ) browserHistory.push('/userlogin');
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
                    <Route path={'recommend'} component={Guanjia} />
                    <Route path={'zixun'} component={ZiXUn} />
                    <Route path={'record'} component={Record} />
                </Route>
                <Route path={'/guanjia'} component={App}>
                    <IndexRedirect to="/guanjia/product" />
                    <Route path={'/guanjia/product'} component={Product} />
                </Route>
                <Route path={'/userlogin'} component={LoginPage}/>
                <Route path={'/404'} component={NotFound} />
                <Route path="*" component={NotFound} />
            </Router>
        )
    }
}