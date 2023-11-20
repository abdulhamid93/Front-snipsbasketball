import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { router } from './router';
import store from './store';
import { baseURL } from '@/config';
import './assets/css/bootstrap.min.css';

import './assets/css/Home.css';
import './assets/css/nicepage.css';
import './assets/css/style.css';
import './assets/js/jquery.min.js';
import './assets/js/bootstrap.min.js';
import './assets/js/nicepage.js';
import axios from 'axios';

const app = createApp(App);



// Fetch data and provide it to the entire application
(async () => {
  try {
    const response = await axios.post('https://staging.snipsbasketball.com/api/v1/team-list');
    const teams = response.data.teams;

    // Provide the 'teams' data to the application
    app.provide('teams', teams);

    app.use(router).use(store).use(vuetify).mount('#app');
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
})();



