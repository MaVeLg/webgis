// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/base.css';
import { pinia } from './pinia' 
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css'

const app = createApp(App)

app.use(pinia)   // zuerst Pinia (falls Router-Guards Stores nutzen)
app.use(router)

app.config.errorHandler = (err, instance, info) => {
  // optional: hilft, White-Screen-Fehler schneller zu sehen
  console.error('[Vue error]', err, info)
}

app.mount('#app')

