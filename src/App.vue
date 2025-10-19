<!-- src/App.vue -->
<template>
  <router-view />
</template>

<script setup lang="ts">
// Keine Logik nötig – alles steckt in den Views (z. B. MapPage, LoginPage)
</script>

<style>
:root {
  --header-h: 56px;   /* passe an deine HeaderBar-Höhe an */
  --footer-h: 40px;
}

html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
}
</style>

