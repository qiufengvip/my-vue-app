// 封装后台接口方法
import http from '../http';

///////客户端
export const getIndexInfo: any = (params: any) => http.post('/blog/index/getIndexInfo', params); //首页信息

///////管理端

/**
 * 首页
 */
export const queryRuleResource: any = (params: any) => http.post('/sysadmin/base/Resource/getMenuData', params); //查询用户的菜单
/**
 * 查询常量值
 */
export const selectConstantData: any = (params: any) => http.post('/sysadmin/base/constant/selectConstantData', params); //查询常量值

/**
 * 资源管理
 */
//资源列表
export const requestResourceGetResourceList: any = (params: any) => http.post('/sysadmin/base/Resource/getResourceList', params);
//添加资源
export const requestResourceSaveOrUpdate: any = (params: any) => http.post('/sysadmin/base/Resource/saveOrUpdate', params);
//删除资源
export const requestResourceDeletedById: any = (parent: any) => http.post('/sysadmin/base/Resource/deletedById', parent);
//移动资源顺序
export const requestResourceMobileData: any = (parent: any) => http.post('/sysadmin/base/Resource/mobileData', parent);
//查询某个资源下的所有资源
export const requestResourceGetSubset: any = (parent: any) => http.post('/sysadmin/base/Resource/getSubset', parent);

const API = {
  login: '/sysadmin/base/user/signIn', //登录
  signUp: '/sysadmin/base/user/signUp', //注册

  //首页
  queryRuleResource: '/sysadmin/base/Resource/getMenuData', //查询用户的菜单

  /**
   * 常量库管理
   */
  addConstant: '/sysadmin/base/constant/addConstant', // 添加常量
  deleteConstant: '/sysadmin/base/constant/deleteConstant', // 删除变量
  selectConstantList: '/sysadmin/base/constant/selectList', // 查询变量列表
  selectConstantData: '/sysadmin/base/constant/selectConstantData', //查询常量值
  addConstantData: '/sysadmin/base/constant/data/addConstantData', // 添加常量值
  deleteConstantData: '/sysadmin/base/constant/data/deleteConstantData', // 删除变量值

  /**
   * 站点配置管理
   */
  getConfigList: '/sysadmin/blog/blogConfig/getConfigList', // 配置项列表
  updateBlogConfig: '/sysadmin/blog/blogConfig/update', // 添加或更新
  deletedBlogConfig: '/sysadmin/blog/blogConfig/deleted', // 删除配置项
  getConfigData: '/sysadmin/blog/blogConfig/getConfigData', // 获取配置项信息

  /**
   * 帖子相关
   */
  postAdd: '/sysadmin/blog/BlogPosts/addPost', //添加帖子
  postSetCache: '/sysadmin/blog/BlogPosts/setPost', //缓存帖子
  postGetCache: '/sysadmin/blog/BlogPosts/getPostCache', //获取帖子缓存数据
  getPostList: '/sysadmin/blog/BlogPosts/getPostList', //获取帖子列表

  /**
   * 标签管理
   */
  getLabelList: '/sysadmin/blog/BlogPostsLabel/getLabelList', //获取标签列表
  deletedLabel: '/sysadmin/blog/BlogPostsLabel/deletedLabel', //删除标签

  /**
   * 客户端页
   */
  getIndexInfo: '/blog/index/getIndexInfo', //首页信息
};

export { API };

/**
 * 登录注册
 */
//登录
export const requestLogin: any = (params: any) => http.post('/sysadmin/base/user/signIn', params);
//注册
export const requestSignUp = (params: any) => http.post('/sysadmin/base/user/signUp', params);
//注册
export const requestSe = (params: any) => http.post('/sysadmin/base/user/sign', params);

/**
 * 角色管理
 */
//添加角色
export const requestRuleAddRole = (params: any) => http.post('/sysadmin/base/role/addRole', params);
//查询角色
export const requestRuleGetRoleList = (params: any) => http.post('/sysadmin/base/role/getRoleList', params);
//给角色添加资源
export const requestResourceRoleAddResource = (parent: any) => http.post('/sysadmin/base/RoleResource/roleAddResource', parent);
//查询角色拥有的资源id
export const requestResourceQueryRuleResource = (parent: any) => http.post('/sysadmin/base/RoleResource/queryRuleResource', parent);
//删除角色
export const requestRuleDeleted = (parent: any) => http.post('/sysadmin/base/role/deleted', parent);

/**
 * 人员管理
 */
export const request_user_getUserList = (parent: any) => http.post('/sysadmin/base/user/getUserList', parent);

/**
 * 角色人员管理
 */
export const request_virtualUserRole_getUserRole = (parent: any) => http.post('/sysadmin/base/virtualUserRole/getUserRole', parent);
export const request_virtualUserRole_virtualUserRole = (parent: any) => http.post('/sysadmin/base/virtualUserRole/saveUserRole', parent);

// export const uploadFile = (parent: Blob) => uploader('/sysadmin/base/sysFile/upload', parent);
