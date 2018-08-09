<template>
    <div  class="content-main">
        <top_images_animation></top_images_animation>
        <h1 class="m20">热门推荐</h1>
        <div class="mv-box com-flex">
            <div class="img-style1">
                <img v-bind:src="(mv_data.hot_recommend)[0].img_src"/>
                <p>{{mv_data.hot_recommend[0].mv_name}}</p>
            </div>
            <div class="com-flex more-row">
                <div class="img-style1" v-for="(item,index) in mv_data.hot_recommend" v-if="index!=0">
                    <img v-bind:src="item.img_src"/>
                    <p>{{item.mv_name}}</p>
                </div>
            </div>
        </div>
        <h1 class="m20">最新排行</h1>
        <div class="mv-box com-flex">
            <div class="img-style1">
                <img v-bind:src="mv_data.new_top[0].img_src"/>
                <p>{{mv_data.new_top[0].mv_name}}</p>
            </div>
            <div class="com-flex more-row">
                <div class="img-style1" v-for="(item,index) in mv_data.new_top" v-if="index!=0">
                    <img v-bind:src="item.img_src"/>
                    <p>{{item.mv_name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import top_images_animation from './top-images-animation.vue';
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    export default {
        data: function () {
           return{
                "hot_recommend":[],
               "new_top":[]
           }
        },
        components:{
            'top_images_animation':top_images_animation
        },
        created:function(){

        },
        computed:{
                ...mapGetters(["mv_data"])
        },
        mounted:function(){
            this.getMV();
        },
        methods:{
        ...mapActions(["getMV"])
        }
    }
</script>

<style>

.mv-box{
    height: 300px;
    align-items: stretch;
    justify-content: space-between;
    margin: 20px 0px;
}
.mv-box >div{
    flex: 1;
}
    .mv-box>div:first-child{
        margin-right: 15px;
    }
    .img-style1{
        position: relative;
        overflow: hidden;
    }
    .img-style1 img{
        width: 100%;
        height: 100%;
    }
.img-style1 img:hover{
    transform: scale(1.2,1.2);
    transform-origin: center center;
    transition: 1s;
    opacity: 0.5;
}
    .img-style1 p{
        position: absolute;
        z-index: 10;
        background: #000;
        color: #ffffff;
        opacity: 0.7;
        line-height: 30px;
        bottom: 0px;
        width: 100%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .more-row{
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
    }
    .more-row>div{
        width: 48%;
        height: 48%;
    }
</style>