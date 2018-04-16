import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
import logoImg from '../style/imgs/logo@2x.png';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


class SiderManager extends Component {
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
                    <SubMenu key = '/manager/salerswd'  title={<span><Icon type="appstore" /><span>业务员管理</span></span>}>
                        <Menu.Item key="/manager/salerswd">
                            <Link to={'/manager/salerswd'}><Icon type="bars" /><span className="nav-text">业务员业绩</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/manager/editsalers">
                            <Link to={'/manager/editsalers'}><Icon type="bars" /><span className="nav-text">业务员管理</span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu  key = '/manager/prodwithdraw'  title={<span><Icon type="appstore" /><span>流水</span></span>}>
                        <Menu.Item key="/manager/prodwithdraw">
                             <Link to={'/manager/prodwithdraw'}><Icon type="appstore" /><span className="nav-text">销售流水</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/manager/rewardwithdraw">
                            <Link to={'/manager/rewardwithdraw'}><Icon type="appstore" /><span className="nav-text">奖励流水</span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/manager/managerself">
                        <Link to={'/manager/managerself'}><Icon type="appstore" /><span className="nav-text">个人中心</span></Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default SiderManager;