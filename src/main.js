import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import LightTimeline from 'vue-light-timeline'
import VueAxios from 'vue-axios'
import BaiduMap from 'vue-baidu-map'

Vue.use(VueAxios, axios)
Vue.use(LightTimeline)
Vue.use(BaiduMap, {
    ak: '9GCG0GcVmQgAB9toU8DCIx4DpVm5vPbE'
})
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
