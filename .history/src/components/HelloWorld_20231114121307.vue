<template>
    <section class="u-clearfix u-image u-shading u-section-1" id="carousel_55e3" data-image-width="1980"
        data-image-height="1320">

        <div class="container">
            <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-xl u-sheet-1">
                <div class="u-container-style u-expanded-width-xs u-group u-white u-group-1"
                    data-animation-name="customAnimationIn" data-animation-duration="1500">
                    <div class="u-container-layout u-valign-middle u-container-layout-1">
                        <h2 class="u-text u-text-default u-text-1"> Ready for more ?</h2>
                    </div>
                </div>
                <p class="u-large-text u-text u-text-body-alt-color u-text-variant u-text-2"
                    data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="500"> We're
                    working on something awesome! <br>Stay tuned for our
                    basketball updates </p>

                <a href="#carousel_01c2" class="u-active-black u-btn u-button-style u-hover-black u-palette-1-base u-btn-2"
                    data-animation-name="" data-animation-duration="0" data-animation-delay="0"
                    data-animation-direction="">Vote Now </a>
            </div>
        </div>
    </section>
    <TeamsList></TeamsList>
    <v-row class="text-center">
        <!-- <v-col cols="12">
                <v-img :src="logoSvg" class="my-3" contain height="200" />
            </v-col> -->


        <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">
                Welcome to Vuetify
            </h1>

            <p class="subheading font-weight-regular">
                For help and collaboration with other Vuetify developers,
                <br />please join our online
                <a href="https://community.vuetifyjs.com" target="_blank">Discord Community</a>
            </p>
        </v-col>

        <v-col class="mb-5" cols="12">
            <h2 class="headline font-weight-bold mb-3">
                What's next?
            </h2>

            <v-row justify="center">
                <a v-for="(next, i) in whatsNext" :key="i" :href="next.href" class="subheading mx-3" target="_blank">
                    {{ next.text }}
                </a>
            </v-row>
        </v-col>

        <v-col class="mb-5" cols="12">
            <h2 class="headline font-weight-bold mb-3">
                Important Links
            </h2>

            <v-row justify="center">
                <a v-for="(link, i) in importantLinks" :key="i" :href="link.href" class="subheading mx-3" target="_blank">
                    {{ link.text }}
                </a>
            </v-row>
        </v-col>

        <v-col class="mb-5" cols="12">
            <h2 class="headline font-weight-bold mb-3">
                Ecosystem
            </h2>

            <v-row justify="center">
                <a v-for="(eco, i) in ecosystem" :key="i" :href="eco.href" class="subheading mx-3" target="_blank">
                    {{ eco.text }}
                </a>
            </v-row>
        </v-col>
    </v-row>
</template>

<script setup>
import logoSvg from '@/assets/logo.svg';
import TeamsList from './TeamsList.vue'
import { defineComponent } from 'vue';
defineComponent({
    name: 'HelloWorld',

    data: () => ({
        ecosystem: [
            {
                text: 'vuetify-loader',
                href: 'https://github.com/vuetifyjs/vuetify-loader',
            },
            {
                text: 'github',
                href: 'https://github.com/vuetifyjs/vuetify',
            },
            {
                text: 'awesome-vuetify',
                href: 'https://github.com/vuetifyjs/awesome-vuetify',
            },
        ],
        importantLinks: [
            {
                text: 'Documentation',
                href: 'https://vuetifyjs.com',
            },
            {
                text: 'Chat',
                href: 'https://community.vuetifyjs.com',
            },
            {
                text: 'Made with Vuetify',
                href: 'https://madewithvuejs.com/vuetify',
            },
            {
                text: 'Twitter',
                href: 'https://twitter.com/vuetifyjs',
            },
            {
                text: 'Articles',
                href: 'https://medium.com/vuetify',
            },
        ],
        whatsNext: [
            {
                text: 'Explore components',
                href: 'https://vuetifyjs.com/components/api-explorer',
            },
            {
                text: 'Select a layout',
                href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
            },
            {
                text: 'Frequently Asked Questions',
                href:
                    'https://vuetifyjs.com/getting-started/frequently-asked-questions',
            },
        ],
    }),
});
</script>
