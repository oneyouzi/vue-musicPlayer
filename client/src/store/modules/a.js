/**
 * Created by host on 2017/4/28.
 */
const a={
    state:{
        "dataA":22
    },
    getters:{
        getDataA:state=>state.dataA
    },
    mutations:{
        DATAA_TYPE(state){
            state.dataA++;
        }
    },
    actions:{
        changeDataA({commit}){
            commit({
                type:"DATAA_TYPE"
            });
        }
    }
};
export default a;