import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
import logoImg from '../style/imgs/logo.png';

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
                    <Menu.Item key="/order">
                        <Link to={'/order'}><Icon type="upload" /><span className="nav-text">上传工资单</span></Link>
                    </Menu.Item>
                    <Menu.Item key="/business">
                        <Link to={'/business'}><Icon type="solution" /><span className="nav-text">业务订单查询</span></Link>
                    </Menu.Item>
                    <Menu.Item key="/account">
                        <Link to={'/account'}><Icon type="user" /><span className="nav-text">账户查询</span></Link>
                    </Menu.Item>
                    <Menu.Item key="/third">
                        <Link to={'/third'}><Icon type="team" /><span className="nav-text">第三方订单查询</span></Link>
                    </Menu.Item>
                    <SubMenu key="/wage" title={<span><Icon type="bars" /><span>财务对账明细</span></span>}>
                        <Menu.Item key="/wage">
                            <Link to={'/wage'}><Icon type="menu-unfold" /><span className="nav-text">工资流水</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/withdraw">
                            <Link to={'/withdraw'}><Icon type="menu-unfold" /><span className="nav-text">提现明细</span></Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default SiderBarCustom;