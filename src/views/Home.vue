<template>
  <CxkHeader/>
  <CxkAside/>
  <div class="context-box" :class="{'content-collapse': collapse}">
    <router-view></router-view>
  </div>
  <CxkAudio/>
</template>

<script lang="ts" setup>
import CxkHeader from "@/components/layouts/CxkHeader.vue"
import CxkAside from "@/components/layouts/CxkAside.vue";
import CxkAudio from "@/components/layouts/CxkAudio.vue";
import {ref} from "vue";
import emitter from "@/utils/emitter";

const collapse = ref(false);
emitter.on("collapse", (msg) => {
  collapse.value = msg as boolean;
});

</script>

<style scoped lang="less">
.content-box {
  position: absolute;
  left: 150px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  transition: left 0.3s ease-in-out;
  padding: 20px;
}
</style>