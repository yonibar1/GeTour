import './styles/styles.scss'
import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';


// MAP SHIT

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA2qHxHwbvK29L2wBnhw0TVRF4afPuJLGs',
    libraries: 'places',
  },
})

// END OF MAP SHIT


Vue.config.productionTip = false
Vue.use(ElementUI, { locale });
new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
