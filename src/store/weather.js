import { defineStore } from "pinia";
import { fetchWeather } from "@/services/api";

export const useWeatherStore = defineStore("weather", {
    state: () => ({
        weatherData: null,
        currentWeatherData: null,
    }),
    actions: {
        async fetchCurrentWeather() {
            if (this.currentWeatherData) return;

            if (navigator.geolocation) {
                try {
                    const position = await new Promise((resolve, reject) =>
                        navigator.geolocation.getCurrentPosition(resolve, reject)
                    );
                    const { latitude, longitude } = position.coords;
                    const data = await fetchWeather({ lat: latitude, lon: longitude });
                    this.currentWeatherData = data;
                } catch (error) {
                    console.error("Failed to fetch current weather:", error);
                }
            } else {
                console.warn("Geolocation is not supported by this browser.");
            }
        },
    },
});
