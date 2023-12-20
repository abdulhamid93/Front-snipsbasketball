
<template>
  <section class="news-container u-section-1-news" id="" data-image-width="1980">

    <div class="title">
      <a @click="openPopupRes" class="page-logo">
        <img src="https://app.snipsbasketball.com/storage/general/snips-logo.png" alt="snipsbasketball" height="80">
        <span style="margin-left: 20px;color:#df2020">live Results:</span>
      </a>
    </div>
    <div class="team-carousel">
      <ul class="team-list" :style="{ '--team-count': extendedTeams }">
      <li v-for="(team, index) in extendedTeams" :key="index" class="team-item" :class="{ 'team-item-updated': team === changedTeam }">
        <div class="coin-container">
          <span class="ccpw_icon">
            <img :src="team.logo" width="30" height="30" alt="team-logo">
          </span>
          <div class="team-info">
            <span class="name">{{ team.name }}</span>
            <span class="total">{{ team.total }}</span>
          </div>
          <!-- Add the green arrow if this is the changed team -->
          <span v-if="team === changedTeam" class="arrow-up"></span>
        </div>
      </li>
    </ul>
  </div>

  </section>
  <div class="modal" v-if="openPopupInC2">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="p-title"><img src="https://app.snipsbasketball.com/storage/general/snips-logo.png"
          alt="snipsbasketball" height="80">
        <span style="margin-left: 20px;color:#df2020">live Results:</span>
      </h2>
      <table>
        <thead>
          <tr>
            <th style="width: 240px;">Team Name</th>
            <th>Result</th>
            <!-- <th ></th> -->
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in teams" :key="index">
            <td class="result-team"> <img :src="team.logo" width="36"><span> {{ team.name }}</span></td>

            <td style="position: relative;">
              <div class="bar-fill" :style="{ width: calculatePercentage(team.total) + '%' }"></div>
              {{ team.total.toFixed(0) }}
            </td>
            <td> {{ calculatePercentage(team.total) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script>
import { ref, watch } from 'vue';
import LaravelEcho from "laravel-echo"
import { inject } from 'vue';
import Pusher from 'pusher-js';

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

import eventBus from './../eventBus';
import { useRoute } from 'vue-router';
export default {

  name: 'News',

  data() {
    return {
      token: null,
      tokenExists: false,
      openPopupInC2: false,
      teams: [
      ],
      changedTeam: null, // New property to store the changed team
    };
  },

  created: function () {
    this.teams = inject('teams');
    this.sortTeamsByTotal();
  },
  computed: {
    extendedTeams() {
      // Duplicate the teams array to create a loop
      return [...this.teams, ...this.teams];
    },
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
      key: '6bc7ba1172f908246ab6',
      cluster: 'eu',
      encrypted: true,
    });

    // Subscribe to the 'vote-channel'
    const channel = echo.channel('vote-channel');

    // Listen for the 'vote.updated' event
    channel.listen('.vote.updated', (event) => {
      this.teams = event.teams.teams;
      this.sortTeamsByTotal();
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
    closeModal() {
      this.openPopupInC2 = false;
    },
    calculatePercentage(total) {
      const totalPoints = this.teams.reduce((total, team) => total + team.total, 0);
      return ((total / totalPoints) * 100).toFixed(2);
    },
    sortTeamsByTotal() {
      // Sort teams array by total property
      this.teams.sort((a, b) => b.total - a.total);
    },
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
    openPopupRes() {
      
      this.openPopupInC2=true; 
    },
    initCarousel() {
      const teamList = document.querySelector('.team-list');
      teamList.innerHTML += teamList.innerHTML; // Duplicate the team list content
      teamList.style.animation = `scrollTeams ${(teamList.offsetWidth / 40) * 2}px linear infinite`; // Adjust the duration
    },
  },

};



</script>


<style scoped>
.team-carousel {
  overflow: hidden;
  width: 100%;
}

.team-list {
  display: flex;
}

@keyframes scrollTeams {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.team-item {
  margin-right: 10px; /* Adjust spacing between items */
  overflow: hidden;
  height: 50px; /* Adjusted item height */
}

.coin-container {
  float: left;
  list-style: none;
  position: relative;
  display: flex;
  align-items: center;
}

.team-info {
  margin-left: 5px; /* Adjust spacing between team logo and team info */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.name {
  font-size: 12px; /* Adjusted font size for team name */
}

.total {
  font-size: 10px; /* Adjusted font size for total */
}

.ccw_icon img {
  border-radius: 50%; /* Optional: Make the team logo circular */
}

.team-item-updated {
  /* Styles for updated team item */
}




/* Example of additional styles for the changed team */
.team-item-updated span {
  color: green;
  font-weight: bold;
  font-size: calc(2px + 100%);
  /* Increase font size by 2px */
}

.arrow-up {
  position: absolute;
  top: -8px;
  /* Adjust this value to control the distance from the team total */
  left: 50%;
  /* Center the arrow horizontally */
  margin-left: -5px;
  /* Adjust this value to center the arrow properly */
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid green;
}

.page-logo {
  cursor: pointer;
}
</style>