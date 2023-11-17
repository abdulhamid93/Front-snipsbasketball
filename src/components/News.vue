
<template>
  <section class="news-container u-section-1-news" id="" data-image-width="1980">
    
      <div class="title">
        <a href="/" class="page-logo">
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
import axios from 'axios';
import { defineComponent, ref, onMounted } from 'vue';
import LaravelEcho from "laravel-echo"
import Pusher from 'pusher-js';
import { inject } from 'vue';


// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;


import { useRoute } from 'vue-router';
import { baseURL } from '@/config';
export default {

  name: 'News',

  data() {
    return {
      token: null,
      tokenExists:false,
      teams: [
      ],
    };
  },


  created: function () {
    const teams = inject('teams');
    this.teams = teams;
    // this.teams = [
    //   { id: 1, name: 'AL RIYADI BASKETBALL', logo: baseURL + '/storage/general/al-riyadi-basketball-logo.png' },
    //   { id: 2, name: 'BEIRUT', logo: baseURL + '/storage/general/beirut.png' },
    //   { id: 3, name: 'Antranik', logo: baseURL + '/storage/general/antranik.png' },
    //   { id: 4, name: 'Champville', logo: baseURL + '/storage/general/champvillelogo.png' },
    //   { id: 5, name: 'Antonin', logo: baseURL + '/storage/general/antonin.png' },
    //   { id: 6, name: 'CS Sagesse', logo: baseURL + '/storage/general/cs-sagesse-logo.png' },
    //   { id: 7, name: 'Hmem', logo: baseURL + '/storage/general/hmemlogo2019.png' },
    //   { id: 8, name: 'Hoops', logo: baseURL + '/storage/general/hoops-logo.png' },
    //   { id: 9, name: 'Mayrouba', logo: baseURL + '/storage/general/mayrouba.png' },
    //   { id: 10, name: 'NSA', logo: baseURL + '/storage/general/nsa-1.jpg' },

    // ];

  },
  mounted: function () {
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
  