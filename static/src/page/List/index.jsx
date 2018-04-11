import React, {Component} from 'react';
import {Row, Col, Table, Button, Modal, message, Input } from 'antd';
import { buyprod,getprodlist } from '../../fetch/index';
import { getTime } from '../../util';
import listUtil from './listUtil';
import  Base  from '../../component/Base.js';
import {getCookie,isInt} from '../../util'

class ProduceIndex extends Component {
    state = {
            list: '',
            visible: false,
            buyProdId: ''
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
            title: '预期收益',
            dataIndex: 'income',
            key: 'income',
            render: (text) => ( <span>{`${text-1}%`}</span>)
        },
        {
            title: '购买时长',
            dataIndex: 'needbuytime',
            key: 'needbuytime'
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
    componentWillMount(){
        let form = {};
        form.usertype = getCookie('usertype')
        getprodlist(form).then((data)=>{
            if(data.code == '200'){
                if( data.list != '') {
                    this.setState({
                        list: data.list,
                    })
                }
            }else {
                Base.ModFail('tips','未查询到结果');
            }
        }).catch(err => {
            console.log(err);
        })
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
                    message.success('购买成功');
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
    handleCancel = (e) => {
        this.setState({
            visible: false,
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
                <p style={{marginTop: 10}}>购买金额：</p> <Input onChange={this.getValue}/>
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
                    {this.state.list && <Table
                        columns={this.colums}
                        dataSource={this.state.list}
                    ></Table>
                    }
                    {this.renderModal()}
                </div>
            </div>
        )

    }

}

export  default ProduceIndex;