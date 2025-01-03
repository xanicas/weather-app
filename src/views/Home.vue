<template>
    <div class="home-wrapper">
        <div class="left-panel">
            <CurrentWeatherDisplay />
        </div>
        <div class="right-panel">
            <WeatherForm @city-submitted="fetchWeather" />
            <WeatherDisplay :weather="weatherData" />
        </div>
    </div>
</template>

<script>
import { fetchWeather } from "@/services/api";
import WeatherForm from "@/components/WeatherForm.vue";
import WeatherDisplay from "@/components/WeatherDisplay.vue";
import CurrentWeatherDisplay from "@/components/CurrentWeatherDisplay.vue";

export default {
    name: "HomePage",
    components: {
        WeatherForm,
        WeatherDisplay,
        CurrentWeatherDisplay,
    },
    data() {
        return {
            weatherData: null,
            loading: false,
        };
    },
    methods: {
        async fetchWeather(city) {
            this.loading = true;
            try {
                const weather = await fetchWeather(city);
                this.weatherData = weather;
            } catch (error) {
                console.error(error.message);
                alert("Unable to fetch weather data. Please try again.");
            } finally {
                this.loading = false;
            }
        }
    },
};
</script>