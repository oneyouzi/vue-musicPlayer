/**
 * Created by host on 2017/4/24.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const  router=new VueRouter({
        linkActiveClass:"checked-link",
        linkExactActiveClass:"checked-link",
        routes:[
            {
                path:"/index/:id",
                component:require( '../component/my-music-list.vue')
            },
            {
                path:"/mylove",
                component:require( '../component/my-love.vue')
            },
            {
                path:"/",
                redirect:'/musichall'
            },
            {
                path:"/musichall",
                component:require('../component/music-hall.vue'),
                children:[
                    {
                        path:"choicemusic",
                        component:require('../component/choice-music.vue')
                    },
                    {
                        path:"",
                        redirect:'choicemusic'
                    },
                    {
                        path:"singer",
                        component:require('../component/singer.vue')
                    }

                ]
            },
            {
                path:"/mv",
                component:require('../component/mv.vue')
            }
        ]
    }
);
export  default  router;