import { mount } from '@vue/test-utils';
import WeatherForm from '@/components/WeatherForm.vue';

describe('WeatherForm.vue', () => {
    it('should render the form and input elements correctly', () => {
        const wrapper = mount(WeatherForm);

        const form = wrapper.find('form');
        expect(form.exists()).toBe(true);

        const input = wrapper.find('input[type="text"]');
        expect(input.exists()).toBe(true);

        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
        expect(button.text()).toBe('Get Weather');
    });

    it('should emit the "city-submitted" event with the correct city when the form is submitted', async () => {
        const wrapper = mount(WeatherForm);

        const city = 'London';
        await wrapper.setData({ city });

        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.emitted('city-submitted')).toBeTruthy();
        expect(wrapper.emitted('city-submitted')[0]).toEqual([city]);
    });

    it('should not emit the "city-submitted" event when the input is empty', async () => {
        const wrapper = mount(WeatherForm);

        await wrapper.setData({ city: '' });

        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.emitted('city-submitted')).toBeFalsy();
    });
});
