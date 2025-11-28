<script setup lang="ts">
    import WebLayer from "../components/WebLayer.vue";
    import { ref } from "vue";
    import axiosClient from "../libs/AxiosClient.ts";
    import router from "../router";
    
    const username = ref<String>('');
    const email = ref<String>('');
    const password = ref<String>('');
    const confirmPassword = ref<String>('');

    const register = async () => {
        await axiosClient.post('/register', {
            username: username.value,
            email: email.value,
            password: password.value,
        }).then(res => {
            console.log(res.data);
            router.push({ name: 'login' });
        });
    }
</script>

<template>
    <WebLayer>
        <div class="min-h-screen flex justify-center items-center">
            <form
                method="post"
                class="flex flex-col justify-center p-4 border rounded-lg"
                @submit.prevent="register"
            >
                <div class="">
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        class="border p-2 rounded-lg"
                        v-model="username"
                    />
                </div>

                <div class="mt-3">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        class="border p-2 rounded-lg"
                        v-model="email"
                    />
                </div>

                <div class="mt-3">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        class="border p-2 rounded-lg"
                        v-model="password"
                    />
                </div>

                <div class="mt-3">
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        class="border p-2 rounded-lg"
                        v-model="confirmPassword"
                    />
                </div>

                <div class="mt-3 flex justify-center">
                    <button
                        class="px-3 py-2 bg-blue-500 rounded-lg"
                        type="submit"
                    >
                        Register
                    </button>
                </div>

                <div class="mt-2 text-sm">
                    Have an account?
                    <RouterLink
                        class="text-blue-700 hover:text-blue-300"
                        :to="{ name: 'login' }"
                    >
                        Login
                    </RouterLink> now!
                </div>
            </form>
        </div>
    </WebLayer>
</template>

<style scoped>

</style>