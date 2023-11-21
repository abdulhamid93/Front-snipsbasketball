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
import moment from 'moment';


const app = createApp(App);

app.config.globalProperties.$moment = moment;

// Fetch data and provide it to the entire application
(async () => {
  try {
    const response = await axios.post('https://staging.snipsbasketball.com/api/v1/team-list');
    const teams = response.data.teams;

    // Update the 'updated_at' field for each team
    teams.forEach(team => {
      team.updated_at = moment(team.updated_at).fromNow();
    });

    // Provide the 'teams' data to the application
    app.provide('teams', teams);
    app.provide('openPopupInC2', false);
    app.use(router).use(store).use(vuetify).mount('#app');
  } catch (error) {

    const teams = [
      {
          "id": 1,
          "name": "Al Riyadi Basketball",
          "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/al-riyadi-basketball-logo.png",
          "total": 69,
          "summary": null
      },
      {
          "id": 2,
          "name": "Beirut",
          "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/beirut.png",
          "total": 24,
          "summary": null
      },
      {
          "id": 3,
          "name": "Antranik",
          "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/antranik.png",
          "total": 36,
          "summary": null
      },
      {
          "id": 4,
          "name": "Champville",
          "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/champvillelogo.png",
          "total": 11,
          "summary": null
      },
      {
          "id": 5,
          "name": "Antonin",
          "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/antonin.png",
          "total": 4,
          "summary": null
      },
      {
          "id": 6,
          "name": "CS Sagesse",
          "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/cs-sagesse-logo.png",
          "total": 1,
          "summary": null
      },
      {
          "id": 7,
          "name": "Hmem",
          "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/hmemlogo2019.png",
          "total": 3,
          "summary": null
      },
      {
          "id": 8,
          "name": "Hoops",
          "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/hoops-logo.png",
          "total": 7,
          "summary": null
      },
      {
          "id": 9,
          "name": "Mayrouba",
          "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/mayrouba.png",
          "total": 2,
          "summary": null
      },
      {
          "id": 10,
          "name": "NSA",
          "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/nsa.png",
          "total": 6,
          "summary": null
      }
    ];

      // Provide the 'teams' data to the application
      app.provide('teams', teams);
      app.provide('openPopupInC2', false);
      app.use(router).use(store).use(vuetify).mount('#app');

    console.error('Error fetching teams:', error);
  }
})();



