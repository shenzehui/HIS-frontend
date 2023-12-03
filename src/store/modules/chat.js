import Vue from "vue";
import "../../utils/stomp";
import SockJS from "../../utils/sockjs";
import { getAllStaff } from "../../api/user";
import userStore from "../../store/modules/user";

const state = {
  sessions: [],
  staffs: [],
  currentSession: null,
  filterKey: "",
  stomp: null,
  isDot: {}
};
const mutations = {
  changeCurrentSession(state, currentSession) {
    Vue.set(
      state.isDot,
      userStore.state.name + "#" + currentSession.name,
      false
    );
    state.currentSession = currentSession;
  },
  addMessage(state, msg) {
    let mss = state.sessions[userStore.state.name + "#" + msg.to];
    if (!mss) {
      // state.sessions[state.currentHr.username+'#'+msg.to] = [];
      Vue.set(state.sessions, userStore.state.name + "#" + msg.to, []);
    }
    state.sessions[userStore.state.name + "#" + msg.to].push({
      content: msg.content,
      date: new Date(),
      self: !msg.notSelf
    });
  },
  INIT_DATA(state) {
    // let data = localStorage.getItem("vue-chat-session");
    // if (data) {
    //   state.sessions = JSON.parse(JSON.stringify(data));
    // }
  },
  INIT_STAFF(state, data) {
    state.staffs = data;
  }
};
const actions = {
  connect(context) {
    var options = {
      headers: {
        token: userStore.state.token
      }
    };
    //收消息
    context.state.stomp = Stomp.over(new SockJS("/ws/ep", null, options));
    context.state.stomp.connect(
      {},
      success => {
        //成功回调
        context.state.stomp.subscribe("/queue/chat", msg => {
          //订阅（需要添加/usr前缀）
          let receiveMsg = JSON.parse(msg.body);
          if (
            !context.state.currentSession ||
            receiveMsg.from !== context.state.currentSession.username
          ) {
            Notification.info({
              title: "【" + receiveMsg.fromNickname + "】发来一条消息",
              message:
                receiveMsg.content.length > 10
                  ? receiveMsg.content.substring(0, 10)
                  : receiveMsg.content,
              position: "bottom-right"
            });
            Vue.set(
              context.state.isDot,
              context.state.name + "#" + receiveMsg.from,
              true
            );
          }
          receiveMsg.notSelf = true;
          receiveMsg.to = receiveMsg.from;
          context.commit("addMessage", receiveMsg);
        });
      },
      error => {
        console.log("websocket连接失败");
      }
    );
  },
  initData(context) {
    context.commit("INIT_DATA");
    return new Promise((resolve, reject) => {
      getAllStaff()
        .then(response => {
          console.log(response);
          if (response) {
            context.commit("INIT_STAFF", response.data);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
