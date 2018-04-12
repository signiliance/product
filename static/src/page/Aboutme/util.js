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
