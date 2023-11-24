<template>
    <section class="Shop-container " id="" data-image-width="1980">
        <div class="Shop-title center">
            <a href="http://shop.difcogroup.com/" class="Shop-logo">
                <img src="https://staging.snipsbasketball.com/storage/general/shipping.png" alt="snipsbasketball"
                    height="60">
                <span style="font-size:22px;margin-left: 20px;color:#000;text-transform: uppercase;">Shop Now At Difco Delivery</span>
            </a>
        </div>
    </section>

    <!-- <section class="section hero-section bg-image context-dark">
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
    </section> -->

    <!-- <Countdown></Countdown> -->
    <News @open-popup-in-c2="openPopupInC2"></News>
    <br><br>
    <TeamsListNew></TeamsListNew>
    <!-- <TeamsList></TeamsList> -->
    <section class="Download-container " id="" data-image-width="1980">
        <div class="Download-title center">
            <div class="Download-logo" >
                <div>
                    <img src="https://staging.snipsbasketball.com/storage/general/shipping.png" alt="snipsbasketball"
                        height="80">
                </div>
                <div>
                    <span style="margin-left: 20px;color:#555">Download the DIFCO DELIVERY App</span>
                    <div class="stores">
                        <a target="_blank" href="https://apps.apple.com/lb/app/difco-delivery/id1566110141"> <img src="https://staging.snipsbasketball.com/storage/general/app.png" alt="snipsbasketball"
                            height="40"></a>
                       <a target="_blank" href="https://play.google.com/store/apps/details?id=com.in2uitions.difco"><img src="https://staging.snipsbasketball.com/storage/general/google.png" alt="snipsbasketball"
                            height="40"></a> 
                    </div>

                </div>

            </div>
        </div>
    </section>
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
    components: { TeamsList, TeamsResultsModal, News, TeamsListNew, Countdown },
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
<style>
.Shop-container {
    background: #a6a6a6;
    padding: 5px;
}
.Download-container{
    background: #fff;
    padding: 5px;
}
.Shop-container img ,.Download-container img{
    border-radius: 5px;
}
.Download-container .stores img{
    padding: 0px;
    margin: 12px;
    border-radius: 5px;
}
.Download-container .Download-logo{
    display: flex;
    margin-top: 20px;
}
.Shop-title.center,.Download-title.center {
    display: table;
    margin: 0 auto;
    font-weight: bold;
}

.Shop-title.center span {
    font-weight: bold;
}
</style>
