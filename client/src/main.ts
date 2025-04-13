import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import './assets/styles/global.css';
import './assets/styles/fonts.css';


const pinia = createPinia();
const app = createApp(App);

app.use(pinia).mount('#app');
