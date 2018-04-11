

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
}

module.exports = new Utils();