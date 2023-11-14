<template>
    <div class="home">
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script setup>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import styles from './assfoo.module.css'
import { defineComponent } from 'vue';

defineComponent({
    name: 'Home',
    components: {
        HelloWorld,
    },
});
</script>
