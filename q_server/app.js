/**
 * Created by host on 2018/5/10.
 */
// ����koa����koa 1.x��ͬ����koa2�У����ǵ������һ��class������ô�д��Koa��ʾ:
const Koa = require('koa');
// ����һ��Koa�����ʾweb app����:
const app = new Koa();
const router= require("./module_js/router.js");//·��
// �����κ�����app�����ø��첽������������
const static=require("koa-static");
const path = require('path');
const staticPath="./static";
const cors = require('koa2-cors');
const bodyParse=require("koa-bodyparser")();
app.use(bodyParse);
app.use(static(path.join(__dirname,staticPath)));
app.use(cors());

// �ڶ˿�3000����:

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('app started at port 3000...');