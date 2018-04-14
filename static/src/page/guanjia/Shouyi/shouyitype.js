
const Shouyi = module.exports = {};

Shouyi.getMoney = (a) =>{
    let money = 0;
    for(let i = 0; i< a.length;i++){
        money+=a[i].ownmoney;
    }
    return money;
}

const opertype = [
    {code: 1, name:'未获取收益'},
    {code: 2, name:'已获取收益'},
]

Shouyi.type = (a) => {
    for(let i = 0;i<opertype.length;i++){
        if(a==opertype[i].code){
            return opertype[i].name
        }
    }
}