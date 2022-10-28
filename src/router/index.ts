import {createRouter,RouteRecordRaw,createWebHashHistory} from "vue-router"
const routes:Array<RouteRecordRaw>=[
  {
    path:'/',
    name:'home',
    component: () => import("../views/HelloWorld.vue"),
  },
];
const router = createRouter({
  history:createWebHashHistory(),
  routes
})
console.log(router);
export default router;
