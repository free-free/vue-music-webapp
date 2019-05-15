/*import Vue from 'vue'*/
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import gallery from 'img-vuer';
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
});
Vue.use(gallery, {
  swipeThreshold: 150
});

fastclick.attach(document.body)


router.beforeEach(function(to, from, next){
 
  //if (to.path == '/login') {
  //  sessionStorage.clear();
  //}

  var user = sessionStorage.getItem('id');
  if (!user && to.path != '/login') {
  	if (to.path != '/register'){
  		next({ path: '/login' })	
  	}else{
  		next()
  	}
  } else {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
