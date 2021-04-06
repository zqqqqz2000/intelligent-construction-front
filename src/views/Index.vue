<template>
  <div>
    <side-bar :data="sideBarItems" first-active="面板首页">
      <template v-slot:header>
        <div class="header">
          投资方管理系统
        </div>
      </template>
    </side-bar>
    <main-header class="main-header"></main-header>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import IndexHeader from "@/components/IndexHeader";

export default {
  name: "Index",
  components: {
    'side-bar': SideBar,
    'main-header': IndexHeader,
  },
  data() {
    return {
      sideBarItems: [
        {
          name: '面板首页',
          icon: 'house-door',
          click: () => {
            this.$router.push('/index/dash-board')
          }
        },
        {
          name: '项目管理',
          icon: 'joystick',
          click: () => {
            this.$router.push('/index/project-manage')
          }
        },
        {
          name: '通信管理',
          icon: 'chat-dots',
          click: () => {
            this.$router.push('/login')
          }
        },
        {
          name: '账号管理',
          icon: 'people',
          click: () => {
            this.$router.push('/login')
          }
        },
        {
          name: '登出',
          icon: 'power',
          click: () => {
            this.$router.push('/login')
          }
        },
      ]
    }
  },
}
</script>

<style scoped>
.main-container {
  display: inline-block;
  top: 0;
  height: 100%;
}

.header {
  color: white;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 20px;
}
</style>