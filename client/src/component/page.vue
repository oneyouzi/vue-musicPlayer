<template>
    <div class="page-bar">
        <ul>
            <li v-if="cur!=1"><a v-on:click="pre_page">上一页</a></li>
            <li v-for="index in indexs"  v-bind:class="{ active: cur == index}">
                <a @click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="cur!=all"><a v-on:click="next_page">下一页</a></li>
            <li><a>共<i>{{all}}</i>页</a></li>
        </ul>
    </div>
</template>

<script>
    import list from '../json/index.js';
    export default {
        props: {
            cur: {
                type: [String, Number],
                required: true
            },
            all: {
                type: [String, Number],
                required: true
            },
            call: {
                default:function () {

                }
            }
        },
        computed: {
            indexs: function () {
                var left = 1;
                var right = this.all;
                var ar = [];
                if (this.all >= 11) {
                    if (this.cur > 5 && this.cur < this.all - 4) {
                        left = this.cur - 5;
                        right = this.cur + 4;
                    } else {
                        if (this.cur <= 5) {
                            left = 1;
                            right = 10;
                        } else {
                            right = this.all;
                            left = this.all - 9;
                        }
                    }
                }
                while (left <= right) {
                    ar.push(left);
                    left++;
                }
                return ar;
            }
        },
        methods: {
            btnClick: function (page) {
                if (page != this.cur) {
                    this.cur=page;
                   // this.callback(page)
                    this.$emit("call",page);
                }
            },
            pre_page:function(){
                this.cur--;
                this.$emit("call",this.cur);
            },
            next_page:function(){
                this.cur++;
                this.$emit("call",this.cur);
            }
        }
    }
</script>
<style>

    .page-bar li:first-child > a {
        margin-left: 0px
    }

    .page-bar a {
        border: 1px solid #ddd;
        text-decoration: none;
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        cursor: pointer
    }

    .page-bar a:hover {
        background-color: #eee;
    }

    .page-bar .active a {
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7;
    }

    .page-bar i {
        font-style: normal;
        color: #d44950;
        margin: 0px 4px;
        font-size: 12px;
    }
</style>
