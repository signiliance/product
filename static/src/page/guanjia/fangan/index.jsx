import React, {Component} from 'react';
import {Form,Select,message,Button,Table} from 'antd';
import {getprodlist} from '../../../fetch/index'
import {guanjiagetprod, fanganfabu, fanganshanchu} from "../../../fetch";
import {getCookie} from "../../../util";

const FormItem = Form.Item;
const Option = Select.Option;

class Fangann extends Component {
    state = {};

    componentWillMount () {
        this.getlist();
    }
    colums = [
        {
            title: '方案id',
            dataIndex: 'zuheid',
            key: 'zuheid'
        },
        {
            title: '产品1名称',
            dataIndex: 'prod1name',
            key: 'prod1name'
        },
        {
            title: '产品2名称',
            dataIndex: 'prod2name',
            key: 'prod2name'
        },
        {
            title: '产品3名称',
            dataIndex: 'prod3name',
            key: 'prod3name'
        },
        {
            title: '操作',
            dataIndex: 'oper',
            key: 'oper',
            render: (text, record) => (
                <Button type='primary' onClick={this.fangansc.bind(this,record.zuheid)}>删除</Button>
            ),
        }
    ]
    getlist = () => {
        const userid = getCookie('userid')
        guanjiagetprod({userid: userid}).then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list,
                    prodlist: data.prodlist
                })
            }else{
                message.error(data.message)
            }
        }).catch(err=>console.log(err))
    }

    fangansc = (id) =>{
        fanganshanchu({zuheid: id}).then((data)=>{
            if(data.code === 200){
                message.success(data.message);
                this.getlist();
            }else{
                message.error(data.message)
            }
        }).catch(err=>console.log(err))

    }
    fabu = (e) =>{
        e.preventDefault();
        const {getFieldsValue} = this.props.form;
        const { resetFields } = this.props.form;
        let formData = getFieldsValue();
        const userid = getCookie('userid');
        formData.userid = userid;
        fanganfabu(formData).then((data)=>{
            if(data.code === 200){
                message.success(data.message);
                this.getlist();
            }else{
                message.error(data.message)
            }
        }).catch(err=>console.log(err))

    }
    render () {
        const { getFieldDecorator, validateFields } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return (
            <div className='content' style={{marginTop: 15}}>
                <div style={{color: 'red'}}>发布理财方案</div>
                <div style={{width: '55%'}}>
                <Form>
                    <FormItem {...formItemLayout} label="请选择方案包含产品1" hasFeedback>
                        {getFieldDecorator('prod1id', {rules: [{required: true, message: '请选择方案包含产品1' }]})(<Select placeholder='请选择方案包含产品1'>
                            {(this.state.list||[]).map(item=><Option key={item.prodid}>{item.prodname}</Option>)}
                        </Select>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="请选择方案包含产品2" hasFeedback>
                        {getFieldDecorator('prod2id', {rules: [{required: true, message: '请选择方案包含产品2' }]})(<Select placeholder='请选择方案包含产品2'>
                            {(this.state.list||[]).map(item=><Option key={item.prodid}>{item.prodname}</Option>)}
                        </Select>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="请选择方案包含产品3" hasFeedback>
                        {getFieldDecorator('prod3id', {rules: [{required: true, message: '请选择方案包含产品3' }]})(<Select placeholder='请选择方案包含产品3'>
                            {(this.state.list||[]).map(item=><Option key={item.prodid}>{item.prodname}</Option>)}
                        </Select>)}
                    </FormItem>
                </Form>
                    <div style={{textAlign: 'right'}}>
                        <Button type='primary' onClick={this.fabu}>发布方案</Button>
                    </div>
                </div>
                <div className='content' style={{marginTop: 15}}>
                    {this.state.prodlist && <Table
                        columns={this.colums}
                        dataSource={this.state.prodlist}
                    ></Table>}
                </div>
            </div>
        )
    }
}
const Fangan = Form.create()(Fangann);
export default Fangan;