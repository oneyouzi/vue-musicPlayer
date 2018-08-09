<template>
    <section class="main-box">
        <left_menu></left_menu>
        <section class="right-box">
            <top_operate></top_operate>
            <router-view></router-view>
        </section>
        <audio_player></audio_player>
    </section>
</template>
<script >
    import left_menu from './component/left-menu.vue';
    import top_operate from './component/top-operate.vue';
    import audio_player from './component/audio-player.vue';
;    export default {
        data: function () {
            return {

            }
        },
        components:{"left_menu":left_menu,"top_operate":top_operate,audio_player:audio_player}
    }
</script>
<style>
    .hh{
        background: red;
    }
    .index-ul{
        margin: 20px 0px;
    }
    .index-ul>li{
        line-height: 35px;
        width: 100px;
        background: dodgerblue;
        text-align: center;
        margin-right: 10px;
    }
    .index-ul>li.checked-link{
        background: red;
    }
    .index-ul>li a{
        color: #ffffff;
        display: inline-block;
        width: 100%;
    }
</style>
