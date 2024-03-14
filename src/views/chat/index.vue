<template>
  <div id="app">
    <div class="sidebar">
      <card></card>
      <list></list>
    </div>
    <div class="main">
      <message></message>
      <usertext></usertext>
    </div>
  </div>
</template>

<script>
import card from "../../components/Chat/card.vue";
import list from "../../components/Chat/list.vue";
import message from "../../components/Chat/message.vue";
import usertext from "../../components/Chat/usertext.vue";

export default {
  name: "index",
  data() {
    return {};
  },
  mounted: function() {
    this.$store.dispatch("chat/initData");
    this.$store.dispatch("chat/connect");
  },
  components: {
    card,
    list,
    message,
    usertext
  }
};
</script>

<style lang="scss" scoped>
#app {
  margin: 20px auto;
  width: 80%;
  height: 800px;
  overflow: hidden;
  border-radius: 10px;

  .sidebar,
  .main {
    height: 100%;
  }

  .sidebar {
    float: left;
    color: #f4f4f4;
    background-color: #2e3238;
    width: 200px;
  }

  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
}
</style>
