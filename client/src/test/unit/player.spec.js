/**
 * Created by host on 2018/6/27.
 */
const config={
    "webPath":"/test"
};
import Vue from "vue";
import Vuex from 'vuex'
import playerr from "!!vue-loader?inject!../../component/audio-player-test.vue";
require('jasmine-ajax');

let player=playerr({});
Vue.use(Vuex);
let store=new Vuex.Store({
    state:{
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
        "player_list":(state)=>state.player_list
    },
    mutations:{},
    actions:{}
});
//挂着播放器组件

var lrcText={"songStatus":0,"lyricVersion":3,"lyric":"[00:01.39]编曲：许蔚天\n\n[00:25.42]I can hear\n[00:28.90]It’s falling down \n[00:35.45]You Hello\n[00:37.59]Come here \n[00:39.42]Will you\n\n[00:45.02]On my way to baby grandma\n[00:55.19]I read \n[00:57.84]I shrink\n[01:00.27]I read\n[01:09.56]\n[01:26.23]Smoke’ em if you got’ em darling \n[01:35.59]Coz it’s rare \n[01:39.05]Coz it heals\n[01:40.73]It heals\n\n[01:46.03]The world will fall\n[01:48.32]I’ll fall \n[01:50.80]The stars will fall\n[01:55.81]印象之花绽放\n[02:00.80]Blossom all around\n[02:10.87]\n[02:46.87]Let it come what may\n[02:48.86]Come but not from your past\n[02:56.83]Let it come what may\n[02:58.94]Come only as you are\n\n[03:07.29]I can hear\n[03:10.81]It’s falling down\n[03:17.16]I can see\n[03:20.57]It’s all around\n[03:23.56]印象之花绽放\n[03:27.38]I can hear\n[03:30.96]It’s falling down\n[03:32.80]印象之花绽放\n[03:37.61]I can see\n[03:40.82]It’s falling down\n[03:43.00]I can see\n[03:52.05]制作人：许蔚天\n\n[03:53.95]声音设计：于杨悠然\n[03:54.39]吉他：于杨悠然\n[03:54.86]钢琴：许蔚天\n[03:55.31]大提琴：宋昭\n[03:55.83]录音师：李卓@TC Faders\n[03:56.32]音频编辑：李宗远@TC Faders\n[03:56.80]录音棚：55 TEC Studio\n[03:57.35]混音师：李卓@TC Faders\n[03:57.85]母带制作：Chris Gehringer @Sterling Sound","code":200};
describe("player vue",()=>{

    it("the default data is right",()=>{
        expect(typeof player.data).toBe("function");
        let defaultData=player.data();
    });
    let playerVm=new Vue({...player,store}).$mount();
    const audioEle=playerVm.$el.querySelector("audio");
    audioEle.load();
    it("mounted the vue watch the song",()=>{
      expect(playerVm.song_index).toBe(1);
    });
    beforeEach(function() {
    jasmine.Ajax.install();
    });

    afterEach(function() {
    jasmine.Ajax.uninstall();
    });
    it('can play',(done)=>{
        audioEle.onloadedmetadata=function(){
            playerVm.setDefaultData();
            console.log(playerVm.audio.total_time);
            done();
        }
    });
    it("the song can play",()=>{
        "use strict";
        let loadEvent=new window.Event("loadedmetadata"),playEvent=new window.Event('play'),pauseEvent=new window.Event('pause'),endEvent=new window.Event('ended');
        audioEle.dispatchEvent(playEvent);
        playerVm._watcher.run();
       expect(playerVm.audio.isPlay).toBe(true);
        audioEle.dispatchEvent(pauseEvent);
        playerVm._watcher.run();
        expect(playerVm.audio.isPlay).toBe(false);
        audioEle.dispatchEvent(loadEvent);
        playerVm._watcher.run();
        expect(playerVm.audio.total_second).toBeGreaterThan(0);

    });
    it("if lrc can be read correct",()=>{
        jasmine.Ajax.stubRequest("/test/lrc").andReturn({
            status:200,
            readyState:4,
            responseText:lrcText
        });
        let endEvent=new window.Event('ended');
        audioEle.dispatchEvent(endEvent);
        playerVm._watcher.run();

        console.log(playerVm.audio.lrc.length);
        expect(playerVm.song_index).toBe(0);
    });
    it("control the lrc in box",()=>{
        //设置当前显示的哪一句的歌词
        playerVm.audio.dom.currentTime=46;
        playerVm.controlLrc();
        expect(playerVm.audio.lrcIndex).toBe(6);
        expect(playerVm.audio.lrcTop).toBe(0);
        //设置多的个数
        playerVm.audio.dom.currentTime=56;
        playerVm.controlLrc();
        expect(playerVm.audio.lrcIndex).toBe(7);
        expect(playerVm.audio.lrcTop).toBe(35);
    });
    it("click playPause btn",()=>{

        let btn=playerVm.$el.querySelector(".play-btn").querySelectorAll("span")[1],clickEvent=new window.Event('click');
        btn.dispatchEvent(clickEvent);
        playerVm._watcher.run();
        expect(playerVm.audio.isPlay).toBe(true);
        btn.dispatchEvent(clickEvent);
        playerVm._watcher.run();
        expect(playerVm.audio.isPlay).toBe(false);
    });
    it("show lrc box",()=>{
        "use strict";
        playerVm.showLrc();
        expect(playerVm.audio.show_lrc).toBe(true);
    });
    it("click volume progress",()=>{
        "use strict";
        let preRatio=playerVm.audio.drag_top;

        let volumeDom=playerVm.$el.querySelector(".progress-main");
        var event = document.createEvent('HTMLEvents');
        // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
        event.initEvent("click", true, true);
        /*属性，随便自己定义*/
        event.offsetY = 30;
        volumeDom.dispatchEvent(event);
        playerVm._watcher.run();
        expect(playerVm.audio.drag_top).not.toBe(preRatio);
        event.offsetY=10;
        let domTwo=playerVm.$el.querySelector(".progress-selected");
        domTwo.dispatchEvent(event);
        expect(playerVm.audio.drag_top).toBeGreaterThanOrEqual(40);
    });
    it("drag volume dom change volume",()=>{
        //拖动音量控制块来改变声音
        let doc=playerVm.$el,dragEle=doc.querySelector(".progress-drag");
        let downEvent=document.createEvent('HTMLEvents');
        downEvent.initEvent("mousedown",true,true);
        downEvent.clientY=200;
     //   downEvent.offsetTop=10;
        dragEle.dispatchEvent(downEvent);


      //  downEvent.clientY=520;
        //模拟鼠标拖动
        let yArr=[210,220,230];
        yArr.forEach(function(value){
            let moveEvent=document.createEvent('MouseEvents');
            moveEvent.initMouseEvent("mousemove",true,true,document.defaultView,0,0,0,100,value,false,false,false,false,0,document);
            document.dispatchEvent(moveEvent);
            expect(playerVm.audio.drag_top).toBe(value-200);
        });

        let upEvent=document.createEvent('MouseEvents');
        upEvent.initMouseEvent('mouseup',true,true);
        document.dispatchEvent(upEvent);

    });
    it("new drag volume progress",()=>{
        // 第二次触发时drag已经拖到了离顶部30个像素的位置
        let doc=playerVm.$el,dragEle=doc.querySelector(".progress-drag");
        let downEvent=document.createEvent('HTMLEvents');
        downEvent.initEvent("mousedown",true,true);
        downEvent.clientY=300;
        //   downEvent.offsetTop=10;
        dragEle.dispatchEvent(downEvent);


        //  downEvent.clientY=520;
        //模拟鼠标拖动

            let moveEvent=document.createEvent('MouseEvents');
            moveEvent.initMouseEvent("mousemove",true,true,document.defaultView,0,0,0,100,500,false,false,false,false,0,document);
            document.dispatchEvent(moveEvent);



        let upEvent=document.createEvent('MouseEvents');
        upEvent.initMouseEvent('mouseup',true,true);
        document.dispatchEvent(upEvent);
        expect(playerVm.audio.drag_top).toBe(120);
    });
    it("seek the audio",()=>{
        "use strict";
        let dom=playerVm.$el.querySelector(".progress-control");
        let clickEvent=document.createEvent('HTMLEvents');
        clickEvent.initEvent("click",true,true);
        clickEvent.offsetX=60;
        dom.dispatchEvent(clickEvent);
        expect(playerVm.audio.current_width).toBe(60);

    });
});
