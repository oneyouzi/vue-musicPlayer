/**
 * Created by host on 2018/5/14.
 */
const http=require("request");//http模块
class comRequest{
    constructor(opts){
        this.opts=opts;
    }
    postData(){
        // console.log(data);
        const {data,uri,method}=this.opts;
        return   http({
            method:method,
            uri:uri,
            body:JSON.stringify(data),
            gzip:true,
            //  port:3000,
            headers:{'Content-Type':'application/json'}
        },function(err,res,body){

                return JSON.parse(body);

        });
    }

};
module.exports=comRequest;