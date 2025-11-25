<script setup lang="ts">
    import { ref } from 'vue';
    import PhaserGame from "../components/PhaserGame.vue";
    import GameLayer from "../components/GameLayer.vue";
    
    const phaserRef = ref();
</script>

<template>
    <GameLayer>
        <PhaserGame ref="phaserRef"/>
    </GameLayer>
</template>

<style scoped>
</style>