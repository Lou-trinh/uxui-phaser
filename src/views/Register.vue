<script setup lang="ts">
    import WebLayer from "../components/WebLayer.vue";
    import { ref } from "vue";
    import auth from "../libs/Auth.ts";
    
    const username = ref<String>('');
    const email = ref<String>('');
    const password = ref<String>('');
    const confirmPassword = ref<String>('');

    const register = () => auth.register(
        username.value.toString(),
        email.value.toString(),
        password.value.toString()
    );
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