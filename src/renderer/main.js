import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import materialIcons from 'material-design-icons/iconfont/material-icons.css'

import App from './App'
import router from './router'
import store from './store'
import backend from './backend'

Vue.use(backend)

Vue.use(Vuetify, {
  theme: {
    primary: '#2E7D32',
    secondary: '#66BB6A',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;


(function ignition(){
  if(backend.install.synced){
    new Vue({
      components: { App },
      router,
      store,
      template: '<App/>'
    }).$mount('#app')
  }
  else setTimeout(ignition, 5);
})();


/* eslint-disable no-new */
