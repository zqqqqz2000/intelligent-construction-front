<template>
  <div class="sidebar">
    <slot name="header"></slot>
    <div v-for="item in data" :key="item.name" class="item"
         @click="currActive = item.name; firstActive_ = ''; item.click()"
         :class="{active: currActive === item.name || firstActive_ === item.name}">
      <div class="icon">
        <b-icon :icon="item.icon" font-scale="1.3"></b-icon>
      </div>
      <div class="name">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: ['data', 'firstActive'],
  data() {
    return {
      currActive: '',
      firstActive_: this.firstActive
    }
  }
}
</script>

<style scoped>
.active::before {
  content: '';
  width: 4px;
  height: 50px;
  position: absolute;
  background-color: #1fb33a;
  display: inline-block;
  left: 0;
}

.sidebar {
  float: left;
  width: 200px;
  height: 100vh;
  background-color: #353d44;
  display: inline-block;
}

.item {
  transition: .5s;
  height: 50px;
  line-height: 50px;
  color: white;
  /*text-align: center;*/
  padding-left: 30px;
  cursor: pointer;
}

.item:hover {
  background-color: #2c3138;
}

.icon {
  display: inline-block;
  margin-right: 10px;
}

.name {
  display: inline-block;
  font-size: 1.2em;
  font-weight: 500;
}
</style>