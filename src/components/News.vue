
<template>
  <section class="news-container u-section-1-news" id="" data-image-width="1980">
    
      <div class="title">
        <a href="/" class="page-logo">
          <img src="https://staging.snipsbasketball.com/storage/general/snips-logo.png" alt="snipsbasketball" height="80">
            <span style="margin-left: 20px;color:#df2020">live Results:</span>
        </a>
      </div>
      <ul>
      <li><span></span></li>
      <li
        class="team-item"
        v-for="(team, index) in teams"
        :key="index"
        :class="{ 'team-item-updated': team === changedTeam }"
      >
        <img :src="team.logo" width="40">
        <span :style="getTeamTextStyle(team)">{{ team.total }}</span>
        <!-- Add the green arrow if this is the changed team -->
        <span v-if="team === changedTeam" class="arrow-up"></span>
      </li>
      <!-- Repeat for other list items -->
    </ul>
    
  </section>
</template>
  
<script>
import { ref, watch } from 'vue';
import LaravelEcho from "laravel-echo"
import { inject } from 'vue';
import Pusher from 'pusher-js';

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

import { useRoute } from 'vue-router';
export default {

  name: 'News',

  data() {
    return {
      token: null,
      tokenExists:false,
      teams: [
      ],
      changedTeam: null, // New property to store the changed team
    };
  },

  created: function () {
    this.teams = inject('teams');
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
      this.teams = event.teams.teams;
      // Set the changed team
      const newChangedIndex = event.teams.teams.findIndex((team, index) => team.total !== this.teams[index].total);
      this.changedTeam = event.teams.teams[newChangedIndex];

      // Clear the changed team after 2 seconds
      setTimeout(() => {
        this.changedTeam = null;
      }, 2000);
    });

    // Watch for changes in the total property of each team
    watch(() => this.teams.map(team => team.total), (newTotalValues, oldTotalValues) => {
      // Find the changed team based on the changed total value
      const changedIndex = newTotalValues.findIndex((total, index) => total !== oldTotalValues[index]);
      this.changedTeam = this.teams[changedIndex];
      // console.log('Team total property changed!', this.changedTeam);

      // Clear the changed team after 2 seconds
      setTimeout(() => {
        this.changedTeam = null;
      }, 2000);
    
    });

  },
  methods: {
    getTeamTextStyle(team) {
      // Define styles for the changed team
      if (team === this.changedTeam) {
        return {
          color: 'green',
          fontWeight: 'bold',
          fontSize: 'calc(2px + 100%)', // Increase font size by 2px
        };
      }
      return {}; // Return an empty object for other teams
    },
  },

};



</script>


<style scoped>
/* Add any additional styles as needed */
.team-item-updated {
  background-color: #ffd1d1; /* Change this color as needed */
}

/* Example of additional styles for the changed team */
.team-item-updated span {
  color: green;
  font-weight: bold;
  font-size: calc(2px + 100%); /* Increase font size by 2px */
}

.arrow-up {
  position: absolute;
  top: -8px; /* Adjust this value to control the distance from the team total */
  left: 50%; /* Center the arrow horizontally */
  margin-left: -5px; /* Adjust this value to center the arrow properly */
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid green;
}
</style>