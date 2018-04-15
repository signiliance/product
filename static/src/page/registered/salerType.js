const salertype = [
    {code: '1',name:'稳健型'},
    {code: '2',name:'中庸型'},
    {code: '3',name:'激进型'},
]

const SalerTC = module.exports = {};

SalerTC.type = (a) =>{
    for( let i = 0;i<salertype.length;i++){
        if(a==salertype[i].code){
            return salertype[i].name;
        }
    }
}