
<template>
    <section
      class="u-align-center u-clearfix u-container-align-center-lg u-container-align-center-xl u-container-align-center-xs u-palette-5-dark-3 u-section-2"
      id="carousel_01c2"
    >
    {{teams}}
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div
          v-for="(team, index) in teams"
          :key="index"
          class="u-align-left u-border-5 u-border-no-bottom u-border-no-left u-border-no-right u-border-palette-1-base u-container-align-center u-container-style u-list-item u-repeater-item u-video-cover u-white u-list-item-5 animated customAnimationIn-played"
          data-animation-name="customAnimationIn"
          data-animation-duration="1500"
          data-animation-delay="500"
          data-animation-direction=""
          style="will-change: transform, opacity; animation-duration: 1500ms;"
        >
          <div class="u-container-layout u-similar-container u-valign-top u-container-layout-5">
            <span
              class="u-align-center u-file-icon u-icon u-text-palette-1-base u-icon-4"
              data-animation-name=""
              data-animation-duration="0"
              data-animation-delay="0"
              data-animation-direction=""
            >
              <img :src="team.logo" alt="" />
            </span>
            <h4 class="u-align-center u-text u-text-9">{{ team.name }}</h4>
            <a
              @click="vote(team.name)"
              class="u-active-black u-btn vote-btn u-button-style u-hover-black u-palette-1-base u-btn-2"
              >Vote</a
            >
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { defineComponent, ref, onMounted } from 'vue';
  
  defineComponent({
    name: 'TeamsList',
  
    data() {
    return {
      teams: [
        { name: 'Team 1', logo: 'path-to-logo-1.png' },
        { name: 'Team 2', logo: 'path-to-logo-2.png' },
        // Add more teams as needed
      ],
    };
  },

  methods: {
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
    // data: () => ({
    //     teams :[
    //     { name: 'AL RIYADI BASKETBALL', logo: 'https://staging.snipsbasketball.com/storage/general/al-riyadi-basketball-logo.png' },
    //     { name: 'BEIRUT', logo: 'https://staging.snipsbasketball.com/storage/general/beirut.png' },
    //     { name: 'Antranik', logo: 'https://staging.snipsbasketball.com/storage/general/antranik.png' },
    //     { name: 'Champville', logo: 'https://staging.snipsbasketball.com/storage/general/champvillelogo.png' },
    //     { name: 'Antonin', logo: 'https://staging.snipsbasketball.com/storage/general/antonin.png' },
    //     { name: 'CS Sagesse', logo: 'https://staging.snipsbasketball.com/storage/general/cs-sagesse-logo.png' },
    //     { name: 'Hmem', logo: 'https://staging.snipsbasketball.com/storage/general/hmemlogo2019.png' },
    //     { name: 'Hoops', logo: 'https://staging.snipsbasketball.com/storage/general/hoops-logo.png' },
    //     { name: 'Mayrouba', logo: 'https://staging.snipsbasketball.com/storage/general/mayrouba.png' },
    //     { name: 'NSA', logo: 'https://staging.snipsbasketball.com/storage/general/nsa.png' },

    //   ]
    // }),
    setup() {
      // Static list of teams
      const teams = ref(
        [
        { name: 'AL RIYADI BASKETBALL', logo: 'https://staging.snipsbasketball.com/storage/general/al-riyadi-basketball-logo.png' },
        { name: 'BEIRUT', logo: 'https://staging.snipsbasketball.com/storage/general/beirut.png' },
        { name: 'Antranik', logo: 'https://staging.snipsbasketball.com/storage/general/antranik.png' },
        { name: 'Champville', logo: 'https://staging.snipsbasketball.com/storage/general/champvillelogo.png' },
        { name: 'Antonin', logo: 'https://staging.snipsbasketball.com/storage/general/antonin.png' },
        { name: 'CS Sagesse', logo: 'https://staging.snipsbasketball.com/storage/general/cs-sagesse-logo.png' },
        { name: 'Hmem', logo: 'https://staging.snipsbasketball.com/storage/general/hmemlogo2019.png' },
        { name: 'Hoops', logo: 'https://staging.snipsbasketball.com/storage/general/hoops-logo.png' },
        { name: 'Mayrouba', logo: 'https://staging.snipsbasketball.com/storage/general/mayrouba.png' },
        { name: 'NSA', logo: 'https://staging.snipsbasketball.com/storage/general/nsa.png' },

      ]
      );
  
      const vote = async (teamName) => {
   
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
      };
  
      return {
        teams,
        vote,
      };
    },
  });
  </script>
  