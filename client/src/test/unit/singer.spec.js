/**
 * Created by host on 2018/7/12.
 */
import Vue from "vue";
import Vuex from "vuex";
import inject from "!!vue-loader?inject!../../component/singer.vue";
Vue.use(Vuex);
let singer=inject({});
let store=new Vuex.Store({
    state:{
        singers:[]
    },
    mutations:{
        SINGER(state,res_data){
            state.singers=res_data.data;

        }
    },
    getters:{
        singers:(state)=>state.singers
    },
    actions:{
        getSinger({dispatch,commit},data){
            commit({
                "type":"SINGER",
                "data":[
                    {
                        'singer_image':"eee",
                        'singer_name':"333"
                    },
                    {
                        'singer_image':"eee",
                        'singer_name':"333"
                    }
                ]
            });
        }
    }
});
describe("singer vue",()=>{
    let singerComponent=new Vue({...singer,store}).$mount();
    it("commponet created",()=>{
        expect(singerComponent.formSearch.cha).toBe(-1);
        expect(singerComponent.singers.length).toBe(2);

    });
    it("click search key",()=>{
        console.log('liµÄ¸öÊý'+singerComponent.$el.querySelectorAll(".search-keys>li").length);

        let ele=singerComponent.$el.querySelector(".search-keys>li:first-child").querySelectorAll("span")[3];
        let clickEvent=new window.Event('click');
        ele.dispatchEvent(clickEvent);
        singerComponent._watcher.run();
        expect(singerComponent.formSearch.cha).toBe(2);

    })
});