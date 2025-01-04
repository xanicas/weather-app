import { mount } from '@vue/test-utils';
import AboutPage from '@/views/About.vue';

describe('AboutPage.vue', () => {
    it('renders the About page correctly', () => {
        const wrapper = mount(AboutPage);

        expect(wrapper.find('h1').text()).toBe('About');
        expect(wrapper.find('p').text()).toBe('This is a simple weather app built with Vue 3.');
        expect(wrapper.classes()).toContain('about-wrapper');
    });
});
