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

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);
library.add(faFacebook);
library.add(faTwitter);
app.config.globalProperties.$moment = moment;
 app.component("font-awesome-icon", FontAwesomeIcon);
// Fetch data and provide it to the entire application
(async () => {
  try {
    const response = await axios.post('https://app.snipsbasketball.com/api/v1/team-list');
    const teams = response.data.teams;
    const hero_img = response.data.hero_img;
    const hero_img_mobile = response.data.hero_img_mobile;
    const snips_description = response.data.snips_description;
    const live_ranking_text = response.data.live_ranking_text;
    const next_draw = response.data.next_draw;
    const app_store_link = response.data.app_store_link;
    const google_play_link = response.data.google_play_link;
    
    // Update the 'updated_at' field for each team
    teams.forEach(team => {
      team.updated_at = moment(team.updated_at).fromNow();
    });

    // Provide the 'teams' data to the application
    app.provide('teams', teams);
    app.provide('hero_img', hero_img);
    app.provide('hero_img_mobile', hero_img_mobile);
    app.provide('snips_description', snips_description);

    app.provide('live_ranking_text', live_ranking_text);
    app.provide('next_draw', next_draw);
    app.provide('app_store_link', app_store_link);
    app.provide('google_play_link', google_play_link);
    
    app.provide('openPopupInC2', false);
    app.use(router).use(store).use(vuetify).mount('#app');
  } catch (error) {

    // const teams = [
    //   {
    //       "id": 1,
    //       "name": "Al Riyadi Basketball",
    //       "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/al-riyadi-basketball-logo.png",
    //       "total": 69,
    //       "summary": null
    //   },
    //   {
    //       "id": 2,
    //       "name": "Beirut",
    //       "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/beirut.png",
    //       "total": 24,
    //       "summary": null
    //   },
    //   {
    //       "id": 3,
    //       "name": "Antranik",
    //       "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/antranik.png",
    //       "total": 36,
    //       "summary": null
    //   },
    //   {
    //       "id": 4,
    //       "name": "Champville",
    //       "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/champvillelogo.png",
    //       "total": 11,
    //       "summary": null
    //   },
    //   {
    //       "id": 5,
    //       "name": "Antonin",
    //       "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/antonin.png",
    //       "total": 4,
    //       "summary": null
    //   },
    //   {
    //       "id": 6,
    //       "name": "CS Sagesse",
    //       "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/cs-sagesse-logo.png",
    //       "total": 1,
    //       "summary": null
    //   },
    //   {
    //       "id": 7,
    //       "name": "Hmem",
    //       "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/hmemlogo2019.png",
    //       "total": 3,
    //       "summary": null
    //   },
    //   {
    //       "id": 8,
    //       "name": "Hoops",
    //       "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/hoops-logo.png",
    //       "total": 7,
    //       "summary": null
    //   },
    //   {
    //       "id": 9,
    //       "name": "Mayrouba",
    //       "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/mayrouba.png",
    //       "total": 2,
    //       "summary": null
    //   },
    //   {
    //       "id": 10,
    //       "name": "NSA",
    //       "logo": "https:\/\/staging.snipsbasketball.com\/storage\/general\/nsa.png",
    //       "total": 6,
    //       "summary": null
    //   }
    // ];

      // Provide the 'teams' data to the application
      app.provide('teams', teams);
      app.provide('openPopupInC2', false);
      app.use(router).use(store).use(vuetify).mount('#app');

    console.error('Error fetching teams:', error);
  }
})();