import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { router } from './router';
import store from './store';

import   './assets/css/bootstrap.min.css';

import   './assets/css/Home.css';
import   './assets/css/nicepage.css';
import   './assets/css/style.css';
import   './assets/js/jquery.min.js';
import   './assets/js/bootstrap.min.js';
import   './assets/js/nicepage.js';


// import LaravelEcho from "laravel-echo-vue3"
// import LaravelEcho from "laravel-echo"
// import Pusher from 'pusher-js';

// // Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;


const app = createApp(App);

// const options = {
//     broadcaster: 'pusher',
//     key: "46bb874b7ddecccc4d34",
//     cluster: "eu",
//     forceTLS: true
// }

// app.use(LaravelEcho, {
//     ...options,
//     client: new Pusher(options.key, options)
// })

// const echo = new LaravelEcho({
//     broadcaster: 'pusher',
//     key: '46bb874b7ddecccc4d34',
//     cluster: 'eu',
//     encrypted: true,
//   });
  
  // app.config.globalProperties.$echo = echo;
  // app.provide('echo', echo);


app.use(router).use(store).use(vuetify).mount('#app');

// app.use(VueEcho, {
//     broadcaster: "pusher",
//     key: "46bb874b7ddecccc4d34",
//     cluster: "eu",
//     forceTLS: true,
// });