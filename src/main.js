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

const app = createApp(App);
const teams = [
  { id: 1,total:13214, name: 'AL RIYADI BASKETBALL', logo: baseURL+'/storage/general/al-riyadi-basketball-logo.png' },
  { id: 2,total:3240, name: 'BEIRUT', logo: baseURL+'/storage/general/beirut.png' },
  { id: 3,total:53450, name: 'Antranik', logo: baseURL+'/storage/general/antranik.png' },
  { id: 4,total:53, name: 'Champville', logo: baseURL+'/storage/general/champvillelogo.png' },
  { id: 5,total:25354, name: 'Antonin', logo: baseURL+'/storage/general/antonin.png' },
  { id: 6,total:345, name: 'CS Sagesse', logo: baseURL+'/storage/general/cs-sagesse-logo.png' },
  { id: 7,total:1123, name: 'Hmem', logo: baseURL+'/storage/general/hmemlogo2019.png' },
  { id: 8,total:23221, name: 'Hoops', logo: baseURL+'/storage/general/hoops-logo.png' },
  { id: 9,total:24550, name: 'Mayrouba', logo: baseURL+'/storage/general/mayrouba.png' },
  { id: 10,total:23560, name: 'NSA', logo: baseURL+'/storage/general/nsa-1.jpg' },

]; // initialize your global teams data

app.provide('teams', teams);

app.use(router).use(store).use(vuetify).mount('#app');