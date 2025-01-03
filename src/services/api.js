import axios from "axios";

const API_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.VUE_APP_OPENWEATHER_API_KEY;

export const fetchWeather = async (cityOrCoordinates) => {
    try {
        let params = {
            appid: API_KEY,
            units: 'metric',
        }

        if (typeof cityOrCoordinates === 'string') {
            params.q = cityOrCoordinates;
        } else if (cityOrCoordinates.lat && cityOrCoordinates.lon) {
            params.lat = cityOrCoordinates.lat;
            params.lon = cityOrCoordinates.lon;
        }

        const response = await axios.get(`${API_URL}/weather`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
