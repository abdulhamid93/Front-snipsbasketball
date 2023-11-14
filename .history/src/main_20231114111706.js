import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { router } from './router';
import store from './store';
import   './assets/css/Home.css'
import   './assets/js/nicepage.js'
import   './assets/css/nicepage.css'
const app = createApp(App);
app.use(router).use(store).use(vuetify).mount('#app');
