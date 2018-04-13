const myUtil = module.exports = {};

myUtil.shouyi = (a,b) => {
    let aa = parseInt(a);
    let bb = parseInt(b)-1;
    return (aa*bb)/100;
}
myUtil.time = (a) => {
    return `${a.toString().slice(0,4)}-${a.toString().slice(4,6)}-${a.toString().slice(6,8)}`;
}

myUtil.zongshouyi = (list = []) => {
    let zongshouyi = 0;
    for(let i = 0; i< list.length;i++){
        zongshouyi+=(parseInt(list[i].buymoney)*(parseInt(list[i].prodincome)-1))/100;
    }
    return zongshouyi;
}

myUtil.parseType = [
    {code: 1,name: '购买产品'},
    {code: 2,name: '获得收益'},
    {code: 3,name: '充值'},
    {code: 4,name: '提现'},
]

myUtil.parse = (a) => {
    for(let i = 0;i < myUtil.parseType.length;i++){
        if(a == myUtil.parseType[i].code){
            return myUtil.parseType[i].name;
        }
    }
}