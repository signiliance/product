const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const DBhandle = require('./sql/sql.js');
const sss = require('./111');
app.use(bodyParser());
app.use(sss());



app.listen(3000);