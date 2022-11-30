import { RouteRecordRaw } from 'vue-router';

//客户端
const clientRoutes = [
  {
    path: '/posts', // 文章
    name: 'posts',
    component: () => import('../views/client/post/index.vue'),
  },
  {
    path: '/catalog', //分类专栏
    name: 'catalog',
    component: () => import('../views/client/catalog/index.vue'),
  },
];

//服务端
const adminRoutes = [
  {
    path: '/admin/authority', //权限管理
    name: 'authority',
    component: () => import('../views/admin/base/authority/index.vue'),
  },
  {
    path: '/constant', //系统变量
    name: 'constant',
    component: () => import('../views/admin/base/constant/index.vue'),
  },
  {
    path: '/admin/home', //首页
    name: 'home',
    component: () => import('../views/admin/base/home/index.vue'),
  },
  {
    path: '/admin/label', //标签管理
    name: 'label',
    component: () => import('../views/admin/base/label/index.vue'),
  },
  {
    path: '/admin/resource', //资源管理
    name: 'resource',
    component: () => import('../views/admin/base/resource/index.vue'),
  },
  {
    path: '/admin/role', //角色管理
    name: 'role',
    component: () => import('../views/admin/base/role/index.vue'),
  },
  {
    path: '/admin/signup', //注册
    name: 'signup',
    component: () => import('../views/admin/base/signup/index.vue'),
  },
  {
    path: '/admin/site', //站点属性
    name: 'site',
    component: () => import('../views/admin/base/site/index.vue'),
  },
  {
    path: '/admin/user', //用户管理
    name: 'user',
    component: () => import('../views/admin/base/user/index.vue'),
  },
];

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)', // 404 页面
    name: '/404',
    component: () => import('../views/404.vue'),
  },
  {
    path: '/admin/login', //后端登录
    name: 'adminLogin',
    component: () => import('../views/admin/base/signup/index.vue'),
  },
  {
    path: '/', //客户端首页
    component: () => import('../views/client/main/index.vue'),
    children: clientRoutes,
  },
  {
    path: '/admin', // 后端首页
    component: () => import('../views/admin/main/index.vue'),
    children: adminRoutes,
  },
];
export { clientRoutes };
export { adminRoutes };
export default routes;
