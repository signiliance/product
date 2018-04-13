import React, {Component} from 'react';
import {Table,message} from 'antd';
import myUtil from './util'
import {getCookie} from "../../util";
import { record } from '../../fetch/index'

class Record extends Component {
    state = {
        list: []
    }
    colums =[
        {
            title: '操作类型',
            dataIndex: 'opertype',
            key: 'opertype',
            render: (text)=>(
                <span>{myUtil.parse(text)}</span>
            )
        },{
            title: '产品id',
            dataIndex: 'prodid',
            key: 'prodid'
        }, {
            title: '操作金额',
            dataIndex: 'opermoney',
            key: 'opermoney'
        }, {
            title: '日期',
            dataIndex: 'time',
            key: 'time'
        },
    ]
    componentWillMount () {
        const userid = getCookie('userid');
        record({userid: userid}).then((data)=>{
            if(data.code == 200){
                if(data.list === ''){
                    message.info('未查询到数据')
                }
                this.setState({
                    list: data.list
                })
            }else {
                message.error(data.message);
            }
        })
    }
    render () {
        return(
            <div>
        {this.state.list &&
        <Table
            style={{marginTop: 15}}
            columns={this.colums}
            dataSource={this.state.list}
        ></Table>}
            </div>
    )
    }
}

export default Record;