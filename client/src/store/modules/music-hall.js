import ComAjax from "../ajax.js";
import mutationTag from "../mutation_tag";
 const musicHall={
    state:{
        "choice_music":[],
        "singers":[]
    },
    getters:{
        choice_music:state=>state.choice_music,
        singers:state=>state.singers
    },
    mutations:{
        [mutationTag.DATA_CHOICEMUSIC](state,res_data){
            state.choice_music=res_data.data
        },
        [mutationTag.DATA_SINGER](state,res_data){
            state.singers=res_data.data;
        }
    },
    actions:{
        getChoiceMusic({dispatch,commit}){
            ComAjax({
                method: "get",
                url: config.webPath+"/musicHall/choiceMusic"
            }, commit, mutationTag.DATA_CHOICEMUSIC);
        },
        getSinger({dispatch,commit},data){
            ComAjax({
                method: "get",
                url: config.webPath+"/musicHall/singer",
                data:data
            }, commit, mutationTag.DATA_SINGER);
        }
    }
}
export  default musicHall;