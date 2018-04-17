const DBhandle = require('../sql/sql.js');
const Util = require('../utils/index');

class Guanjia {

    async fabuprod (ctx) {
        try {
            let res = {};
            let req = ctx.request.body;
            let sql1 = 'select usertype from users where userid='+`${req.userid}`;
            let sqlData1 = await DBhandle.query(sql1);
            if(sqlData1[0].usertype == 2){
                let sql2 = 'insert into products set ?';
                let params2 = {
                    prodname: req.prodname,
                    startbuytime: req.startbuytime,
                    endbuytime: req.endbuytime,
                    income: req.income,
                    dangertype: req.dangertype,
                    prodtype: req.prodtype,
                    needbuytime: req.needbuytime,
                    ownid: req.userid
                }
                await DBhandle.query(sql2,params2);
                res.code = 200;
                res.message = '发布成功'
                return res;
            }else {
                res.code = 696;
                res.message = '权限不够';
                return res;
            }

        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }

    }
    async getuserlist (ctx) {
        try{
            let req = ctx.request.body;
            let res = {};
            let sql1 = 'select * from customers where salerid='+`${req.userid}`;
            let sqlData1 = await DBhandle.query(sql1);
            let sql2,sqlData2;
            for(let i=0;i<sqlData1.length;i++){
                sql2 = 'select username from users where userid='+`${sqlData1[i].cmid}`;
                sqlData2 = await DBhandle.query(sql2);
                sqlData1[i].username = sqlData2[0].username;
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
    async changeusertype (ctx) {
        try{
            let req = ctx.request.body;
            let res = {};
            let sql = 'update customers set cmtype=? where cmid=?';
            let params = [parseInt(req.usertype)+1,req.userid];
            await DBhandle.query(sql,params);
            res.code = 200;
            res.message = '升级成功'
            return res;

        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }

    async getguzilist(ctx) {
        try{
            let req = ctx.request.body;
            let res = {};
            let sql = 'select * from products where ownid=? and prodtype<3';
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

    async changeguziprod (ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql = 'update products set ? where prodid=?';
            let obj = {
                startbuytime: req.startbuytime,
                endbuytime: req.endbuytime
            }
            let params = [obj,req.prodid];
            await DBhandle.query(sql,params);
            res.code = 200;
            res.message = '修改成功';
            return res;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async getfuzilist(ctx) {
        try{
            let req = ctx.request.body;
            let res = {};
            let sql = 'select * from products where ownid=? and prodtype>=3';
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
    async changefuziprod (ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql = 'update products set ? where prodid=?';
            let obj = {
                startbuytime: req.startbuytime,
                endbuytime: req.endbuytime,
                income: req.income,
            }
            let params = [obj,req.prodid];
            await DBhandle.query(sql,params);
            res.code = 200;
            res.message = '修改成功';
            return res;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async zixunfabu (ctx) {
        try{
            let req = ctx.request.body;
            let res = {};
            let sql = 'insert into zixun set ?';
            let params = {
                ownid: req.userid,
                zixuntitle: req.zixuntitle,
                zixuncontent: req.zixuncontent
            }
            await DBhandle.query(sql,params);
            res.code = 200;
            res.message = '发步成功';
            return res;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async getzixun (ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql = 'select * from zixun where ownid='+`${req.userid}`;
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
    async zixunsc (ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql = 'delete from zixun where zixunid='+`${req.zixunid}`;
            await DBhandle.query(sql);
            res.code = 200;
            res.message = '删除成功'
            return res;

        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async shouyi (ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql1 = 'select * from salers where salerid=? ORDER BY buytime DESC LIMIT 501';
            let params = [req.userid];
            let sqlData1 = await DBhandle.query(sql1,params);
            for(let i = 0;i<sqlData1.length;i++){
                let sql3 = 'select username from users where userid='+`${sqlData1[i].buyuser}`;
                let sqlData3 = await DBhandle.query(sql3);
                sqlData1[i].buyusername = sqlData3[0].username;
            }
            res.list = sqlData1;
            let sql2 = 'select xiashuprodmoney from managers where salerid='+`${req.userid}`;
            let sqlData2 = await DBhandle.query(sql2);
            res.memoney = sqlData2[0].xiashuprodmoney;
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
    async guanjiatixian (ctx) {
        try{
            let req = ctx.request.body;
            let res = {};
            let sql1 = 'select xiashuprodmoney from managers where salerid='+`${req.userid}`;
            let sqlData1 = await DBhandle.query(sql1);
            if(sqlData1[0].xiashuprodmoney < req.tixianmoney){
                res.code = 787;
                res.message = '提现金额大于账户余额';
            }else {
                let nowmoney = sqlData1[0].xiashuprodmoney - req.tixianmoney;
                let sql2 ='update managers set xiashuprodmoney=? where salerid=?';
                let params2 = [nowmoney,req.userid];
                await DBhandle.query(sql2,params2);
                res.code = 200;
                res.message = '提现成功';
                return res;
            }

        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }

}

module.exports = new Guanjia();