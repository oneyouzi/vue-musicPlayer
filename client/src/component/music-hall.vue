<template>
    <div>
        <ul class=" music-hall-ul">
            <router-link to="/musichall/choicemusic" tag="li" >精选</router-link>
            <router-link to="/musichall/singer" tag="li">歌手</router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data: function () {
            return{

            }
        }
    }
</script>

<style>
    .music-hall-ul{
        padding-top: 10px;
        text-align: center;
        border-top: 1px solid #efefef;
        line-height: 30px;
    }
    .music-hall-ul li{
        margin: 0 20px;
        display: inline-block;
        cursor: pointer;
    }
    .music-hall-ul li.checked-link{
        color: green;
        border-bottom: 2px solid green;
    }
</style>