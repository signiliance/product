import React, {Component} from 'react';
import {report} from "../../fetch";
import {Divider, message, Row} from 'antd';
import img from '../../style/imgs/22222222.png'

class Report extends Component {

    state = {
        list:[]
    }

    componentDidMount () {
        report().then((data)=>{
            if(data.code === 200){
                this.setState({
                    list: data.list
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
                <div><p style = {{fontSize: 20,color:'red'}}>{item.reporttitle}</p>{item.reportname}<Divider/></div>
            )
        });
        return data;
    }

    render ()  {
        return (
            <div>
                <Row>
                    <img src={img} alt=""/>
                </Row>
            <div className='content' style={{marginTop: 15}}>{this.renderZixun()}</div>
            </div>
        )
    }
}

export default Report;