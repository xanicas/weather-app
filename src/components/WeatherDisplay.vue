<template>
    <div v-if="weather" class="weather-display">
        <div class="weather-condition">
            <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt="Weather Icon" />
            <h2>{{ weather.name }}</h2>
            <p>{{ weather.weather[0].description }}</p>
            <p>Temperature: {{ weather.main.temp }}°C</p>
        </div>
    </div>
    <p v-else-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
</template>

<script>
export default {
    props: {
        weather: Object,
        loading: Boolean,
        error: String,
    },
};
</script>