
const Controller = require('../controller/user');
const Guanjia = require('../controller/guanjia');

module.exports = function () {
    return async function (ctx,next) {

        ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin);
        ctx.set("Access-Control-Allow-Credentials", true);

        if (ctx.url === '/login' && ctx.method === 'POST') {
            ctx.body = await Controller.login(ctx);
        }
        if (ctx.url === '/changepassword' && ctx.method === 'POST'){
            ctx.body = await Controller.changepasswd(ctx);
        }
        if(ctx.url === '/prodlist' && ctx.method === 'POST') {
            ctx.body = await  Controller.getprodlist(ctx);
        }
        if(ctx.url === '/buyprod' && ctx.method === 'POST') {
            ctx.body = await Controller.buyprod(ctx);
        }
        if(ctx.url === '/myprodlist' && ctx.method === 'POST') {
            ctx.body = await Controller.myprodlist(ctx);
        }
        if(ctx.url === '/chongzhi' && ctx.method === 'POST'){
            ctx.body = await Controller.chongzhi(ctx);
        }
        if(ctx.url === '/tixian' && ctx.method === 'POST'){
            ctx.body = await Controller.tixian(ctx);
        }
        if(ctx.url === '/shouyimoney' && ctx.method === 'POST'){
            ctx.body = await  Controller.shouyi(ctx);
        }
        if(ctx.url === '/searchlist' && ctx.method === 'POST'){
            ctx.body = await Controller.search(ctx);
        }
        if(ctx.url === '/getzixun' && ctx.method === 'GET'){
            ctx.body = await Controller.zixun();
        }
        if(ctx.url === '/jiaoyirecord' && ctx.method === 'POST'){
            ctx.body = await Controller.kehurecord(ctx);
        }
        if(ctx.url === '/guanjiatuijian' && ctx.method === 'POST'){
            ctx.body = await Controller.guanjialist(ctx);
        }
        if(ctx.url === '/guanjiafabuprod' && ctx.method === 'POST'){
            ctx.body = await Guanjia.fabuprod(ctx);
        }
        if(ctx.url === '/getuserlist' && ctx.method === 'POST'){
            ctx.body = await Guanjia.getuserlist(ctx);
        }
        if(ctx.url === '/changeusertype' && ctx.method === 'POST'){
            ctx.body = await Guanjia.changeusertype(ctx);
        }
        if(ctx.url === '/guziprodlist' && ctx.method === 'POST'){
            ctx.body = await Guanjia.getguzilist(ctx);
        }
        if(ctx.url === '/changeguziprod' && ctx.method === 'POST'){
            ctx.body = await Guanjia.changeguziprod(ctx);
        }
        if(ctx.url === '/fuziprodlist' && ctx.method === 'POST'){
            ctx.body = await Guanjia.getfuzilist(ctx);
        }
        if(ctx.url === '/changefuziprod' && ctx.method === 'POST'){
            ctx.body = await Guanjia.changefuziprod(ctx);
        }
        if(ctx.url === '/zixunfabu' && ctx.method === 'POST'){
            ctx.body = await Guanjia.zixunfabu(ctx);
        }
        if(ctx.url === '/getguanjiazixun' && ctx.method === 'POST'){
            ctx.body = await Guanjia.getzixun(ctx);
        }
        if(ctx.url === '/guanzixunsc' && ctx.method === 'POST'){
            ctx.body = await Guanjia.zixunsc(ctx)
        }
        if(ctx.url === '/guanjiashouyilist' && ctx.method === 'POST'){
            ctx.body = await Guanjia.shouyi(ctx);
        }
        if(ctx.url === '/guanjiatixian' && ctx.method === 'POST'){
            ctx.body = await Guanjia.guanjiatixian(ctx);
        }
        if(ctx.url === '/guanjialist' && ctx.method === 'GET'){
            ctx.body = await Controller.getguanjia();
        }
        if(ctx.url === '/userzhuce' && ctx.method === 'POST'){
            ctx.body = await Controller.zhuceyonghu(ctx);
        }
        await next();
    }
}



