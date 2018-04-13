
const api = 'http://127.0.0.1:3001'

export default {
    //登录
    loginUrl: api+'/login',
    //修改密码
    changepassword: api+'/changepassword',
    //购买理财产品
    buyprod: api+'/buyprod',
    // 理财产品列表
    prodlist: api+'/prodlist',
    // 获取收益
    shouyimoney: api+'/shouyimoney',
    // 获取已购买列表
    myprodlist: api+'/myprodlist',
    //推荐查询
    searchlist: api+'/searchlist',
    //充值
    chongzhi: api+'/chongzhi',
    //提现
    tixian: api+'/tixian',
    //资讯
    zixun: api+'/getzixun',
    //交易记录
    record: api+'/jiaoyirecord',
    //获取管家推荐产品和高级产品
    guanjia: api+'/guanjiatuijian'
}