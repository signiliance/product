
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
    guanjia: api+'/guanjiatuijian',
    //发布产品
    fabuprod: api + '/guanjiafabuprod',
    //获取用户列表
    getuserlist: api + '/getuserlist',
    //修改用户类型
    changeusertype: api + '/changeusertype',
    //获取固资产品列表
    getguziprodlist: api + '/guziprodlist',
    //修改固资产品
    changeguziprod: api+ '/changeguziprod',
    //获取浮资产品列表
    getfuziprodlist: api + '/fuziprodlist',
    //修改浮资产品
    changefuziprod: api+ '/changefuziprod',
    //资讯发布
    zixunfabu: api+ '/zixunfabu',
    //获取管家发布过的资讯
    guanjiazixun: api+ '/getguanjiazixun',
    //删除管家资讯
    guanjiazixunsc: api+'/guanzixunsc',
    //管家收益列表
    guanjiashouyilist: api+'/guanjiashouyilist',
    //管家提现
    guanjiatixian: api + '/guanjiatixian'
}