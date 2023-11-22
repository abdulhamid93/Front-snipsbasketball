
<template>
  <div class="blog-slider u-repeater-teams" id="teams_01c3">
    <!-- <div class="u-container-layout u-valign-middle u-container-layout-1 u-align-center u-container-align-center">
      <h2 class="u-text u-text-1"> Vote Now</h2>
      <p class="u-large-text u-text u-text-variant u-text-2">Vote for Your Favorite Teams

      </p>
    </div> -->
    <div>
      <div class="blog-slider__item swiper-slide-active" v-for="(team, index) in teams" :key="index">
        <!-- <div class="blog-slider__img">

          <img :src="team.logo" alt="" />
        </div> -->
        <div class="blog-slider__content ">
          <img :src="team.logo" alt="" />
          <div class="blog-slider__title">{{ team.name }}</div>
          <span class="blog-slider__code">Last Voting: {{ team.updated_at }}</span>
          <!-- <div class="blog-slider__text">{{ team.summary }}</div> -->
          <a @click="openPopup(team)" class="blog-slider__button">VOTE NOW </a>
        </div>
      </div>
      <!-- <swiper-slide class="blog-slider__item swiper-slide">
        <div class="blog-slider__img">
          <img
            src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp"
            alt="">
        </div>
        <div class="blog-slider__content">
          <span class="blog-slider__code">26 December 2019</span>
          <div class="blog-slider__title">Lorem Ipsum Dolor2</div>
          <div class="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
            voluptate repellendus magni illo ea animi?</div>
          <a href="#" class="blog-slider__button">READ MORE</a>
        </div>
      </swiper-slide>

      <swiper-slide class="blog-slider__item swiper-slide">
        <div class="blog-slider__img">
          <img
            src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp"
            alt="">
        </div>
        <div class="blog-slider__content">
          <span class="blog-slider__code">26 December 2019</span>
          <div class="blog-slider__title">Lorem Ipsum Dolor</div>
          <div class="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
            voluptate repellendus magni illo ea animi?</div>
          <a href="#" class="blog-slider__button">READ MORE</a>
        </div>
      </swiper-slide> -->

    </div>
    <div class="blog-slider__pagination"></div>
  </div>
  <section
    class="u-align-center u-clearfix u-container-align-center-lg u-container-align-center-xl u-container-align-center-xs u-palette-5-dark-3 u-section-2"
    id="carousel_01c2">


    <div v-if="isPopupOpen" class="popup voting">
      <div class="popup-content">
        <h2>Welcome to Snips Basketball Voting Platform </h2>
        <hr>
        <div class="row info">
          <img :src="selectedTeam.logo" alt="" />
          <div class="info-content">
            <h3>{{ selectedTeam.name }}</h3>
            <p>{{ selectedTeam.summary }}</p>
          </div>
          <div class="total-votes">
            <span>Total Votes</span>
            {{ selectedTeam.total }}
          </div>
        </div>
        <div class="note note-warning">
          <p><i class="fa fa-info-circle "></i> Please note that the token is valid for a single use only.</p>
        </div>
        <!-- <p>Enter Code</p> -->
        <input v-model="mobile" type="text" placeholder="Enter your Mobile" />
        <input v-model="token" type="text" placeholder="Enter your Code" />
        <!-- Message Display -->
        <div v-if="isMessageVisible" :class="['message', messageType]">
          {{ message }}
        </div>
        <button class="btn submit blog-slider__button" @click="sendBroadcast(selectedTeam)">VOTE NOW</button>
        <button class="btn close" @click="isPopupOpen = false">X</button>
      </div>
    </div>
  </section>
</template>
  
<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { defineComponent, ref, onMounted } from 'vue';
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import { baseURL } from '@/config';
export default {

  name: 'TeamsListNew',

  data() {
    return {
      token: null,
      mobile: null,
      isPopupOpen: false,
      selectedTeam: null,
      message: '',
      isMessageVisible: false,
      messageType: '',
      teams: [
      ],
    };
  },



  created: function () {
    this.teams = inject('teams');
    // var swiper = new Swiper('.blog-slider', {
    //   spaceBetween: 30,
    //   effect: 'fade',
    //   loop: true,
    //   mousewheel: {
    //     invert: false,
    //   },
    //   // autoHeight: true,
    //   pagination: {
    //     el: '.blog-slider__pagination',
    //     clickable: true,
    //   }
    // });
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
          'https://staging.snipsbasketball.com/api/v1/vote',
          { team_id: team.id, mobile: this.mobile, token: this.token, ip: '192.0.0.0' }
        );
        //status
        console.log('response.data:', response.data.status);
        // Check the response status
        if (response.data.status == "error") {

          // Display error message with animation
          this.showMessage(response.data.message, 'error');
        } else if (response.data.status == "success") {
          // Display success message with animation
          this.mobile = null;
          this.token = null;
          this.showMessage(response.data.message, 'success');
          setTimeout(() => { this.isPopupOpen = false; }, 5000);

        }

      } catch (error) {
        console.error('Error sending broadcast:', error);
      }
    },
  },


};



</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");

* {
  box-sizing: border-box;
}

.blog-slider__content img {
  margin: 0 auto;
  width: 66%;
}

.blog-slider__content {
  text-align: center;
}

h2.p-title {
  margin-top: 0px;
  margin-bottom: 0px;
}

hr:not([size]) {
  height: 1px;
  background: #c8c3c3;
}

.note.note-warning {
  background-color: #faeaa9;
  border-color: #f3cc31;
  color: black;
}

.note {
  margin: 0 0 20px 0;
  padding: 5px 10px 5px 5px;
  border-left: 5px solid #eeeeee;
  border-radius: 0 4px 4px 0;
}

.note p {
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
}

.popup.voting img {
  width: 120px;
  height: 120px;
  margin-right: 20px;
}

.info {
  display: flex;
  position: relative;
}

.total-votes {
  position: absolute;
  right: 5px;
  box-shadow: 4px 13px 30px 1px rgba(0, 6, 56, 0.2);
  border-radius: 20px;
  width: 100px;
  height: 100px;
  color: #555;
  Padding: 10px;
  font-size: 24px;
  font-weight: bold;
}

.total-votes span {
  font-size: 14px;
  color: rgb(203, 205, 206);
}

.info img {
  position: absolute;
  left: 0
}

.info .info-content {
  text-align: left;
  padding-left: 130px;
  padding-right: 100px;
}

.blog-slider .blog-slider__button:hover {
  background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);

}

.popup-content {
  width: 65%;
}

.blog-slider .blog-slider__button {
  display: inline-flex;
  background-image: linear-gradient(147deg, #000 0%, #555 74%);
  padding: 7px 12px;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 14px;
}

.blog-slider .u-text.u-text-1 {
  font-weight: 400;
  font-size: 3rem;
  line-height: 1.1;
  margin-top: 50px;
  margin-bottom: 0px;
  text-transform: uppercase;
}

.blog-slider {
  width: 95%;
  position: relative;
  /* max-width: 800px; */
  margin: auto;


  transition: all 0.3s;
}

.blog-slider.u-repeater-teams {
  width: 96% !important;
}

.blog-slider .blog-slider__item {
  display: inline-block;
  width: 18%;
  background: #d1d3d4;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 12px;
  border-radius: 25px;
  min-height: 280px;
  margin-bottom: 33px;
  margin-right: 1%;
  margin-left: 1%;
  position: relative;
}

.blog-slider .blog-slider__img::after {
  background-image: linear-gradient(147deg, #f2f2f2 0%, #ffffff 74%);
  opacity: 0;
}

p.u-large-text {
  font-size: 1.2rem;
  margin-top: 10px;
  margin-bottom: 33px;
}

.blog-slider .blog-slider__img {
  width: 100px;
  flex-shrink: 0;
  height: 100px;
  background-image: linear-gradient(147deg, #f2f2f2 24%, #ffffff 74%);
  box-shadow: 4px 13px 30px 1px rgba(22, 56, 56, 0.2);
  border-radius: 20px;
  transform: translateX(30px);
  overflow: hidden;
  display: inline-block;
  position: absolute;
  right: 0;
  top: -15px;
}

.blog-slider .blog-slider__content {
  padding-left: 5px;
  width: calc(100% - 10px);
  padding-right: 5px;
}

.blog-slider .blog-slider__img img {
  padding: 5px;
  object-fit: contain;
}

@media screen and (max-width: 992px) {
  .blog-slider {
    max-width: 680px;
    height: 400px;
  }
}

@media screen and (max-width: 768px) {
  .blog-slider {
    min-height: 500px;
    height: auto;
    margin: 180px auto;
  }
}

@media screen and (max-height: 500px) and (min-width: 992px) {
  .blog-slider {
    height: 350px;
  }
}

.blog-slider__item {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .blog-slider__item {
    flex-direction: column;
  }
}

.blog-slider__item.swiper-slide-active .blog-slider__img img {
  opacity: 1;
  transition-delay: 0.3s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>* {
  opacity: 1;
  transform: none;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(1) {
  transition-delay: 0.3s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(2) {
  transition-delay: 0.4s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(3) {
  transition-delay: 0.5s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(4) {
  transition-delay: 0.6s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(5) {
  transition-delay: 0.7s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(6) {
  transition-delay: 0.8s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(7) {
  transition-delay: 0.9s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(8) {
  transition-delay: 1s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(9) {
  transition-delay: 1.1s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(10) {
  transition-delay: 1.2s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(11) {
  transition-delay: 1.3s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(12) {
  transition-delay: 1.4s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(13) {
  transition-delay: 1.5s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(14) {
  transition-delay: 1.6s;
}

.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(15) {
  transition-delay: 1.7s;
}

.blog-slider__img {
  width: 300px;
  flex-shrink: 0;
  height: 300px;
  background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
  box-shadow: 4px 13px 30px 1px rgba(252, 56, 56, 0.2);
  border-radius: 20px;
  transform: translateX(-80px);
  overflow: hidden;
}

.blog-slider__img:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
  border-radius: 20px;
  opacity: 0.8;
}

.blog-slider__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  border-radius: 20px;
  transition: all 0.3s;
}

@media screen and (max-width: 768px) {
  .blog-slider__img {
    transform: translateY(-50%);
    width: 90%;
  }
}

@media screen and (max-width: 576px) {
  .blog-slider__img {
    width: 95%;
  }
}

@media screen and (max-height: 500px) and (min-width: 992px) {
  .blog-slider__img {
    height: 270px;
  }
}

.blog-slider__content {
  padding-right: 25px;
}

@media screen and (max-width: 768px) {
  .blog-slider__content {
    margin-top: -80px;
    text-align: center;
    padding: 0 30px;
  }
}

@media screen and (max-width: 576px) {
  .blog-slider__content {
    padding: 0;
  }
}

.blog-slider__content>* {
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.4s;
}

.blog-slider__code {
  color: #7b7992;
  margin-bottom: 15px;
  display: block;
  font-weight: 500;
  font-size: 12px;
}

.blog-slider__title {
  font-size: 24px;
  font-weight: 700;
  color: #0d0925;
  margin-bottom: 10px;
}

.blog-slider__text {
  color: #4e4a67;
  margin-bottom: 10px;
  line-height: 1.2em;
  min-height: 99px;
}


.blog-slider__button {
  display: inline-flex;
  background-image: linear-gradient(147deg, #000 12%, #555 74%);
  padding: 15px 35px;
  border-radius: 50px;
  color: #fff;
  box-shadow: 0px 14px 80px rgba(22, 56, 56, 0.4);
  text-decoration: none;
  font-weight: 500;
  justify-content: center;
  text-align: center;
  letter-spacing: 1px;
}

@media screen and (max-width: 576px) {
  .blog-slider__button {
    width: 100%;
  }
}

.blog-slider .swiper-container-horizontal>.swiper-pagination-bullets,
.blog-slider .swiper-pagination-custom,
.blog-slider .swiper-pagination-fraction {
  bottom: 10px;
  left: 0;
  width: 100%;
}

.blog-slider__pagination {
  position: absolute;
  z-index: 21;
  right: 20px;
  width: 11px !important;
  text-align: center;
  left: auto !important;
  top: 50%;
  bottom: auto !important;
  transform: translateY(-50%);
}

@media screen and (max-width: 768px) {
  .blog-slider__pagination {
    transform: translateX(-50%);
    left: 50% !important;
    top: 205px;
    width: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.blog-slider__pagination.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 8px 0;
}

@media screen and (max-width: 768px) {
  .blog-slider__pagination.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 5px;
  }

  .blog-slider .blog-slider__item {
    display: inline-block;
    width: 99%;
  }

  .blog-slider__content {
    margin-top: 10px;
  }

  .hero-text-style-2 {

    font-size: 40px !important;

  }

  .blog-slider__text {

    min-height: 70px;
  }

  .hero-text-style-1.text-primary1 {
    font-size: 40px !important;
    margin-top: 0.1em !important;
  }

  .blog-slider {
    min-height: 500px;
    height: auto;
    margin: 50px auto;
  }

  popup-content {

    min-width: 90%;

    width: 90%;
  }
}

.blog-slider__pagination .swiper-pagination-bullet {
  width: 11px;
  height: 11px;
  display: block;
  border-radius: 10px;
  background: #062744;
  opacity: 0.2;
  transition: all 0.3s;
}

.blog-slider__pagination .swiper-pagination-bullet-active {
  opacity: 1;
  background: #fd3838;
  height: 30px;
  box-shadow: 0px 0px 20px rgba(252, 56, 56, 0.3);
}

@media screen and (max-width: 768px) {
  .blog-slider__pagination .swiper-pagination-bullet-active {
    height: 11px;
    width: 30px;
  }
}</style>