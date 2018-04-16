const SalerUtil = module.exports = {};

SalerUtil.getTime = (num) => {
    const date = new Date();
    let month;
    if(date.getMonth()+1<10){
        month = `0${date.getMonth()+1}`
    }
    if(num) {
        return `${date.getFullYear()}${month}01`
    }else {
        return `${date.getFullYear()}${month}31`
    }
}

SalerUtil.salertype = [
    {code: '1',name:'稳健型'},
    {code: '2',name:'中庸型'},
    {code: '3',name:'激进型'},
]
SalerUtil.rstype = (a) => {
    for(let i=0;i<SalerUtil.salertype.length;i++){
        if(a == SalerUtil.salertype[i].code){
            return SalerUtil.salertype[i].name;
        }
    }
}