
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
          <h2 class="u-text u-text-1"> Vote Now</h2>
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
            <h4 class="u-align-center u-text u-text-9">{{ team.name }}</h4>
            <a @click="openPopup(team)"
              class="u-active-black u-btn vote-btn u-button-style u-hover-black u-palette-1-base u-btn-2">Vote</a>
            
          </div>
        </div>
      </div>

    </div>
    <div v-if="isPopupOpen" class="popup">
      <div class="popup-content">
        <h2>Vote for {{ selectedTeam.name }}</h2>
        <img :src="selectedTeam.logo" alt="" />
        <!-- <p>Enter Code</p> -->
        <input v-model="name" type="text" placeholder="Enter your Full Name (ادخل الأسم الكامل)" />
        <input v-model="mobile" type="text" placeholder="Enter your Mobile (ادخل رقم الموبايل)" />
        <input v-model="token" type="text" placeholder="Enter your Code (ادخل الكود)" />
        <!-- Message Display -->
        <div v-if="isMessageVisible" :class="['message', messageType]">
          {{ message }}
        </div>
        <button class="btn submit" @click="sendBroadcast(selectedTeam)">Vote</button>
        <button class="btn close" @click="isPopupOpen = false">X</button>
      </div>
    </div>
  </section>
</template>
  
<script>
import axios from 'axios';
import { defineComponent, ref, onMounted } from 'vue';
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import { baseURL } from '@/config';
export default {

  name: 'TeamsList',

  data() {
    return {
      token: null,
      mobile: null,
      isPopupOpen: false,
      selectedTeam: null,
      message:'',
      isMessageVisible: false,
      messageType: '',
      teams: [
      ],
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
  },
  methods: {
    openPopup(team) {
      this.isPopupOpen = true;
      this.selectedTeam = team;
    },
    showMessage(message, type) {
      this.message = message;
      this.messageType = type; // 'success' or 'error'
      this.isMessageVisible = true;

      // Hide the message after a delay (adjust as needed)
      setTimeout(() => {
        this.isMessageVisible = false;
      }, 5000); // 3000 milliseconds = 3 seconds, adjust as needed
    },
    async sendBroadcast(team) {
      console.log('Broadcasting for team:', team);
      try {
        const response = await axios.post(
          'https://app.snipsbasketball.com/api/v1/vote',
          { team_id: team.id,name:this.name,mobile:this.mobile, token: this.token, ip: '192.0.0.0' }
        );
        //status
        console.log('response.data:', response.data.status);
        // Check the response status
        if (response.data.status == "error") {
          
          // Display error message with animation
          this.showMessage(response.data.message, 'error');
        } else if (response.data.status == "success") {
          // Display success message with animation

          this.showMessage(response.data.message, 'success');
          setTimeout(() => { this.isPopupOpen = false;}, 5000);
         
        }

      } catch (error) {
        console.error('Error sending broadcast:', error);
      }
    },
  },


};



</script>
  