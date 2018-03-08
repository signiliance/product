import React, { Component } from 'react';
import { Layout } from 'antd';
import SiderBarCustom from '../component/Slider';
import 'antd/dist/antd.css';


const { Content, Footer, Header }  = Layout;

class App extends Component {

    render () {
        return (
            <Layout className="ant-layout-has-sider" style = {{height: '100%', flexDirection: 'row', backgroundColor:'#fff'}}>
                 <SiderBarCustom path={this.props.location.pathname} />
                <Layout>
                    <Header>Header</Header>
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

git@github.com:signiliance/product.git
