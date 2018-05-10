import React, {Component} from 'react';
import {report} from "../../fetch";
import {Divider, message, Row,Icon,Col} from 'antd';
import img from '../../style/imgs/22222222.png'

class Report extends Component {

    state = {
        list:[]
    }

    componentDidMount () {
        report().then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list,
                    all:data.all,
                    allmoney: data.allmoney,
                    bigmoney: data.bigmoney,
                    account: data.account
                })
            }else {
                message.error(data.message)
            }
        })
    }

    renderZixun = () => {
        let data = [];
        this.state.list.map((item)=> {
            data.push(
                <div className='content' style={{fontSize:20,marginTop:15}}>
                    <div style={{fontSize:22}}>{item.title}</div>
                    <div><Icon type="pay-circle" style={{marginRight:5}}/>当前月份交易总额：<p style={{fontSize:20,color:'red'}}>{item.allmoney}元</p></div>
                    <div><Icon type="pay-circle-o"  style={{marginRight:5}}/>当前月份用户收益总额：<p style={{fontSize:20,color:'red'}}>{item.earnmoney}元</p></div>
                    <div><Icon type="profile"  style={{marginRight:5}}/>当前月份交易笔数：<p style={{fontSize:20,color:'red'}}>{item.account}笔</p></div>
                    <div><Icon type="pay-circle-o"  style={{marginRight:5}}/>当前月份单笔最大交易金额：<p style={{fontSize:20,color:'red'}}>{item.bigmoney}元</p></div>
                    <div><Icon type="bar-chart"  style={{marginRight:5}}/>交易总额与上月相比：<p style={{fontSize:20,color:'red'}}>{item.zengzhang.toFixed(2)}%</p></div>
                    <Divider/>
                </div>
            )
        });
        return data;
    }

    render ()  {
        return (
            <div>
                <Row>
                    <Col span={11}>
                    <div style={{width:'100%',marginTop:15,fontSize:23,height:100}} className='content'><Icon type="pay-circle" style={{marginRight:5}}/>截至目前平台交易金额：<p style={{fontSize:25,color:'red'}}>{this.state.all}元</p></div>
                    </Col>
                    <Col span={11}>
                    <div style={{width:'100%',marginTop:15,fontSize:23,marginLeft:15,height:100}} className='content'><Icon type="profile"  style={{marginRight:5}}/>截至目前平台交易笔数：<p style={{fontSize:25,color:'red'}}>{this.state.account}笔</p></div>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                    <div style={{width:'100%',marginTop:15,fontSize:23,height:100}} className='content'><Icon type="pay-circle" style={{marginRight:5}}/>截至目前用户本金留存：<p style={{fontSize:25,color:'red'}}>{this.state.allmoney}元</p></div>
                    </Col>
                        <Col span={11}>
                    <div style={{width:'100%',marginTop:15,fontSize:23,marginLeft:15,height:100}} className='content'><Icon type="pay-circle-o"  style={{marginRight:5}}/>截至目前最大单笔交易金额：<p style={{fontSize:25,color:'red'}}>{this.state.bigmoney}元</p></div>
                        </Col>
                </Row>
                {this.renderZixun()}
            </div>
        )
    }
}

export default Report;