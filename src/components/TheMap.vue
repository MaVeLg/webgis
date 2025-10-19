<!-- src/components/TheMap.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
import { useMapStore } from '@/stores/useMapStore'
import type { LngLatLike, MapStyle } from 'maplibre-gl'

// WICHTIG: MapLibre-CSS global einbinden
import 'maplibre-gl/dist/maplibre-gl.css'

// Props: Style, Center, Zoom, usw.
const props = withDefaults(
  defineProps<{
    containerId?: string
    style?: string | MapStyle
    center?: LngLatLike
    zoom?: number
    interactive?: boolean
    // Wenn true, wird bei Container-Resize automatisch map.resize() aufgerufen
    autoResize?: boolean
  }>(),
  {
    containerId: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: () => [8.6821, 50.1109] as LngLatLike,
    zoom: 10,
    interactive: true,
    autoResize: true,
  },
)

const mapEl = ref<HTMLElement | null>(null)
const store = useMapStore()
let ro: ResizeObserver | null = null

onMounted(async () => {
  await nextTick()
  if (!mapEl.value) return

  // Map initialisieren
  await store.initMap(mapEl.value, {
    style: props.style,
    center: props.center,
    zoom: props.zoom,
    interactive: props.interactive,
  })

  // Optional: automatisches Resize bei Container-Änderung
  if (props.autoResize && 'ResizeObserver' in window) {
    ro = new ResizeObserver(() => store.resize())
    ro.observe(mapEl.value)
  }
})

// Props dynamisch reagieren lassen (leichtgewichtig)
watch(
  () => props.style,
  async (val) => {
    if (store.isReady && val) {
      await store.setStyle(val)
    }
  },
)

watch(
  () => props.center,
  (val) => {
    if (store.isReady && val) store.setCenter(val)
  },
)

watch(
  () => props.zoom,
  (val) => {
    if (store.isReady && typeof val === 'number') store.setZoom(val)
  },
)

onBeforeUnmount(() => {
  ro?.disconnect()
  ro = null
  // Wenn du mehrere Karten gleichzeitig haben willst, evtl. NICHT destroyen.
  store.destroyMap()
})
</script>

<template>
  <!--
    Der Container nimmt 100% der Elternfläche ein.
    Stelle sicher, dass der umgebende Layout-Container Höhe/Breite hat.
  -->
  <div ref="mapEl" class="the-map" style="width:100%;height:100%;position:relative;"></div>
</template>

<style scoped>
/* Optional: kleine Helfer */
.the-map :global(.maplibregl-ctrl-bottom-left),
.the-map :global(.maplibregl-ctrl-bottom-right) {
  margin-bottom: 6px;
}
</style>

