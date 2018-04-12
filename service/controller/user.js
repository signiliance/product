
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
                let sql1 = 'update customers SET ownmoney=? where cmid=?';
                let params1 = [sqlData1[0].ownmoney-req.buymoney,req.userid];
                await DBhandle.query(sql1,params1);
                let sql2 = 'select income,ownid,startbuytime,endbuytime,needbuytime from products where prodid=' + `${req.buyProdId}`;
                let income = await DBhandle.query(sql2);
                if(parseInt(req.buyTime) > income[0].endbuytime || req.buyTime < income[0].startbuytime){
                    res.code = '561';
                    res.message = '不在可购买时间内';

                }else {
                    let sql3 = 'insert into userprods set ?';
                    let params2 = {
                        userid: req.userid,
                        prodid: req.buyProdId,
                        buytime: req.buyTime,
                        buymoney: req.buymoney,
                        prodincome: income[0].income,
                        needbuytime: income[0].needbuytime,
                    }
                    await DBhandle.query(sql3, params2);
                    let sql4 = 'select income from products where prodid=' + `${req.buyProdId}`;
                    let sqlData4 = await DBhandle.query(sql4);
                    let sql5 = 'insert into salers set ?';
                    let params5 = {
                        salerid: income[0].ownid,
                        prodid: req.buyProdId,
                        prodmoney: req.buymoney,
                        prodincome: sqlData4[0].income,
                        buytime: req.buyTime,
                        buyuser: req.userid
                    }
                    await DBhandle.query(sql5, params5);
                    let sql6 = 'select xiashuprodmoney from managers where salerid=' + `${income[0].ownid}`;
                    let sqlData6 = await DBhandle.query(sql6);
                    let xiashuprodmoney = parseInt(sqlData6[0].xiashuprodmoney) + parseInt(req.buymoney);
                    let sql7 = 'update managers set xiashuprodmoney=? where salerid=?';
                    let params7 = [xiashuprodmoney, income[0].ownid];
                    await DBhandle.query(sql7, params7);
                    let sql8 = 'insert into records set ?';
                    let params8 = {
                        userid: req.userid,
                        prodid: req.buyProdId,
                        opertype: 1,
                        opermoney: req.buymoney
                    }
                    await DBhandle.query(sql8,params8);
                    res.code = '200';
                    res.message = '购买成功';
                    return res;
                }
            }
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async myprodlist (ctx) {
        try{
            let req = ctx.request.body;
            let res = {};
            let sql = 'select ownmoney from customers where cmid='+`${req.userid}`;
            let sqlData = await DBhandle.query(sql);
            res.code = 200;
            res.memoney = sqlData[0].ownmoney;
            let sql1 = 'select prodid,buytime,buymoney,prodincome,needbuytime,dingdanid from userprods where userid='+`${req.userid}`;
            let sqlData1 = await DBhandle.query(sql1);
            for(let i = 0;i<sqlData1.length;i++){
                let sql3 = 'select prodname from products where prodid='+`${sqlData1[i].prodid}`;
                let sqlData3 = await DBhandle.query(sql3);
                sqlData1[i].prodname = sqlData3[0].prodname;
            }
            res.list = sqlData1;
            return res;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }

    }
    async chongzhi (ctx) {
        try {


        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async tixian (ctx) {
        try {
            let req = ctx.request.body;
            let sql1 = 'select ownmoney from customers where cmid='+`${req.userid}`;
            let sqlData1 = await DBhandle.query(sql1);
            let sql2 = 'update customers set ownmoney=? where cmid=?';
            let params2 = [sqlData1[0].ownmoney-req.tixianyuan,req.userid];
            await DBhandle.query(sql2,params2);
            let res = {};
            res.code = 200;
            res.message = '提现成功';
            let sql3 = 'insert into records set ?';
            let params3 = {
                userid: req.userid,
                opertype: 4,
                opermoney: req.tixianyuan
            }
            await DBhandle.query(sql3,params3);
            return res;

        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async chongzhi (ctx) {
        try {
            let req = ctx.request.body;
            let sql1 = 'select ownmoney from customers where cmid='+`${req.userid}`;
            let sqlData1 = await DBhandle.query(sql1);
            let sql2 = 'update customers set ownmoney=? where cmid=?';
            let params2 = [parseInt(sqlData1[0].ownmoney)+parseInt(req.chongzhiyuan),req.userid];
            await DBhandle.query(sql2,params2);
            let res = {};
            res.code = 200;
            res.message = '充值成功';
            let sql3 = 'insert into records set ?';
            let params3 = {
                userid: req.userid,
                opertype: 3,
                opermoney: req.chongzhiyuan
            }
            await DBhandle.query(sql3,params3);
            return res;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
}

module.exports = new Controller();