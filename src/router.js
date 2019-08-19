import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ './pages/login.vue')
        },
        {
            path: '/',
            name: 'index',
            component: () => import(/* webpackChunkName: "about" */ './pages/index.vue'),
            redirect: '/projectManagement',
            children: [
                {
                    path: '/projectManagement',
                    name: `projectManagement`,
                    component: () => import(/* webpackChunkName: "about" */ './pages/gjb/projectManagement.vue')
                },
                {
                    path: '/codingManagement',
                    name: `codingManagement`,
                    component: () => import(/* webpackChunkName: "about" */ './pages/gjb/codingManagement.vue')
                },
                {
                    path: '/orderManagement',
                    name: `orderManagement`,
                    component: () => import(/* webpackChunkName: "about" */ './pages/gjb/orderManagement.vue')
                },
                {
                    path: '/addOrder',
                    name: `addOrder`,
                    component: () => import(/* webpackChunkName: "about" */ './pages/gjb/addOrder.vue')
                },
                {
                    path: '/taskManagement',
                    name: `taskManagement`,
                    component: () => import(/* webpackChunkName: "about" */ './pages/gjb/taskManagement.vue')
                },
                {
                    path: '/addTask',
                    name: `addTask`,
                    component: () => import(/* webpackChunkName: "about" */ './pages/gjb/addTask.vue')
                },
                {
                    path: '/Lms',
                    name: `Lms`,
                    component: () => import(/* webpackChunkName: "about" */ './pages/gjb/Lms.vue')
                },
                {
                    path: '/gjbImg/:tableID',
                    name: `gjbImg`,
                    component: () => import(/* webpackChunkName: "about" */ './pages/gjb/gjbImg.vue')
                },
                {
                    path: '/gjbEstablish/:tableID',
                    name: 'gjbEstablish',
                    component: () => import(/* webpackChunkName: "about" */ './pages/gjb/gjbEstablish.vue')
                },
                {
                    path: '/gjbDetail/:tableID/:formID',
                    name: 'gjbDetail',
                    component: () => import(/* webpackChunkName: "about" */ './pages/gjb/gjbDetail.vue')
                },
                {
                    path: '/gjbList/:tableID',
                    name: 'gjbList',
                    component: () => import(/* webpackChunkName: "about" */ './pages/gjb/gjbList.vue')
                }
            ]
        }
    ]
})
