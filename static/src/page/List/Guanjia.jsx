import React, {Component} from 'react';
import {Modal,Button,Table,message,Input,Row} from 'antd';
import listUtil from "./listUtil";
import {getCookie, getTime, isInt} from "../../util";
import {guanjia} from '../../fetch/index'
import {buyprod} from "../../fetch";
import Base from "../../component/Base";
import img from '../../style/imgs/1111111111.jpg'

class Guanjia extends Component {
    state = {
        list: [],
    }

    colum = [
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
            title: '来源',
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
                    list: data.list,
                    guanjiaphone: data.guanjiaphone,
                })
                if(data.zuhefangan !== ''){
                    this.setState({
                        zuhefangan: data.zuhefangan
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

    getGuanjiaphone = () => {
        Base.ModInfo('管家电话',`${this.state.guanjiaphone}`);
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

    renderFangan = () => {
        return (
            <div>
                {this.state.zuhefangan.map((item,index)=>{
                    <div style={{fontSize:'22px'}}><p>方案{index}</p>
                    <p>产品1：{item.prod1.prodname},可购买时间段：{listUtil.time(item.prod1.startbuytime,item.prod1.endbuytime)},收益：{item.prod1.income-1}%,需要购买时间：{item.prod1.needbuytime}个月</p>
                        <p>产品2：{item.prod2.prodname},可购买时间段：{listUtil.time(item.prod2.startbuytime,item.prod2.endbuytime)},收益：{item.prod2.income-1}%,需要购买时间：{item.prod2.needbuytime}个月</p>
                        <p>产品3：{item.prod3.prodname},可购买时间段：{listUtil.time(item.prod3.startbuytime,item.prod3.endbuytime)},收益：{item.prod3.income-1}%,需要购买时间：{item.prod3.needbuytime}个月</p>
                    </div>
                })}
            </div>
        )
    }

    render () {
        console.log(this.state.zuhefangan)
        return (
            <div>
                <Row>
                    <img src={img} alt=""/>
                </Row>
            {this.state.list &&
            <div>
            <div className='content' style={{marginTop:15,fontSize: 20,color: 'red'}}>管家推荐产品 <span style={{marginLeft: 15,fontSize: 16}}>（如果没有喜欢产品，可联系管家，获取私人订制服务）</span></div>
                <div className='content'><Button type='primary' onClick={this.getGuanjiaphone}>联系管家</Button></div>
            <div className='content'><Table
                style={{marginTop: 15}}
                columns={this.colum}
                dataSource={this.state.list}
                style={{fontSize: 20}}
            ></Table></div></div>}
            {this.state.zuhefangan &&
            <div>
                <div className='content' style={{marginTop:15,fontSize: 20,color: 'red'}}>高级用户专属方案</div>
                <div className='content'>
                    {this.state.zuhefangan.map((item,index)=>{
                       return( <div style={{fontSize: 20}}><p style={{color:'red'}}>方案{index+1}</p>
                            <p>产品1：{item.prod1.prodname},可购买时间段：{listUtil.time(item.prod1.startbuytime,item.prod1.endbuytime)},收益：{item.prod1.income-1}%,需要购买时间：{item.prod1.needbuytime}个月</p>
                            <p>产品2：{item.prod2.prodname},可购买时间段：{listUtil.time(item.prod2.startbuytime,item.prod2.endbuytime)},收益：{item.prod2.income-1}%,需要购买时间：{item.prod2.needbuytime}个月</p>
                            <p>产品3：{item.prod3.prodname},可购买时间段：{listUtil.time(item.prod3.startbuytime,item.prod3.endbuytime)},收益：{item.prod3.income-1}%,需要购买时间：{item.prod3.needbuytime}个月</p>
                        </div>
                       )})}
                </div></div>}
                {this.renderModal()}
            </div>
        )
    }
}

export default Guanjia;