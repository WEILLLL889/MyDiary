
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './output.css' // 如果你已经生成了 Tailwind 的输出 CSS

createApp(App).use(router).mount('#app')
