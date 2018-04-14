import React, {Component} from 'react';
import {Table,Button,message,Modal} from 'antd';
import Base from '../../../component/Base';
import listUtil from "../../List/listUtil";
import {getuserlist,changeusertype} from '../../../fetch/index'
import {getCookie} from "../../../util";


class Usermanage extends Component {
    state = {
        visible: false,
        userid: '',
        list: []
    };
    colums = [
        {
            title: '用户id',
            dataIndex: 'cmid',
            key: 'cmid',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '用户类型',
            dataIndex: 'cmtype',
            key: 'cmtype',
            render:(text) => (
                <span>{listUtil.userTy(text)}</span>
            )
        },
        {
            title: '操作',
            dataIndex: 'oper',
            key: 'oper',
            render: (text, record) => (
                <Button type='primary' onClick={this.changeUsertype.bind(this,record.cmid,record.cmtype,record.username)}>升级会员</Button>
            ),
        }
    ];

    changeUsertype = (id,type,name) => {
        if(type == 3){
            Base.ModFail('warning','该会员已经是高级会员，无法提升')
        }else{
            this.setState({
                visible: true,
                userid: id,
                username: name,
                usertype: type
            })
        }
    }

    componentWillMount () {
        this.getuserlist();
    }
    getuserlist = () => {
        const userid = getCookie('userid');
        getuserlist({userid: userid}).then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list
                })
            }
        }).catch(err=>console.log(err));
    }

    handleOk = () => {
        const {userid,usertype} = this.state;
        const params = {userid,usertype};
        this.setState({
            visible: false
        })
        changeusertype(params).then((data)=>{
            if(data.code === 200){
                message.success(data.message);
                this.getuserlist();
            }
        }).catch(err=>console.log(err));
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
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
                确认提升&nbsp;&nbsp;<span style={{color:'red',fontSize:22}}>{this.state.username}</span>&nbsp;&nbsp;的用户等级吗?
            </Modal>
        )
    }
    render () {
        return(
            <div className='content' style={{marginTop: 15}}>
                <div style={{color: 'red'}}>用户管理</div>
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

export default Usermanage;