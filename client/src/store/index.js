/**
 * Created by host on 2017/4/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import music_list from './modules/music-list.js';
import music_hall from './modules/music-hall.js';
import mv from './modules/mv.js';
Vue.use(Vuex);
/*const  AJAX_DATA=AJAX_DATA,NORMAL_DATA=NORMAL_DATA,USER_LIST_SUCCESS=USER_LIST_SUCCESS,USER_DETAIL_SUCCESS=USER_DETAIL_SUCCESS;*/

let store=new Vuex.Store({
    state:{
       /* 'data1':44,
        'data2':12,
        'user_lists':[],
        'user_detail':{}*/
    },
    getters:{
      /*  "getData1":state=>state.data1,
        "getData2":state=>state.data2,
        "user_lists":state=>state.user_lists,
        "user_detail":state=>state.user_detail*/
    },
    mutations:{
       /* AJAX_DATA(state){
            state.data1++;
        },
        NORMAL_DATA(state){
            state.data2++;
        },
        USER_LIST_SUCCESS(state,res_data){
            state.user_lists=res_data.data;
        },
        USER_DETAIL_SUCCESS(state,res_data){
            state.user_detail=res_data.data;
        }*/
    },
    actions:{
        /*getNormal({commit}){
            commit({
                "type":"NORMAL_DATA"
            });
        },
        getAjax({dispatch,commit}){
            commit({
                "type":"AJAX_DATA"
            });
        },
        getUserList({dispatch,commit},data){
            ComAjax({
                method:"get",
                url:"https://easy-mock.com/mock/591564a39aba4141cf223136/pomelo/user_list",
                data:data
            },commit,"USER_LIST_SUCCESS");
        },
        getUserDetail({dispatch,commit},data){
            ComAjax({
                method:"get",
                url:"https://easy-mock.com/mock/591564a39aba4141cf223136/pomelo/user_detail/"+data.id,
                data:""
            },commit,"USER_DETAIL_SUCCESS");
        }*/
    },
    modules:{
        music_list:music_list,
        music_hall:music_hall,
        mv:mv
    }
});
export default store