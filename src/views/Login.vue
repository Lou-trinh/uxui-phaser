<script setup lang="ts">
    import WebLayer from "../components/WebLayer.vue";
    import { onMounted, ref} from "vue";
    import { useRoute } from "vue-router";
    import auth from "../libs/Auth.ts";
    import router from "../router";
    
    const username = ref<String>('');
    const password = ref<String>('');
    const remember = ref<Boolean>(false);

    const nextRoute: string = useRoute().query.next as string ?? 'home';
    
    const login = () => auth.login(
        username.value.toString(),
        password.value.toString(),
        remember.value == true,
        nextRoute
    );
    
    onMounted(() => {
        if (auth.isLoggedIn()) {
            router.push({
                name: nextRoute
            })
        }
    })
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