
<template>
  <section class="section hero-section bg-image context-dark">
    <div class="">
      <div class="row">
        <div class="col-md-4">
          <img src="https://staging.snipsbasketball.com/storage/general/logo-1.png" />
        </div>
        <div class="col-md-4">
          <div class="hero-text-box">
            <h2 class="hero-text-style-2"><span>VOTE</span><br>
              <span>& SUPPORT</span>
            </h2>
            <h3>YOUR FAVOURITE TEAM!</h3>
          </div>
        </div>
        <div class="col-md-4 mx-auto">
          <tbody class="result-table">
            <tr v-for="(team, index) in teams" :key="index">
              <td class="result-team logo" style="width: 25%; text-align: center">
                <span style="margin-right: 5px; color: #fff">{{
                  index + 1
                }}</span>
                <img :src="team.logo" width="35" />
                <span></span>
              </td>
              <td style="position: relative; width: 75%">
                <div class="bar-fill" :style="{
                  width:
                    calculatePercentage(team.total) +
                    '%',
                  background: team.color,
                  'padding': '8px',
                  color: '#fff',
                  height: '44px',

                }">
                  {{ team.total }}
                </div>
              </td>
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  </section>
  <!-- <section class="news-container u-section-1-news" id="" data-image-width="1980">

    <div class="title">
      <a @click="openPopupRes" class="page-logo">
        <img src="https://staging.snipsbasketball.com/storage/general/snips-logo.png" alt="snipsbasketball" height="60">
        <span style="margin-left: 20px;color:#df2020;">live Results:</span>
      </a>
    </div>
    <ul>
      <li><span></span> </li>
      <li class="team-item" v-for="(team, index) in teams" :key="index"
        :class="{ 'team-item-updated': team === changedTeam }">
        <img :src="team.logo" width="40">
        <span :style="getTeamTextStyle(team)">{{ team.total }}</span>
        <span v-if="team === changedTeam" class="arrow-up"></span>
      </li>
      <li class="team-item" v-for="(team, index) in teams" :key="index"
        :class="{ 'team-item-updated': team === changedTeam }">
        <img :src="team.logo" width="40">
        <span :style="getTeamTextStyle(team)">{{ team.total }}</span>
        <span v-if="team === changedTeam" class="arrow-up"></span>
      </li>
    </ul>

  </section> -->
  <div class="modal" v-if="openPopupInC2">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="p-title">
        <img src="https://staging.snipsbasketball.com/storage/general/snips-logo.png" alt="snipsbasketball" height="80" />
        <span style="margin-left: 20px; color: #df2020">live Results:</span>
      </h2>
      <table>
        <thead>
          <tr>
            <th style="width: 240px">Team Name</th>
            <th>Result</th>
            <!-- <th ></th> -->
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in teams" :key="index">
            <td class="result-team">
              <img :src="team.logo" width="36" /><span>
                {{ team.name }}</span>
            </td>

            <td style="position: relative">
              <div class="bar-fill" :style="{
                width:
                  calculatePercentage(team.total) + '%',
              }"></div>
              {{ team.total.toFixed(0) }}
            </td>
            <td>{{ calculatePercentage(team.total) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script>
import { ref, watch } from 'vue';
import LaravelEcho from 'laravel-echo';
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
      teams: [],
      changedTeam: null, // New property to store the changed team
    };
  },

  created: function () {
    this.teams = inject('teams');
    this.sortTeamsByTotal();
  },
  mounted: function () {
    const route = useRoute();
    const token = ref('');
    const tokenExists = ref(false);
    token.value = route.params.token;
    if (
      token.value !== undefined &&
      token.value !== null &&
      token.value !== ''
    )
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
    channel.listen('.vote.updated', event => {
      this.teams = event.teams.teams;
      this.sortTeamsByTotal();
      // Set the changed team
      const newChangedIndex = event.teams.teams.findIndex(
        (team, index) => team.total !== this.teams[index].total
      );
      this.changedTeam = event.teams.teams[newChangedIndex];

      // Clear the changed team after 2 seconds
      setTimeout(() => {
        this.changedTeam = null;
      }, 2000);
    });

    // Watch for changes in the total property of each team
    watch(
      () => this.teams.map(team => team.total),
      (newTotalValues, oldTotalValues) => {
        // Find the changed team based on the changed total value
        const changedIndex = newTotalValues.findIndex(
          (total, index) => total !== oldTotalValues[index]
        );
        this.changedTeam = this.teams[changedIndex];
        // console.log('Team total property changed!', this.changedTeam);

        // Clear the changed team after 2 seconds
        setTimeout(() => {
          this.changedTeam = null;
        }, 2000);
      }
    );
  },
  methods: {
    closeModal() {
      this.openPopupInC2 = false;
    },
    calculatePercentage(total) {
      const totalPoints = this.teams.reduce(
        (total, team) => total + team.total,
        0
      );
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
      this.openPopupInC2 = true;
    },
  },
};
</script>


<style scoped>
/* Add any additional styles as needed */
.results tr {
  border-bottom: 1px solid #f2f2f2;
}

.team-item-updated {
  background-color: #ffd1d1;
  /* Change this color as needed */
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

.result-table td {
  padding: 2px;
  text-align: left;
}

.result-table .logo {
  text-align: center;
}

.bar-fill {
  margin: 10px 0;
}
</style>