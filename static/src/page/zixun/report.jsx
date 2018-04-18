import React, {Component} from 'react';
import {report} from "../../fetch";
import {Divider, message} from 'antd'

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
            <div className='content' style={{marginTop: 15}}>{this.renderZixun()}</div>
        )
    }
}

export default Report;