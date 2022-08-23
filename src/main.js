import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import BaiduMap from 'vue-baidu-map'
import BaiduMap from "vue-baidu-map";
//import { VueJsonp } from "vue-jsonp";
//Vue.use(VueJsonp);
Vue.use(BaiduMap, {
  ak: "WkQm52ps4kw23O9DuEI0PqRdhKOja8zM"
});
//Vue.use( BaiduMap, { ak : 'WkQm52ps4kw23O9DuEI0PqRdhKOja8zM' } )

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
