<template>
    <section class="section hero-section bg-image context-dark">
        <div class="container">
            <div class="row">
                <div class="col-xl-7 col-lg-8 col-md-9 col-sm-10">
                    <div class="hero-text-box">
                        <h1 class="hero-text-style-1">Welcome to</h1>
                        <h2 class="hero-text-style-2">Snips Basketball </h2>
                        <div class="hero-text-box-bottom"><span class="hero-text-style-2">Voting</span><span
                                class="hero-text-style-1 text-primary1">Platform</span></div>
                        <p>At Snips Basketball, we bring the thrill of the game to your fingertips. Our voting platform
                            allows you to actively participate in the excitement of basketball competitions. Whether you're
                            a die-hard fan or a casual observer, your voice matters.</p><a class="btn btn-primary"
                            href="#teams_01c3">Vote Now !</a>
                    </div>
                </div>
            </div>
        </div>
        <ul class="hero-soc">
            <li><a class="icon fa-facebook-f" href="#"></a></li>
            <li><a class="icon fa-twitter" href="#"></a></li>
            <li><a class="icon fa-instagram" href="#"></a></li>
        </ul>
    </section>
    <br><br>
    <!-- <Countdown></Countdown> -->
    <News @open-popup-in-c2="openPopupInC2"></News>

    <TeamsListNew></TeamsListNew>
    <!-- <TeamsList></TeamsList> -->
  
    <div class="go_top" :class="{ 'show_go_top': showGoTop }" @click="goToTop">
        <img src="https://staging.snipsbasketball.com/storage/general/top1.png" alt="basketball-sroll-to-up">
    </div>
</template>


<script>
import logoSvg from '@/assets/logo.svg';
import TeamsList from './TeamsList.vue'
import TeamsListNew from './TeamsListNew.vue'
import Countdown from './Countdown.vue'
import TeamsResultsModal from './TeamsResultsModal.vue'
import News from './News.vue'
import { defineComponent } from 'vue';
import { inject } from 'vue';
import { onMounted, onBeforeUnmount, ref } from 'vue';

export default {
    data() {
        return {
            openPopupInC2: ref(false),
            teams: [
            ],
            showGoTop: false,
        };
    },
    components: { TeamsList, TeamsResultsModal, News, TeamsListNew,Countdown },
    mounted() {
        console.log('test on mounted');
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.handleScroll);
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', this.handleScroll);
        }
    },
    methods: {
        openPopupInC2(value) {
            this.openPopupInC2 = value;
        },
        handleScroll() {
            const scrollThreshold = 200;
            this.showGoTop = window.scrollY > scrollThreshold;
        },
        goToTop() {
            // Smooth scroll to the top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },
};
</script>
