import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { option } from '@primeuix/themes/aura/autocomplete'
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        option: {
            darkModeSelector: ".my-dark",
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue'
            }
        }
    },    
});
app.use(router)
app.use(createPinia().use(piniaPluginPersistedstate))

app.use(ConfirmationService);
app.use(DialogService);
app.use(ToastService);
app.mount('#app')
