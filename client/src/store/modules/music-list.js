import ComAjax from "../ajax.js";
import mutationTag from "../mutation_tag";
const musicList={
    state:{
        "music_list":[],
        "player_list":{
            "song_list":[
                {
                    "song_name": "大鱼",
                    "song_link": "http://music.163.com/song/media/outer/url?id=516823132.mp3",
                    "singer": "周深",
                    "img_src": "http://y.gtimg.cn/music/photo_new/T002R300x300M000004Y7V4s3ug4cC.jpg?max_age=2592000",
                    "lrc_url":"http://music.163.com/api/song/media?id=516823132"
                },
                {
                    "song_name": "花开",
                    "song_link": "http://music.163.com/song/media/outer/url?id=545592498.mp3",
                    "singer": "陈粒",
                    "img_src": "http://y.gtimg.cn/music/photo_new/T002R300x300M000003EwC7P2m6LeU.jpg?max_age=2592000",
                    "lrc_url":"http://music.163.com/api/song/media?id=545592498"
                }
            ],
            "song_index":1
        }
    },
    getters:{
        music_list:state=>state.music_list,
        player_list:state=>state.player_list
    },
    mutations:{
        [mutationTag.DATA_MUSICLIST](state,res_data){
           state.music_list=res_data.data;
        },
        [mutationTag.DATA_SHOWMUSIC](state,res_data){

        },
        [mutationTag.DATA_PLAYERLIST](state,res_data){
            state.player_list=res_data.data;
        }
    },
    actions:{
        getMusic({dispatch,commit},data){
            ComAjax({
                method: "get",
                url: config.webPath+"/musicList/" + data.id,
                data:data
            }, commit, mutationTag.DATA_MUSICLIST);
        },
        postToMusic({dispatch,commit},data){
            ComAjax({
                method:"post",
                url:config.webPath+"/showMusic",
                data:data
            },commit,mutationTag.DATA_SHOWMUSIC);
        },
        setPlayerData({dispatch,commit},data){
            console.log(data);
            commit({
                "type":mutationTag.DATA_PLAYERLIST,
                "data":data
            });
        }
    }
};
export default musicList;