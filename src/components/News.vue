
<template>
  <section class="news-container u-section-1-news" id="" data-image-width="1980">

    <div class="title">
      <a @click="openPopupRes" class="page-logo">
        <img src="https://staging.snipsbasketball.com/storage/general/snips-logo.png" alt="snipsbasketball" height="80">
        <span style="margin-left: 20px;color:#df2020">live Results:</span>
      </a>
    </div>
    <ul>
      <li><span></span> </li>
      <li class="team-item" v-for="(team, index) in teams " :key="index">
        <img :src="team.logo" width="40"><span> {{ team.total }}</span>
      </li>
      <li class="team-item" v-for="(team, index) in teams " :key="index">
        <img :src="team.logo" width="40"><span> {{ team.total }}</span>
      </li>
    </ul>

  </section>
</template>
  
<script>
import { defineComponent, ref, onMounted } from 'vue';
import LaravelEcho from "laravel-echo"
import Pusher from 'pusher-js';
import { inject } from 'vue';


// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

import eventBus from './../eventBus';
import { useRoute } from 'vue-router';
import { baseURL } from '@/config';
export default {

  name: 'News',

  data() {
    return {
      token: null,
      tokenExists: false,
      openPopupInC2: false,
      teams: [
      ],
    };
  },

  created: function () {
    this.teams = inject('teams');
    this.openPopupInC2 = inject('openPopupInC2');
  },
  mounted: function () {
    const route = useRoute();
    const token = ref('');
    const tokenExists = ref(false);
    token.value = route.params.token;
    if (token.value !== undefined && token.value !== null && token.value !== '')
      this.token = token.value;
    console.log('token.value' + token.value);


    // subscribe to channel
    const echo = new LaravelEcho({
      broadcaster: 'pusher',
      key: '46bb874b7ddecccc4d34',
      cluster: 'eu',
      encrypted: true,
    });

    // Subscribe to the 'vote-channel'
    const channel = echo.channel('vote-channel');

    // Listen for the 'vote.updated' event
    channel.listen('.vote.updated', (event) => {
      this.message = event.message;
      this.results = event.teams.teams;
      this.teams = event.teams.teams;

      console.log('this.teams');
      console.log(this.teams);
      console.log('this.teams');

    });

  },
  methods: {
    openPopupRes() {
      // eventBus.emit('open-popup-in-c2');
      this.$emit('openPopupInC2'); // Emit an event to open the popup in C2//this.openPopupInC2 = true;
    }
  },


};



</script>
<style>
.page-logo {
  cursor: pointer;
}
</style>