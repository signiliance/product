import React,{Component} from 'react';
import {Table,message} from 'antd';
import {salerallsale} from '../../../fetch/index'
import SalerUtil from "../salermanager/salerUtil";
import {getCookie} from "../../../util";

class ProdWithdraw extends Component {
    state = {};
    componentWillMount () {
        this.getList();
    }

   cloums =[
       {
           title: '管家姓名',
           dataIndex: 'salername',
           key: 'salername',
       },
       {
           title: '产品id',
           dataIndex: 'prodid',
           key: 'prodid',
       },
       {
           title: '销售金额',
           dataIndex: 'prodmoney',
           key: 'prodmoney',
           render: (text)=>(<span>{text}元</span>)
       },
       {
           title: '管家获益',
           dataIndex: 'ownmoney',
           key: 'ownmoney',
           render: (text)=>(<span>{text}元</span>)
       },
       {
           title: '销售日期',
           dataIndex: 'buytime',
           key: 'buytime',
           render: (text)=>(<span>{`${text.toString().slice(0,4)}`+'-'+`${text.toString().slice(4,6)}`+'-'+`${text.toString().slice(6,8)}`}</span>)
       },
       {
           title: '购买用户',
           dataIndex: 'buyusername',
           key: 'buyusername',
       },
       {
           title: '用户收益',
           dataIndex: 'dingdanstate',
           key: 'dingdanstate',
           render: (text) => ( text==1?<span>未提取收益</span>:<span style={{color:'red'}}>已提取收益</span>)
       },
   ]

    getList = () => {
        const userid = getCookie('userid');
        salerallsale({userid: userid}).then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list
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

export default ProdWithdraw;