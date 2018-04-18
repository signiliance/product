import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
import logoImg from '../style/imgs/logo@2x.png';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


class SiderBarCustom extends Component {
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
                    <Menu.Item key="/product">
                        <Link to={'/product'}><Icon type="appstore" /><span className="nav-text">公司产品</span></Link>
                    </Menu.Item>
                    <SubMenu key = '/aboutcom'  title={<span><Icon type="appstore" /><span>关于我们</span></span>}>
                        <Menu.Item key="/aboutcom">
                            <Link to={'/aboutcom'}><Icon type="bars" /><span className="nav-text">公司简介</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/honors">
                            <Link to={'/honors'}><Icon type="bars" /><span className="nav-text">获得荣誉</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/companny">
                            <Link to={'/companny'}><Icon type="bars" /><span className="nav-text">高管团队</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/lianxi">
                            <Link to={'/lianxi'}><Icon type="bars" /><span className="nav-text">联系我们</span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/manage">
                        <Link to={'/manage'}><Icon type="appstore" /><span className="nav-text">个性理财推荐</span></Link>
                    </Menu.Item>
                    <Menu.Item key="/recommend">
                        <Link to={'/recommend'}><Icon type="appstore" /><span className="nav-text">管家理财推荐</span></Link>
                    </Menu.Item>
                    <SubMenu key = '/zixun'  title={<span><Icon type="appstore" /><span>资讯</span></span>}>
                        <Menu.Item key="/zixun">
                            <Link to={'/zixun'}><Icon type="bars" /><span className="nav-text">理财资讯</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/report">
                            <Link to={'/report'}><Icon type="bars" /><span className="nav-text">运营报告</span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key = '/aboutme'  title={<span><Icon type="appstore" /><span>个人中心</span></span>}>
                        <Menu.Item key="/aboutme">
                            <Link to={'/aboutme'}><Icon type="bars" /><span className="nav-text">我的理财</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/record">
                            <Link to={'/record'}><Icon type="bars" /><span className="nav-text">交易记录</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/changepwd">
                            <Link to={'/changepwd'}><Icon type="bars" /><span className="nav-text">修改密码</span></Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default SiderBarCustom;