/**
 * Created by host on 2018/6/27.
 */
const config={
    "webPath":"/test"
};
import Vue from "vue";
import Vuex from 'vuex'
import inject from "!!vue-loader?inject!../../component/choice-music.vue";

let music=inject({});
Vue.use(Vuex);
let store=new Vuex.Store({
    state:{
        "choice_music":[]

    },
    getters:{
        choice_music:(state)=>state.choice_music
    },
    mutations:{
        DATA_CHOICEMUSIC(state,res_data){
            state.choice_music=res_data.data
        }
    },
    actions:{
        getChoiceMusic({dispatch,commit}){
            commit({
                "type":"DATA_CHOICEMUSIC",
                "data":[
                    {
                        "song_image":"dd.jpg",
                        "song_name":"这是一首歌",
                        "from_where":"qq推荐"
                    },
                    {
                        "song_image":"dd.jpg",
                        "song_name":"这是一首歌",
                        "from_where":"qq推荐"
                    }
                ]
            })
        }
    }
});
describe("choice music vue",()=>{
    let choiceMusic=new Vue({...music,store}).$mount();
    it("component is created",()=>{
        choiceMusic.getChoiceMusic();
       expect(choiceMusic.choice_music.length).toBe(2);
    });
});