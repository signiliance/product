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
            key: 'prodId'
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
                <Button>购买</Button>
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
                        <div className='content' style = {{fontSize: 16,marginTop: 40}}>
                            dhnaidhnadiouahiud
                        </div>
                    </Col>
                    <Col span = {12}>
                        <div className='content' style = {{fontSize: 16,marginTop: 40,marginLeft:20}}>
                            dhnaidhnad<br />iouahiud
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span = {12}>
                        <div className='content' style = {{fontSize: 16,marginTop: 40}}>
                            dhnaidhnadiouahiud
                        </div>
                    </Col>
                    <Col span = {12}>
                        <div className='content' style = {{fontSize: 16,marginTop: 40,marginLeft:20}}>
                            dhnaidhnadiouahiud
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