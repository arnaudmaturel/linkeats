import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'
import AppSetting from "@/AppSetting";

loadFonts()
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"



const app = createApp(App);

var fullUrl = document.URL;

var path = fullUrl.split("//")[1];

var url = AppSetting.START_URL;
if (path.includes("/")) {
    url += path.split('/')[0];
}
else {
    url += path;
}

AppSetting.baseUrl = url;

console.log("AppSetting.baseUrl :", AppSetting.baseUrl);


app.use(router);
app.use(store);
app.use(vuetify);
app.use(OpenLayersMap);
app.mount('#app');

app.config.globalProperties.$isLog = false;
