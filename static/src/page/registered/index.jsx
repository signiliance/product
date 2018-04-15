import React ,{Component} from 'react';
//import {connect} from 'react-redux';
import { Row, Col, Form, Input, Button, Icon, message, Select } from 'antd';
import { browserHistory } from 'react-router'
import loginImg from '../../style/imgs/login.jpg';
import 'antd/dist/antd.css'
import {getguanjialist,zhuce} from "../../fetch";
import SalerTC from './salerType'
import Base from '../../component/Base'

const FormItem = Form.Item;
const Option = Select.Option;

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

class Registered extends Component {


    state = {
        list:[]
    }
    componentWillMount () {
        getguanjialist().then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list
                })
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { getFieldsValue } = this.props.form;
        let formData = getFieldsValue();
        console.log(formData);
        if(formData.username && formData.password && formData.userphone && formData.salerid){
            zhuce(formData).then((data)=>{
                if(data.code === 200){
                    Base.ModSuccessd('注册成功','您的登录名是'+`${data.userid}`,()=>{
                        const path = {pathname:'/userlogin',query:{userid:data.userid}};
                        browserHistory.push(path);
                    });
                }
            })


        }else{
            Base.ModFail('warnning','请填写完整信息');
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        // const code = getFieldValue('code');
        const pwdReg = /^[\S]{8,30}$/;
        return (<div style={{background: `url(${loginImg}) no-repeat center center`, backgroundSize: 'cover'}}>
            <Row type="flex" justify="center" align="middle" style={{height: '100vh'}}>
                <Col style={styles.loginWrap}>
                    <div style={styles.title}>注册</div>
                    <Form layout="horizontal" onSubmit={this.handleSubmit}>
                        <FormItem style={{width: '100%', marginBottom: 5}}>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入姓名'}],
                            })(
                                <Input addonBefore={<Icon type="user"/>} placeholder="请输入姓名" style={{width: '100%'}}/>,
                            )}
                        </FormItem>
                        <FormItem style={{width: '100%', marginBottom: 5}}>
                            {getFieldDecorator('password', {
                                rules: [{required: true, pattern:pwdReg,message: '请勿输入空格，位数介于8-30位之间'}],
                            })(
                                <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="请输入密码"
                                       style={{width: '100%'}}/>,
                            )}
                        </FormItem>
                        <FormItem style={{width: '100%', marginBottom: 5}}>
                            {getFieldDecorator('userphone', {
                                rules: [{required: true, message: '请输入手机号码'}],
                            })(
                                <Input addonBefore={<Icon type="phone"/>}  placeholder="请输入手机号码"
                                       style={{width: '100%'}}/>,
                            )}
                        </FormItem>
                        <FormItem style={{width: '100%', marginBottom: 5}}>
                            {getFieldDecorator('salerid', {
                                rules: [{required: true, message: '请选择管家'}],
                            })(
                               <Select style={{width: '100%'}}  placeholder="请选择管家" addonBefore={<Icon type="phone"/>}>
                                   {(this.state.list || []).map(item=><Option key={item.salerid}>{item.salername}-{SalerTC.type(item.salertype)}</Option>)}
                               </Select>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>注册</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>);
    }
}


const Regists = Form.create()(Registered);

export default Regists;
