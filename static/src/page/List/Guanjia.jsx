import React, {Component} from 'react';
import {Modal,Button,Table,message,Input} from 'antd';
import listUtil from "./listUtil";
import {getCookie, getTime, isInt} from "../../util";
import {guanjia} from '../../fetch/index'
import {buyprod} from "../../fetch";
import Base from "../../component/Base";

class Guanjia extends Component {
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
    componentWillMount () {
        const userid = getCookie('userid');
        guanjia({userid: userid}).then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list
                })
                if(data.dangerlist !== ''){
                    this.setState({
                        dangerlist: data.dangerlist
                    })
                }
            }else {
                message.error(data.message);
            }
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

    buy = (prodname,prodid) => {
        this.setState({
            visible: true,
            buyProdname: prodname,
            buyProdId: prodid
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

    render () {
        return (
            <div>
            {this.state.list &&
            <div>
            <div className='content' style={{marginTop:15,fontSize: 20,color: 'red'}}>管家推荐产品</div>
            <Table
                style={{marginTop: 15}}
                columns={this.colums}
                dataSource={this.state.list}
            ></Table></div>}
            {this.state.dangerlist &&
            <div>
                <div className='content' style={{marginTop:15,fontSize: 20,color: 'red'}}>高级用户专属产品</div>
                <Table
                style={{marginTop: 15}}
                columns={this.colums}
                dataSource={this.state.dangerlist}
            ></Table></div>}
                {this.renderModal()}
            </div>
        )
    }
}

export default Guanjia;