

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
}

module.exports = new Utils();