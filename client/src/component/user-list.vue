<template>
    <ul class="clear-fix user-ul-box">
        <li  v-for="item in user_lists">
            <router-link  :to="{ name: 'list',params:{user_id:item.id}}">
            <img :src="item.user_head" width="100" height="80"/>
            <p>{{item.name}}</p>
                </router-link>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
    import user_list from '../json/user.js';
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    export default {
        data:function(){
            return {
              "user_list":[],
                "message":"hello word"
            }
        },
        created:function(){
            this.user_list=user_list;
            this.getUserList();
           // getUserList();
        },
        computed:{
             ...mapGetters(["user_lists"])
        },
        methods:{
            ...mapActions(["getUserList"])

        }
    }
</script>
<style>
    .user-ul-box li{

        text-align: center;
        padding: 30px 60px;

        margin: 10px;;
    }
    .user-ul-box li a{
        color: black;
        display: inline-block;
    }
</style>
