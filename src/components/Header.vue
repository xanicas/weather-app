<template>
    <header class="app-header">
        <div class="wrapper">
            <h1 @click="backHomePage">Weather App</h1>
            <nav>
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/about">About</router-link></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'HeaderComponent',
    setup() {
        const router = useRouter();
        const route = useRoute();

        const backHomePage = () => {
            if (route.path !== '/') {
                router.push({ name: 'Home' });
            }
        };

        return {
            backHomePage,
        };
    },
};
</script>
