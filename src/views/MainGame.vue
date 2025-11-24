<script setup lang="ts">
import { ref } from 'vue';
import PhaserGame from "../components/PhaserGame.vue";

const phaserRef = ref();
</script>

<template>
    <PhaserGame ref="phaserRef"/>
</template>

<style scoped>
</style>