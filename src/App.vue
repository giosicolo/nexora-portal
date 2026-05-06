<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --cream: #faf6f0;
  --warm-white: #fffdf9;
  --blush: #e8c4b8;
  --rose: #c4756a;
  --deep-rose: #8b3a3a;
  --charcoal: #2c2c2c;
  --soft-gray: #888;
  --border: rgba(196, 117, 106, 0.25);
}

html, body {
  height: 100%;
  background: var(--cream);
  color: var(--charcoal);
  font-family: 'DM Mono', monospace;
  -webkit-font-smoothing: antialiased;
}

#app {
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
