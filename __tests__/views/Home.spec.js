import { mount } from "@vue/test-utils";
import HomePage from "@/views/Home.vue";
import WeatherForm from "@/components/WeatherForm.vue";
import WeatherDisplay from "@/components/WeatherDisplay.vue";
import CurrentWeatherDisplay from "@/components/CurrentWeatherDisplay.vue";
import { fetchWeather } from "@/services/api";
import { createPinia } from 'pinia';

jest.mock("@/services/api", () => ({
    fetchWeather: jest.fn(),
}));

let consoleErrorMock;

// Mock geolocation
beforeAll(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
    global.navigator.geolocation = {
        getCurrentPosition: jest.fn((success) =>
            success({
                coords: {
                    latitude: 52.5200,
                    longitude: 13.4050,
                }
            })
        ),
    };
});

afterAll(() => {
    consoleErrorMock.mockRestore();
});

describe("HomePage.vue", () => {
    let wrapper;

    beforeEach(() => {
        const pinia = createPinia();
        wrapper = mount(HomePage, {
            global: {
                plugins: [pinia],
                components: {
                    WeatherForm,
                    WeatherDisplay,
                    CurrentWeatherDisplay,
                },
            },
        });
    });

    it("renders the component with weather form and current weather display", () => {
        expect(wrapper.findComponent(WeatherForm).exists()).toBe(true);
        expect(wrapper.findComponent(CurrentWeatherDisplay).exists()).toBe(true);
    });

    it("calls fetchWeather method when city is submitted", async () => {
        const city = "London";
        const weatherResponse = { temperature: 22, condition: "Sunny" };

        fetchWeather.mockResolvedValue(weatherResponse);

        const weatherForm = wrapper.findComponent(WeatherForm);
        await weatherForm.vm.$emit("city-submitted", city);

        expect(fetchWeather).toHaveBeenCalledWith(city);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.weatherData).toEqual(weatherResponse);
    });

    it("handles error when fetchWeather fails", async () => {
        const city = "InvalidCity";

        fetchWeather.mockRejectedValue(new Error("Network error"));

        const weatherForm = wrapper.findComponent(WeatherForm);
        await weatherForm.vm.$emit("city-submitted", city);

        await wrapper.vm.$nextTick();

        expect(fetchWeather).toHaveBeenCalledWith(city);

        expect(wrapper.vm.weatherData).toBeNull();
    });

    it("displays weather data when fetchWeather succeeds", async () => {
        const city = "Berlin";
        const weatherResponse = { temperature: 10, condition: "Rainy" };

        fetchWeather.mockResolvedValue(weatherResponse);

        const weatherForm = wrapper.findComponent(WeatherForm);
        await weatherForm.vm.$emit("city-submitted", city);

        await wrapper.vm.$nextTick();

        const weatherDisplay = wrapper.findComponent(WeatherDisplay);
        expect(weatherDisplay.props().weather).toEqual(weatherResponse);
    });
});
