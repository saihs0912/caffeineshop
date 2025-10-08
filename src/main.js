import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import Loading from 'vue-loading-overlay'
import { date, currency } from './methods/filters'
import $InformMessage from './methods/PushMessageState'
import '../src/assets/css/set.css'
import 'vue-loading-overlay/dist/css/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import * as AllRules from '@vee-validate/rules'

Object.keys(AllRules).forEach((rule) => {
  if (rule === 'all' || rule === 'toTypedSchema') return
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})

setLocale('zh_TW')

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.config.globalProperties.$InformMessage = $InformMessage
app.config.globalProperties.$num = { date, currency }
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('LoadingModal', Loading)
app.mount('#app')
