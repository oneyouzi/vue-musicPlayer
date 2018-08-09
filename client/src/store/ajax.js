/**
 * Created by host on 2017/5/15.
 */
import  axios from "axios";

export  default function(opts,commit,type){
    const config={
        "baseUrl":""
    };
    const postData=opts.data || "";
    const newOpts={
        "url":opts.url,
        "method":opts.method
    };
    if(opts.method=="get"){
        Object.assign(newOpts,{ "params":postData})
    }
    else{
        Object.assign(newOpts,{"data":postData})
    }
    axios(newOpts).then(function(res){
        if(res.status==200){
            commit({
                "type":type,
                "data":res.data.res_data
            })
        }
    });
   /* if(opts.method=="get"){
        axios.get(opts.url,{params:opts.data},config).then(function(res){
            console.log(res);
            if(res.status==200){
                commit({
                    "type":type,
                    "data":res.data.res_data
                })
            }
        });
    }
    if(opts.method=="post"){
        axios.get(opts.url,opts.data,config).then(function(res){
            commit({
                "type":type,
                "data":res.data.res_data
            })
        });
    }*/
}