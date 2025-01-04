import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import HeaderComponent from '@/components/Header.vue';

// Mock routes for testing
const routes = [
    { path: '/', name: 'Home', component: { template: '<div>Home Page</div>' } },
    { path: '/about', name: 'About', component: { template: '<div>About Page</div>' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

describe('HeaderComponent', () => {
    beforeEach(async () => {
        router.push('/');
        await router.isReady();
    });

    it('renders the header title and navigation links', () => {
        const wrapper = mount(HeaderComponent, {
            global: {
                plugins: [router],
            },
        });

        expect(wrapper.find('h1').text()).toBe('Weather App');
        expect(wrapper.find('nav ul li:first-child').text()).toBe('Home');
        expect(wrapper.find('nav ul li:last-child').text()).toBe('About');
    }); 

    it('does not navigate when already on the home page', async () => {
        const wrapper = mount(HeaderComponent, {
            global: {
                plugins: [router],
            },
        });

        await wrapper.find('h1').trigger('click');
        expect(router.currentRoute.value.path).toBe('/');
    });
});
