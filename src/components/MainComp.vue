<template>
    <section class="Shop-container " id="" data-image-width="1980">
        <div class="Shop-title center">
            <a href="http://shop.difcogroup.com/" class="Shop-logo">
                <img src="../assets/img/logo-Difco Delivery.png" alt="snipsbasketball" height="60">
                <span style="font-size:22px;margin-left: 20px;color:#000;text-transform: uppercase;">Shop Now At Difco
                    Delivery</span>
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

    <TeamsListNew></TeamsListNew>
    <section class="text-container ">
        <p>
          {{ snips_description }}

        </p>

    </section>


    <section class="Download-container " id="" data-image-width="1980">
        <div class="Download-title center">
            <div class="Download-logo">
                <div>
                    <img src="../assets/img/logo-Difco Delivery.png" alt="snipsbasketball" height="65">
                </div>
                <div class="stores-cc">
                    <span style="    
    color: #000;
    font-weight: 400;
    font-size: 16.5px;">Download the DIFCO DELIVERY App</span>
                    <div class="stores">
                        <a target="_blank" :href="app_store_link"> <img
                                src="https://app.snipsbasketball.com/storage/general/app.png" alt="snipsbasketball"
                                height="37"></a>
                        <a target="_blank" :href="google_play_link"><img
                                src="https://app.snipsbasketball.com/storage/general/google.png" alt="snipsbasketball"
                                height="37"></a>
                    </div>

                </div>

            </div>
        </div>
    </section>
    <div class="go_top" :class="{ 'show_go_top': showGoTop }" @click="goToTop">
        <img src="./../assets/img/basketball-loop.gif" alt="basketball-sroll-to-up">
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
            snips_description:'',
            hero_img:'',
            hero_img_mobile:'',
            app_store_link:'',
            google_play_link:'',
        };
    },
    components: { TeamsList, TeamsResultsModal, News, TeamsListNew, Countdown },
    mounted() {
        this.app_store_link = inject('app_store_link');
        this.google_play_link = inject('google_play_link');

        this.snips_description = inject('snips_description');
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
.text-container {
    width: 80%;
    padding: 18px 12px;
    margin: 0 auto;
    padding-bottom: 0;
}

.text-container p {
    width: 80%;
    padding: 0 20px;
    text-align: center;
    margin: 0 auto;
}

.Shop-container {
    background: #a6a6a6;
    padding: 5px;
}

.Download-container {
    background: #fff;
    padding: 5px;
}

.Shop-container img,
.Download-container img {
    border-radius: 5px;
}

.Download-container .stores img {
    padding: 0px;
    margin: 12px;
    border-radius: 5px;
}

.Download-container .Download-logo {
    display: flex;
    margin-top: 40px;
    margin-bottom: 50px;
}

.Shop-title.center,
.Download-title.center {
    display: table;
    margin: 0 auto;
    font-weight: bold;
}

.Shop-title.center span {
    font-weight: bold;
}

@media (min-width: 768px) {

    .stores-cc {
        margin-left: 15px;
    }

    .Download-container .stores img {
        padding: 0px;
        margin: 2px;
        border-radius: 5px;
    }

    .page-copyright ul li {
        font-weight: 400 !important;
    }

    .hero-section .hero-text-box {
        margin-top: 20% !important;
    }

}

@media (max-width: 600px) {
    .text-container {
    width: 100%;
    
}

.text-container p {
    width: 90%;
    margin-bottom: 45px;
    
}
    .section.hero-section .hero-text-box h3 {
        color: #ffffff;
        font-size: 27px !important;
        line-height: 27px !important;
        letter-spacing: 0px !important;
        padding-left: 8px !important;
    }

    .Download-container .Download-logo {


        margin-top: 5px;
    }
}

@media (max-width: 400px) {
    .section.hero-section .hero-text-box h3 {
        color: #ffffff;
        font-size: 26px !important;
        line-height: 26px !important;
        letter-spacing: 0px !important;
    }

}</style>
