import React, {Component} from 'react';
import {Button,Form,Input,Select,message,Table,Modal} from 'antd';
import SalerUtil from './salerUtil'
import {getCookie} from "../../../util";
import {getsalerlist} from '../../../fetch/index'
import Base from  '../../../component/Base';
import {addsaler} from "../../../fetch";

const FormItem  = Form.Item;
const Option = Select.Option;

class EditSalers extends Component {
    state = {
        visible: false
    };

    cloums = [
        {
            title: '管家id',
            dataIndex: 'salerid',
            key: 'salerid',
        },
        {
            title: '管家姓名',
            dataIndex: 'salername',
            key: 'salername',
        },
        {
            title: '管家类型',
            dataIndex: 'salertype',
            key: 'salertype',
            render: (text) => (<span>{SalerUtil.rstype(text)}</span>)
        },
    ]

    componentWillMount () {
        this.getList();
    }

    getList = () => {
        const userid = getCookie('userid');
        getsalerlist({userid: userid}).then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list
                })
            }else {
                message.error(data.message)
            }
        }).catch(err => console.log(err))
    }


    handleSub = (e) => {
        e.preventDefault();
        const {getFieldsValue} = this.props.form;
        const { resetFields } = this.props.form;
        let formData = getFieldsValue();
        if(formData.salername && formData.salertype && formData.salerphone){
            this.setState({
                visible: true,
                salername: formData.salername,
                salertype: formData.salertype,
                salerphone: formData.salerphone
            })
        }else {
            Base.ModFail('tips','请填写完整内容');
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    handleOk = () => {
        this.setState({
            visible: false
        })
        const userid = getCookie('userid');
        const {salername,salertype,salerphone} = this.state;
        const params = {userid:userid,salertype,salername,salerphone};
        addsaler(params).then((data)=>{
            if(data.code === 200){
                message.success(data.message);
                this.getList();
            }else{
                message.error(data.message)
            }
        }).catch(err => console.log(err))
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
                确认创建管家&nbsp;&nbsp;<span style={{color:'red',fontSize:22}}>{this.state.salername}</span>&nbsp;&nbsp;吗?
            </Modal>
        )
    }

    render () {

        const { getFieldDecorator, validateFields } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        return (
            <div style={{marginTop: 15}}>
                <div className='content'>
                    <div style={{width: '55%'}}>
                    <Form>
                        <FormItem {...formItemLayout} label="请输入管家姓名" hasFeedback>
                            {getFieldDecorator('salername', {rules: [{required: true, message: '请输入管家姓名' }]})(
                               <Input placeholder="请输入管家姓名"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="请输入管家电话" hasFeedback>
                            {getFieldDecorator('salerphone', {rules: [{required: true,message: '请输入管家电话' }]})(
                                <Input placeholder="请输入管家电话"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="请选择管家类型" hasFeedback>
                            {getFieldDecorator('salertype', {rules: [{required: true,message: '请选择管家类型' }]})(
                               <Select placeholder='请选择管家类型'>
                                   {SalerUtil.salertype.map(item=><Option key={item.code}>{item.name}</Option>)}
                               </Select>)}
                        </FormItem>
                    </Form>
                        <div style={{textAlign: 'right'}}>
                            <Button  onClick={this.handleSub} style = {{ marginLeft:10 }} type = 'primary'>添加</Button>
                        </div>
                </div>
                </div>
                {this.state.list&& <div className='content' style={{marginTop:15}}>
                     <Table
                        columns={this.cloums}
                        dataSource={this.state.list}
                    ></Table>
                </div>}
                {this.renderModal()}
            </div>
        )
    }
}

const EditSaler = Form.create()(EditSalers);
export default EditSaler;