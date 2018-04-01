<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Playground/>
    <Lifecycle :init-num="2" :class="'left'"/>
    <Lifecycle :init-num="3" :class="'right'"/>
    <AutoComplete :items="[
      'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple'
    ]" />
  </div>
</template>

<script>
import AutoComplete from "./components/InputAutoComplete.vue";
import Lifecycle from "./components/SandboxLifecycle.vue";
import Playground from "./components/SandboxPlayground.vue";

export default {
  name: "app",
  components: {
    AutoComplete,
    Lifecycle,
    Playground
  }
};
</script>

<style lang="scss">
#app {
  padding: 0.25em;
  &,
  * {
    font: normal 600 16px/1.5 BlinkMacSystemFont, -apple-system, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "kern";
    // user-select: none;
    &:focus {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      outline: 0;
    }
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    > * {
      flex-basis: auto;
    }
    &.left {
      justify-content: left;
    }
    &.right {
      justify-content: right;
    }
    &.center {
      justify-content: center;
    }
  }
  .ctrl {
    background: #fff;
    color: #333;
    border: solid 1px #666;
    border-radius: 0.25em;
    padding: 0.25em;
    margin: 0.25em;
    &:focus,
    &:active {
      background: #eee;
      box-shadow: 0 0 0 3px #9cf;
      border: solid 1px #333;
    }
    &.btn {
      cursor: pointer;
      padding: 0.25em 1em;
      text-decoration: none;
      background: #28a745;
      color: #fff;
      &:hover,
      &:focus,
      &:active {
        background: #363;
        box-shadow: 0 0 0 3px #9cf;
      }
    }
  }
  .box {
    padding: 0.25em 1em;
    margin: 0.25em;
  }
}
</style>
