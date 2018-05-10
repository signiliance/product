import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
import logoImg from '../style/imgs/logo@2x.png';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


class SiderBarGuanjia extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        selectedKey: '',
    };
    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps)
    }
    setMenuOpen = props => {
        const {path} = props;
        const reg = /^\/([a-zA-Z]*)(\/?.*)$/g;
        let regPath = path.replace(reg, '$1');
        this.setState({
            selectedKey: `/${regPath}`
        });
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    render() {
        const {selectedKey} = this.state;
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{overflowY: 'auto'}}
            >
                <div className="logo" style = {{textAlign:'center'}}>
                    {<img src={logoImg} alt="ofo" style = {{marginTop: 15, marginBottom: 10}}/>}
                </div>
                <Menu
                    onClick={this.menuClick}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                >
                    <SubMenu key = '/guanjia/product'  title={<span><Icon type="appstore" /><span>产品管理</span></span>}>
                        <Menu.Item key="/guanjia/product">
                            <Link to={'/guanjia/product'}><Icon type="bars" /><span className="nav-text">发布产品</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/guanjia/gzmanage">
                            <Link to={'/guanjia/gzmanage'}><Icon type="bars" /><span className="nav-text">固益产品</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/guanjia/fzmanage">
                            <Link to={'/guanjia/fzmanage'}><Icon type="bars" /><span className="nav-text">浮益产品</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/guanjia/fanganfb">
                            <Link to={'/guanjia/fanganfb'}><Icon type="bars" /><span className="nav-text">发布方案</span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/guanjia/usermanage">
                        <Link to={'/guanjia/usermanage'}><Icon type="appstore" /><span className="nav-text">用户管理</span></Link>
                    </Menu.Item>
                    <SubMenu key="/guanjia/zxput" title={<span><Icon type="appstore" /><span>资讯管理</span></span>}>
                        <Menu.Item key="/guanjia/zxput">
                            <Link to={'/guanjia/zxput'}><Icon type="menu-unfold" /><span className="nav-text">资讯发布</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/guanjia/zxsc">
                            <Link to={'/guanjia/zxsc'}><Icon type="menu-unfold" /><span className="nav-text">资讯管理</span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/guanjia/guanjiash">
                        <Link to={'/guanjia/guanjiash'}><Icon type="appstore" /><span className="nav-text">我的收益</span></Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default SiderBarGuanjia;