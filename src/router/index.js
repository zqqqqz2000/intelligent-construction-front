import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'
import DashBoard from "@/views/IndexSub/DashBoard";
import ProjectManage from "@/views/IndexSub/ProjectManage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: 'dash-board',
        name: 'DashBoard',
        component: DashBoard,
      },
      {
        path: 'project-manage',
        name: 'ProjectManage',
        component: ProjectManage,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
