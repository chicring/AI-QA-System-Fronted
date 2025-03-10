import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import VuetifyUseDialog from 'vuetify-use-dialog'

// print
import print from 'vue3-print-nb';

const app = createApp(App);

app.use(router);
app.use(PerfectScrollbarPlugin);
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(VueTablerIcons);
app.use(print);
app.use(VueApexCharts);
app.use(vuetify);
app.use(VuetifyUseDialog).mount('#app');
