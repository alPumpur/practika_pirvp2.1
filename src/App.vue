<template>
  <router-view/>
</template>

<script>
import store from "@/store";
export default {
  computed: {
    store() {
      return store
    }
  },
}
</script>

<style>
#app {
  font-family: FreeMono, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
  color: #2c3e50;
}


</style>