<template>
    <div  class="content-main">
        <top_images_animation></top_images_animation>
        <h1 class="m20">热门推荐</h1>
        <ul class="clear-fix hot-ul">
            <li>热门游戏</li>
            <li>情歌</li>
            <li>粤语精选</li>
        </ul>
        <ul class="hot-detail-ul com-flex  flex-style-row m20">
            <li v-for="item in choice_music">
                <img v-bind:src="item.song_image" width="130" height="150">
                <p style="height:48px;">{{item.song_name}}</p>
                <span class="color-gray">{{item.from_where}}</span>
            </li>

        </ul>
    </div>
</template>
<script>
    import top_images_animation from './top-images-animation.vue';
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    export default {
        data: function () {
           return{
                //"choice_music":[],
                "default_show":0
           }
        },
        components:{
            'top_images_animation':top_images_animation
        },
        created:function(){
         //   this.choice_music=choice_music;
            this.getChoiceMusic()
        },
        computed:{
            ...mapGetters(["choice_music"])
        },
        mounted:function(){

        },
        methods:{
            getChoiceMusic:function(){
                this.$store.dispatch("getChoiceMusic");
            }
        }
    }
</script>

<style>
.hot-ul li{
    width: 80px;
    text-align: center;
    background: #ffffff;
    line-height: 40px;
    margin-right: 15px;
}
    .hot-detail-ul li{
        margin-right: 20px;
        width: 130px;
        margin-bottom: 15px;
    }
.hot-detail-ul li:nth-child(5n){
    margin-right: 0px;
}
.hot-detail-ul li img:hover{
    transform: scale(1.1);
    transform-origin: center center;
    transition:1s;
}
</style>