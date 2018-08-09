/**
 * Created by host on 2018/5/10.
 */
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const app = new Koa();
const router= require("./module_js/router.js");//路由
// 对于任何请求，app将调用该异步函数处理请求：
const static=require("koa-static");
const path = require('path');
const staticPath="./static";
const cors = require('koa2-cors');
const bodyParse=require("koa-bodyparser")();
app.use(bodyParse);
app.use(static(path.join(__dirname,staticPath)));
app.use(cors());

// 在端口3000监听:

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('app started at port 3000...');