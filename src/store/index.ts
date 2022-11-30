import { createStore } from 'vuex';

export default createStore({
  state: {
    // 放置变量
    menuList: [] as any[], // 菜单栏
    userInfo: {}, // 用户信息
    isCollapse: true,
    filterObj: {},
    tagsView: [],
  },
  mutations: {
    // 获取set方法
    // 菜单栏的数据
    setMenuList: (state) => {
      state.menuList = [
        {
          id: 89,
          isCatalog: '',
          orderby: 1,
          serverName: '首页', //名称
          serverType: 0, //类型
          serverUrl: '/admin/resource', // 路径
          status: 1,
          isDefault: true, // 是否展示默认
        },
        {
          id: 90,
          isCatalog: '',
          orderby: 1,
          serverName: '权限管理',
          serverType: 0,
          serverUrl: '/admin/authority',
          status: 1,
        },
      ];
      console.log('🟧', state.menuList);
    },
    // 用户信息
    setUserInfo: (state, val) => {
      state.userInfo = val;
    },

    // 用户信息
    setIsCollapse: (state) => {
      state.isCollapse = !state.isCollapse;
    },

    // 添加页面过滤条件
    setFilter: (state: any, { name, data }: any) => {
      if (data) {
        state.filterObj[name] = data;
      } else {
        state.filterObj[name] = {
          limit: 10,
          pageNum: 1,
          searchMap: {},
        };
      }
    },
    // 修改某页面过滤条件
    setFilterAttr: (state: any, { name, attr, val }: any) => {
      if (val !== null && typeof val === 'object') {
        // searchMap
        for (let key in val) {
          if (val[key] != '') {
            state.filterObj[name].searchMap[key] = val[key];
          } else {
            delete state.filterObj[name].searchMap[key];
          }
        }
      } else {
        // 其他
        if (val) {
          state.filterObj[name][attr] = val;
        } else {
          delete state.filterObj[name][attr];
        }
      }
    },
    // 删除某页面过滤条件
    delFilter: (state: any, name: string) => {
      if (name) {
        delete state.filterObj[name];
      } else {
        state.filterObj = {};
      }
    },
  },
  getters: {
    getFilterObj: (state: any) => (routeName: string) => {
      if (!state.filterObj[routeName]) {
        state.filterObj[routeName] = {
          limit: 10,
          pageNum: 1,
          searchMap: {},
        };
      }
      return state.filterObj[routeName];
    },
    // 获取每个页面的按钮
    getBtnList: (state: any) => (routePath: string) => {
      // return getServiceBtn(routePath);
    },
    // 获取当前用户信息
    getUserInfo: (state: any) => () => {
      state.userInfo = {};
      // selectCurrentUser().then((res: any) => {
      //   //保存方法
      //   state.userInfo = res;
      // });
    },
  },
  actions: {},
  modules: {},
});
