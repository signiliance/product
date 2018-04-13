/**
 * Created by signiliance on 2018/4/5.
 */

import React, {Component} from 'react';
import { Table, Form, Input, Select, Row, Col, Button, Modal, message } from 'antd';
import { browserHistory } from 'react-router';
import { buyprod, searchlist } from '../../fetch/index';
import {getCookie, getTime, isInt} from '../../util';
import MangeType from './MangeType';
import listUtil from "../List/listUtil";
import Base from "../../component/Base";

const FormItem = Form.Item;
const Option = Select.Option;


class Managee extends Component {

    state = {
        list: [],

    }

    colums = [
        {
            title: '产品代号',
            dataIndex: 'prodid',
            key: 'prodid',
            render: (text, record) => (
                <span style={{color:'red'}}>{text}</span>
            ),
        },
        {
            title: '产品名称',
            dataIndex: 'prodname',
            key: 'prodname'
        },
        {
            title: '产品类型',
            dataIndex: 'prodtype',
            key: 'prodtype',
            render:(text) => (
                <span>{listUtil.prod(text)}</span>
            )
        },
        {
            title: '预期收益',
            dataIndex: 'income',
            key: 'income',
            render: (text) => ( <span>{`${text-1}%`}</span>)
        },
        {
            title: '购买时长',
            dataIndex: 'needbuytime',
            key: 'needbuytime',
            render: (text) => (
                <span>{text}个月</span>
            )
        },
        {
            title: '风险',
            dataIndex: 'dangertype',
            key: 'dangertype',
            render:(text) => (
                <span>{listUtil.table(text)}</span>
            )
        },
        {
            title: '可购买日期',
            dataIndex: 'needTime',
            key: 'needTime',
            render: (text,record) => (
                <span>{listUtil.time(record.startbuytime,record.endbuytime)}</span>
            )
        },
        {
            title: '购买',
            dataIndex: 'buy',
            key: 'buy',
            render: (text, record) => (
                <Button type='primary' onClick={this.buy.bind(this,record.prodname,record.prodid)}>购买</Button>
            ),
        }
    ]


    handleSubmit = (e) => {
        e.preventDefault();
        const { getFieldsValue } = this.props.form;
        let formData = getFieldsValue();
        let params = {...formData};
        if(formData.getMonth === '' || formData.getPrecent === '' || formData.getDanger === '') {
            message.error('收益时间，收益百分比，承受风险能力都是必填项');
        }else {
            searchlist(params).then((data)=>{
                if(data.code == '200'){
                    if(data.list === ''){
                        message.info('未查询到合适产品');
                        this.setState({
                            list: ''
                        })
                    }else {
                        this.setState({
                            list: data.list,
                        })
                    }
                }
            }).catch(err => console.log(err))
        }
    }

    reBack = () => {
        browserHistory.push('/');
    }

    handleOk = () => {
        this.setState({
            visible: false,
        })
        const userid = getCookie('userid');
        if(this.state.buyMoney >= 100 && isInt(this.state.buyMoney)) {
            buyprod({
                userid:userid,
                buyProdId: this.state.buyProdId,
                buyTime: getTime(),
                buymoney: this.state.buyMoney
            }).then((data) => {
                if (data.code == 200) {
                    message.success(data.message);
                } else {
                    message.error(data.message);
                }
            }).catch(err => {
                console.log(err);
            })
        }else {
            Base.ModFail('tips','购买金额必须是整数且大于100');
        }
    }
    buy = (prodname,prodid) => {
        this.setState({
            visible: true,
            buyProdname: prodname,
            buyProdId: prodid
        })
    }
    getValue = (e) => {
        this.setState({
            buyMoney: Number(e.target.value)
        })
    }
    renderModal = () => {
        return(
            <Modal title="购买提醒"
                   visible={this.state.visible}
                   okText='确认'
                   cancelText='取消'
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}
            >
                确认购买&nbsp;&nbsp;<span style={{color:'red',fontSize:22}}>{this.state.buyProdname}</span>&nbsp;&nbsp;吗?
                <p style={{marginTop: 10}}>购买金额（元）：</p> <Input onChange={this.getValue}/>
            </Modal>
        )
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout1 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        return (
            <div style={{marginTop: 15}}>
                <div className="content">
                    <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={11}>
                            <FormItem {...formItemLayout1} label="收益时间">
                                { getFieldDecorator('selectmonth', {
                                    rules: [{ required: true, message: '请选择收益时间'}],
                                    initialValue: ''
                                })(<Select placeholder="请选择收益时间" >
                                    <Option value="">请选择收益时间</Option>
                                    {(MangeType.month || []).map(item=><Option key={item.code}>{item.name}</Option>)}
                                </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                        <Row>
                            <Col span={11}>
                            <FormItem {...formItemLayout1} label="收益百分比">
                                { getFieldDecorator('selectpre', {
                                    rules: [{ required: true, message: '请选择收益百分比'}],
                                    initialValue: ''
                                })(<Select placeholder="请选择收益百分比">
                                    <Option value="">请选择收益百分比</Option>
                                    {(MangeType.precent || []).map(item=><Option key={item.code}>{item.name}</Option>)}
                                </Select>)}
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={11}>
                                <FormItem {...formItemLayout1} label="承受风险能力">
                                    { getFieldDecorator('selectdanger', {
                                        rules: [{ required: true, message: '请选择承受风险能力'}],
                                        initialValue: ''
                                    })(<Select placeholder="请选择承受风险能力">
                                        <Option value="">请选择承受风险能力</Option>
                                        {(MangeType.danger || []).map(item=><Option key={item.code}>{item.name}</Option>)}
                                    </Select>)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style={{textAlign: 'right'}}>
                            <Col span={11}>
                            <Button   type = 'primary' onClick={this.reBack}>取消</Button>
                                <Button  htmlType="submit" type = 'primary' style={{ marginLeft:'4%'}}>一键推荐</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                {this.state.list && <Table
                    style={{marginTop: 15}}
                    columns={this.colums}
                    dataSource={this.state.list}
                ></Table>}
                {this.renderModal()}
            </div>
        )
    }
}

const Manage = Form.create()(Managee);

export default Manage;