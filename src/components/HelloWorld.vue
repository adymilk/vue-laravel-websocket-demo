<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ desc }}</p>
    <div>
      <img v-for="(image, index) in OTGraphs" :key="index" :src="image" alt="Image">
      <div class="OTTitle">{{ OTTitle }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    desc: String,
  },
  data() {
    return {
      OTGraphs: [],
      OTTitle: '',
      channel_id: 56, //change your channel_id from minitab api
    }
  },
  mounted() {
    window.Echo.channel('channel-analytics-' + this.channel_id)
        .listen('.BroadcastAnalysisResults', (e) => {
          console.log(e);
          this.OTGraphs = []
          this.OTGraphs.push(e.OTGraph)
          this.OTTitle = e.OTTitle
        });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img{
  max-width: 60%;
  float: left;
}
.OTTitle{
  white-space: pre-wrap
}
</style>
