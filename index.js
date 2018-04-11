const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const  serve = require("koa-static");
const routers = require('./service/routers/index');


app.use(serve(__dirname+"/static/build",{ extensions: ['html']}));

//app.use(serve(__dirname));

app.use(bodyParser());


app.use(routers());


app.listen(3001);