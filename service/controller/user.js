

class Controller {
    async login (ctx) {
       let pass = await dbhandle.get(ctx.request.body.userName);
       if(pass == ctx.request.passWord){
            let token = '';
       }
    }
}