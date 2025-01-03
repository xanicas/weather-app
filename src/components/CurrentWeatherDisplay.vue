<template>
    <div class="current-weather-display">
        <div v-if="loading" class="loader-container">
            <div class="loader" />
            <p>Loading current location...</p>
        </div>
        <div v-else-if="currentWeather">
            <h1 class="my-location-heading">My location</h1>
            <WeatherCondition :weather="currentWeather"/>
        </div>
        <p v-else>Error fetching current weather.</p>
    </div>
</template>

<script>
import { useWeatherStore } from "@/store/weather";
import WeatherCondition from "@/components/WeatherCondition.vue";
import { computed, onMounted, ref } from "vue";

export default {
    name: "CurrentWeatherDisplay",
    components: { WeatherCondition },
    setup() {
        const weatherStore = useWeatherStore();
        const loading = ref(true);

        onMounted(async () => {
            if (!weatherStore.currentWeatherData) {
                await weatherStore.fetchCurrentWeather();
            }
            loading.value = false;
        });

        const currentWeather = computed(() => weatherStore.currentWeatherData);

        return { currentWeather, loading };
    },
};
</script>
