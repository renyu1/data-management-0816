import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './utils/commonMethods'
import allDirective from "./utils/directive";
import './assets/common/common.less'
Vue.use(iView);
Vue.config.productionTip = false
Object.keys(allDirective).forEach(f => {
    Vue.directive(f, allDirective[f])
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
