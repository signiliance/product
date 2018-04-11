
const DBhandle = require('../sql/sql.js');
const Cookie = require('../utils/index');


class Controller {
    async login (ctx) {
         try {
            let userid = ctx.request.body.userid;
            let password =ctx.request.body.password;
            const res = {};
            let sql = 'select userpassword,usertype,username from users where userid='+`${userid}`;
            //let params = ['password','usertype','userdangetype','users'];
            let sqldata = await DBhandle.query(sql);
            if(sqldata[0].userpassword !== password){
                res.code = 886;
                res.message = '用户名或者密码不正确';
            }else{
                res.code = 200;
                res.message = 'success';
                res.data = {};
                res.data.uername = sqldata[0].username;
                res.data.usertype = sqldata[0].usertype;
                res.data.userid = userid;
            }
            return res;
        }catch(e){
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async changepasswd(ctx) {
        try {
            let userid = Cookie.cookieGet(ctx, 'userid');
            let pass_new = ctx.request.body.newPass;
            let pass_old = ctx.request.body.oldPass;
            let sql = 'select userpassword from users where userid=' + `${userid}`;
            let password = await DBhandle.query(sql);
            let res = {};
            if (password[0].userpassword == pass_old) {
                let sql = 'update users SET userpassword= ? where userid = ?';
                let params = [pass_new, userid];
                let sqlData = await DBhandle.query(sql, params);
                if (sqlData) {
                    res = {};
                    res.code = 200;
                    res.message = '修改成功';
                } else {
                    res = {};
                    res.code = 558;
                    res.message = '修改失败';
                }
            } else {
                res = {};
                res.code = 557;
                res.message = '原密码错误';
            }
            return res;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async getprodlist(ctx) {
        try {
            let res = {};
            let usertype = ctx.request.body.usertype;
            if (usertype != 1) {
                res.code = '559';
                res.message = '无权限';
                return res;
            } else {
                let sql = 'select * from products where dangertype<4';
                res.code = 200;
                res.message = 'success';
                res.list = await DBhandle.query(sql);
                return res;
            }
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async buyprod(ctx) {
        try {
            let res = {};
            let req = ctx.request.body;
            let sql = 'select ownmoney from customers where cmid=' + `${req.userid}`;
            let sqlData1 = await DBhandle.query(sql);
            //console.log(sqlData1[0].ownmoney-req.buymoney);
            if (sqlData1[0].ownmoney < req.buymoney) {
                res.code = '560';
                res.message = '账户余额不足';
                return res;
            } else {
                //let sql2 = 'insert into userprods set ';
                let sql1 = 'update customers set ownmoney='+`${sqlData1[0].ownmoney-req.buyMoney}`;
                await DBhandle.query(sql1);
                let sql2 = 'select income from products where prodid=' + `${req.buyProdId}`;
                let income = await DBhandle.query(sql2);
                let sql3 = 'insert into userprods set ?';
                let params1 = {
                    userid: req.userid,
                    prodid: req.buyProdId,
                    buytime: req.buyTime,
                    buymoney: req.buyMoney,
                    prodincome: income[0].income
                }
                await DBhandle.query(sql3, params1);
            }
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
}

module.exports = new Controller();