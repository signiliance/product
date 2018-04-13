import React, {Component} from 'react';
import {zixun} from "../../fetch";
import {Divider, message} from 'antd'

class ZiXun extends Component {

    state = {
        list:[]
    }

    componentDidMount () {
        zixun().then((data)=>{
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
                    <div><p style = {{fontSize: 20,color:'red'}}>{item.zixuntitle}</p>{item.zixuncontent}<Divider/></div>
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

export default ZiXun;