import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "balm-ui/dist/balm-ui.css"

const BalmUI = require("balm-ui");
const BalmUIPlus = require("balm-ui/dist/balm-ui-plus");

createApp(App)
    .use(store)
    .use(router)
    .use(BalmUI)
    .use(BalmUIPlus)
    .mount('#app')