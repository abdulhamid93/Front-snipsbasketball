<template>
    <div class="home">
        <main msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script setup>
// @ is an alias to /src
import HelloWorld from '@/components/MainComp.vue';

import { defineComponent } from 'vue';

defineComponent({
    name: 'Home',
    components: {
        HelloWorld,
    },
});
</script>
