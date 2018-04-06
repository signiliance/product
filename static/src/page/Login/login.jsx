import React ,{Component} from 'react';
//import {connect} from 'react-redux';
import { Row, Col, Form, Input, Button, Icon, message } from 'antd';
//import ''
import loginImg from '../../style/imgs/login.jpg';
import Cookies from 'react-cookies';
import {login} from '../../fetch/index';
import 'antd/dist/antd.css'

const FormItem = Form.Item;

const styles = {
    loginWrap: {
        width: '300px',
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        background: '#fff'
    },
    title: {
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
        fontSize: '18px',
        marginBottom: '15px'
    }
}

class LoginPageBase extends Component {


    handleSubmit =(e) => {
        e.preventDefault();
        this.props.form.validateFields((err)=>{
            if(err) {
                console.log(err);
            }
            Cookies.save('ssss','11111');
            const form = this.props.form.getFieldsValue();
            login(form).then((data) => {
               if(data.code == '200') {
                   Cookies.set('operName',data.operName);
                   Cookies.set('operNum',data.operNum);
               }
            }).catch(err => {
                console.log(err);
            })
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        // const code = getFieldValue('code');
        return (<div style={{background: `url(${loginImg}) no-repeat center center`, backgroundSize: 'cover'}}>
            <Row type="flex" justify="center" align="middle" style={{height: '100vh'}}>
                <Col style={styles.loginWrap}>
                    <div style={styles.title}>登陆</div>
                    <Form layout="horizontal" onSubmit={this.handleSubmit}>
                        <FormItem style={{width: '100%', marginBottom: 5}}>
                            {getFieldDecorator('operAccount', {
                                rules: [{required: true, message: '请输入用户名'}],
                            })(
                                <Input addonBefore={<Icon type="user"/>} placeholder="请输入用户名" style={{width: '100%'}}/>,
                            )}
                        </FormItem>
                        <FormItem style={{width: '100%', marginBottom: 5}}>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码'}],
                            })(
                                <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="请输入密码"
                                       style={{width: '100%'}}/>,
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>登录</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>);
    }
}


const LoginPage = Form.create()(LoginPageBase);

export default LoginPage;
