<template>
  <div id="list">
    <ul style="padding-left: 0px">
      <li
        v-for="item in staffs"
        :class="{
          active: true
        }"
        v-on:click="changeCurrentSession(item)"
      >
        <img class="avatar" src="" :alt="item.name" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      username: this.$store.state.user.name
    };
  },
  computed: {
    staffs() {
      console.log(this.$store.getters.staffs)
      return this.$store.getters.staffs;
    },
    currentSession() {
      return this.$store.getters.currentSession;
    }
  },
  methods: {
    changeCurrentSession(currentSession) {
      this.$store.commit("chat/changeCurrentSession", currentSession);
      console.log(currentSession);
    }
  }
};
</script>

<style lang="scss" scoped>
#list {
  li {
    padding: 16px 15px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    list-style: none;

    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }

  li.active {
    /*注意这个是.不是冒号:*/
    background-color: rgba(255, 255, 255, 0.1);
  }

  .avatar {
    border-radius: 2px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  .name {
    display: inline-block;
    margin-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
}
</style>
