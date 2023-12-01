import Vue from "vue";
import "../../utils/stomp";
import SockJS from "../../utils/sockjs";
import { getAllStaff } from "../../api/user";

const state = {
  sessions: {},
  staffs: [],
  currentSession: null,
  filterKey: "",
  stomp: null,
  isDot: {}
};
const mutations = {
  changeCurrentSession(state, currentSession) {
    Vue.set(state.isDot, state.name + "#" + currentSession.name, false);
    state.currentSession = currentSession;
  },
  addMessage(state, msg) {
    let mss = state.sessions[state.name + "#" + msg.to];
    if (!mss) {
      // state.sessions[state.currentHr.username+'#'+msg.to] = [];
      Vue.set(state.sessions, state.name + "#" + msg.to, []);
    }
    state.sessions[state.name + "#" + msg.to].push({
      content: msg.content,
      date: new Date(),
      self: !msg.notSelf
    });
  },
  INIT_DATA(state) {
    let data = localStorage.getItem("vue-chat-session");
    console.log(data);
    if (data) {
      state.sessions = JSON.parse(JSON.stringify(data));
    }
  },
  INIT_STAFF(state, data) {
    console.log(data);
    state.staffs = data;
  }
};
const actions = {
  connect(context) {
    //收消息
    context.state.stomp = Stomp.over(new SockJS("/ws/ep"));
    context.state.stomp.connect(
      {},
      success => {
        //成功回调
        context.state.stomp.subscribe("/user/queue/chat", msg => {
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
              context.state.currentHr.username + "#" + receiveMsg.from,
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
      getAllStaff().then(response => {
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
