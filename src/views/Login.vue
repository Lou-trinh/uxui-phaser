<script setup lang="ts">
    import WebLayer from "../components/WebLayer.vue";
    import { ref } from "vue";
    import axiosClient from "../libs/AxiosClient.ts";
    
    const username = ref<String>('');
    const password = ref<String>('');
    const remember = ref<Boolean>(false);
    
    const login = async () => {
        await axiosClient.post('/login', {
            username: username.value,
            password: password.value,
        }).then(res => {
            const saveKey: string = `${username.value}-${window.location.hostname}-auth-token`;
            const token = res.data.token;
            
            if (remember.value) {
                localStorage.setItem(saveKey, token);
            } else {
                sessionStorage.setItem(saveKey, token);
            }
        });
    }
</script>

<template>
    <WebLayer>
        <div class="min-h-screen flex justify-center items-center">
            <form 
                method="post"
                class="flex flex-col justify-center p-4 border rounded-lg"
                @submit.prevent="login"
            >
                <div class="">
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        class="border p-2 rounded-lg w-full"
                        v-model="username"
                    />
                </div>

                <div class="mt-3">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        class="border p-2 rounded-lg w-full"
                        v-model="password"
                    />
                </div>
                
                <div class="mt-3">
                    <input
                        type="checkbox" 
                        name="rememberMe" 
                        id="rememberMe"
                        class="mr-3"
                        v-model="remember"
                    >
                    <label for="rememberMe">Remember me</label>
                </div>
                
                <div class="mt-3 flex justify-center">
                    <button 
                        class="px-3 py-2 bg-blue-500 rounded-lg" 
                        type="submit"
                    >
                        Login
                    </button>
                </div>
                
                <div class="mt-2 text-sm">
                    Does not have an account? 
                    <RouterLink 
                        class="text-blue-700 hover:text-blue-300"
                        :to="{ name: 'register' }"
                    >
                        Register
                    </RouterLink> now!
                </div>
            </form>
        </div>
    </WebLayer>
</template>

<style scoped>

</style>