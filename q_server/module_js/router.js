/**
 * Created by host on 2018/5/14.
 */
const Router=require("koa-router");
const router=require('koa-router')();
const  comRequest=require('./request.js');
router.get('/musicList/:id',async (ctx,next)=>{
    let url = ctx.params.id==1 ? "http://localhost:3000/music_lists.js":"http://localhost:3000/music_lists2.js";
    let opts={
        "uri":url,
        "data":ctx.query,
        "method":"GET"
    };
    ctx.body=new comRequest(opts).postData();
});
router.post('/showMusic',async (ctx,next)=>{
    console.log(ctx.request.body);//获取post传参的方式
});
router.get("/musicHall/choiceMusic",async (ctx,next)=>{
    let opts={
        "uri":"http://localhost:3000/choice_music.js",
        "data":ctx.query,
        "method":"GET"
    };
    ctx.body=new comRequest(opts).postData();
});
router.get("/musicHall/singer",async (ctx,next)=>{
    let getData=ctx.query;//get方式传过来的参赛解析成json
    let num=Math.ceil(Math.random()*5);//1到我的随机数
    let opts={
        "uri":"http://localhost:3000/singer"+num+".js",
        "data":ctx.query,
        "method":"GET"
    };
    ctx.body=new comRequest(opts).postData();
});
router.get("/",async (ctx,next)=>{
    ctx.body="hello world"
});
router.post("/lrc",async (ctx,next)=>{
    let lrcData=ctx.request.body;
   let opts={
        "uri":lrcData.lrcUrl,
        "method":"GET"
    };
   ctx.body=new comRequest(opts).postData()

});
router.get("/mv",async (ctx,next)=> {
    ctx.body = new comRequest({
        "uri": "http://localhost:3000/mv.js",
        "method": "GET"
    }).postData()
});
module.exports=router;