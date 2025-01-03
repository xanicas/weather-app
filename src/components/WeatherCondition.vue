<template>
    <div class="weather-card">
        <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt="Weather Icon"
            class="weather-icon" />
        <div class="weather-details">
            <h2>{{ weather.name }}</h2>
            <p class="description">{{ weather.weather[0].description }}</p>
            <p class="temperature">Temperature: {{ Math.round(weather.main.temp) }}°C</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        weather: {
            type: Object,
            required: true,
        },
    },
};
</script>
