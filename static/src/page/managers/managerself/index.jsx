import React,{Component} from 'react';
import {Button,Modal,message,Input} from 'antd'
import {getmanagermoney, managertixian} from "../../../fetch";
import {getCookie} from "../../../util";

class Managerself extends Component {
    state = {
        visible: false
    };
    componentWillMount () {
        this.getMoney();
    }
    getMoney = () =>{
        const userid = getCookie('userid')
        getmanagermoney({userid: userid}).then((data)=>{
            if(data.code === 200 ){
                this.setState({
                    managermoney: data.managermoney
                })
            }else {
                message.error(data.message);
            }
        }).catch(err=>console.log(err));
    }
    tixian = () => {
        this.setState({
            visible: true
        })
    }
    tixian2 = () => {
        this.setState({
            visible: false
        })
    }
    getTX = (e) => {
        this.setState({
           tixianmoney: e.target.value
        })
    }

    tixian1 = () => {
        this.setState({
            visible: false
        })
        const userid = getCookie('userid');

        managertixian({userid: userid,tixianmoney: this.state.tixianmoney}).then((data)=>{
            if(data.code === 200){
                message.success(data.message);
                this.getMoney();
            }else{
                message.error(data.message)
            }
        }).catch(err => console.log(err));
    }
    rendertixianModal = () => {
        return (
            <Modal title='操作提醒'
                   visible={this.state.visible}
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
            <div className='content' style={{marginTop: 15}}>
                <div className='content' style={{width:'55%'}}>
                    <div style={{textAlign:'center'}}>个人钱包</div>
                    <div style={{marginTop: 15}}>个人收益：{this.state.managermoney}</div>
                    <div style={{textAlign: 'right',marginTop: 15}}>
                        {/*<Button type = 'primary' onClick={this.tixian}>提现</Button>*/}
                    </div>
                </div>
                {this.rendertixianModal()}
            </div>
        )
    }
}

export default Managerself