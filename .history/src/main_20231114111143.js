import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { router } from './router';
import store from './store';
import styles from './assets/css/'
import jsFiles from './assets/js'

const app = createApp(App);
app.use(router).use(store).use(vuetify).mount('#app');
