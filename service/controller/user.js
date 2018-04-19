
const DBhandle = require('../sql/sql.js');
const Util = require('../utils/index');


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
            let userid = ctx.request.body.userid;
            let pass_new = ctx.request.body.newPass;
            let pass_old = ctx.request.body.oldPass;
            let sql = 'select userpassword from users where userid=' + `${userid}`;
            let password = await DBhandle.query(sql);
            let res = {};
            if (password[0].userpassword == pass_old) {
                let sql = 'update users SET userpassword= ? where userid = ?';
                let params = [pass_new, userid];
                await DBhandle.query(sql, params);
                    res = {};
                    res.code = 200;
                    res.message = '修改成功';
            } else {
                res = {};
                res.code = 557;
                res.message = '原密码错误';
            }
            return res;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '修改失败';
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
                let sql = 'select * from products where dangertype<5 and endbuytime>='+`${parseInt(Util.getnowtime())}`;
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
                    let sql9 = 'select last_insert_id() as lastid';
                    let sqlData9 = await DBhandle.query(sql9);
                    let sql4 = 'select income from products where prodid=' + `${req.buyProdId}`;
                    let sqlData4 = await DBhandle.query(sql4);
                    let sql5 = 'insert into salers set ?';
                    let params5 = {
                        salerid: income[0].ownid,
                        prodid: req.buyProdId,
                        prodmoney: req.buymoney,
                        prodincome: sqlData4[0].income,
                        buytime: req.buyTime,
                        buyuser: req.userid,
                        userdingdanid: sqlData9[0].lastid,
                        ownmoney: (req.buymoney/1000)*7,
                        dingdanstate: 1,
                    }
                    await DBhandle.query(sql5, params5);
                    let sql6 = 'select xiashuprodmoney,managermoney from managers where salerid=' + `${income[0].ownid}`;
                    let sqlData6 = await DBhandle.query(sql6);
                    let xiashuprodmoney = parseInt(sqlData6[0].xiashuprodmoney) + req.buymoney/1000*7;
                    let managermoney = sqlData6[0].managermoney+req.buymoney/1000*3;
                    let sql7 = 'update managers set xiashuprodmoney=?,managermoney=? where salerid=?';
                    let params7 = [xiashuprodmoney, managermoney, income[0].ownid];
                    await DBhandle.query(sql7, params7);
                    let sql8 = 'insert into records set ?';
                    let params8 = {
                        userid: req.userid,
                        prodid: req.buyProdId,
                        opertype: 1,
                        opermoney: req.buymoney,
                        time: Util.getNowTime()
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
            let sql1 = 'select prodid,buytime,buymoney,prodincome,needbuytime,dingdanid from userprods where userid='+`${req.userid}`+' ORDER BY buytime DESC LIMIT 501';
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
                opermoney: req.tixianyuan,
                time: Util.getNowTime()
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
                opermoney: req.chongzhiyuan,
                time: Util.getNowTime()
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
    async shouyi (ctx) {
        try{
            let res = {};
            let req = ctx.request.body;
            let sql1 = 'select prodtype,income from products where prodid='+`${req.prodid}`;
            let sqlData1 = await DBhandle.query(sql1);
            //console.log(sqlData1)
            if(sqlData1[0].prodtype === 1){
                if(req.nowtime < req.shouyitime){
                    let sql2 = 'select ownmoney from customers where cmid='+`${req.userid}`;
                    let sqlData2 = await DBhandle.query(sql2);
                    let sql3 = 'update customers set ownmoney=? where cmid=?';
                    let ownmoney = parseInt(sqlData2[0].ownmoney)+parseInt(req.buymoney);
                    res.shouyi = '0元';
                    let params3 = [ownmoney,req.userid];
                    await DBhandle.query(sql3,params3);
                    let sql4 = 'delete from userprods where dingdanid='+`${req.dingdanid}`;
                    await DBhandle.query(sql4);
                    let sql5 = 'update salers set dingdanstate="2" where userdingdanid='+`${req.dingdanid}`;
                    await DBhandle.query(sql5);
                    let sql9 = 'insert into records set ?';
                    let params9 = {
                        userid: req.userid,
                        opertype: 2,
                        opermoney: req.buymoney,
                        prodid: req.prodid,
                        time: Util.getNowTime()
                    }
                    await DBhandle.query(sql9,params9);
                }else {
                    let sql2 = 'select ownmoney from customers where cmid='+`${req.userid}`;
                    let sqlData2 = await DBhandle.query(sql2);
                    let sql3 = 'update customers set ownmoney=? where cmid=?';
                    let ownmoney = parseInt(sqlData2[0].ownmoney)+parseInt(req.buymoney)+parseInt(req.buymoney*(req.income-1));
                    let shouyi1 = parseInt(req.buymoney*(req.income-1));
                    res.shouyi = `${shouyi1}元`;
                    let params3 = [ownmoney,req.userid];
                    await DBhandle.query(sql3,params3);
                    let sql4 = 'delete from userprods where dingdanid='+`${req.dingdanid}`;
                    await DBhandle.query(sql4);
                    let sql5 = 'update salers set dingdanstate="2" where userdingdanid='+`${req.dingdanid}`;
                    await DBhandle.query(sql5);
                    let sql9 = 'insert into records set ?';
                    let params9 = {
                        userid: req.userid,
                        opertype: 2,
                        opermoney: req.buymoney+shouyi1,
                        prodid: req.prodid,
                        time: Util.getNowTime()
                    }
                    await DBhandle.query(sql9,params9);
                }
            } else if(sqlData1[0].prodtype === 2 || sqlData1[0].prodtype === 3) {
                    let sql6 = 'select buytime,buymoney,prodincome,needbuytime from userprods where dingdanid='+`${req.dingdanid}`;
                    let sqlData6 = await DBhandle.query(sql6);
                    let yuefen = Util.yuefen(req.nowtime,sqlData6[0].buytime.toString());
                    let shouyi1 = (sqlData6[0].buymoney*(sqlData6[0].prodincome-1)*(yuefen/sqlData6[0].needbuytime))/100;
                    let shouyi = parseInt(shouyi1);
                    res.shouyi = `${shouyi}元`;
                    let sql7 = 'select ownmoney from customers where cmid='+`${req.userid}`;
                    let sqlData7 = await DBhandle.query(sql7);
                    let sql3 = 'update customers set ownmoney=? where cmid=?';
                    let ownmoney = parseInt(sqlData7[0].ownmoney)+shouyi;
                    let params3 = [ownmoney,req.userid];
                    await DBhandle.query(sql3,params3);
                    let sql4 = 'delete from userprods where dingdanid='+`${req.dingdanid}`;
                    await DBhandle.query(sql4);
                    let sql5 = 'update salers set dingdanstate="2" where userdingdanid='+`${req.dingdanid}`;
                    await DBhandle.query(sql5);
                    let sql9 = 'insert into records set ?';
                    let params9 = {
                        userid: req.userid,
                        opertype: 2,
                        opermoney: req.buymoney+shouyi1,
                        prodid: req.prodid,
                        time: Util.getNowTime()
                    }
                    await DBhandle.query(sql9,params9);
            }
            res.code = 200;
            res.message = '获取收益成功,收益';
            return res;

        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async search(ctx) {
        try{
            let res = {};
            let sql = Util.getSql(ctx);
            //console.log(sql);
            let sqlData = await DBhandle.query(sql);
            res.code = 200;
            res.message = 'success';
            res.list = sqlData;
            return res;
        } catch (e) {
            let res = {};
            res.code = 200;
            res.message = '数据库异常';
            return res;
        }
    }
    async zixun() {
        try {
            let res = {};
            let sql = 'select * from zixun ORDER BY zixunid DESC LIMIT 501';
            let sqlData = await DBhandle.query(sql);
            res.list = sqlData;
            res.code = 200;
            res.message = 'success';
            return res;

        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async kehurecord(ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql = 'select * from records where userid=?  ORDER BY time DESC LIMIT 501';
            let params = [req.userid];
            let sqlData = await DBhandle.query(sql,params);
            res.list = sqlData;
            res.code = 200;
            res.message = 'success';
            return res;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async guanjialist (ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql1 = 'select cmtype,salerid from customers where cmid='+`${req.userid}`;
            let sqlData1 = await DBhandle.query(sql1);
            if(sqlData1[0].cmtype === 3){
                // let sql2 = 'select * from products where dangertype=4';
                // let sqlData2 = await DBhandle.query(sql2);
                // res.dangerlist = sqlData2;
                let sql5 = 'select salerid from customers where cmid='+`${req.userid}`;
                let sqlData5 = await DBhandle.query(sql5);
                let sql6 = 'select * from zuheprod where ownid='+`${sqlData5[0].salerid}`;
                let sqlData6 = await DBhandle.query(sql6);
                for(let i=0;i<sqlData6.length;i++){
                    let sql7 = 'select * from products where prodid='+`${sqlData6[i].prod1}`
                    let sqlData7 = await DBhandle.query(sql7);
                    sqlData6[i].prod1 = sqlData7[0];
                    let sql8 = 'select * from products where prodid='+`${sqlData6[i].prod2}`
                    let sqlData8 = await DBhandle.query(sql8);
                    sqlData6[i].prod2 = sqlData8[0];
                    let sql9 = 'select * from products where prodid='+`${sqlData6[i].prod3}`
                    let sqlData9 = await DBhandle.query(sql9);
                    sqlData6[i].prod3 = sqlData9[0];
                }
                res.zuhefangan = sqlData6;
            }
            let sql3 = 'select * from products where dangertype=5 and ownid='+`${sqlData1[0].salerid}`;
            let sqlData3 = await DBhandle.query(sql3);
            let sql4 = 'select userphone from users where userid='+`${sqlData1[0].salerid}`;
            let sqlData4 = await DBhandle.query(sql4);
            res.guanjiaphone = sqlData4[0].userphone;
            res.list = sqlData3;
            res.code = 200;
            res.message = 'success';
            return res;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }

    async getguanjia () {
        try {
            let res = {};
            let sql1 = 'select salerid,salertype from managers';
            let sqlData1 = await DBhandle.query(sql1);
            for(let i = 0;i<sqlData1.length;i++){
                let sql2 = 'select username from users where userid='+`${sqlData1[i].salerid}`;
                let sqlData2 = await DBhandle.query(sql2);
                sqlData1[i].salername = sqlData2[0].username;
            }
            res.list = sqlData1;
            res.code = 200;
            res.message = 'success';
            return res;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }

    async zhuceyonghu (ctx) {
        try{
            let req = ctx.request.body;
            let res = {};
            let sql1 = 'insert into users set ?';
            let params1 = {
                username: req.username,
                userphone: req.userphone,
                userpassword: req.password,
                usertype: 1
            }
            await DBhandle.query(sql1,params1);
            let sql2 = 'select last_insert_id() as lastid';
            let sqlData2 = await DBhandle.query(sql2);
            let sql3 = 'insert into customers set ?';
            let params3 = {
                cmid: sqlData2[0].lastid,
                cmtype: 1,
                ownmoney: 0,
                salerid: req.salerid
            }
            await DBhandle.query(sql3,params3);
            res.userid = sqlData2[0].lastid;
            res.code = 200;
            res.message = 'success';
            return res;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }

    }
    async reportlist () {
        try {
            let res = {};
            let sql = 'select * from operreport ORDER BY reportid DESC LIMIT 501';
            let sqlData = await DBhandle.query(sql);
            res.list = sqlData;
            res.code = 200;
            res.message = 'success';
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