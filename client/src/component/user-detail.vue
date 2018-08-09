<template>
    <div class="user-detail-box">
        <p>姓名:{{user_detail.user_name}}</p>

        <p>描述:{{user_detail.user_detail}}</p>
        <div>
            <span>同步使用commit改变的值:{{ming2}}</span>
            <input type="button" value="点击改变" @click="change_normal()"/>
        </div>
        <div>
            <span>异步使用dispatch改变的值:{{ming1}}</span>
            <input type="button" value="点击改变" @click="change_ajax()"/>
        </div>
        <div>
            <span>读取模块A的数据:{{getDataA}}</span>
            <input type="button" value="点击改变" @click="change_a()"/>
        </div>
        <form>
            <label>
                姓名：<input type="text" name="1" v-model="formData.name" value=""/>
            </label>
            <div>
                <span>性别：</span>
                <label><input type="radio" v-model="formData.sex" value="woman"/>女</label>
                <label><input type="radio" v-model="formData.sex" value="man"/>男</label>
            </div>
            <div>
                <span>爱好：</span>
                <label><input type="checkbox" v-model="formData.interest" value="sing"/>唱歌</label>
                <label><input type="checkbox" v-model="formData.interest" value="dance"/>跳舞</label>
            </div>
            <a href="javascript:void(0)" @click="getFormData">提交</a>
        </form>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex'
    export default {
        data: function () {
            return {
                user_data: {},
                normal_data:"",
                ajax_data:"",
                formData:{
                    "name":"",
                    "sex":"",
                    "interest":[]
                }
            }
        },
        created: function () {
            let $id = parseInt(this.$route.params.user_id);

            this.getUserDetail({"id":$id});
        },
        computed:{
          //  ...mapGetters(["getData1","getData2","getDataA"])这种方式可以同事挂载多个，以对象的方式只能一次一个
             ...mapGetters(["getDataA"]),
            ...mapGetters({"ming1":"getData1"}),
            ...mapGetters({"ming2":"getData2"}),
             ...mapGetters(["user_detail"])
    },
        methods:{
            getFormData:function(){
                console.log(this.formData);
            },
            ...mapActions(
                    {
                        change_normal:"getNormal"
                    }
            ),
            ...mapActions(

                    {
                        change_ajax:"getAjax"
                    }
            ),
            ...mapActions(
                    {
                        change_a:"changeDataA"
                    }
            ),
                    ...mapActions(["getUserDetail"])
        }
    }
</script>
<style>
    .user-detail-box {
        padding: 30px;;
        margin-top: 30px;
        background: #a3be8c;
        box-shadow: 0px 0px 5px red;
    }
</style>
