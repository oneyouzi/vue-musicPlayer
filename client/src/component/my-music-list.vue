<template>
    <div style="height: 500px;overflow-y: auto">
        <div class="center-bac">
            <img src="../assets/banner2.jpg" width="145"  height="145"/>
        </div>
        <div style="padding: 15px; background: #fff">
            <ul class="clear-fix tab-com">
                <li class="check-now">歌曲</li>
                <li>最近收藏</li>
                <li>评价</li>
            </ul>
            <table class="com-table">
                <tbody>
                <tr v-for="(item,index) in music_list" v-on:click="postToMusic(index)">
                    <td>{{item.song_name}}</td>
                    <td>{{item.singer}}</td>
                    <td>专辑</td>
                </tr>

                </tbody>
            </table>
        </div>
    </div>


</template>
<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    export default {
        data: function () {
            return {
            }
        },
        computed:{
                ...mapGetters(["music_list"])

        },
        mounted:function(){
           // this.setPlayerData();
          //  this.music_lists=this.$store.state.music_list.music_list;
        },
        methods:{
            postToMusic:function(id){
                //点击歌曲播放所选
                const playData={
                    "song_list":this.$store.state.music_list.music_list,
                    "song_index":id
                };
                this.$store.dispatch("setPlayerData",playData);
            }

        }
    }
</script>

<style>

</style>