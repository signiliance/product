import React, {Component} from 'react';
import {Divider} from 'antd'
import Img from '../../style/imgs/bg.jpg';
import img1 from '../../style/imgs/about_w01.jpg';
import img2 from '../../style/imgs/about_w02.jpg';
import img3 from '../../style/imgs/about_w03.jpg';
import img4 from '../../style/imgs/about_w04.jpg';
import img5 from '../../style/imgs/about_w10.jpg';

class AboutUs extends Component {

    render () {
        return (
            <div>
                <div className='content' style={{marginTop: 15,display: 'flex'}}>
                    <div><img src={img1} alt=""/></div>
                    <div style={{marginLeft: 20}}>
                        <p style={{fontSize: 20}}><b>唐宁</b><b style={{fontSize: 16}}>&nbsp;&nbsp;理财宝董事局主席、创始人</b></p>
                        <p>唐宁先生早年曾就读于北京大学数学系，后赴美攻读经济学。曾任职美国华尔街DLJ投资银行，从事金融、电信、媒体及高科技类企业的上市、发债和并购业务。</p>
                        <p>2006 年，唐宁在北京创办中国第一家公司-- 理财宝。成立以来，理财宝坚持以理念创新、模式创新和技术创新服务中国高成长人群，大众富裕阶层和高净值人士，致力于成 为中国普惠金融、财富管理的旗舰企业。</p>
                        <p>公司秉承“科技让金融更美好”的理念，目前已经在251 个城市(含香港)和93 个 农村地区建立起强大的全国协同服务网络，并通过大数据金融云、移动互联网、物联网等 先进技术，为客户提供全方位、个性化的普惠金融与财富管理服务。 </p>
                    </div>
                    <Divider />
                </div>
                <div className='content' style={{marginTop: 15,display: 'flex'}}>
                    <div><img src={img2} alt=""/></div>
                    <div style={{marginLeft: 20}}>
                        <p style={{fontSize: 20}}><b>方以涵</b><b style={{fontSize: 16}}>&nbsp;&nbsp;理财宝首席执行官</b></p>
                        <p>方以涵于2011年加入理财宝，超过15年在互联网、大数据和金融服务的工作经验。</p>
                        <p>加入理财宝之前，方以涵曾担任美国上市公司IAC/Ask.com 副总裁一职，负责全球搜索与问答相关的战略、产品和运营工作。</p>
                        <p>方以涵获美国哥伦比亚大学天文系和电子工程系双硕士学位，本科就读于中国科学技术大学少年班。</p>
                    </div>
                    <Divider />
                </div>
                <div className='content' style={{marginTop: 15,display: 'flex'}}>
                    <div><img src={img3} alt=""/></div>
                    <div style={{marginLeft: 20}}>
                        <p style={{fontSize: 20}}><b>丛郁</b><b style={{fontSize: 16}}>&nbsp;&nbsp;理财宝首席财务官</b></p>
                        <p>丛郁在高科技公司企业融资、战略市场合作, 股权投资领域有丰富经验。</p>
                        <p>加入理财宝之前，丛郁担任德意志银行北京代表处首席代表，并担任德意志银行中国区高科技(TMT)投行部负责人和董事。丛郁曾在美国投资银行Needham & Co.任职，并在Piper Jaffray& Co.从事与科技行业相关的股票证券分析工作。</p>
                        <p>丛郁取得美国加州大学伯克利分校哈斯商学院MBA学位 、美国伊利诺伊大学香槟分校博士学位、中国科学技术大学学士学位。</p>
                    </div>
                    <Divider />
                </div>
                <div className='content' style={{marginTop: 15,display: 'flex'}}>
                    <div><img src={img4} alt=""/></div>
                    <div style={{marginLeft: 20}}>
                        <p style={{fontSize: 20}}><b>曹阳</b><b style={{fontSize: 16}}>&nbsp;&nbsp;理财宝首席运营官兼首席技术官</b></p>
                        <p>曹阳拥有多年在美国硅谷和中国科技公司的成功经验。加入理财宝前，曹阳曾任美国移动广告公司xAd亚太区总经理，成功的创立和壮大xAd在中国、日本和印度的业务。曹阳曾任华创资本顾问、猪八戒网首席技术官、巨鹿移动(被猪八戒网收购)联合创始人兼首席技术官、大数据公司WhitePages首席技术官、TokBox技术副总裁、StarCite高级技术副总裁以及多家国际知名互联网公司的顾问。</p>
                        <p>曹阳获得斯坦福大学电子工程硕士学位和北京大学物理系本科学位。</p>
                    </div>
                    <Divider />
                </div>
                <div className='content' style={{marginTop: 15,display: 'flex'}}>
                    <div><img src={img5} alt=""/></div>
                    <div style={{marginLeft: 20}}>
                        <p style={{fontSize: 20}}><b>裴益川</b><b style={{fontSize: 16}}>&nbsp;&nbsp;理财宝首席风险官</b></p>
                        <p>裴益川在金融领域有多年从事信用风险管理，信贷产品营销，资产证券评估和期权交易定价的工作经验。加入理财宝之前，裴益川就职于平安银行副总经理。之前，曾在美国多家金融机构担任部门主管：包括敏奕投资首席风险官，美国银行高级副总裁，摩根大通高级副总裁，华盛顿互惠银行高级副总裁，普天信金融公司高级副总裁，富利波士顿银行副总裁。</p>
                        <p>裴益川获美国约翰霍普金斯大学博士学位，中国科学技术大学学士学位。早年进入中国科学技术大学少年班，曾就读美国宾夕法尼亚大学沃顿商学院旧金山分校EMBA，在美国普林斯顿大学完成博士后研究。</p>
                    </div>
                    <Divider />
                </div>
            </div>
        )
    }

}

export default AboutUs;