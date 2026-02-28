import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'

// Создаём корневое Vue-приложение на основе компонента App
const app = createApp(App)

// Подключаем к приложению роутер (навигация между страницами)
app.use(router)

// Монтируем приложение в div с id="app" в index.html
app.mount('#app')
