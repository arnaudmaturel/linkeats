import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'

loadFonts()
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);


app.use(router);
app.use(store);
app.use(vuetify);
app.use(OpenLayersMap);
app.mount('#app');

app.config.globalProperties.$isLog = false;
