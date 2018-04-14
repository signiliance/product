import React, {Component} from 'react';
import {Table,Modal,DatePicker,Select,Button,message,Form} from 'antd';
import {getguziprodlist} from '../../../fetch/index'
import {getCookie} from "../../../util";
import listUtil from "../../List/listUtil";
import ProTC from "../Product/productTC";
import moment from "moment/moment";
import Base from "../../../component/Base";
import {changeguziprod} from '../../../fetch/index';

const Option = Select.Option;
const FormItem = Form.Item;

class Guzi extends Component{
    state = {
        list:[],
        visible: false,
        startbuytime: '',
        endbuytime: ''
    };

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
            render: (text) => ( <span>{`${text}%`}</span>)
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
            title: '操作',
            dataIndex: 'oper',
            key: 'oper',
            render: (text, record) => (
                <Button type='primary' onClick={this.change.bind(this,record.prodid)}>修改</Button>
            ),
        }
    ]
    componentWillMount () {
        this.getprodlist();
    }

    change = (id) => {
        this.setState({
            visible: true,
            prodid: id
        })
    }

    getprodlist = () => {
        const userid = getCookie('userid');
        getguziprodlist({userid: userid}).then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list
                })
            }
        }).catch(err => console.log(err));
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    handleOk = (e) => {
        e.preventDefault();
        const {getFieldsValue} = this.props.form;
        const { resetFields } = this.props.form;
        let formData = getFieldsValue();
        formData.prodid = this.state.prodid;
        //formData.userid = userid;
        formData.startbuytime = moment(formData.startbuytime).format("YYYYMMDD");
        formData.endbuytime = moment(formData.endbuytime).format("YYYYMMDD");
       // console.log(formData);
        this.setState({
            visible: false
        })
        if(formData.startbuytime && formData.endbuytime) {
            if (parseInt(formData.startbuytime) >= parseInt(formData.endbuytime)) {
                Base.ModFail('warnning','开始时间必须小于结束时间');
            }else{
                changeguziprod(formData).then((data)=>{
                    if(data.code === 200){
                        message.success(data.message);
                        this.getprodlist();
                    }
                }).catch(err=>{console.log(err)})
            }
        }else {
            Base.ModFail('warnning','请填写完整信息');
        }
    }

    renderModal = () => {
        const { getFieldDecorator, validateFields } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        return (
            <Modal title="操作提醒"
                   visible={this.state.visible}
                   okText='确认'
                   cancelText='取消'
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}
            >
                <Form>
                    <FormItem {...formItemLayout} label="修改产品开始购买时间" hasFeedback>
                        {getFieldDecorator('startbuytime', {rules: [{required: true, type: 'object', message: '请输入产品开始购买时间' }]})(
                            <DatePicker
                                showTime
                                getCalendarContainer={trigger => trigger.parentNode}
                                style = {{width:'100%'}}
                                format="YYYY-MM-DD"/>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="修改产品结束购买时间" hasFeedback>
                        {getFieldDecorator('endbuytime', {rules: [{required: true, type: 'object',message: '请输入产品结束购买时间' }]})(
                            <DatePicker
                                showTime
                                getCalendarContainer={trigger => trigger.parentNode}
                                style = {{width:'100%'}}
                                format="YYYY-MM-DD"/>)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }

    render () {
        return (
            <div className='content' style={{marginTop: 15}}>
                <div style={{color: 'red'}}>固定收益产品管理</div>
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

const GuZi = Form.create()(Guzi);
export default GuZi;