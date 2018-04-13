

class Utils {
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
}

module.exports = new Utils();