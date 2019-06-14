import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/base.less'
import { Tab, Tabs, Field, Button, List, TreeSelect, DropdownMenu, DropdownItem, Toast, Dialog } from 'vant'

Vue.config.productionTip = false

Vue.use(Tab)
  .use(Tabs)
  .use(Field)
  .use(Button)
  .use(List)
  .use(TreeSelect)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Toast)
  .use(Dialog)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
