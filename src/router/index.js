import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'
import DashBoard from "@/views/IndexSub/DashBoard";
import ProjectManage from "@/views/IndexSub/ProjectManage";
import Communicate from "@/views/IndexSub/Communicate";

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
      },
      {
        path: 'communicate',
        name: 'communicate',
        component: Communicate,
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
