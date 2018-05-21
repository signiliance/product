import React, { Component } from 'react';
import { Layout } from 'antd';
import SiderBarCustom from '../component/Slider';
import SliderBarGuanjia from '../component/SliderGuanjia';
import SiderManager from '../component/SliderManager';
import HeaderCustom from '../component/header'
import 'antd/dist/antd.css';
import '../index.css'
import {getCookie} from "../util";
import img from '../style/imgs/timg.jpg'


const { Content, Footer }  = Layout;

class App extends Component {
    componentWillMount(){
    }

    renderSlider = () => {
        const usertype = getCookie('usertype');
        if(usertype == 1){
            return (
                <SiderBarCustom path={this.props.location.pathname} />
            )
        }else if(usertype == 2){
            return (
                <SliderBarGuanjia path={this.props.location.pathname} />
            )
        }
        else if(usertype == 3){
            return (
                <SiderManager path={this.props.location.pathname} />
            )
        }
    }

    render () {
        const {routers} = this.props;
        return (
            <Layout className="ant-layout-has-sider" style = {{height: '100%', flexDirection: 'row', backgroundColor:'#fff'}}>
                {this.renderSlider()}
                <Layout>
                    <HeaderCustom path={this.props.location.pathname} router = {routers}/>
                    <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        copyright && licaibao
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
export default App;

