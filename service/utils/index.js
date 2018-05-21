
const DBhandle = require('../sql/sql');

class Utils {

    getNowTime () {
        let date = new Date();
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
    getnowtime() {
        const date = new Date();
        const year = date.getFullYear();
        let month;
        if(date.getMonth() < 9) {
            month = `0${date.getMonth()+1}`
        }else {
            month = date.getMonth()+1;
        }
        let day;
        if(date.getDate() < 10) {
            day = `0${date.getDate()}`;
        }
        else {
            day = date.getDate();
        }
        return `${year}${month}${day}`
    }
    cookieSet(ctx,name,value) {
        ctx.cookies.set(name,value,{
            path: '/',
            maxAge: 100 * 60 * 1000,
            httpOnly: false,
            overWrite: false,
            charest:'utf-8',
        })

    }
    cookieGet(ctx,name) {
        return ctx.cookies.get(name,{
            path: '/',
            maxAge: 100 * 60 * 1000,
            httpOnly: false,
            overWrite: false
        })

    }
    yuefen(a,b) {
        let a1 = a.slice(0,4);
        let a2 = a.slice(4,6);
        let a3 = a.slice(6,8);
        let b1 = b.slice(0,4);
        let b2 = b.slice(4,6);
        let b3 = b.slice(6,8);
        if(a3>=b3){
            return (a1-b1)*12+(a2-b2);
        }
        else {
            return (a1-b1)*12+(a2-b2-1)
        }
    }
    getSql(ctx) {
        let req = ctx.request.body;
        let sql = '';
        if(req.selectmonth == 10){
            if(req.selectpre == 100){
                if(req.selectdanger == 10){
                    sql = 'select * from products where dangertype<4';
                }else {
                    sql = 'select * from products where dangertype='+`${req.selectdanger}`;
                }
            }else if(req.selectpre == 25){
                if(req.selectdanger == 10){
                    sql = 'select * from products where dangertype<4 and income>10';
                }else {
                    sql = `select * from products where dangertype=${req.selectdanger} and income>10`;
                }
            }else {
                if(req.selectdanger == 10){
                    sql = `select * from products where dangertype<4 and income>${req.selectpre-5} and income<${parseInt(req.selectpre)+1}`;
                }else {
                    sql = `select * from products where dangertype=${req.selectdanger} and income>${req.selectpre-5} and income<${parseInt(req.selectpre)+1}`;
                }
            }
        }else if(req.selectmonth == 25){
            if(req.selectpre == 100){
                if(req.selectdanger == 10){
                    sql = 'select * from products where dangertype<4 and needbuymonth>24'
                }else {
                    sql = `select * from products where dangertype=${req.selectdanger} and needbuymonth>24`
                }
            }else if(req.selectpre == 25){
                if(req.selectdanger == 10){
                    sql = 'select * from products where dangertype<4 and income>10 and needbuymonth>24';
                }else {
                    sql = `select * from products where dangertype=${req.selectdanger} and needbuymonth>24 and income>10`
                }
            }else {
                if(req.selectdanger == 10){
                    sql = `select * from products where dangertype<4 and needbuymonth>24 and income>${req.selectpre-5} and income${req.selectpre+1}`
                }else {
                    sql = `select * from products where dangertype=${req.selectdanger} and needbuymonth>24 and income>${req.selectpre-5} and income<${parseInt(req.selectpre)+1}`
                }
            }
        }else {
            if(req.selectpre == 100){
                if(req.selectdanger == 10){
                    sql = `select * from products where dangertype<4 and needbuytime>=${Math.floor(req.selectmonth/2)} and needbuytime<=${req.selectmonth}`
                }else {
                    sql = `select * from products where dangertype=${req.selectdanger} and needbuytime>=${Math.floor(req.selectmonth/2)} and needbuytime<=${req.selectmonth}`
                }
            }else if(req.selectpre == 25){
                if(req.selectdanger == 10){
                    sql = `select * from products where dangertype<4 and needbuytime>=${Math.floor(req.selectmonth/2)} and needbuytime<=${req.selectmonth} and income>10`
                }else {
                    sql = `select * from products where dangertype=${req.selectdanger} and needbuytime>=${Math.floor(req.selectmonth/2)} and needbuytime<=${req.selectmonth} and income>10`
                }
            }else {
                if(req.selectdanger == 10){
                    sql = `select * from products where dangertype<4 and needbuytime>=${Math.floor(req.selectmonth/2)} and needbuytime<=${req.selectmonth} and income>${req.selectpre-5} and income<${parseInt(req.selectpre)+1}`
                }else {
                    sql = `select * from products where dangertype=${req.selectdanger} and needbuytime>=${Math.floor(req.selectmonth/2)} and needbuytime<${req.selectmonth} and income>=${req.selectpre-5} and income<${parseInt(req.selectpre)+1}`
                }
            }

        }
        return sql;
    }

    async getreport() {
        try {
            let date = new Date();
            let data1 = [];
            let data2 = {};
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let oldmoney = 1;
            if (month < 10) {
                month = '0' + month;
            }
            let sql1 = 'select * from userprods order by buytime ASC LIMIT 501';
            let sqlData1 = await DBhandle.query(sql1);
            for (let i = 0; i < sqlData1.length; i++) {
                data2.allmoney += sqlData1[i].buymoney;
                data2.earnmoney += (sqlData1[i].buymoney * (sqlData1[i].prodincome - 1)) / 100;
                data2.account = sqlData1.length;
                data2.bigmoney = sqlData1[0].buymoney;
            }
            let num1 = sqlData1[0].buytime.toString().slice(0, 4);
            let num2 = sqlData1[0].buytime.toString().slice(4, 6);
            let num3 = (year - num1) * 12 + (month - num2);
            for (let i = 0; i < num3; i++) {
                let data = {};
                let sql = 'select * from userprods where buytime<' + `${num1}` + `${num2}` + '31' + 'and buytime>' + `${num1}` + `${num2}` + '01';
                let sqlData = await DBhandle.query(sql);
                data.title = `${num1}` + '年' + `${num2}` + '月运营报告';
                for (let i = 0; i < sqlData.length; i++) {
                    data.allmoney += sqlData1[i].buymoney;
                    data.earnmoney += (sqlData1[i].buymoney * (sqlData1[i].prodincome - 1)) / 100;
                    data.account = sqlData1.length;
                    data.bigmoney = sqlData1[0].buymoney;
                    data.zengzhang = ((data.allmoney - oldmoney) / oldmoney) * 100;
                    oldmoney = data.allmoney;
                }
                data1.push(data);
                num2++;
                if (num2 > 12) {
                    num2 = '00';
                    num1++;
                }
            }
            data2.list = data1;
            data2.code = 200;
            data.message = 'success';
            return data2;
        } catch (e) {
            let res = {};
            res.code = 686;
            res.message = '数据库异常';
            return res;
        }
    }

    async remone() {
        setTimeout(async ()=>{
            let sql = 'select * from products where prodtype=3';
            let sqlData = await DBhandle.query(sql);
            for(let i = 0;i<sqlData.length;i++){
                let income = Math.floor(Math.random()*15);
                let sql = 'update products set income='+`${income}`+' where prodid='+`${sqlData[i].prodid}`;
                await DBhandle.query(sql);
            }
        },1000*60*60*24*30)
    }
}

module.exports = new Utils();