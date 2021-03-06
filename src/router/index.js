import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/login_log',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Login_log.vue'),
                    meta: { title: '登录日志' }
                },
                {
                    path: '/sys_log',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Sys_log.vue'),
                    meta: { title: '系统日志' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/ourselves',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Ourselves.vue'),
                    meta: { title: '关于我们' }
                },
                {
                    path: '/stock',
                    component: () => import(/* webpackChunkName: "stock" */ '../components/page/Stock.vue'),
                    meta: { title: '库存表' }
                },
                {
                    path: '/supplier',
                    component: () => import(/* webpackChunkName: "supplier" */ '../components/page/Supplier.vue'),
                    meta: { title: '供应商表' }
                },
                {
                    path: '/user',
                    component: () => import(/* webpackChunkName: "user" */ '../components/page/User.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/roles',
                    component: () => import(/* webpackChunkName: "role" */ '../components/page/Roles.vue'),
                    meta: { title: '角色列表' }
                },
                {
                    path: '/rights',
                    component: () => import(/* webpackChunkName: "right" */ '../components/page/Rights.vue'),
                    meta: { title: '权限列表' }
                },
                {
                    path: '/worktime',
                    component: () => import(/* webpackChunkName: "worktime" */ '../components/page/Worktime.vue'),
                    meta: { title: '工作时间表' }
                },
                {
                    path: '/good',
                    component: () => import(/*webpackChunkName: "good" */ '../components/page/Good.vue'),
                    meta: { title: '商品表单'}
                },
                {
                    path: '/goodin',
                    component: () => import(/*webpackChunkName: "goodin" */ '../components/page/Goodin.vue'),
                    meta: { title: '商品入库记录单'}
                },
                {
                    path: '/goodout',
                    component: () => import(/*webpackChunkName: "goodout" */ '../components/page/Goodout.vue'),
                    meta: { title: '商品出库记录单'}
                },
                {
                    path: '/inventory',
                    component: () => import(/*webpackChunkName: "inventory" */ '../components/page/Inventory.vue'),
                    meta: { title: '盘存表单'}
                },
                {
                    path: '/information',
                    component: () => import(/* webpackChunkName: "information" */ '../components/page/Information.vue'),
                    meta: { title: '个人信息' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
//挂载路由导航守卫
router.beforeEach((to,from,next) => {
    if(to.path=='/login') return next();
    const take = window.sessionStorage.getItem('token');
    if(!take) return next('login');
    next();
})

export default router

