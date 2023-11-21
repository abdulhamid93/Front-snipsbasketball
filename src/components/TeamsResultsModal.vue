<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2 class="p-title"><img src="https://staging.snipsbasketball.com/storage/general/snips-logo.png"
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

import { defineComponent, ref, onMounted } from 'vue';
import LaravelEcho from "laravel-echo"
import Pusher from 'pusher-js';
import { inject } from 'vue';
import eventBus from './../eventBus';

import { useRoute } from 'vue-router';
import { baseURL } from '@/config';
export default {

    name: 'TeamsResultsModal',

    data() {
        return {
            token: null,
            tokenExists: false,
            showModal: true,
            teams: [
            ],
        };
    },
    props: {
        openPopupInC2: Boolean, // Receive the prop indicating whether to open the popup
    },
    watch: {
        openPopupInC2(newVal) {
            this.showModal = newVal; // Update local state when the prop changes
        },
    },
    created: function () {
        this.teams = inject('teams');
        // this.showModal = inject('openPopupInC2')
        this.sortTeamsByTotal();
    },

    mounted: function () {
        //     eventBus.on('open-popup-in-c2', function (showModal) {
        //         this.showModal=showModal;
        // });
        const route = useRoute();
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
        channel.listen('.vote.updated', (event) => {
            this.message = event.message;
            this.results = event.teams.teams;
            this.teams = event.teams.teams;
            this.sortTeamsByTotal();
            console.log('this.teams');
            console.log(this.teams);
            console.log('this.teams');

        });

    },
    methods: {
        closeModal() {
            this.showModal = false;
        },
        calculatePercentage(total) {
            const totalPoints = this.teams.reduce((total, team) => total + team.total, 0);
            return ((total / totalPoints) * 100).toFixed(2);
        },
        sortTeamsByTotal() {
            // Sort teams array by total property
            this.teams.sort((a, b) => b.total - a.total);
        }
    },


};



</script>

<style>
.result-bar {
    position: relative;
    width: 100%;
    height: 20px;
    background-color: #ddd;
    display: inline-block;
}

.p-title {
    margin-top: 10px;
    margin-bottom: 10px;
}

.bar-fill {
    /* position: absolute; */
    height: 20px;
    background-color: #4caf50;
    transition: width 0.5s ease;
    display: inline-block;
}

.result-team img {}

.result-team span {
    font-weight: 900;
    margin-left: 15px;
}

/* Add your styling for the modal here */
.modal {
    display: block !important;
    ;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 800px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    /* border: 1px solid #ddd; */
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

.modal-content .close {
    width: 20px;
    position: absolute;
    right: 10px;
    top: 0;
}</style>