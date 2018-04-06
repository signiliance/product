import React, { Component } from 'react';
import { Layout } from 'antd';
import SiderBarCustom from '../component/Slider';
import HeaderCustom from '../component/header'
import 'antd/dist/antd.css';
import '../index.css'


const { Content, Footer }  = Layout;

class App extends Component {
    componentWillMount(){
    }
    render () {
        const {routers} = this.props;
        return (
            <Layout className="ant-layout-has-sider" style = {{height: '100%', flexDirection: 'row', backgroundColor:'#fff'}}>
                 <SiderBarCustom path={this.props.location.pathname} />
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

