import React, {Component} from 'react';
import { Menu, Icon, Layout, Popover, Form, Input, message, Modal } from 'antd';
import {getCookie} from "../util/index";
import avater from '../style/imgs/b1.jpg';
import {browserHistory} from 'react-router';

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;

class Header extends Component {
    state = {
        user: '',
        visible: false,
        changePassword: false
    };

    componentWillMount() {
        // 从cookie获取username
    }
    menuClick = e => {
        e.key === 'logout' && this.logout();
        e.key === 'change' && this.changePwd();
    }

    changePwd = () => {
        this.setState({
            changePassword: true
        });
    }

    logout = () => {
        browserHistory.push('/');
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

    render() {
        const { user, changePassword } = this.state;
        const { getFieldDecorator, validateFields } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        }
    }


}
