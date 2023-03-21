import Vue from 'vue'
import App from './App.vue'
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');


Vue.config.productionTip = false

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'b3CnDSGvJUDhqqEJekBddzUh',// replace your PUSHER_APP_KEY,location laravel root .env
  wsHost: '127.0.0.1',//127.0.0.1 // replace your laravel-websocket host
  cluster: 'ap3',
  wsPort: 6001,
  forceTLS: false,
});


new Vue({
  render: h => h(App),
}).$mount('#app')

