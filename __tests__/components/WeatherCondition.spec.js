import { mount } from '@vue/test-utils';
import WeatherCondition from '@/components/WeatherCondition.vue';

describe('WeatherCondition', () => {
    it('renders weather card with valid weather data', () => {
        const weatherData = {
            name: 'London',
            weather: [
                { description: 'Clear sky', icon: '01d' },
            ],
            main: { temp: 15 },
        };

        const wrapper = mount(WeatherCondition, {
            propsData: {
                weather: weatherData,
            },
        });

        expect(wrapper.find('h2').text()).toBe('London');
        expect(wrapper.find('.description').text()).toBe('Clear sky');
        expect(wrapper.find('.temperature').text()).toBe('Temperature: 15°C');

        const img = wrapper.find('img');
        expect(img.attributes('src')).toBe('https://openweathermap.org/img/wn/01d@2x.png');
    });

    it('does not render weather card when weather data is missing', () => {
        const wrapper = mount(WeatherCondition, {
            propsData: {
                weather: {},
            },
        });

        expect(wrapper.find('.weather-card').exists()).toBe(false);
    });

    it('does not render weather card when weather.weather is undefined', () => {
        const weatherData = {
            name: 'London',
            weather: undefined,
            main: { temp: 15 },
        };

        const wrapper = mount(WeatherCondition, {
            propsData: {
                weather: weatherData,
            },
        });

        expect(wrapper.find('.weather-card').exists()).toBe(false);
    });

    it('rounds temperature to the nearest integer', () => {
        const weatherData = {
            name: 'Paris',
            weather: [
                { description: 'Partly cloudy', icon: '02d' },
            ],
            main: { temp: 19.7 },
        };

        const wrapper = mount(WeatherCondition, {
            propsData: {
                weather: weatherData,
            },
        });

        expect(wrapper.find('.temperature').text()).toBe('Temperature: 20°C');
    });
});
