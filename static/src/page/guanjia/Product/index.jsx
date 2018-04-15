import React, {Component} from 'react';
import {Table, message,Form,Col,Input,DatePicker,Select,Button} from 'antd';
import moment from 'moment';
import ProTC from './productTC'
import MangeType from "../../Manage/MangeType";
import {fabuprod} from '../../../fetch/index'
import {getCookie} from "../../../util";
import Base from '../../../component/Base'


const FormItem = Form.Item;
const Option = Select.Option;

class ProductGJ extends Component {
    state = {};
    componentWillMount () {
    }

    handleSub = (e) => {
        e.preventDefault();
        const {getFieldsValue} = this.props.form;
        const { resetFields } = this.props.form;
        let formData = getFieldsValue();
        const userid = getCookie('userid');
        formData.userid = userid;
        formData.startbuytime = moment(formData.startbuytime).format("YYYYMMDD");
        formData.endbuytime = moment(formData.endbuytime).format("YYYYMMDD");
        console.log(formData);
        if(formData.prodname && formData.startbuytime && formData.endbuytime && formData.income && formData.dangertype && formData.prodtype && formData.needbuytime) {
            if (parseInt(formData.startbuytime) > parseInt(formData.endbuytime)) {
                Base.ModFail('warnning', '开始购买时间必须小于结束时间');
            } else {
                fabuprod(formData).then((data) => {
                    if (data.code === 200) {
                        message.success(data.message);
                        resetFields();
                    } else {
                        message.error(data.message);
                    }
                }).catch(err => console.log(err))
            }
        }else {
            Base.ModFail('warnning','请填充所有信息');
        }
    }

    render () {
        const { getFieldDecorator, validateFields } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        return(
            <div className='content' style={{marginTop: 15}}>
                <div style={{color: 'red'}}>发布产品</div>
                <div className='content' style={{marginTop: 15,width: '60%'}}>
                    <Form>
                        <FormItem {...formItemLayout} label="请输入产品名称" hasFeedback>
                            {getFieldDecorator('prodname', {rules: [{required: true, message: '请输入产品名称' }]})(<Input placeholder="请输入产品名称" maxLength="30" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="请输入产品开始购买时间" hasFeedback>
                            {getFieldDecorator('startbuytime', {rules: [{required: true, type: 'object', message: '请输入产品开始购买时间' }]})(
                                <DatePicker
                                    showTime
                                    getCalendarContainer={trigger => trigger.parentNode}
                                    style = {{width:'100%'}}
                                    format="YYYY-MM-DD"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="请输入产品结束购买时间" hasFeedback>
                            {getFieldDecorator('endbuytime', {rules: [{required: true, type: 'object',message: '请输入产品结束购买时间' }]})(
                                <DatePicker
                                    showTime
                                    getCalendarContainer={trigger => trigger.parentNode}
                                    style = {{width:'100%'}}
                                    format="YYYY-MM-DD"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="请输入产品收益" hasFeedback>
                            {getFieldDecorator('income', {rules: [{required: true, message: '请输入产品收益' }]})(<Select  placeholder="请选择收益">
                                {ProTC.income.map(item=><Option key={item.code}>{item.name}</Option>)}
                            </Select>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="请输入危险类型" hasFeedback>
                            {getFieldDecorator('dangertype', {rules: [{required: true, message: '请输入危险类型' }]})(<Select  placeholder="请选择危险类型">
                                {ProTC.dangertype.map(item=><Option key={item.code}>{item.name}</Option>)}
                            </Select>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="请输入产品类型" hasFeedback>
                            {getFieldDecorator('prodtype', {rules: [{required: true, message: '请输入产品类型' }]})(<Select  placeholder="请选择产品类型">
                                {ProTC.prodtype.map(item=><Option key={item.code}>{item.name}</Option>)}
                            </Select>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="请输入需要购买时间" hasFeedback>
                            {getFieldDecorator('needbuytime', {rules: [{required: true, message: '请输入需要购买时间' }]})(<Select  placeholder="请选择需要购买时间">
                                {ProTC.needbuytime.map(item=><Option key={item.code}>{item.name}</Option>)}
                            </Select>)}
                        </FormItem>
                       <div style={{textAlign: 'right'}}>
                           <Button  onClick={this.handleSub} style = {{ marginLeft:10 }} type = 'primary'>发布</Button>
                       </div>
                    </Form>
                </div>
            </div>
        )
    }

}

const ProductGuan = Form.create()(ProductGJ);
export default ProductGuan;
