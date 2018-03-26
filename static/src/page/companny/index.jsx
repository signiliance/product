import React, {Component} from 'react';
import Img from '../../style/imgs/bg.jpg';

class AboutUs extends Component {

    render () {
        return (
            <div style={{width:'100%',fontSize: 22,color:'#5DADE2',marginTop:20}}>
                <div style={{textAlign:'center',}}>理财宝高管团队，为你的资产保驾护航</div>
                <img src={Img} alt="" style = {{width:'100%',height:'100%',marginTop: 20}}/>
            </div>
        )
    }

}

export default AboutUs;