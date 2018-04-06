/**
 * Created by signiliance on 2018/4/5.
 */

import React, {Component} from 'react';
import { Table, Form, Input, Select, Row, Col, Button, Modal, message } from 'antd';
import { browserHistory } from 'react-router';
import { buyprod, searchlist } from '../../fetch/index';
import { getTime } from '../../util';
import MangeType from './MangeType';

const FormItem = Form.Item;
const Option = Select.Option;


class Managee extends Component {

    state = {
        list: [{
            prodId:'1111',
            preEarn: '5%',
            buyTime: '5个月',
            from: '理财宝',
        },{
            prodId:'122111',
            preEarn: '533%',
            buyTime: '5个月',
            from: '理财宝',
        }
        ],

    }

    colums = [
        {
            title: '产品代号',
            dataIndex: 'prodId',
            key: 'prodId',
            render: (text, record) => (
                <span style={{color:'red'}}>{text}</span>
            ),
        },
        {
            title: '预期收益',
            dataIndex: 'preEarn',
            key: 'preEarn'
        },
        {
            title: '购买时长',
            dataIndex: 'buyTime',
            key: 'buyTime'
        },
        {
            title: '来源',
            dataIndex: 'from',
            key: 'from'
        },
        {
            title: '购买',
            dataIndex: 'buy',
            key: 'buy',
            render: (text, record) => (
                <Button type='primary' onClick={this.buy.bind(this,record.prodId)}>购买</Button>
            ),
        }
    ]


    handleSubmit = (e) => {
        e.preventDefault();
        const { getFieldsValue } = this.props.form;
        let formData = getFieldsValue();
        let params = {...formData};
        if(formData.getMonth === '' || formData.getPrecent === '') {
            message.error('收益时间和收益百分比都是必填项');
        }else {
            searchlist(params).then((data)=>{
                if(data.code == '200'){
                    this.setState({
                        list: data.list,
                    })
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
        buyprod({buyProdId: this.state.buyProdId,buyTime: getTime()}).then((data) => {
            if(data.code == 200) {
                message.success('购买成功');
            }else{
                message.error('购买失败');
            }
        }).catch(err => {
            console.log(err);
        })
    }
    buy = (prodId) => {
        this.setState({
            visible: true,
            buyProdId: prodId,
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
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
                确认购买代号为&nbsp;&nbsp;<span style={{color:'red',fontSize:22}}>{this.state.buyProdId}</span>&nbsp;&nbsp;的理财产品吗
            </Modal>
        )
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
                                { getFieldDecorator('getMonth', {
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
                                { getFieldDecorator('getPrecent', {
                                    rules: [{ required: true, message: '请选择收益百分比'}],
                                    initialValue: ''
                                })(<Select placeholder="请选择收益百分比">
                                    <Option value="">请选择收益百分比</Option>
                                    {(MangeType.precent || []).map(item=><Option key={item.code}>{item.name}</Option>)}
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
                <Table
                    style={{marginTop: 15}}
                    columns={this.colums}
                    dataSource={this.state.list}
                ></Table>
                {this.renderModal()}
            </div>
        )
    }
}

const Manage = Form.create()(Managee);

export default Manage;