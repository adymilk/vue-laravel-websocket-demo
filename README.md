# Vue 监听 laravel-Websocket示例

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### some important config by yourself
````js
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'b3CnDSGvJUDhqqEJekBddzUh',// replace your PUSHER_APP_KEY,location laravel root .env
  wsHost: '127.0.0.1',//127.0.0.1 // replace your laravel-websocket host
  cluster: 'ap3',
  wsPort: 6001,
  forceTLS: false,
});
````


### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
