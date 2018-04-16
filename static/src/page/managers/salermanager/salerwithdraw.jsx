import React, {Component} from 'react';
import {DatePicker,Button,Form,Table,Input,Modal,message} from 'antd';
import listUtil from "../../List/listUtil";
import SalerUtil from './salerUtil';
import moment from 'moment'
import {salerwithdraw} from '../../../fetch/index'
import {getCookie} from "../../../util";
import {guanjiareward} from "../../../fetch";

const FormItem = Form.Item

class SalerWithDraw extends Component {
    state = {
        visible: false,
        starttime: SalerUtil.getTime(1),
        endtime: SalerUtil.getTime()
    };
    cloums = [
        {
            title: '管家姓名',
            dataIndex: 'salername',
            key: 'salername',
        },
        {
            title: '售出业绩',
            dataIndex: 'prodmoney',
            key: 'prodmoney'
        },
        {
            title: '奖励',
            dataIndex: 'reward',
            key: 'reward',
            render: (text, record) => (
                <Button type='primary' onClick={this.reward.bind(this,record.salername,record.salerid)}>奖励</Button>
            ),
        },
    ]
    reward = (name,id) => {
        this.setState({
            visible: true,
            salerid: id,
            salerName: name
        })
    }

    componentWillMount () {
        this.getList();
    }

    getList = () =>{
        const userid = getCookie('userid');
        const {starttime,endtime} = this.state;
        const params = {starttime,endtime,userid: userid};
        salerwithdraw(params).then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list,
                    salerNum: data.salernum,
                    salerMoney: data.salermoney
                })
            } else{
                message.error(data.message);
            }
        }).catch(err => console.log(err))
    }


    handleCancel = (e) => {
        this.setState({
            visible: false,
        })
    }
    getValue = (e) => {
        this.setState({
            rewardmoney: e.target.value
        })
    }

    handleOk = () => {
        const userid = getCookie('userid')
        const {rewardmoney,salerid} = this.state;
        const params = {userid:userid,rewardmoney,salerid};
        this.setState({
            visible: false,
        });
        guanjiareward(params).then((data)=>{
            if(data.code === 200){
                message.success(data.message);
            }else{
                message.error(data.message);
            }
        }).catch(err => console.log(err));
    }

    renderModal = () =>{
        return(
            <Modal title="操作提醒"
                   visible={this.state.visible}
                   okText='确认'
                   cancelText='取消'
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}
            >
                确认奖励&nbsp;&nbsp;<span style={{color:'red',fontSize:22}}>{this.state.salerName}</span>&nbsp;&nbsp;吗?
                <p style={{marginTop: 10}}>奖励金额（元）：</p> <Input onChange={this.getValue}/>
            </Modal>
        )
    }

    handleSub = (e) =>{
        e.preventDefault();
        const {getFieldsValue} = this.props.form;
        const { resetFields } = this.props.form;
        let formData = getFieldsValue();
        formData.starttime = moment(formData.starttime).format("YYYYMMDD");
        formData.endtime = moment(formData.endtime).format("YYYYMMDD");
        this.setState({
            starttime: formData.starttime,
            endtime: formData.endtime
        },()=>{
            this.getList()
        })
    }

    render(){
        const { getFieldDecorator, validateFields } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return (
            <div>
                <div style={{marginTop: 15,display:'flex'}}>
                    <div  className='content' style={{width: '45%'}}>
                    <Form>
                        <FormItem {...formItemLayout} label="请输入开始时间" hasFeedback>
                            {getFieldDecorator('starttime', {rules: [{required: true, type: 'object', message: '请输入产品开始购买时间' }]})(
                                <DatePicker
                                    showTime
                                    getCalendarContainer={trigger => trigger.parentNode}
                                    style = {{width:'100%'}}
                                    format="YYYY-MM-DD"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="请输入结束时间" hasFeedback>
                            {getFieldDecorator('endtime', {rules: [{required: true, type: 'object',message: '请输入产品结束购买时间' }]})(
                                <DatePicker
                                    showTime
                                    getCalendarContainer={trigger => trigger.parentNode}
                                    style = {{width:'100%'}}
                                    format="YYYY-MM-DD"/>)}
                        </FormItem>
                    </Form>
                    <div style={{textAlign: 'right'}}>
                        <Button  onClick={this.handleSub} style = {{ marginLeft:10 }} type = 'primary'>查询</Button>
                    </div>
                    </div>
                    <div className='content' style={{width:'49%',marginLeft: 15}}>
                        <div style={{textAlign:'center'}}>数据看板</div>
                        <div style={{marginTop: 15}}>管家数量：{this.state.salerNum}</div>
                        <div style={{marginTop: 15}}>管家销售金额总计：{this.state.salerMoney}</div>
                        <div style={{marginTop: 15}}>日期：{listUtil.time(this.state.starttime,this.state.endtime)}</div>
                    </div>
                </div>
                <div className='content' style={{marginTop: 15}}>
                    {this.state.list && <Table
                        columns={this.cloums}
                        dataSource={this.state.list}
                    ></Table>
                    }
                    {this.renderModal()}
                </div>
            </div>

        )
    }
}

const SalerWD = Form.create()(SalerWithDraw);
export default SalerWD;