
const Controller = require('../controller/user');


module.exports = function () {
    return async function (ctx,next) {

        ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin);
        ctx.set("Access-Control-Allow-Credentials", true);

        if (ctx.url === '/login' && ctx.method === 'POST') {
            //console.log(ctx.request.body)
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
        await next();
    }
}



