<script setup lang="ts">

import WebLayer from "../components/WebLayer.vue";
</script>

<template>
    <WebLayer>
        <RouterLink class="hover:text-blue-300" :to="{
            name: 'game',
        }">Play</RouterLink>
    </WebLayer>
</template>

<style scoped>

</style>