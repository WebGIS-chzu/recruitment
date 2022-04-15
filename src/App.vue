<template>
  <div id="app"  :key="key">
    <div class="header" v-if="$route.meta.keepAlive">
      <pageheader></pageheader>
    </div>
    <router-view />
    
  </div>
</template>

<script>
import pageheader from "../src/components/Header.vue";
export default {
  name: "App",
  components: {
    pageheader,
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      key: 1
    }
  },
  methods: {
    reload () {
      this.key++
    }
  }

};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-color:#183a56f5; */
  background-image: url("../src/assets/img/fq/bg3.png");
  background-size: 100% 100%;
  /* opacity: 0.6; /*透明度设置 */
  margin-top: 0px;
}
</style>
