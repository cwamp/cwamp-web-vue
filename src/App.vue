<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Button type="primary">hshsh</Button>
  </div>
</template>

<script>
import { Button } from "ant-design-vue";
export default {
  name: "App",
  components: {
    Button
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
