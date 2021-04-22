<template>
  <div>
    <div class="right-comm-user">
      <b-list-group style="max-width: 300px;">
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar class="mr-3"></b-avatar>
          <span class="mr-auto">J. Circlehead</span>
          <b-badge>5</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="primary" text="BV" class="mr-3"></b-avatar>
          <span class="mr-auto">BootstrapVue</span>
          <b-badge>12</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="info" src="https://placekitten.com/300/300" class="mr-3"></b-avatar>
          <span class="mr-auto">Super Kitty</span>
          <b-badge>9</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="success" icon="people-fill" class="mr-3"></b-avatar>
          <span class="mr-auto">ACME group</span>
          <b-badge>7</b-badge>
        </b-list-group-item>
      </b-list-group>
    </div>
    <div class="center-comm-content">
      <div class="comm-header">联系人1</div>
      <div class="comm-words"></div>
      <div class="comm-inputs">
        <label>
          <textarea></textarea>
        </label>
        <b-button variant="primary" size="sm" style="float: right; display: inline-block">发送</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Communicate"
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
  border-bottom: 1px solid darkgrey;
}

.comm-inputs {
  height: 100%;
}

.comm-inputs textarea {
  border: 0;
  display: inline-block;
  width: calc(100vw - 501px);
  height: 140px;
  text-decoration: none;
  outline: none;
}

</style>