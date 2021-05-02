<template>
  <div class="communicate-user" @click="nameSetter(username)">
    <b-list-group-item class="d-flex align-items-center">
      <b-avatar variant="success" icon="people-fill" class="mr-3"></b-avatar>
      <span class="mr-auto">{{ role }}({{ username }})</span>
      <b-badge>{{ messagesNum }}</b-badge>
    </b-list-group-item>
  </div>
</template>

<script>
import {api} from "@/utils";

export default {
  name: "CommunicateUser",
  props: ['uid', 'nameSetter'],
  mounted() {
    this.getUserInfo(this.uid);
    this.timer = setInterval(() => {
      this.getUserInfo(this.uid);
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    return {
      username: '-',
      messagesNum: '0',
      name: '-',
      role: '-',
      timer: 0,
    }
  },
  methods: {
    getUserInfo(uid) {
      api.bind(this)(
          '/communicate/get_communicate_account_info',
          {
            uid
          },
          (response) => {
            let data = response.data;
            if (data.success) {
              this.username = data.info.username;
              this.name = data.info.name;
              this.role = data.info.role;
              this.messagesNum = data.info.message_num;
            }
          },
          true,
      )
    }
  }
}
</script>

<style scoped>
.communicate-user {
  cursor: pointer;
}
</style>