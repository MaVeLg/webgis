<template>
  <footer class="footer">
    <div class="footer-left">
      © 2025 
    </div>

    <div class="footer-right">
      <span v-if="coords">
      Länge: {{ format(coords.lng) }}°, Breite: {{ format(coords.lat) }}° | 
      </span>
      <span v-else></span>
      <span>Zoom-Stufe: {{ zoom?.toFixed(1) ?? '--' }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '../stores/useMapStore'

const mapStore = useMapStore()
const { coords, zoom } = storeToRefs(mapStore)

const format = (n: number) => n.toFixed(5)
const zoomText = computed(() => (zoom.value ? zoom.value.toFixed(1) : '--'))
</script>

<style scoped>
</style>
