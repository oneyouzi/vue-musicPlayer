import ComAjax from "../ajax.js";
import mutationTag from "../mutation_tag";
const musicList={
    state:{
        "mv_data":{}
    },
    getters:{
        mv_data:state=>state.mv_data
    },
    mutations:{
        [mutationTag.DATA_MV](state,res_data){
           state.mv_data=res_data.data;
        }
    },
    actions:{
        getMV({dispatch,commit},data){
            ComAjax({
                method: "get",
                url: config.webPath+"/mv/",
                data:data
            }, commit, mutationTag.DATA_MV);
        },
        setPlayerData({dispatch,commit},data){
         //   console.log(data);
            commit({
                "type":mutationTag.DATA_PLAYERLIST,
                "data":data
            });
        }
    }
};
export default musicList;