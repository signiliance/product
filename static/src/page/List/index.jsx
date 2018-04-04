import React, {Component} from 'react';
import {Row, Col, Table, Button } from 'antd';


class ProduceIndex extends Component {
    state = {
        list: [{
            prodId:'1111',
            preEarn: '5%',
            buyTime: '5个月',
            from: '理财宝',
        }],
    }
    colums = [
        {
            title: '产品代号',
            dataIndex: 'prodId',
            key: 'prodId',
            render: (text, record) => (
                <span style={{color:'red'}}>{text}</span>
            ),
        },
        {
            title: '预期收益',
            dataIndex: 'preEarn',
            key: 'preEarn'
        },
        {
            title: '购买时长',
            dataIndex: 'buyTime',
            key: 'buyTime'
        },
        {
            title: '来源',
            dataIndex: 'from',
            key: 'from'
        },
        {
            title: '购买',
            dataIndex: 'buy',
            key: 'buy',
            render: (text, record) => (
                <Button type='primary'>购买</Button>
            ),
        }
    ]
    componentWillMount() {

    }

    render() {
        return (
            <div>
                <Row>
                    <Col span = {12}>
                        <div className='content' style = {{fontSize: 16,marginTop: 40,overflow:'hidden'}}>
                            平台成立超过<span style={{fontSize: 26,color: 'red'}}>11</span>年,超过<span style={{fontSize: 26,color: 'red'}}>98</span>%的平台，理财用户超过<span style={{fontSize: 26,color: 'red'}}>200</span>万，超过<span style={{fontSize: 26,color: 'red'}}>98</span>%的平台<br/>
                            <span style={{float:'right',color:'red',fontSize:12}}>数据提取于2018年1月</span>
                        </div>
                    </Col>
                    <Col span = {12}>
                        <div className='content' style = {{fontSize: 16,marginTop: 40,marginLeft:20,overflow:'hidden'}}>
                            促成理财<span style={{fontSize: 26,color: 'red'}}>2689</span>万，超过<span style={{fontSize: 26,color: 'red'}}>99</span>%平台，用户受益不低于<span style={{fontSize: 26,color: 'red'}}>5</span>%，高于<span style={{fontSize: 26,color: 'red'}}>99</span>%平台<br/>
                            <span style={{float:'right',color:'red',fontSize:12}}>数据提取于2018年1月</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span = {12}>
                        <div className='content' style = {{fontSize: 16,marginTop: 40,overflow:'hidden',textAlign:'center',lineHeight: 2}}>
                            <span style={{color:'red',fontSize:26,lineHeight:3}}>三大顶级战略合作</span><br/>
                            IDG   摩根士丹利   凯鹏华盈<br/>
                        </div>
                    </Col>
                    <Col span = {12}>
                        <div className='content' style = {{fontSize: 16,marginTop: 40,marginLeft:20,overflow:'hidden',textAlign:'center',lineHeight:2}}>
                            <span style={{color:'red',fontSize:26,lineHeight:3}}>强大风控 专业风控团队</span><br/>
                            11年以上风控经验，强大的线上数据库及反欺诈系统<br/>
                        </div>
                    </Col>
                </Row>
                <div style = {{marginTop: 20}}>
                <Table
                    columns={this.colums}
                    dataSource={this.state.list}
                ></Table>
                </div>
            </div>
        )

    }

}

export  default ProduceIndex;