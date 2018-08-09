<template>
    <div class="audio-box">
        <div class="lyric-box" v-bind:style="{'height': audio.show_lrc? '550px':'0px'}">
            <div class="main-lyric clear-fix">
                <div style="padding-top: 80px">
                    <img v-bind:src="play_song.img_src" width="280" height="280"/>
                </div>
                <div class="lyric">
                    <div style="background: #000011; padding-bottom: 10px; padding-top: 20px;position: relative;z-index: 10">
                    <h1>{{play_song.song_name}}</h1>
                    <div style="color: #efdbdb">
                        歌手:{{play_song.song_name}}
                        专辑:经典咏流传
                    </div>
                    </div>
                    <div class="lrc-box" v-bind:style="{'margin-top': '-'+audio.lrcTop + 'px'}">
                        <p v-for="(item,index) in audio.lrc" v-bind:style="{ color:index==audio.lrcIndex?'red':'' }">
                            {{item.lrc}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="play-control clear-fix" v-bind:class="[audio.show_lrc?'bottom-style':'']">
            <div class="play-btn" style="width: 200px">
                <span class="iconfont icon-shangyishou" v-on:click="playPre"></span>
                <span class="iconfont"  v-bind:class="[  audio.isPlay? 'icon-pause':'icon-play']" v-on:click="playPauseAudio"></span>
                <span class="iconfont icon-xiayishou" v-on:click="playNext"></span>
            </div>
            <div class="com-flex">
                <img v-bind:src="play_song.img_src" width="70" height="70" v-on:click="showLrc">
                <div class="play-box">
                    <audio v-bind:src="play_song.song_link" ref="audio" autoplay></audio>
                    <span class="fl-right" style="color: grey; font-size: 12px">{{audio.current_time}}/{{audio.total_time}}</span>
                    <p>{{play_song.song_name}} -{{play_song.singer}}</p>
                    <div class="progress-control" v-on:click="seekAudio()">
                        <div class="progress-now" v-bind:style="{ width:audio.current_width + 'px'}"></div>
                    </div>
                </div>
                <div class="volume-box">
                    <span class="iconfont" v-on:click="showVolControl"  v-bind:class="[audio.volume==0 ? 'icon-guanbiyinliang':'icon-yinliang']" style="line-height: 70px"></span>
                    <div class="control-volume" v-show="audio.show_control_vol">
                        <div class="main-volume">
                            <section class="volume-progress">
                                <div class="progress-main" v-on:click="setVolume">
                                    <div class="progress-selected" v-bind:style="{height: audio.volume+'%'}"></div>
                                    <div class="progress-drag" ref="drag_volume"  v-bind:style="{top:audio.drag_top + 'px'}"></div>
                                </div>
                                <div>{{audio.volume}}%</div>
                            </section>
                            <section style="border-top: 1px solid #efefef; padding: 5px; margin-top: 10px; padding-top: 10px;">
                                <span class="iconfont" v-bind:class="[audio.volume==0 ? 'icon-guanbiyinliang':'icon-yinliang']"></span>
                            </section>
                        </div>
                        <div class="sanjiao"></div>
                    </div>
                    <span class="iconfont icon-icon"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import { mapActions } from "vuex";

    export default {
        data: function () {
            return {
                "audio":{
                    "total_time":"00:00",
                    "current_time":"00:00",
                    "dom":null,
                    "current_width":0,
                    "total_second":0,
                    "isPlay":false,
                    "volume":100,
                    "drag_top":0,
                    "show_control_vol":false,
                    "lrc":[],
                    "lrcIndex":-1,
                    "lrcTop":0,
                    "show_lrc":false
                },
                "player_index":0,

                "song_list":[],
                "song_index":0,
                "play_song":{}
            }
        },
        computed:{
                ...mapGetters({
                    song:"player_list"
                })
        },
        created:function(){

        },
        mounted:function(){
            this.addEventListeners();
             this.song_list=this.song.song_list;
             this.song_index=this.song.song_index;
             this.play_song=this.song_list[this.song_index];
             this.readLrc();
        },
        methods:{
            setDefaultData:function(){
                let  dur=this.audio.dom.duration;
                this.audio.total_second=dur;
                this.audio.total_time=this.exchangeTime(dur);
            },
            addEventListeners:function(){
                let audio=this.$refs.audio;
                this.audio.dom=audio;
                audio.onloadedmetadata=function(){
                   this.setDefaultData();
                }.bind(this);
                audio.addEventListener("timeupdate",function(){
                    let current=audio.currentTime;
                   // console.log(current);
                    this.playingChange(current);
                    //播放中控制歌词高亮显示
                    this.controlLrc();
                }.bind(this));
                //播放器播放暂停停止状态
                audio.addEventListener("play",function(){
                    //监听播放
                    this.audio.isPlay=true;
                }.bind(this));
                audio.addEventListener("pause",function(){
                    //监听播放
                    this.audio.isPlay=false;
                }.bind(this));
                audio.addEventListener("ended",function(){
                    //监听播放结束
                    this.playNext();
                }.bind(this));
                //拖动声音的进度条
                let dragEle=this.$refs.drag_volume, y,canDrag=false;
                dragEle.addEventListener("mousedown",function(){
                    y=event.clientY-this.offsetTop;
                    canDrag=true;
                });
                document.addEventListener("mousemove",function(){
                    if(canDrag){
                        let dragY=event.clientY-y;
                        if(dragY<0){
                            this.audio.drag_top=0;
                            this.audio.volume=100;
                            this.lastVolume();
                            return;
                        }
                        if(0<=dragY<=120){
                            this.audio.drag_top=dragY;
                            this.audio.volume=parseInt(((126-dragY)/126)*100);
                        }
                        if(dragY>120){
                            this.audio.drag_top=120;
                            this.audio.volume=0;
                            this.lastVolume();
                            return;
                        }
                        this.lastVolume();
                    }

                }.bind(this));
                document.addEventListener("mouseup",function(){
                    canDrag=false;
                });
            },
            exchangeTime:function(time){
                //计算时间格式
                let m,s;
                if(time<60){
                    m=0;
                    s=parseInt(time);
                }
                else{
                    m=parseInt(time/60);
                    s=parseInt(time%60);
                }
                m = m<=9 ? ("0"+m) : m;
                s = s<=9 ? ("0" + s) : s;
                return m + ":" + s;
            },
            seekAudio:function(){
                let clickLeft=event.offsetX,timeRatio=clickLeft/390,timeTotal =this.audio.total_second,clickTime= timeRatio*timeTotal;
                this.audio.current_time=this.exchangeTime(clickTime);
                this.audio.current_width=clickLeft;
               // console.log(this.audio.dom);
                this.audio.dom.currentTime=clickTime;
                this.audio.dom.play();
                this.audio.isPlay=true;
            },
            playingChange:function(timeSecond){
                //播放途中改变进度条和时间
                this.audio.current_time=this.exchangeTime(timeSecond);
                let newW=390*(timeSecond/this.audio.total_second);
                this.audio.current_width=newW;
            },
            playPauseAudio:function(){
                //暂停播放音频
                if(this.audio.isPlay){
                    this.audio.dom.pause();
                    this.audio.isPlay=false;
                }
                else{
                    this.audio.dom.play();
                    this.audio.isPlay=true;
                }

            },
            setVolume:function(){
                let ele=event.target,yTop,yRatio;
              //  console.log(ele);
                if(ele.className=="progress-drag"){
                   return;
                }
                if(ele.className=="progress-main"){
                    yTop=event.offsetY;
                }
                if(ele.className=="progress-selected"){
                    let preRatio=this.audio.volume;
                    yTop=126*((100-preRatio)/100) + event.offsetY;
                }
                yRatio=parseInt(((126-yTop)/126)*100);
                if(yTop>120){
                    yRatio=0;
                    yTop=120;
                }
                this.audio.volume=yRatio;
                this.audio.drag_top=yTop;
                this.lastVolume()
            },
            lastVolume:function(){
                if(this.audio.volume==0){
                    this.audio.dom.volume=0.0;
                }
                else{
                    let volumeRatio=this.audio.volume/100;
                    this.audio.dom.volume=volumeRatio;
                }
            },
            showVolControl:function(){
                this.audio.show_control_vol=!this.audio.show_control_vol;
            },
            readLrc:function(){
                let lrcUrl=this.play_song.lrc_url;
                let xmlHttp=new XMLHttpRequest();
                xmlHttp.onreadystatechange=function(){
                    if(xmlHttp.readyState==4 && xmlHttp.status==200){
                        let lrc=JSON.parse(xmlHttp.responseText);
                        this.lrcToArray(lrc.lyric);

                    }
                }.bind(this);
             //   xmlHttp.open("GET",'/api/lrc'+newLrc,true);
                xmlHttp.open("POST",config.webPath+"/lrc",true);

                xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xmlHttp.send("lrcUrl="+encodeURI(lrcUrl));
            },
            lrcToArray:function(lrc){
                //解析lrc
                let lrcArray=lrc.split('\n'),needSort=false;
                let _timeReg=/\[\d*:\d*((\.|\:)\d*)*\]/g;
                let newLrcArray=[];
                for(var i=0;i<lrcArray.length;i++){
                    var item=decodeURIComponent(lrcArray[i]);
                    var times=item.match(_timeReg),getLrc=item.replace(_timeReg,"");
                    //times是一个数组
                    if(times){
                        if(times.length>1){
                            needSort=true;
                        }
                        times.forEach(function(value){
                            var time=value.match(/\d*:\d*/)[0].split(":");
                            var timeSecond=parseInt(time[0])*60 + parseInt(time[1]);
                            //将时间转换成秒
                            if(getLrc){
                                newLrcArray.push({
                                    "time":timeSecond,
                                    "lrc":getLrc
                                });
                            }

                        })
                    }
                }
                if(needSort){
                    //如果有多个时间排成一排的要排序
                    var compare=function(prop){
                        return function(obj1,obj2){
                            return obj1[prop] - obj2[prop];
                        };

                    };
                    newLrcArray.sort(compare("time"));
                }
                this.audio.lrc=newLrcArray;
            },
            controlLrc:function(){
                //将歌词渲染在页面上
                let currentTime=this.audio.dom.currentTime,lrcs=this.audio.lrc;
                for(var i=0 ;i<lrcs.length;i++){
                    if(currentTime>=lrcs[i].time){
                        this.audio.lrcIndex=i;
                    }
                }
                let lrcCol=this.audio.lrcIndex;
                if((lrcCol-6)<=1){
                    this.audio.lrcTop=0;
                }
                if((lrcCol-6)>=1 && lrcs.length-lrcCol>7){
                    this.audio.lrcTop=(lrcCol-6)*35;
                }
            },
            showLrc:function(){
                this.audio.show_lrc=!this.audio.show_lrc;
            },
            playNext:function(){
                let nowIndex=this.song_index,len=this.song_list.length;
                if(nowIndex==len-1){
                    this.song_index=0;
                }
                else{
                    this.song_index++;

                }
                this.resetPlayer();
            },
            playPre:function(){
                let nowIndex=this.song_index,len=this.song_list.length;
                if(nowIndex==0){
                    this.song_index=len-1;
                }
                else{
                    this.song_index--;

                }
                this.resetPlayer();
            },
            resetPlayer:function(){

                this.play_song=this.song_list[this.song_index];
                this.audio.lrcTop=0;
                this.audio.lrcIndex=-1;
                this.readLrc();
            }
        },
        watch:{
            song:function(data){
                this.song_list=this.song.song_list;
                this.song_index=this.song.song_index;
                this.resetPlayer();

            }
        }

    }
</script>

<style>
    .play-btn{
        width: 200px;
        text-align: center;
        line-height: 70px;
        font-size:35px;
        color: green;
    }
    .audio-box{
        position: absolute;
        left: 0px;
        bottom: 0px;
        background: #ffffff;
        z-index: 10;
        width: 100%;
    }
    .lyric-box{
        background: #000011;
        transition: height 0.5s;
        transform-origin: center bottom;
        overflow: hidden;

    }
    .main-lyric{
        padding: 0px 120px;
        opacity: 0.5;
        color: #ffffff;
    }
    .lyric{
        margin-left: 70px;
        color: #ffffff;
        text-align: center;
        height: 500px;
        overflow: hidden;
        width: 400px;
    }
    .bottom-style{
        background: #000011;
        color: #ffffff;
        transition: 0.5s;
    }
    .play-control{
        height: 70px;
    }
    .lrc-box{
        line-height: 35px;
        text-align: center;
    }
    .com-flex{
        display: flex;
    }
    .play-box{
        width: 390px;
        height:60px;
        position: relative;
        margin-left: 15px;
        padding-top:10px;
    }
    .progress-control{
        width: 100%;
        position: absolute;
        bottom: 15px;
        background: #efefef;
        border-radius: 5px;
        height: 5px;
        overflow:hidden;
    }
    .progress-now{
        width: 10px;
        background: green;
        height: 100%;
    }
    .volume-box{
        position: relative;
        font-size: 16px;
        margin-left: 20px;
    }
    .volume-box .iconfont{
        font-size: 24px;

    }
    .control-volume{
        position: absolute;
        width: 76px;
        height: 250px;
        bottom: 55px;
        z-index: 10;
        left:50%;
        transform:translateX(-50%);
    }
    .main-volume{
        height: 240px;
        text-align: center;
        background: #ffffff;
        box-shadow: 1px 1px 5px #efefef;
        border: 1px solid #b7aaaa ;
        color: #333;
    }
    .sanjiao{
        border-width: 10px;
        border-style: solid;
        width: 0px;
        border-color: #b7aaaa  transparent transparent transparent;
        margin:0px auto
    }
    .volume-progress{
        margin:0 auto;
        overflow: hidden;
    }
    .progress-main{
        height: 126px;
        position: relative;
        width: 5px;
        background: #efefef;
        margin: 20px auto;
    }
    .progress-selected{
        width: 100%;
        position: absolute;
        bottom: 0px;
        background: green;
        height: 10px;
        z-index: 10;
    }
    .progress-drag{
        width: 10px;
        height:10px;
        background: green;
        border-radius: 50%;
        cursor: pointer;
        bottom: 15px;
        position: absolute;
        z-index: 20;
        left: 50%;
        transform: translateX(-50%);
    }
</style>