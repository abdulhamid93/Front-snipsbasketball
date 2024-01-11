
<template>
  <div>
    <div class="desktop" style=";background:url(https://app.snipsbasketball.com/storage/general/snips-basketball-hero.jpg) ;background-size: cover;">
      <img class="main-img " src="https://app.snipsbasketball.com/storage/general/snips-basketball-hero.jpg" style="opacity: 0;">
    </div>
    <img class="mobile" src="./../assets/img/SNIPS-basketball-hero-mobile.jpg">
  </div>
  <section class="section  bg-image context-dark">


    <div>
      <div class="team-bar-container">
        <div v-for="(team, index) in teams" :key="index" class="team-bar"
          v-bind:class="{ last: index == teams.length - 1 }">


          <div class="team-bar" style="position: relative;">
            <div class="bar">
              <div class="bar-fill" :style="{
                height: (calculatePercentage(team.total) * 3.2) + '%',
                position: 'relative',
                background: team.color,
                padding: '5px',
                color: '#fff',
                'font-weight': 'bold',
                'font-size': '18px',
                width: '100% ',  // Adjust the height as needed
              }">

              </div>
              <span class="total">{{ calculatePercentage(team.total) }}%</span>
            </div>

            <img :src="team.logo" class="team-logo" />
            <span class="number">{{
              index + 1 }}</span>
          </div>

        </div>
      </div>
      <h4 class="live-ranking">LIVE RANKINGS (% of $100K)</h4>
    </div>
  </section>
  <section v-if="1 == 0" class="section hero-section bg-image context-dark">
    <div class="">
      <div class="row p-0 m-0">
        <div class="col-md-4 col-sm-6 main-logo-img">
          <img src="https://app.snipsbasketball.com/storage/general/logo-1.png" />
          <div class="hero-text-box mobile">
            <img class="mobile-vote" src="./../assets/img/vote-2.png">
            <!-- <h3>YOUR FAVOURITE<br>TEAM!</h3> -->
          </div>
        </div>
        <div class="col-md-4 col-sm-6 desktop">
          <div class="hero-text-box ">
            <h2 class="hero-text-style-2"><span>VOTE</span><br>
              <span class="line2">& SUPPORT</span>
            </h2>

            <h3>YOUR FAVOURITE<br>TEAM!</h3>
          </div>
        </div>
        <div class="col-md-4 col-sm-12 mx-auto res-table">
          <h4 style="margin-left: 65px; color: #fff; font-weight: bold;">LIVE RANKINGS</h4>
          <tbody class="result-table">
            <tr v-for="(team, index) in teams" :key="index" class="max-height-50"
              v-bind:class="{ last: index == teams.length - 1 }">
              <td class="result-team logo" style=" max-height: 40px;">
                <span
                  style="margin-right: 5px; color: #fff; max-height: 40px !important; font-size: 18px; overflow: hidden !important;">{{
                    index + 1 }}</span>
                <img :src="team.light_logo" class="team-logo" />
                <span style="max-height: 40px !important; overflow: hidden !important;"></span>
              </td>

              <td style="position: relative; width: 75%; max-height: 40px !important;">
                <div class="bar-fill" :style="{
                  width: calculatePercentage(team.total) + '%',
                  position: 'relative',
                  background: team.color,
                  padding: '5px',
                  color: '#fff',
                  'font-weight': 'bold',
                  'font-size': '18px',
                  height: '100% ',  // Adjust the height as needed
                }">
                  <span>{{ team.total }}</span>
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
        <img src="https://app.snipsbasketball.com/storage/general/snips-logo.png" alt="snipsbasketball" height="80" />
        <span style="margin-left: 20px; color: #df2020">live Results:</span>
      </h2>
      <!-- <table>
        <thead>
          <tr>
            <th style="width: 240px">Team Name</th>
            <th>Result</th>
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
      </table> -->
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
import moment from 'moment';

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
      key: '6bc7ba1172f908246ab6',
      cluster: 'eu',
      encrypted: true,
    });

    // Subscribe to the 'vote-channel'
    const channel = echo.channel('vote-channel');

    // Listen for the 'vote.updated' event
    channel.listen('.vote.updated', event => {
      this.teams = event.teams.teams;


      // Update the 'updated_at' field for each team
      this.teams.forEach(team => {
        team.updated_at = moment(team.updated_at).fromNow();
      });

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


<style >
.team-bar {
  display: inline-block;
  width: 70px;
  padding: 5px;
}

.live-ranking {
  color: rgb(237, 28, 36);
  font-weight: bold;
  text-align: center;
  font-size: 32px;
  margin-top: 15px;
  margin-bottom: 40px;
}

.team-bar .bar {
  min-height: 200px;
  position: relative;
}

.team-bar .bar .bar-fill {
  position: absolute !important;
  ;
  bottom: 5px;
}

.blog-slider .blog-slider__button:hover {
  background: rgb(237, 28, 36);
}

.team-bar .bar span.total {
  vertical-align: super;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  white-space: nowrap;
  color: #000;
  line-height: 60px;
  position: absolute;
  bottom: 15px;
  font-size: 18px;
  font-weight: 500;
}

.team-bar-container {
  width: 700px;
  margin: 0 auto;
}

.number {
  margin-right: 5px;
  color: #000;
  max-height: 40px !important;
  font-size: 26px;
  font-weight: 900;
  overflow: hidden !important;
  text-align: center;
  width: 100%;
  display: block;
}

.max-height-50 {
  max-height: 40px !important;
  height: 40px !important;
  overflow: hidden !important;
}

.max-height-50 td,
.max-height-50 span,
.max-height-50 img {
  height: 36px !important;
  max-height: 40px !important;
  overflow: hidden !important;
}

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

.mobile-vote {
  display: none;
}

@media (max-width: 1280px) {
  .Download-container .stores img {
    margin: 0px !important;
    margin-right: 5px !important;
  }

  .Download-container .stores-cc {
    margin-left: 15px;
  }
  .team-bar .bar span.total {
    line-height: 56px;
    bottom: 15px;
    font-size: 16px;
    font-weight: 500;
}
  .team-bar-container {
    width: 600px;
    margin: 0 auto;
  }

  div.bar-fill span {
    font-size: 16px;
    line-height: 45px !important;
  }

  .team-bar {
    width: 60px;
    padding: 3px;
  }

  .stores-cc span {
    margin-bottom: 6px;
    display: block;
  }

  body .Shop-container img {
    width: 40px !important;
    height: 40px !important;
  }

  .result-team .team-logo {
    float: right;
  }

  .result-table .result-team.logo {
    width: 65px;
  }

  .result-table .result-team.logo span {
    width: 15px;
    margin-right: 5px;
    color: rgb(255, 255, 255);
    max-height: 40px !important;
    margin-left: 5px;
    font-size: 18px;
    line-height: 40px;
    overflow: hidden !important;
  }

  .result-table .last .result-team.logo img {
    width: 38px;
  }

  div.bar-fill span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: auto !important;
    line-height: 20px;
  }

  .desktop .res-table h4 {
    margin-left: 65px;
  }

  .max-height-50.last span {
    margin-left: -5px !important;
  }
}

@media (max-width: 768px) {
  .team-bar {
    width: 38px;
    padding: 2px;
  }

  .live-ranking {
    font-size: 26px;
    margin-bottom: 10px;
  }

  .team-bar-container {
    width: 380px;
    margin: 0 auto;
  }

  .team-bar img {
    width: 90%;
    margin: 0 auto;
  }

  .team-bar .bar span.total {
    vertical-align: super;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    white-space: nowrap;
    line-height: 35px;
  }

  .result-table td.result-team.logo {
    width: 60px;
    display: block;
  }

  .mobile-vote {
    display: block;
    padding-right: 5px;
  }

  .hero-text-box h3 {

    font-size: 40px !important;
    line-height: 36px !important;
    letter-spacing: 2px;
  }

}

@media (max-width: 400px) {
  .team-bar {
    width: 35px;
    padding: 1px;
  }
  .team-bar .bar span.total {
    line-height: 32px;
    bottom: 15px;
    font-size: 15px;
    font-weight: 400;
}
  .team-bar-container {
    width: 350px;
    margin: 0 auto;
  }
}
</style>