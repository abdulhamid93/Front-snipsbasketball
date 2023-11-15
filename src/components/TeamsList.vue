
<template>
  <section
    class="u-align-center u-clearfix u-container-align-center-lg u-container-align-center-xl u-container-align-center-xs u-palette-5-dark-3 u-section-2"
    id="carousel_01c2">

    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
      <div
        class="u-align-center u-container-align-center u-container-style u-group u-shape-rectangle u-group-1 animated customAnimationIn-played"
        data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="250"
        style="will-change: transform, opacity; animation-duration: 1500ms;">
        <div class="u-container-layout u-valign-middle u-container-layout-1">
          <h2 class="u-text u-text-1"> Get started today</h2>
          <p class="u-large-text u-text u-text-variant u-text-2">We're working on something awesome! <br>Stay tuned for
            our basketball updates.</p>
        </div>
      </div>

      <div class="u-repeater u-repeater-1 teams">
        <div v-for="(team, index) in teams" :key="index"
          class="u-align-left u-border-5 u-border-no-bottom u-border-no-left u-border-no-right u-border-palette-1-base u-container-align-center u-container-style u-list-item u-repeater-item u-video-cover u-white u-list-item-5 animated customAnimationIn-played"
          data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"
          data-animation-direction="" style="will-change: transform, opacity; animation-duration: 1500ms;">
          <div class="u-container-layout u-similar-container u-valign-top u-container-layout-5">
            <span class="u-align-center u-file-icon u-icon u-text-palette-1-base u-icon-4" data-animation-name=""
              data-animation-duration="0" data-animation-delay="0" data-animation-direction="">
              <img :src="team.logo" alt="" />
            </span>
            <h4 class="u-align-center u-text u-text-9">{{ team.name }}-{{ token }}</h4>
            <a @click="sendBroadcast(team)"
              class="u-active-black u-btn vote-btn u-button-style u-hover-black u-palette-1-base u-btn-2">Vote</a>
            <p>{{ message }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
  
<script>
import axios from 'axios';
import { defineComponent, ref, onMounted } from 'vue';
import LaravelEcho from "laravel-echo"
import Pusher from 'pusher-js';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;


import { useRoute } from 'vue-router';
import { baseURL } from '@/config';
export default {

  name: 'TeamsList',
  
  data() {
    return {
      token: null,
      // tokenExists:false,
      teams: [
      ],
    };
  },
  


  created: function () {
    this.teams = [
      { id: 1, name: 'AL RIYADI BASKETBALL', logo: baseURL+'/storage/general/al-riyadi-basketball-logo.png' },
      { id: 2, name: 'BEIRUT', logo: baseURL+'/storage/general/beirut.png' },
      { id: 3, name: 'Antranik', logo: baseURL+'/storage/general/antranik.png' },
      { id: 4, name: 'Champville', logo: baseURL+'/storage/general/champvillelogo.png' },
      { id: 5, name: 'Antonin', logo: baseURL+'/storage/general/antonin.png' },
      { id: 6, name: 'CS Sagesse', logo: baseURL+'/storage/general/cs-sagesse-logo.png' },
      { id: 7, name: 'Hmem', logo: baseURL+'/storage/general/hmemlogo2019.png' },
      { id: 8, name: 'Hoops', logo: baseURL+'/storage/general/hoops-logo.png' },
      { id: 9, name: 'Mayrouba', logo: baseURL+'/storage/general/mayrouba.png' },
      { id: 10, name: 'NSA', logo: baseURL+'/storage/general/nsa-1.jpg' },

    ];

  },
  mounted: function(){
    const route = useRoute();
    const token = ref('');
    const tokenExists = ref(false); 
    token.value = route.params.token;
       if (token.value !== undefined && token.value !== null && token.value !== '')
       this.token = token.value;
      console.log('token.value' + token.value);
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
        console.log('event.data.message1');
        console.log(event.teams);
        this.results = event.teams.teams;
        console.log('message.value');
    });

  },
  methods: {
    async sendBroadcast(team) {
      console.log('Broadcasting for team:', team);
      try {
        const response = await axios.post(
          'https://staging.snipsbasketball.com/api/v1/vote',
          { team_id: team.id, token: '787', ip: '192.0.0.0' }
        );
      } catch (error) {
        console.error('Error sending broadcast:', error);
      }
    },
    async vote(teamName) {
      try {
        const response = await axios.post('/api/v1/voting', {
          team: teamName,
          // Add any other data you need to send in the request body
        });

        // Handle the response as needed
        console.log('Vote successful:', response.data);
      } catch (error) {
        // Handle errors
        console.error('Error voting:', error);
      }
    },
  },


};



</script>
  