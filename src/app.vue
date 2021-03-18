<template>
  <div id="app">
    <app-header/>
    <div class="main-size">
      <router-view />
    </div>
  </div>
</template>
<script>
import appHeader from "@/cmps/app-header";

export default {
  
  components: {
    appHeader,
  },
};
</script>
