import { mount } from '@vue/test-utils';
import WeatherDisplay from '@/components/WeatherDisplay.vue';
import WeatherCondition from '@/components/WeatherCondition.vue';

describe('WeatherDisplay.vue', () => {
    it('renders WeatherCondition when valid weather data is passed', () => {
        const weatherData = {
            weather: [{ description: 'clear sky', icon: '01d' }],
            main: { temp: 298.15 },
            name: 'London',
        };

        const wrapper = mount(WeatherDisplay, {
            propsData: { weather: weatherData },
        });

        const weatherCondition = wrapper.findComponent(WeatherCondition);
        expect(weatherCondition.exists()).toBe(true);

        expect(weatherCondition.props().weather).toEqual(weatherData);
    });

    it('displays error message if error prop is passed', () => {
        const error = 'Error fetching weather data';
        
        const wrapper = mount(WeatherDisplay, {
            propsData: { error },
        });

        expect(wrapper.text()).toContain(error);
    });

    it('does not render WeatherCondition when weather is empty or invalid', () => {
        const wrapper = mount(WeatherDisplay, {
            propsData: { weather: {} },
        });

        expect(wrapper.findComponent(WeatherCondition).exists()).toBe(false);
    });

    it('does not render WeatherCondition when weather is an empty array', () => {
        const wrapper = mount(WeatherDisplay, {
            propsData: { weather: [] },
        });

        expect(wrapper.findComponent(WeatherCondition).exists()).toBe(false);
    });

    it('displays error message when weather is null and error is provided', () => {
        const error = 'Error fetching weather data';
        
        const wrapper = mount(WeatherDisplay, {
            propsData: { weather: null, error },
        });

        expect(wrapper.text()).toContain(error);
    });
});
