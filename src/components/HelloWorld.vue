<template>
  <div style="display: flex">
    <div class="hello" style="flex: 1">
      <h1>{{ msg }}</h1>
      <p><a href="https://github.com/adymilk/vue-laravel-websocket-demo">点击获取本工具源代码</a></p>
      <div class="input-group">
        <label for="appKey">KEY:</label>
        <input type="text" id="appKey" v-model="appKey" required>
      </div>
      <div class="input-group">
        <label for="wsHost">wsHost:</label>
        <input type="text" id="wsHost" v-model="wsHost" required>
      </div>
      <div class="input-group">
        <label for="channel">channel:</label>
        <input type="text" id="channel" v-model="channel" required>
      </div>
      <div class="input-group">
        <label for="wsPort">Port:</label>
        <input type="number" id="wsPort" v-model="wsPort" required>
      </div>
      <div class="input-group">
        <label for="forceTLS">Force TLS:</label>
        <input type="checkbox" id="forceTLS" v-model="forceTLS">
      </div>
      <p><i>{{ isConnected ? '服务器连接成功✅！' : '连接已断开' }}</i></p>

      <button @click="toggleConnection">
        {{ isConnected ? '断开连接' : '连接服务器' }}
      </button>


    </div>

    <div id="right" style="flex: 1; padding: 10px">
      <h2>服务器返回数据</h2>
      <JsonViewer
          style="text-align: left"
          :value="jsonData"
          :expand-depth=5
          copyable
          boxed
          sort></JsonViewer>
<!--      <div>-->
<!--        <img v-for="(image, index) in graphsData" :key="index" :src="image" alt="Image">-->
<!--        <div class="OTTitle">{{ OTTitle }}</div>-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>

import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

import JsonViewer from 'vue-json-viewer'
export default {
  name: 'HelloWorld',
  components:{
    JsonViewer
  },
  props: {
    msg: String,
  },
  data() {
    return {
      graphsData: [],
      OTTitle: '',
      jsonData: '连接已断开，请先建立连接后等待服务器返回数据',
      appKey: 'b3CnDSGvJUDhqqEJekBddzUh',
      wsHost: '222.71.235.219',
      cluster: 'ap3',
      wsPort: 6001,
      forceTLS: false,
      channel: 'public',
      isConnected: false, // Add a property to track the connection status.
    };
  },

  methods: {
    toggleConnection() {
      if (!this.isConnected) {
        if (!this.appKey || !this.wsHost || !this.cluster || !this.wsPort) {
          alert('Please fill in all required fields.');
          return;
        }


        // Initialize the Echo object with the updated configuration.
        window.Echo = new Echo({
          broadcaster: 'pusher',
          key: this.appKey,
          wsHost: this.wsHost,
          cluster: this.cluster,
          wsPort: this.wsPort,
          forceTLS: this.forceTLS,
        });

        // Connect to the socket.
        // window.Echo.connect();

        // Set the isConnected property to true.
        this.isConnected = true;
        window.Echo.channel(this.channel)
            .listen('BroadcastAnalysisResults', (e) => {
              console.log(e);
              this.jsonData = e
              this.graphsData = []
              this.graphsData.push(e.OTGraph)
              this.OTTitle = e.OTTitle
            });
        this.jsonData = '请在 Apifox 上发起一次接口请求后，就可以在这里看到服务器返回的数据啦✨'

      } else {
        // Disconnect from the socket.
        window.Echo.disconnect();
        this.jsonData = '连接已断开，请先建立连接后等待服务器返回数据'

        // Set the isConnected property to false.
        this.isConnected = false;
      }
    },
  },
  mounted() {

  },
};
</script>

<style scoped>
.hello {
  font-family: Arial, sans-serif;
  float: left;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

#right img{
  max-width: 100%;
}

.input-group {
  margin-bottom: 10px;
  display: flex; /* Display label and input in the same row */
  align-items: center; /* Center align elements vertically */
}

label {
  width: 180px; /* Adjust width as needed */
  margin-right: 10px; /* Add space between label and input */
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

input[type="checkbox"] {
  margin-right: 5px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.OTTitle {
  white-space: pre-wrap;
}
</style>
