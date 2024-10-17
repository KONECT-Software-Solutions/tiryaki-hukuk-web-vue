import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router';
import store from './store';
import VueCountdown from '@chenfengyuan/vue-countdown';



createApp(App).use(router).use(store).mount('#app')
