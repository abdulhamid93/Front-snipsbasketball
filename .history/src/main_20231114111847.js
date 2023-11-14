import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { router } from './router';
import store from './store';
import   './assets/css/Home.css';
import   './assets/css/nicepage.css';
import   './assets/css/style.css';
import   './assets/js/jquery.min.js.js';
import   './assets/js/nicepage.js';

const app = createApp(App);
app.use(router).use(store).use(vuetify).mount('#app');
