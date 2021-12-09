import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {
        path: "",
        component: () => import(/* webpackChunkName: "home" */ "./views/home/Index.vue"), 
        children: [
        
        ]
    }
]
const router = new VueRouter({
    linkActiveClass: "active",
    routes
});

export default router;