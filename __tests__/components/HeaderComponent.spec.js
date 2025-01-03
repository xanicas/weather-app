import { createApp } from 'vue';
import { mount } from '@vue/test-utils';
import HeaderComponent from '../HeaderComponent.vue';

test('renders HeaderComponent', () => {
  const app = createApp(HeaderComponent); // create Vue app instance
  const wrapper = mount(HeaderComponent, {
    global: {
      plugins: [app] // You may add any necessary plugins here
    }
  });
  expect(wrapper.exists()).toBe(true); // Test that the component renders
});
