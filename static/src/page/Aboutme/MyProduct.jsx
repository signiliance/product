import React, {Component} from 'react';
import {Button, message, Col, Row, Tooltip, Icon, Table, Modal} from 'antd';
//import { ChartCard, MiniBar } from 'components/Charts';
import { add } from '../../util';
import { getmoney, getmoneylist } from '../../fetch/index';


class MyProduct extends Component {

    state = {
        prodNum: 0,
        accountMoney: 0,
        endTime: '',
        meMoney:0,
        hongMoney: 0,
        visible: false,
        getProdId: 0,
        getStartTime: '',
        list:[
            {
                prodId: '1111',
                startTime:'2018-2-2',
                buyMoney:'22222',
                preEarn: '5%',
                nowMoney: '333333'
            }
        ]
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
            title: '购买时间',
            dataIndex: 'startTime',
            key: 'startTime'
        },
        {
            title: '购买金额',
            dataIndex: 'buyMoney',
            key: 'buyMoney'
        },
        {
            title: '收益百分比',
            dataIndex: 'preEarn',
            key: 'preEarn'
        },
        {
            title: '已获取收益',
            dataIndex: 'nowMoney',
            key: 'nowMoney'
        },

        {
            title: '操作',
            dataIndex: 'oper',
            key: 'oper',
            render: (text, record) => (
                <Button type='primary' onClick={this.getMoney.bind(this,record.prodId,record.startTime)}>获取收益</Button>
            ),
        }
    ];

    getMoney = (prodId,startTime) =>{
        this.setState({
            visible: true,
            getProdId: prodId,
            getStartTime: startTime,
        })
    }

    getList = () => {
        getmoneylist().then((data)=>{
            if(data.code == '200') {
                this.setState({
                    list: data.list,
                    prodNum: data.prodNum,
                    accountMoney: data.accountMoney,
                    endTime: data.endTime,
                    meMoney: data.meMoney,
                    hongMoney: data.hongMoney,
                })
            }
            else {
                message.error('获取信息失败')
            }
        }).catch(err => console.log(err));
    }

    componentWillMount() {
       this.getList();
    }

    handleOk = () => {
        getmoney({getProdId: this.state.getProdId, getStartTime: this.state.getStartTime}).then((data)=>{
            if(data.code == '200'){
                message.success('收益成功');
                this.getList();
            }else {
                message.error('获取收益失败');
            }
        }).catch(err => console.log(err))

    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    renderModal = () => {
        return(
            <Modal title="操作提醒"
                   visible={this.state.visible}
                   okText='确认'
                   cancelText='取消'
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}
            >
                确认获取代号为&nbsp;&nbsp;<span style={{color:'red',fontSize:22}}>{this.state.getProdId}</span>&nbsp;&nbsp;的理财产品得收益吗？<br/>
                <span style={{ color: 'red',fontSize: 12}}>（获取收益后将不再持有该产品）</span>
            </Modal>
        )
    }

    render () {
        return(
            <div>
                <div style={{display:'flex',marginTop: 15}}>
                    <div className="content" style={{width:'45%',height:150}}>
                        <div style={{textAlign:'center'}}>数据看板</div>
                        <div>已购买理财产品数量：<span style={{fontSize: 20}}>{this.state.prodNum}</span></div>
                        <div>最大预期收益：<span style={{fontSize: 20}}>{this.state.accountMoney}</span></div>
                        <div>最大预期收益时间：<span style={{fontSize: 20}}>{this.state.endTime}</span></div>
                    </div>
                    <div className="content" style={{width:'54%',height:150,marginLeft:15}}>
                        <div style={{textAlign:'center'}}>个人钱包</div>
                        <div>个人余额：<span style={{fontSize: 20}}>{this.state.meMoney}</span></div>
                        <div>已收益金额：<span style={{fontSize: 20}}>{this.state.hongMoney}</span></div>
                        <div>钱包余额：<span style={{fontSize: 20}}>{add(this.state.meMoney,this.state.hongMoney)}</span></div>
                    </div>
                </div>
                <div className="content" style={{marginTop: 15}}>
                    <Table
                        columns={this.colums}
                        dataSource={this.state.list}
                    ></Table>
                </div>
                {this.renderModal()}
            </div>
        )
    }

}

export default MyProduct;