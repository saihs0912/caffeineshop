import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import Loading from 'vue-loading-overlay'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'vue-loading-overlay/dist/css/index.css'
import 'bootstrap'
import '../src/assets/css/set.css'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.component('LoadingModal', Loading)
app.mount('#app')
