<template>
  <div id="app">
    <app-header />
    <div class="main-size">
      <router-view />
    </div>
    <app-footer />
  </div>
</template>
<script>
import appHeader from "@/cmps/app-header";
import appFooter from "@/cmps/app-footer";

export default {
  components: {
    appHeader,
    appFooter,
  },
};
</script>
