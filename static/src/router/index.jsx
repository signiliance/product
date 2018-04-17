import React, {Component} from 'react';
import {Router, Route, hashHistory,browserHistory, IndexRedirect} from 'react-router';
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
import Record from '../page/Aboutme/Record';
import ProductGuan from '../page/guanjia/Product/index';
import Usermanage from '../page/guanjia/User/index';
import GuZi from '../page/guanjia/Guzi/index';
import FuZi from '../page/guanjia/Fuzi/index';
import Zixunfb from '../page/guanjia/Zixun/Zixunfabu';
import Zixunsc from '../page/guanjia/Zixun/zixunshanchu';
import ShouYi from '../page/guanjia/Shouyi/index';
import SalerWD from '../page/managers/salermanager/salerwithdraw';
import EditSaler from '../page/managers/salermanager/editSaler';
import RewardWithdraw from '../page/managers/withdraw/rewardwithdraw'
import ProdWithdraw from '../page/managers/withdraw/prodwithdraw'
import Regists from '../page/registered/index';
import Managerself from '../page/managers/managerself/index'
import { getCookie } from "../util/index";

export default class Routers extends Component {
    requireAuth = (permission, component) => {
        let token = getCookie('username');
        let operName = getCookie('userid');
        let usertype = getCookie('usertype');
        if(!(usertype!=='' && token!=='' && operName!=='' && usertype == 1)) browserHistory.push('/userlogin');
        return component;
    }
    requireAuth2 = (permission, component) => {
        let token = getCookie('username');
        let operName = getCookie('userid');
        let usertype = getCookie('usertype')
        if(!(usertype!=='' && token!=='' && operName!=='' && usertype == 2)) browserHistory.push('/userlogin');
        return component;
    }
    requireAuth3 = (permission, component) => {
        let token = getCookie('username');
        let operName = getCookie('userid');
        let usertype = getCookie('usertype')
        if(!(usertype!=='' && token!=='' && operName!=='' && usertype == 3)) browserHistory.push('/userlogin');
        return component;
    }
    render() {
        return (
            <Router history = {browserHistory}>
                <Route path={'/'} component={App}>
                    <IndexRedirect to="/product" />
                    <Route path={'product'} component={Product} onEnter={this.requireAuth}/>
                    <Route path={'companny'} component={AboutUs}  onEnter={this.requireAuth}/>
                    <Route path={'changepwd'} component={ChangePwd} onEnter={this.requireAuth}/>
                    <Route path={'aboutme'} component={MyProduct}  onEnter={this.requireAuth}/>
                    <Route path={'manage'} component={Manage} onEnter={this.requireAuth}/>
                    <Route path={'recommend'} component={Guanjia} onEnter={this.requireAuth} />
                    <Route path={'zixun'} component={ZiXUn}  onEnter={this.requireAuth}/>
                    <Route path={'record'} component={Record} onEnter={this.requireAuth}/>
                </Route>
                <Route path={'/guanjia'} component={App}>
                    <IndexRedirect to="/guanjia/product" />
                    <Route path={'/guanjia/product'} component={ProductGuan}  onEnter={this.requireAuth2}/>
                    <Route path={'/guanjia/usermanage'} component={Usermanage} onEnter={this.requireAuth2}/>
                    <Route path={'/guanjia/gzmanage'} component={GuZi} onEnter={this.requireAuth2}/>
                    <Route path={'/guanjia/fzmanage'} component={FuZi} onEnter={this.requireAuth2}/>
                    <Route path={'/guanjia/zxput'} component={Zixunfb}  onEnter={this.requireAuth2}/>
                    <Route path={'/guanjia/zxsc'} component={Zixunsc} onEnter={this.requireAuth2}/>
                    <Route path={'/guanjia/guanjiash'} component={ShouYi} onEnter={this.requireAuth2}/>
                </Route>
                <Route path={'/manager'} component={App}>
                    <IndexRedirect to="/manager/salerswd" />
                    <Route path={'/manager/salerswd'} component={SalerWD}  onEnter={this.requireAuth3}/>
                    <Route path={'/manager/editsalers'} component={EditSaler}   onEnter={this.requireAuth3}/>
                    <Route path={'/manager/prodwithdraw'} component={ProdWithdraw}   onEnter={this.requireAuth3}/>
                    <Route path={'/manager/rewardwithdraw'} component={RewardWithdraw}   onEnter={this.requireAuth3}/>
                    <Route path={'/manager/managerself'} component={Managerself}   onEnter={this.requireAuth3}/>
                </Route>
                <Route path={'/userlogin'} component={LoginPage}/>
                <Route path={'/regist'} component={Regists}/>
                <Route path={'/404'} component={NotFound} />
                <Route path="*" component={NotFound} />
            </Router>
        )
    }
}