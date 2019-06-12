import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/base.less'
import { Tab, Tabs , Field , Button , List} from 'vant';


import { DropdownMenu, DropdownItem } from 'vant'
Vue.use(DropdownMenu).use(DropdownItem)

Vue.config.productionTip = false

Vue.use(Tab)
    .use(Tabs)
    .use(Field)
    .use(Button)
    .use(List);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
