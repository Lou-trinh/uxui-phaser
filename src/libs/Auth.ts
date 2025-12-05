import axiosClient from "./AxiosClient.ts";
import router from "../router";

export default {
    login: async function(
        username: string, 
        password: string, 
        remember: boolean = false,
        nextRoute: string = 'home'
    ): Promise<void> {
        await axiosClient.post('/login', {
            username: username,
            password: password,
        }).then(res => {
            const key = `authToken`;
            const token = res.data.token;

            if (remember) {
                localStorage.setItem(key, token);
            } else {
                sessionStorage.setItem(key, token);
            }

            router.push({
                name: nextRoute
            });
        });
    },
    
    register: async function (
        username: string,
        email: string,
        password: string
    ): Promise<void> {
        await axiosClient.post('/register', {
            username: username,
            email: email,
            password: password,
        }).then(res => {
            console.log(res);
            router.push({ name: 'login' });
        });
    },
    
    isLoggedIn: function(): boolean {
        const key = 'authToken';
        return !!localStorage.getItem(key) || !!sessionStorage.getItem(key);
    }
}