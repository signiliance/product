import React,{Component} from 'react';
import {Table,message} from 'antd';
import SalerUtil from "../salermanager/salerUtil";
import {getCookie} from "../../../util";
import {rewardwithdraw} from '../../../fetch/index'

class RewardWithdraw extends Component{
    state = {};


    cloums = [
        {
            title: '管家姓名',
            dataIndex: 'salername',
            key: 'salername',
        },
        {
            title: '被奖励时间',
            dataIndex: 'opertime',
            key: 'opertime',
        },
        {
            title: '奖励金额',
            dataIndex: 'rewardmoney',
            key: 'rewardmoney',
            render: (text) => (<span>{text}元</span>)
        },
    ]
    componentWillMount () {
        this.getList();
    }

    getList = () => {
        const userid = getCookie('userid');
        rewardwithdraw({userid: userid}).then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list,
                })
            }else {
                message.error(data.message)
            }
        }).catch(err => console.log(err))
    }

    render () {
        return (
            <div style={{marginTop: 15}}>
                {this.state.list && <div className='content'>
                    <Table
                        columns={this.cloums}
                        dataSource={this.state.list}
                    ></Table>
                </div>}
            </div>
        )
    }
}

export default RewardWithdraw