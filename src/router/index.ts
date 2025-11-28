import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalizedGeneric} from 'vue-router';
import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: 'Home',
                requiresAuth: false,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                title: 'Login',
                requiresAuth: false,
            },
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                title: 'Register',
                requiresAuth: false,
            },
        },
        {
            path: '/game',
            name: 'game',
            component: Game,
            meta: {
                title: 'Game',
                requiresAuth: true,
            },
        }
    ],
});

router.beforeEach((
    to: RouteLocationNormalizedGeneric, 
    _: RouteLocationNormalizedGeneric, 
    next: NavigationGuardNext
): void => {
    const loginStatus = false;
    
    document.title = (to.meta?.title as string) ?? 'MSCI';
    
    if (to.meta?.requiresAuth && !loginStatus) {
        router.push({
            path: 'login',
        }).then();
    }
        
    next();
});

export default router