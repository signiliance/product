import React, {Component} from 'react';
import {Modal,Table,Button,message} from 'antd';
import listUtil from "../../List/listUtil";
import {getguanjiazixun,guanjiazixunsc} from "../../../fetch";
import {getCookie} from "../../../util";

class Zixunsc extends Component{
    state = {
        list: [],
        visible: false
    };

    colums = [
        {
            title: '资讯title',
            dataIndex: 'zixuntitle',
            key: 'zixuntitle',
        },
        {
            title: '操作',
            dataIndex: 'oper',
            key: 'oper',
            render: (text, record) => (
                <Button type='primary' onClick={this.shanchuzixun.bind(this,record.zixunid,record.zixuntitle)}>删除</Button>
            ),
        }
    ]

    componentWillMount () {
        this.getzixunlist();
    }

    getzixunlist = () =>{
       const userid = getCookie('userid');
       getguanjiazixun({userid: userid}).then((data)=>{
           if(data.code === 200){
               this.setState({
                   list: data.list
               })
           }else{
               message.error(data.message);
           }
       }).catch(err => console.log(err));
    }

    shanchuzixun = (id,title) => {
        this.setState({
            visible: true,
            zixunid: id,
            zixuntitle: title
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    handleOk = () =>{
        this.setState({
            visible: false
        })
        guanjiazixunsc({zixunid: this.state.zixunid}).then((data)=>{
            if(data.code === 200){
                message.success(data.message);
                this.getzixunlist();
            }else{
                message.error(data.message);
            }
        }).catch(err => console.log(err))
    }

    renderModal = () =>{
        return (
            <Modal title="操作提醒"
                   visible={this.state.visible}
                   okText='确认'
                   cancelText='取消'
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}
            >
                确认删除&nbsp;&nbsp;<span style={{color:'red',fontSize:22}}>{this.state.zixuntitle}</span>&nbsp;&nbsp;的用户等级吗?
            </Modal>
        )
    }


    render () {
        return(
            <div className='content' style={{marginTop: 15}}>
                <div style={{color: 'red'}}>资讯管理</div>
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

export default Zixunsc;