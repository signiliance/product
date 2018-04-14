import React, {Component} from 'react';
import {Table,Button,message,Modal,Input} from 'antd';
import {guanjiashouyilist, guanjiatixian} from "../../../fetch";
import {getCookie} from "../../../util";
import Shouyi from './shouyitype'
import Base from "../../../component/Base";

class ShouYi extends Component{
    state = {
        tixianvisible: false
    }

    componentWillMount () {
        this.getList()
    }
    colums = [
        {
            title: '用户id',
            dataIndex: 'buyuser',
            key: 'buyuser',
        },
        {
            title: '产品id',
            dataIndex: 'prodid',
            key: 'prodid',
            render: (text, record) => (
                <span style={{color:'red'}}>{text}</span>
            ),
        },
        {
            title: '购买金额',
            dataIndex: 'prodmoney',
            key: 'prodmoney',
            render: (text) => (
                <span>{text}元</span>
            )
        },
        {
            title: '购买时间',
            dataIndex: 'buytime',
            key: 'buytime',
        },
        {
            title: '我的收益',
            dataIndex: 'ownmoney',
            key: 'ownmoney',
            render: (text) => (
                <span>{text}元</span>
            )
        },
        {
            title: '用户收益是否提取',
            dataIndex: 'dingdanstate',
            key: 'dingdanstate',
            render:(text) => (
                text==1?<span>未提取收益</span>:<span style={{color:'red'}}>已提取收益</span>
            )
        }
    ]
    getList = () => {
        const userid = getCookie('userid');
        guanjiashouyilist({userid: userid}).then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list,
                    prodNum: data.list.length,
                    accountMoney: Shouyi.getMoney(data.list),
                    memoney: data.memoney
                })
            }else {
                message.error(data.message);
            }
        }).catch(err => console.log(err))

    }
    tixian = () => {
        this.setState({
            tixianvisible: true
        })
    }
    getTX = (e) => {
        this.setState({
            tixianyuan: e.target.value,
        })
    }
    tixian2 = () => {
        this.setState({
            tixianvisible: false
        })

    }
    tixian1 = () => {
        const userid = getCookie('userid');
        if(parseInt(this.state.memoney) < parseInt(this.state.tixianyuan)){
            Base.ModFail('tips','提现金额需小于账户余额');
        }else {
            this.setState({
                tixianvisible: false
            });
            guanjiatixian({userid: userid, tixianmoney: this.state.tixianyuan}).then((data) => {
                if (data.code === 200) {
                    message.success(data.message);
                    this.getList();
                } else {
                    message.error(data.message);
                }

            }).catch(err => console.log(err))
        }
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
    render () {
        return (
            <div>
                <div style={{display:'flex',marginTop: 15}}>
                    <div className="content" style={{width:'45%',height:150}}>
                        <div style={{textAlign:'center'}}>数据看板</div>
                        <div>理财产品售出数量：<span style={{fontSize: 20}}>{this.state.prodNum}</span></div>
                        <div>我已经获得收益：<span style={{fontSize: 20}}>{this.state.accountMoney}</span></div>
                    </div>
                    <div className="content" style={{width:'54%',height:150,marginLeft:15}}>
                        <div style={{textAlign:'center'}}>个人钱包</div>
                        <div>账户余额：<span style={{fontSize: 20}}>{this.state.memoney}元</span></div>
                        <div style={{marginTop: 15}}>
                            <Button type = 'primary' onClick={this.tixian}>提现</Button>
                        </div>
                    </div>
                </div>
                <div className="content" style={{marginTop: 15}}>
                    {this.state.list &&  <Table
                        columns={this.colums}
                        dataSource={this.state.list}
                    ></Table>}
                </div>
                {this.rendertixianModal()}
            </div>
        )
    }
}

export default ShouYi;