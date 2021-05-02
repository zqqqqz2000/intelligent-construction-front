<template>
  <div>
    <div class="right-comm-user">
      <b-list-group style="max-width: 300px;">
        <div @click="currentUser = id" v-for="id in communicateUids" :key="id">
          <communicate-user :uid="id" :name-setter="nameSetter"></communicate-user>
        </div>
      </b-list-group>
    </div>
    <div class="center-comm-content">
      <div class="comm-header">{{ currentUsername }}</div>
      <div class="comm-words">
        <div v-for="(m, i) in messages[currentUser]" :key="i" style="width: 100%">
          <div v-for="(each, ii) in m.data" :key="ii" style="width: 100%">
            <div style="width: 100%; height: 100px; padding: 10px">
              <div
                  :style="{padding: '10px', float: !m['myself'] ? 'left': 'right', 'border-radius': '40px', 'background-color': '#1e6eff', 'color': 'white'}">
                {{ each }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comm-inputs">
        <label>
          <textarea v-model="beforeSendContent"></textarea>
        </label>
        <b-button variant="primary" size="sm" style="float: right; display: inline-block" @click="sendMessage">发送
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from "@/utils";
import CommunicateUser from "@/components/CommunicateUser";

export default {
  name: "Communicate",
  components: {CommunicateUser},
  mounted() {
    this.getCommunicateUids();
    this.timer = setInterval(this.getMessages, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    return {
      communicateUids: [],
      messages: {},
      currentUser: null,
      currentUsername: '-',
      timer: 0,
      beforeSendContent: "",
    }
  },
  methods: {
    log: console.log,
    nameSetter(usernameEach) {
      this.currentUsername = usernameEach;
    },
    sendMessage() {
      this.messages[this.currentUser] = [...this.messages[this.currentUser], {
        data: [this.beforeSendContent],
        myself: true
      }]
      api.bind(this)(
          '/communicate/send_message_to',
          {
            uid: this.currentUser,
            data: this.beforeSendContent,
          },
          () => {
            this.beforeSendContent = ''
          },
          true,
      )
    },
    getCommunicateUids() {
      api.bind(this)(
          '/communicate/get_chat_users',
          {},
          (response) => {
            let data = response.data;
            if (data.success) {
              this.communicateUids = data.uid;
            }
          },
          true,
      )
    },
    getMessages() {
      api.bind(this)(
          '/communicate/get_message_from',
          {
            uid: this.currentUser,
          },
          (response) => {
            let data = response.data;
            if (this.messages[this.currentUser] === undefined)
              this.messages[this.currentUser] = [];
            if (!data.data.length)
              return;
            this.messages[this.currentUser].push({data: data.data, myself: false});
            this.$forceUpdate();
          },
          true,
      )
    }
  }
}
</script>

<style scoped>
.right-comm-user {
  float: right;
  width: 300px;
  height: calc(100vh - 62px);
  border-left: 1px solid grey;
}

.center-comm-content {
  width: calc(100vw - 500px);
  height: 100%;
}

.comm-header {
  display: inline-block;
  line-height: 50px;
  vertical-align: center;
  padding-left: 10px;
  height: 50px;
  width: 100%;
  font-weight: 800;
  background-color: aliceblue;
}

.comm-words {
  width: 100%;
  height: 60vh;
  overflow: auto;
  max-height: 60vh;
  border-bottom: 1px solid darkgrey;
}

.comm-inputs {
  height: 100%;
}

.comm-inputs textarea {
  border: 0;
  display: inline-block;
  width: calc(100vw - 501px);
  height: calc(40vh - 160px);
  text-decoration: none;
  resize: none;
  outline: none;
}

</style>