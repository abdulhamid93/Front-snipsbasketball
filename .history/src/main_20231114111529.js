import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { router } from './router';
import store from './store';
import   './assets/css/Home'
import   './assets/js/nicepage'

const app = createApp(App);
app.use(router).use(store).use(vuetify).mount('#app');
