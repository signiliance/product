const tableType = [
    {code: 1,name:'风险低'},
    {code: 2,name:'风险一般'},
    {code: 3,name:'风险高'},
]

const TableCom = module.exports = {};

TableCom.table = (c) => {
    for(var i =0 ; i < tableType.length;i++) {
        if(c === tableType[i].code){
            return tableType[i].name
        }
    }
}

TableCom.time = (a,b) => {
    let aa = a.toString();
    let bb = b.toString();
    let a1 = aa.slice(0,4);
    let a2 = aa.slice(4,6);
    let a3 = aa.slice(6,8);
    let b1 = bb.slice(0,4);
    let b2 = bb.slice(4,6);
    let b3 = bb.slice(6,8);
    return `${a1}-${a2}-${a3}至${b1}-${b2}-${b3}`;
}