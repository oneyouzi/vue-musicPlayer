<template>
    <nav class="left-box">
        <div class="user-box">
            <div class="img-box">
                <img src="../assets/banner1.jpg"/>
            </div>
        </div>
        <div class="nav-main">
            <div>在线音乐</div>
            <ul>
                <router-link to="/musichall" tag="li">音乐馆</router-link>
                <router-link to="/mv" tag="li">MV</router-link>
               <!-- <li>个性电台</li>-->
            </ul>
            <!--<div>我的音乐</div>
            <ul>
                <router-link to="/mylove" tag="li">我喜欢</router-link>
                <li>本地和下载</li>
                <li>播放历史</li>
                <li>试听列表</li>
            </ul>-->
            <div>我建的歌单</div>
            <ul>
                <router-link to="/index/1" tag="li" >经典泳流传</router-link>
                <router-link to="/index/2" tag="li" >民谣</router-link>
            </ul>
        </div>
    </nav>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    export default {
        data: function () {
            return{}
        },
        computed:{
              /*  ...mapGetter(['music_list']);*/
        },
        mounted:function(){
            let id=this.$route.params.id;
            this.getMusic(id);
        },
        methods:{
            getMusic:function($id){
                this.$store.dispatch("getMusic",{"id":$id});
            //    this.$store.dispatch("setPlayerData",this.$store.state.music_list.music_list);
            }
        },
        watch:{
            '$route' (to,from) {
                // 对路由变化作出响应...
                this.getMusic(this.$route.params.id);
             }
        }
    }
</script>

<style>
    .img-box{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        margin: 20px auto;
        position: relative;
    }
    .left-box{
        background: #efefef;
        position: absolute;
        left: 0px;
        top: 0px;
        height: 100%;
        width:200px;

    }
    .nav-main{
        line-height: 35px;
        text-indent: 20px;
    }
    .nav-main>div{
        color: grey;
        font-size: 12px;
        margin-top: 10px;
    }
    .nav-main .checked-link{
        color:#ffffff;
        background: green;

    }
    .nav-main li:hover{
        color:#ffffff;
        background:forestgreen;
        opacity: 0.5;
        cursor: pointer;
    }
</style>