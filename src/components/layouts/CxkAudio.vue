<template>
  <audio controls="controls" preload="true" v-if="url" :ref="player" :src="attachImageUrl(url)" @canplay="startPlay"
         @ended="ended"></audio>
</template>

<script lang="ts" setup>
import {computed, getCurrentInstance, ref, watch} from "vue";
import {useStore} from "vuex";
import api from "@/api";

const {proxy} = getCurrentInstance()
const store = useStore()
const divRef = ref<HTMLAudioElement>()
const player = (el: HTMLAudioElement | undefined) => divRef.value = el

const url = computed(store.getters.url)
const isPlay = computed(store.getters.isPlay)


// 监听播放还是暂停
watch(isPlay, () => {
  togglePlay();
});

// 开始/暂停
function togglePlay() {
  isPlay.value ? divRef.value?.play() : divRef.value?.pause()
}

// 获取歌曲链接后准备播放
function startPlay() {
  divRef.value?.play();
}

// 音乐播放结束时触发
function ended() {
  proxy.$store.commit("setIsPlay", false);
}

//获取图片信息
function attachImageUrl(url: string) {
  api.attachImageUrl(url)
}

</script>

<style scoped>

</style>