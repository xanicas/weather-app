<template>
    <div class="weather-form">
        <form @submit.prevent="submitCity">
            <input type="text" v-model="city" placeholder="Search for a city or location to get their weather" required />
            <button type="submit">Get Weather</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            city: "",
        };
    },
    emits: ["city-submitted"],
    methods: {
        submitCity() {
            this.$emit("city-submitted", this.city);
        },
    },
};
</script>
