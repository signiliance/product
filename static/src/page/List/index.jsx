import React, {Component} from 'react';
import {Row, Col, Table, Button, Modal, message } from 'antd';
import { buyprod,getprodlist } from '../../fetch/index';
import { getTime } from '../../util';

class ProduceIndex extends Component {
    state = {
            list: [{
                prodId:'1111',
                preEarn: '5%',
                buyTime: '5个月',
                danger:'低',
                needTime:'2018-5-14',
                from: '理财宝',
            },{
                prodId:'122111',
                preEarn: '533%',
                buyTime: '5个月',
                danger:'高',
                from: '理财宝',
            }
            ],
            visible: false,
            buyProdId: ''
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
            title: '风险',
            dataIndex: 'danger',
            key: 'danger'
        },
        {
            title: '可购买日期',
            dataIndex: 'needTime',
            key: 'needTime'
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
    componentWillMount(){
        getprodlist().then((data)=>{
            if(data.code == '200'){
                if( data.list != '') {
                    this.setState({
                        list: data.list,
                    })
                }
            }else {
                message.error('未查询到结果');
            }
        }).catch(err => {
            console.log(err);
        })
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
        return (
            <div>
                <Row>
                    <Col span = {12}>
                        <div className='content' style = {{fontSize: 16,marginTop: 40,overflow:'hidden'}}>
                            平台成立超过<span style={{fontSize: 26,color: 'red'}}>11</span>年,超过<span style={{fontSize: 26,color: 'red'}}>98</span>%的平台，理财用户超过<span style={{fontSize: 26,color: 'red'}}>2000</span>万，超过<span style={{fontSize: 26,color: 'red'}}>98</span>%的平台<br/>
                            <span style={{float:'right',color:'red',fontSize:12}}>数据提取于2018年1月</span>
                        </div>
                    </Col>
                    <Col span = {12}>
                        <div className='content' style = {{fontSize: 16,marginTop: 40,marginLeft:20,overflow:'hidden'}}>
                            促成理财<span style={{fontSize: 26,color: 'red'}}>12689</span>万，超过<span style={{fontSize: 26,color: 'red'}}>99</span>%平台，用户受益不低于<span style={{fontSize: 26,color: 'red'}}>5</span>%，高于<span style={{fontSize: 26,color: 'red'}}>99</span>%平台<br/>
                            <span style={{float:'right',color:'red',fontSize:12}}>数据提取于2018年1月</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span = {12}>
                        <div className='content' style = {{fontSize: 16,marginTop: 40,overflow:'hidden',textAlign:'center',lineHeight: 2}}>
                            <span style={{color:'red',fontSize:26,lineHeight:3}}>三大顶级战略合作</span><br/>
                            IDG   摩根士丹利   凯鹏华盈<br/>
                        </div>
                    </Col>
                    <Col span = {12}>
                        <div className='content' style = {{fontSize: 16,marginTop: 40,marginLeft:20,overflow:'hidden',textAlign:'center',lineHeight:2}}>
                            <span style={{color:'red',fontSize:26,lineHeight:3}}>强大风控 专业风控团队</span><br/>
                            11年以上风控经验，强大的线上数据库及反欺诈系统<br/>
                        </div>
                    </Col>
                </Row>
                <div style = {{marginTop: 20}}>
                <Table
                    columns={this.colums}
                    dataSource={this.state.list}
                ></Table>
                    {this.renderModal()}
                </div>
            </div>
        )

    }

}

export  default ProduceIndex;