import React, {Component} from 'react';
import {Input,Form,Button,message} from 'antd';
import {getCookie} from "../../../util";
import {zixunfabu} from "../../../fetch";

const {TextArea} = Input;
const FormItem = Form.Item;

class Zixunfabu extends Component {
    state = {};

    handleSub = () => {
        const userid = getCookie('userid');
        const {getFieldsValue} = this.props.form;
        let formData = getFieldsValue();
        formData.userid = userid;
        zixunfabu(formData).then((data)=>{
            if(data.code === 200){
                message.success(data.message);
            }else {
                message.error(data.message)
            }
        }).catch(err => console.log(err))
    }


    render() {
        const { getFieldDecorator, validateFields } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 24 },
        };
        return (
            <div className='content' style={{marginTop: 15}}>
                <div style={{color: 'red'}}>资讯发布</div>
                <Form>
                    <FormItem {...formItemLayout}hasFeedback>
                        {getFieldDecorator('zixuntitle', {rules: []})(
                           <Input placeholder='请输入资讯title'/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} hasFeedback>
                        {getFieldDecorator('zixuncontent', {rules: []})(
                            <TextArea rows={15} placeholder='请输入资讯内容'/>
                        )}
                    </FormItem>
                    <div style={{textAlign:'right'}}>
                        <Button onClick={this.handleSub} type='primary'>发布</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

const Zixunfb = Form.create()(Zixunfabu);
export default Zixunfb;