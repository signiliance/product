import React, {Component} from 'react';
import {Input, Form, Icon, Button, message} from 'antd';
import { changepass } from '../../fetch/index';

const FormItem = Form.Item;

class ChangePass extends Component {
    state = {

    }

    handleSubmit = () => {
        const { validateFields } = this.props.form;
        const form = this.props.form.getFieldsValue();
        //console.log(form);
        changepass({newPass: form.passport, oldPass: form.passport_old}).then((data)=>{
            console.log(data);
        })
    }

    checkPassword = (rule, value, callback) => {
        const pwdReg = /^[\S]{8,30}$/;
        let passport = this.props.form.getFieldValue('passport');

        if(pwdReg.test(value)) {
            if (value !== passport) {
                return callback('两次输入的密码不一致');
            } else {
                return callback();
            }
        } else {
            return callback('请勿输入空格，位数介于8-30位之间');
        }
    }

    render() {

        const { getFieldDecorator, validateFields } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const pwdReg = /^[\S]{8,30}$/;
        return (
            <div className='content' style = {{width: '100%',marginTop: 20,}}>
                <Form>
                    <FormItem {...formItemLayout} label="请输入原密码" hasFeedback>
                        {getFieldDecorator('passport_old', {rules: [{required: true, message: '请输入原密码' }]})(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入原密码" maxLength="30" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="请输入新密码" hasFeedback>
                        {getFieldDecorator('passport', {rules: [{required: true, message: '请输入新密码' }, {type:'string',pattern:pwdReg,message:'请勿输入空格，位数介于8-30位之间'}]})(<Input prefix={<Icon type="lock" style={{fontSize: 13}} />} type="password" placeholder="请输入新密码" maxLength="30" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="请确认新密码" hasFeedback>
                        {getFieldDecorator('passport_again', {rules: [{required: true, message: '请确认新密码'}, {validator: this.checkPassword}]})(<Input prefix={<Icon type="lock" style={{fontSize: 13}} />} type="password" placeholder="请确认新密码" maxLength="30" />)}
                    </FormItem>
                </Form>
                <div style = {{textAlign:'right'}}>
                <Button type='primary' onClick={this.handleSubmit}>确认</Button>
                <Button type='primary' style={{marginLeft: 20,marginRight: 50}}>取消</Button>
                </div>
            </div>
        )
    }
}

const ChangePwd = Form.create()(ChangePass);
export default ChangePwd;