const DBhandle = require('./sql/sql.js');


module.exports = function () {
    return async function (ctx,next) {
        if (ctx.url === '/login') {
            //console.log(ctx.request.body);
            let sql = 'select * from sss';
            const res = {};
            res.list = await DBhandle.query(sql).then((res) => {
                //console.log(res);
                return res;
            })
            if (res.list !== null) {
                res.code = 200;
                res.message = 'success';
            }
            ctx.body = res;
            await next();
        }
    }
}

