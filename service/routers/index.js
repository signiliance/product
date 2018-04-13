
const Controller = require('../controller/user');


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
        await next();
    }
}



