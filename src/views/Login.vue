<template>
  <div class="login">
    <div class="float-login-box">
      <b-card>
        <template #header>
          <div style="display: inline-block; float: left">
            <h4 class="mb-0">人员登录</h4>
            <div style="font-size: 12px; color: gray">智能施工系统</div>
          </div>
        </template>
        <b-card-text>
          <!--用户名-->
          <b-form-group label="请输入用户名" description="用户名为公司统一注册">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="people"></b-icon>
              </b-input-group-prepend>
              <b-form-input placeholder="用户名"></b-form-input>
            </b-input-group>
          </b-form-group>

          <!--密码-->
          <b-form-group label="请输入密码" description="密码为必填项">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="key"></b-icon>
              </b-input-group-prepend>
              <b-form-input type="password" placeholder="密码"></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-card-text>

        <!--登录按钮-->
        <b-form-group>
          <b-button variant="success" style="width: 100%">
            登录
          </b-button>
        </b-form-group>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style>
.login {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 400px 0.1fr;
  grid-template-rows: 0.7fr auto 1fr;
  align-items: stretch;
}

.login::before {
  content: '';
  position: fixed;
  width: 100vw;
  height: 100vh;
  filter:blur(3px);
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../assets/images/background.png");
}

.float-login-box {
  grid-row-start: 2;
  grid-column-start: 2;
  height: 400px;
}

.float-login-box > div {
  height: 100%;
}
</style>