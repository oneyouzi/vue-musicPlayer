<template>
    <div class="content-main">
        <ul class="search-keys">
            <li>
                <span>热门</span>
                <span v-for="(item,index) in keys.cha" v-bind:style="{color:index==formSearch.cha?'red':''}" v-on:click="searchCha(index)">{{item}}</span>
            </li>
            <li>
                <span>区域</span>
                <span v-for="(item,index) in keys.area"  v-bind:style="{color:index==formSearch.area?'red':''}"  v-on:click="searchArea(index)">{{item}}</span>
            </li>
            <li>
                <span>性别</span>
                <span v-for="(item,index) in keys.sex"  v-bind:style="{color:index==formSearch.sex?'red':''}"  v-on:click="searchSex(index)">{{item}}</span>
            </li>
            <li>
                <span>类型</span>
                <span v-for="(item,index) in keys.type"  v-bind:style="{color:index==formSearch.type?'red':''}"  v-on:click="searchType(index)">{{item}}</span>
            </li>
        </ul>
        <ul class="com-flex flex-style-row singer-style1">
            <li v-for="(item,index) in singers" v-if="index<10">
                <img v-bind:src="item.singer_image">
                <p>{{item.singer_name}}</p>
            </li>
            <li v-else class="only-name">
               {{item.singer_name}}
            </li>

        </ul>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import { mapActions } from "vuex";
    export default {
        data: function () {
            return{
                keys:{
                    "cha":['A','B','C','D'],
                    "area":["北京","上海","成都"],
                    "sex":["男","女","组合"],
                    "type":['流行','嘻哈','摇滚','电子','民谣','轻音乐','爵士','古典']
                },
                formSearch:{
                    "cha":-1,
                    "area":-1,
                    "sex":-1,
                    "type":-1
                }
            }
        },
        computed:{
                ...mapGetters(["singers"])
        },
        created:function(){
                this.getSinger();

        },
        methods:{
            searchCha:function(index){
                this.formSearch.cha=index;
                this.getSinger();
            },
            searchArea:function(index){
                this.formSearch.area=index;
                this.getSinger();
            },
            searchSex:function(index){
                this.formSearch.sex=index;
                this.getSinger();
            },
            searchType:function(index){
                this.formSearch.type=index;
                this.getSinger();
            },
            getSinger:function(){
                console.log(this.formSearch);
                this.$store.dispatch("getSinger",this.formSearch)
            }
        }
    }
</script>

<style>
    .search-keys span{
        display: inline-block;
        width: 70px;
        line-height: 30px;
    }
    .search-keys li span:first-child{
        color: green;
    }
    .search-keys li:first-child span:not(:first-child){
        width: 30px;

    }
    .search-keys li span:not(:first-child){
        cursor: pointer;
    }
    .singer-style1 li{
        width: 135px ;
        height: 150px;
        background: darkseagreen;
        margin-right:17px;
        margin-bottom: 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .singer-style1 li:nth-child(5n){
        margin-right: 0px;
    }
    .singer-style1 li img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .singer-name-box li{
        line-height: 30px;
        width: 150px;
    }
    .singer-style1 li.only-name{
        height: 30px;
        text-align: left;
        background: none;
        display: block;
    }
</style>