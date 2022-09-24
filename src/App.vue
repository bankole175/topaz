<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

const path = computed(() => route.path)
</script>

<template>
  <div id="wrapper">
    <div class="hidden md:block">
      <RouterView name="sidebar" />
    </div>
    <div :class="{ 'md:ml-[276px] px-8': path !== '/login' }">
      <RouterView name="top" />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  height: 100%;
  overflow: hidden;
  width: 100%;
}
</style>
