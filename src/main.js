import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import http from "./http"
import './Mock/mock'
import VCharts from 'v-charts'
import moment from 'dayjs'
import clipboard from 'clipboard'
import LunarFullCalendar from 'vue-lunar-full-calendar'
Vue.use(LunarFullCalendar)
Vue.use(VCharts)

Vue.prototype.$axios = http;
Vue.prototype.$clipboard = clipboard;
Vue.prototype.$moment = moment
Vue.config.productionTip = false;
Vue.use(ElementUI)
import Print from './plugs/print'
Vue.use(Print)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
