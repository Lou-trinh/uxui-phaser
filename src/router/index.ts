import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalizedGeneric} from 'vue-router';
import HomeView from "../views/HomeView.vue";
import GameView from "../views/GameView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                title: 'Home',
                requiresAuth: false,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: {
                title: 'Login',
                requiresAuth: false,
            },
        },
        {
            path: '/game',
            name: 'game',
            component: GameView,
            meta: {
                title: 'Game',
                requiresAuth: true,
            },
        }
    ],
});

router.beforeEach((
    to: RouteLocationNormalizedGeneric, 
    _, 
    next: NavigationGuardNext
): void => {
    const loginStatus = true;
    
    document.title = (to.meta?.title as string) ?? 'MSCI';
    
    if (to.meta?.requiresAuth && !loginStatus) {
        router.push({
            path: 'login',
        }).then();
    }
        
    next();
});

export default router