<template>
  <div id="uesrtext">
    <textarea
      placeholder="按 Ctrl + Enter 发送"
      v-model="content"
      v-on:keyup="addMessage"
    ></textarea>
  </div>
</template>

<script>

export default {
  name: "uesrtext",
  data() {
    return {
      content: ""
    };
  },
  computed: {
    sessions() {
      return this.$store.getters.sessions;
    },
    currentSession() {
      return this.$store.getters.currentSession;
    },
    stomp() {
      return this.$store.getters.stomp;
    },
    username(){
      return this.$store.getters.name
    }
  },
  methods: {
    addMessage(e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        let msgObj = {};
        msgObj.to = this.currentSession.username;
        msgObj.content = this.content;
        this.stomp.send(
          "/ws/chat",
          {},
          JSON.stringify(msgObj)
        );
        this.$store.commit("chat/addMessage", msgObj);
        this.content = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #ddd;

  > textarea {
    padding: 10px;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
}
</style>
