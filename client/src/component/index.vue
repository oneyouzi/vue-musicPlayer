<template>
    <div>
        <ul class="index-list clear-fix">
            <li v-for="item in list">
                <img :src="item.imgUrl">

                <p>{{item.title}}</p>
            </li>
        </ul>
        <pagination :cur="pagination_data.cur" :all="pagination_data.all" v-on:call="page_callback"></pagination>
        <section>这是内容</section>
    </div>
</template>

<script>
    import list from '../json/index.js';
    import pagination from "./page.vue";
    export default {
        data: function () {
            return {
                "list": [],
                "pagination_data": {
                    cur: 1,
                    all: 20
                }
            }
        },
        components: {pagination:pagination},
        created: function () {
            this.list = list;
        },
        methods: {
            page_callback: function (page) {
                alert("选中了" + page);
            }
        }
    }
</script>
<style>
    .index-list li {
        width: calc((100% - 30px) / 4);
        text-align: center;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .index-list li:nth-child(4n) {
        margin-right: 0px;
    }
    .index-list img {
        width: 250px;
        height: 300px;
        margin-bottom: 10px;
    }
</style>
