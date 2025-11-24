import { createRouter, createWebHistory } from 'vue-router'
import MainGame from "../views/MainGame.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: MainGame,
        }
    ],
})

export default router