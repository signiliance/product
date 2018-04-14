const tableType = [
    {code: 1,name:'风险低'},
    {code: 2,name:'风险一般'},
    {code: 3,name:'风险高'},
    {code: 4,name:'风险极高'},
]

const prodtype = [
    {code: 1, name: '存款'},
    {code: 2, name: '债券'},
    {code: 3, name: '风险投资'},
]

const usertype1 = [
    {code: 1, name: '普通会员'},
    {code: 2, name: '中级会员'},
    {code: 3, name: '高级会员'},
]

const TableCom = module.exports = {};

TableCom.table = (c) => {
    for(var i =0 ; i < tableType.length;i++) {
        if(c === tableType[i].code){
            return tableType[i].name
        }
    }
}

TableCom.prod = (c) => {
    let flag = 1;
    for(var i =0 ; i < prodtype.length;i++) {
        if(c === prodtype[i].code){
            return prodtype[i].name;
            flag = 2;
        }
    }
    if(flag === 1){
        return '用户专属';
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

TableCom.needbuytime = (a,b,c) => {
    let aa = a.toString();
    let bb = parseInt(b);
    let aa1 = parseInt(aa.slice(0,4));
    let aa2 = parseInt(aa.slice(4,6));
    let aa3 = aa.slice(6,8)
    if(bb+aa2 > 12) {
        aa1 = aa1+1;
        aa2= bb+aa2-12;
    }else {
        aa2= bb+aa2;
    }
    if(c){
        return `${aa1}${aa2}${aa3}`
    }else {
        return `${aa1}-${aa2}-${aa3}`;
    }
}

TableCom.userTy = (a) => {
    for(let i = 0; i< usertype1.length;i++){
        if(a == usertype1[i].code){
            return usertype1[i].name
        }
    }
}