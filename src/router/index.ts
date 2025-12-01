import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalizedGeneric} from 'vue-router';
import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import auth from "../libs/Auth.ts";

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
    document.title = to.meta?.title as string ?? 'MSCI';
    
    if (to.meta?.requiresAuth && !auth.isLoggedIn()) {
        router.push({
            path: 'login',
            query: {
                next: to.name?.toString()
            }
        }).then();
    }
        
    next();
});

export default router