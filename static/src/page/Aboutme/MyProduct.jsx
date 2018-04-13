import React, {Component} from 'react';
import {Button, message, Col, Row, Tooltip, Icon, Table, Modal, Input} from 'antd';
//import { ChartCard, MiniBar } from 'components/Charts';
import { add } from '../../util';
import { getmoney, getmoneylist, chongzhi, tixian } from '../../fetch/index';
import {getCookie,getTime} from "../../util";
import TableCom from '../List/listUtil'
import myUtil from './util';
import Base from '../../component/Base'

class MyProduct extends Component {

    state = {
        prodNum: 0,
        accountMoney: 0,
        meMoney:0,
        visible: false,
        tixianvisible: false,
        chongzhivisible: false,
        getProdId: 0,
        getStartTime: '',
        tixianyuan: '',
        chongzhiyuan: '',
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
            title: '购买时间',
            dataIndex: 'buytime',
            key: 'buytime',
            render: (text)=>(
                <span>{myUtil.time(text)}</span>
            )
        },
        {
            title: '购买金额',
            dataIndex: 'buymoney',
            key: 'buymoney',
            render: (text) => (
                <span>{text}元</span>
            )
        },
        {
            title: '收益百分比',
            dataIndex: 'prodincome',
            key: 'prodincome',
            render: (text)=>(
                <span>{text-1}%</span>
            )
        },
        {
            title: '将获取收益',
            dataIndex: 'willgetmoney',
            key: 'willgetmoney',
            render: (text,record) => (
                <span>{myUtil.shouyi(record.buymoney,record.prodincome)}</span>
            )
        },
        {
            title: '可获取收益日期',
            dataIndex: 'nowtime',
            key: 'nowtime',
            render: (text,record) => (
                <span>{TableCom.needbuytime(record.buytime,record.needbuytime)}</span>
            )
        },
        {
            title: '操作',
            dataIndex: 'oper',
            key: 'oper',
            render: (text, record) => (
                <Button type='primary' onClick={this.getMoney.bind(this,record.prodname,record.dingdanid,record.prodid,record.buytime,record.needbuytime,record.prodincome,record.buymoney)}>获取收益</Button>
            ),
        }
    ];

    getMoney = (prodname,dingdanid,prodid,buytime,needbuytime,prodincome,buymoney) =>{
        this.setState({
            visible: true,
            prodname: prodname,
            prodid: prodid,
            dingdanid: dingdanid,
            shouyitime: TableCom.needbuytime(buytime,needbuytime,1),
            nowtime: getTime(),
            income: prodincome,
            buymoney: buymoney
        })
    }

    getList = () => {
        const userid = getCookie('userid');
        getmoneylist({userid: userid}).then((data)=>{
            if(data.code == '200') {
                this.setState({
                    list: data.list,
                    prodNum: data.list.length,
                    accountMoney: myUtil.zongshouyi(data.list),
                    memoney: data.memoney,
                })
            }
            else {
                message.error('获取信息失败')
            }
        }).catch(err => console.log(err));
    }

    componentDidMount() {
       this.getList();
    }

    handleOk = () => {

        const {prodid,dingdanid,shouyitime,nowtime,buymoney,income} = this.state;
        const userid = getCookie('userid');
        this.setState({
            visible: false
        })
        getmoney({userid:userid,prodid,dingdanid,shouyitime,nowtime,buymoney,income}).then((data)=>{
            if(data.code == '200'){
                message.success(data.message+data.shouyi);
                this.getList();
            }else {
                message.error(data.message);
            }
        }).catch(err => console.log(err))

    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    tixian = () => {
        this.setState({
            tixianvisible: true
        })
    }
    tixian1 = () => {
        const userid = getCookie('userid');
        if(parseInt(this.state.memoney) < parseInt(this.state.tixianyuan)){
            Base.ModFail('tips','提现金额需小于账户余额');
        }else {
            tixian({userid: userid, tixianyuan: this.state.tixianyuan}).then((data) => {
                if (data.code === 200) {
                    message.success(data.message);
                    this.tixian2();
                    this.getList();
                } else {
                    message.error(data.message);
                }
            }).catch(err => console.log(err))
        }
    }
    tixian2 = () => {
        this.setState({
            tixianvisible: false
        })

    }
    chongzhi = () => {
        this.setState({
           chongzhivisible: true
        })
    }
    chongzhi1 = () => {
        const userid = getCookie('userid')
        chongzhi({userid: userid,chongzhiyuan: this.state.chongzhiyuan}).then((data)=> {
                if(data.code === 200){
                    message.success(data.message);
                    this.chongzhi2();
                    this.getList();
                }else {
                    message.error(data.message);
                }
            }).catch(err => console.log(err))

    }
    chongzhi2 = () => {
        this.setState({
            chongzhivisible: false
        })
    }
    getCZ = (e) => {
        this.setState({
            chongzhiyuan: e.target.value,
        })
    }
    getTX = (e) => {
        this.setState({
            tixianyuan: e.target.value,
        })
    }
    renderchongzhiModal = () => {
        return (
            <Modal title='操作提醒'
                   visible={this.state.chongzhivisible}
                   okText='确认'
                   cancelText='取消'
                   onOk={this.chongzhi1}
                   onCancel={this.chongzhi2}
            >
                <p style={{marginTop: 10}}>充值金额（元）：</p> <Input onChange={this.getCZ}/>
            </Modal>
        )
    }
    rendertixianModal = () => {
        return (
            <Modal title='操作提醒'
                   visible={this.state.tixianvisible}
                   okText='确认'
                   cancelText='取消'
                   onOk={this.tixian1}
                   onCancel={this.tixian2}
            >
                <p style={{marginTop: 10}}>提现金额（元）：</p> <Input onChange={this.getTX}/>
                <span style={{color: 'red',fontSize: 12}}>提现金额必须小于钱包余额</span>
            </Modal>
        )
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
                确认获取代号为&nbsp;&nbsp;<span style={{color:'red',fontSize:22}}>{this.state.prodname}</span>&nbsp;&nbsp;的理财产品得收益吗？<br/>
                <span style={{ color: 'red',fontSize: 12}}>（存款债券类产品未到获取收益时间则只能获取本金）</span> <br/>
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
                    </div>
                    <div className="content" style={{width:'54%',height:150,marginLeft:15}}>
                        <div style={{textAlign:'center'}}>个人钱包</div>
                        <div>账户余额：<span style={{fontSize: 20}}>{this.state.memoney}元</span></div>
                        <div style={{marginTop: 15}}>
                        <Button type = 'primary' onClick={this.tixian}>提现</Button>
                        <Button type = 'primary' style={{marginLeft: 15}} onClick={this.chongzhi}>充值</Button>
                        </div>
                    </div>
                </div>
                <div className="content" style={{marginTop: 15}}>
                    {this.state.list &&  <Table
                        columns={this.colums}
                        dataSource={this.state.list}
                    ></Table>}
                </div>
                {this.renderModal()}
                {this.renderchongzhiModal()}
                {this.rendertixianModal()}
            </div>
        )
    }

}

export default MyProduct;