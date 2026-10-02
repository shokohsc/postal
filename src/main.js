import "@fortawesome/fontawesome-free/css/all.css"
import { Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/svg-fontawesome-v6'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import 'quasar/src/css/index.sass'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router.js'

const pinia = createPinia()
const app = createApp(App)
pinia.use(() => ({ router: router }))
pinia.use(piniaPluginPersistedstate)

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  iconSet: quasarIconSet,
  /*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
})
app.use(router)
app.use(pinia)
app.mount('#app')
