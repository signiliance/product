const DBhandle = require('../sql/sql.js');
const Util = require('../utils/index');


class Manager {
    async salerWD (ctx) {
        try {
            const req = ctx.request.body;
            const res = {};
            res.salermoney = 0;
            let sql1 = 'select salerid from managers where managerid='+`${req.userid}`;
            let sqlData1 = await DBhandle.query(sql1);
            let sql2,params2,sql3,sqlData2,sqlData3;
            for(let i=0;i<sqlData1.length;i++){
                sql2 = 'select prodmoney from salers where salerid=? and buytime<=? and buytime>=?';
                params2 = [sqlData1[i].salerid,req.endtime,req.starttime];
                sqlData2 = await DBhandle.query(sql2,params2);
                sqlData1[i].prodmoney = 0;
                for(let j = 0;j<sqlData2.length;j++){
                    sqlData1[i].prodmoney=sqlData2[j].prodmoney+sqlData1[i].prodmoney;
                    console.log(sqlData1[i].prodmoney);
                }
                sql3 = 'select username from users where userid='+`${sqlData1[i].salerid}`;
                sqlData3 = await DBhandle.query(sql3);
                sqlData1[i].salername = sqlData3[0].username;
                res.salermoney+=sqlData1[i].prodmoney;
            }
            res.list = sqlData1;
            res.salernum = sqlData1.length;
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
    async salerreward (ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql = 'select xiashuprodmoney from managers where salerid='+`${req.salerid}`;
            let sqlData1 = await DBhandle.query(sql);
            let sql2 = 'update managers set xiashuprodmoney=? where salerid=?';
            let params2 = [sqlData1[0].xiashuprodmoney+parseInt(req.rewardmoney),req.salerid];
            await DBhandle.query(sql2,params2);
            let sql3 = 'insert into rewardrecord set ?';
            let params3 = {
                managerid: req.userid,
                salerid: req.salerid,
                rewardmoney: req.rewardmoney,
                opertime: Util.getNowTime()
            }
            await DBhandle.query(sql3,params3);
            res.code = 200;
            res.message = '奖励成功';
            return res;

        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async getsalerlist(ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql = 'select salerid,salertype from managers where managerid='+`${req.userid}`;
            let sqlData = await DBhandle.query(sql);
            for(let i=0;i<sqlData.length;i++){
                let sql2 = 'select username from users where userid='+`${sqlData[i].salerid}`;
                let sqlData2 = await DBhandle.query(sql2);
                sqlData[i].salername = sqlData2[0].username;
            }
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
    async addSaler (ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql1 = 'insert into users set ?';
            let params1 = {
                username: req.salername,
                usertype: 2,
                userphone: req.salerphone,
                userpassword: 123456
            }
            await DBhandle.query(sql1,params1);
            let sql2 = 'select last_insert_id() as lastid';
            let sqlData2 = await DBhandle.query(sql2);
            let sql3 = 'insert into managers set ?';
            let params3 = {
                managerid: req.userid,
                salerid: sqlData2[0].lastid,
                salertype: req.salertype,
                xiashuprodmoney: 0,
                managermoney: 0
            }
            await DBhandle.query(sql3,params3);
            res.code = 200;
            res.message = '账户创建成功，管家id是'+`${sqlData2[0].lastid}`
            return res;

        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async getsalersalelist (ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql1 = 'select salerid from managers where managerid='+`${req.userid}`;
            let sqlData1 = await DBhandle.query(sql1);
            res.list = [];
            for(let i=0;i<sqlData1.length;i++){
                let sql2 = 'select salerid,prodid,prodmoney,ownmoney,buytime,buyuser,dingdanstate from salers where salerid='+`${sqlData1[i].salerid}`;
                let sqlData2 = await DBhandle.query(sql2);
               for(let k=0;k<sqlData2.length;k++){
                   res.list.push(sqlData2[k]);
               }
            }
            for(let j = 0;j<res.list.length;j++){
                let sql3 = 'select username from users where userid='+`${res.list[j].salerid}`;
                let sqlData3 = await DBhandle.query(sql3);
                res.list[j].salername = sqlData3[0].username;
                let sql4 = 'select username from users where userid='+`${res.list[j].buyuser}`;
                let sqlData4 = await DBhandle.query(sql4);
                res.list[j].buyusername = sqlData4[0].username
            }
            res.code = 200;
            res.message  = 'success';
            return res;

        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }
    async rewardwithdraw (ctx) {
        try {
            let req = ctx.request.body;
            let res = {};
            let sql1 = 'select * from rewardrecord where managerid='+`${req.userid}`;
            let sqlData1 = await DBhandle.query(sql1);
            for(let i=0;i<sqlData1.length;i++){
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
    async getmanagermoney (ctx){
        try {
            let req = ctx.request.body;
            let res = {};
            let sql = 'select managermoney from managers where managerid='+`${req.userid}`;
            let sqlData = await DBhandle.query(sql);
            res.managermoney = 0
            for(let i=0;i<sqlData.length;i++) {
                res.managermoney+=sqlData[i].managermoney;
            }
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

module.exports = new Manager();