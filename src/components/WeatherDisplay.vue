<template>
    <div class="weather-display">
        <WeatherCondition v-if="weather && Object.keys(weather).length" :weather="weather" />
        <p v-else-if="error">{{ error }}</p>
    </div>
</template>

<script>
import WeatherCondition from "@/components/WeatherCondition.vue";

export default {
    props: {
        weather: Object,
        error: String,
    },
    components: { WeatherCondition },
};
</script>