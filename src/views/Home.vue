<template>
    <div class="home-wrapper">
        <WeatherForm @city-submitted="fetchWeather" />
        <WeatherDisplay :weather="weatherData" />
    </div>
</template>

<script>
import { fetchWeather } from "../services/api";
import WeatherForm from "../components/WeatherForm.vue";
import WeatherDisplay from "../components/WeatherDisplay.vue";

export default {
    name: "HomePage",
    components: {
        WeatherForm,
        WeatherDisplay,
    },
    data() {
        return {
            weatherData: null,
            errorMessage: '',
        };
    },
    mounted() {
        this.getLocationWeather();
    },
    methods: {
        async fetchWeather(city) {
            try {
                this.weatherData = await fetchWeather(city);
            } catch (error) {
                console.error(error.message);
                alert("Unable to fetch weather data. Please try again.");
            }
        },
        async getLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        try {
                            const { latitude, longitude } = position.coords;
                            this.weatherData = await fetchWeather({ lat: latitude, lon: longitude });
                        } catch (error) {
                            this.errorMessage = "Unable to fetch weather data for your location.";
                        }
                    },
                    (error) => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                this.errorMessage = "User denied the request for Geolocation.";
                                break;
                            case error.POSITION_UNAVAILABLE:
                                this.errorMessage = "Location information is unavailable.";
                                break;
                            case error.TIMEOUT:
                                this.errorMessage = "The request to get user location timed out.";
                                break;
                            default:
                                this.errorMessage = "An unknown error occurred.";
                                break;
                        }
                    }
                );
            } else {
                this.errorMessage = "Geolocation is not supported by this browser.";
            }
        },
    }
};
</script>