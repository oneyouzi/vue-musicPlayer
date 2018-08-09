<template>
        <div class="top-slider-box">
            <ul>
                <li v-for="(item,index) in slide_images"
                    v-bind:class="getClass(index)">
                    <img v-bind:src='item'/>
                </li>
            </ul>
        </div>
</template>
<script>
    export default {
        data: function () {
            return{
                "slide_images":[
                    require("../assets/banner1.jpg"),
                   require( "../assets/banner2.jpg"),
                   require( "../assets/banner3.jpg"),
                    require("../assets/banner4.jpg")
                ],
                "slide_index":{
                    "preIndex":1,
                    "nowIndex":2,
                    "nextIndex":3
                },
                "styles":{
                    "now_class":"now-class",
                    "next_class":"next-class",
                    "pre_class":"pre-class"
                }
            }
        },
        computed:{

        },
        mounted:function(){
            setTimeout(function(){
                this.imagesAnimation();
            }.bind(this),3000);
        },
        methods:{
            getClass:function(index){
                if(index==this.slide_index.nowIndex){
                    return "now-class";
                }
                else if(index==this.slide_index.preIndex){
                    return "pre-class";
                }
                else if(index==this.slide_index.nextIndex){
                    return "next-class";
                }
            },
            imagesAnimation:function(){
                //Í¼Æ¬ÂÖ²¥
                let imageLen=this.slide_images.length-1,nextIndex=this.slide_index.nextIndex;
                this.slide_index.preIndex=this.slide_index.nowIndex;
                this.slide_index.nowIndex=this.slide_index.nextIndex;
                if(nextIndex==imageLen){
                    this.slide_index.nextIndex=0;
                }
                else{
                    this.slide_index.nextIndex++;
                }
                setTimeout(function(){
                    this.imagesAnimation();
                }.bind(this),3000);
            }
        }
    }
</script>

<style>
    .top-slider-box{
        width: 100%;
        height: 195px;
        position: relative;
    }
    .top-slider-box ul{
        width: 100%;
        height: 100%;
    }
    .top-slider-box ul li{
        position: absolute;
        height:90% ;
        bottom: 0;
        left: 50%;
        transform:translateX(-50%);
        z-index: 5;
        width: 50%;
    }
    .top-slider-box ul li img{
        width: 100%;
        height: 100%;
    }
    .top-slider-box ul li.now-class{
        height:100%;
        width:70%;
        top:0px;
        left:50%;
        transform:translateX(-50%);
        z-index: 10;
        transition: 0.5s;
    }
    .top-slider-box ul li.next-class{
        height:90%;
        width:50%;
        bottom:0;
        right: 0;
        transition: 0.5s;
        transform:translateX(0);
    }
    .top-slider-box ul li.pre-class{
        height:90%;
        width:50%;
        bottom:0;
        left: 0;
        transition: 0.5s;
        transform:translateX(0);
    }
</style>