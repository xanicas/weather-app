import { mount } from '@vue/test-utils';
import CurrentWeatherDisplay from '@/components/CurrentWeatherDisplay.vue';
import { useWeatherStore } from '@/store/weather';
import WeatherCondition from '@/components/WeatherCondition.vue';

jest.mock('@/store/weather', () => ({
    useWeatherStore: jest.fn(),
}));

describe('CurrentWeatherDisplay', () => {
    let weatherStoreMock;

    beforeEach(() => {
        weatherStoreMock = {
            currentWeatherData: null,
            fetchCurrentWeather: jest.fn(),
        };
        useWeatherStore.mockReturnValue(weatherStoreMock);
    });

    it('shows a loader while fetching weather data', async () => {
        weatherStoreMock.currentWeatherData = null;
        weatherStoreMock.fetchCurrentWeather.mockResolvedValueOnce();

        const wrapper = mount(CurrentWeatherDisplay);

        expect(wrapper.find('.loader-container').exists()).toBe(true);
        expect(wrapper.find('.loader').exists()).toBe(true);
        expect(wrapper.text()).toContain('Loading current location...');
    });

    it('displays weather data after fetching it', async () => {
        const mockWeatherData = {
            name: 'London',
            weather: [
                { description: 'Clear sky', icon: '01d' },
            ],
            main: { temp: 15 },
        };

        weatherStoreMock.currentWeatherData = mockWeatherData;
        weatherStoreMock.fetchCurrentWeather.mockResolvedValueOnce();

        const wrapper = mount(CurrentWeatherDisplay);

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.loader-container').exists()).toBe(false);
        expect(wrapper.findComponent(WeatherCondition).exists()).toBe(true);

        expect(wrapper.find('h1').text()).toBe('My location');
        expect(wrapper.find('.description').text()).toBe('Clear sky');
        expect(wrapper.find('.temperature').text()).toBe('Temperature: 15°C');
    });
});
