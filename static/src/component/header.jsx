import React, {Component} from 'react';
import { Menu, Icon, Layout, Popover, Form, Input, message, Modal } from 'antd';
import {getCookie} from "../util/index";
import avater from '../style/imgs/a1.jpg';
import {browserHistory} from 'react-router';
import SliderSum from './Slider'
import '../index.css'
const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;

class HeaderCustom extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: 'xxxxx',
            visible: false,
            changePassword: true,
            sss: 1111
        };
    }

    componentWillMount() {
        // 从cookie获取username
    }
    menuClick = e => {
        e.key === 'logout' && this.logout();
        e.key === 'change' && browserHistory.push('/changepasswd');
    }

    changePwd = () => {
        this.setState({
            changePassword: true
        });
    }

    logout = () => {
        browserHistory.push('/login');
    }

    hideModal = () => {
        this.setState({
            changePassword: false
        })
    }

    checkPwd = (rule, value, callback) => {
        const pwReg = /^[\S]{8,30}$/;
        let passport = this.props.form.getFieldsValue('passport');

        if(pwReg.test(value)) {
            if(value !== passport) {
                return callback('两次输入的密码不一致');
            } else {
                return callback();
            }
        } else {
            return callback('请勿输入空格，为数介于8-30位之间');
        }
    }

    popoverHide = () => {
        this.setState({
            visible: false,
        })
    };

    handleVisibleChange = (visible) => {
        this.setState({ visible })
    }

    modalHandleOk = (validateFields) => {

    }
    render() {
        const { user, changePassword } = this.state;
        //const { getFieldDecorator, validateFields } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        }
        const pwdReg = /^[\S]{8,30}$/;
        return (
            <div>
            <Header style = {{background: '#fff', padding: 0, height: 65}} className= 'custom-theme'>
                <Icon
                    className="trigger custom-trigger"
                    type={'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <SubMenu title={<span className='avatar'><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <Menu.Item key="info">你好 - {user}</Menu.Item>
                        <Menu.Item key="logout">退出登录</Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
            </div>
        )

    }

}


export default HeaderCustom;