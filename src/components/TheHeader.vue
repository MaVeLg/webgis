<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import maplibregl from 'maplibre-gl'
//import { useLayersStore } from '../stores/useLayersStore'
import { mountGeocoder } from '../composables/useGeocoder' // mit der korrigierten Signatur

//const layersStore = useLayersStore()

const menuOpen = ref(false)
const geocoderHost = ref<HTMLElement|null>(null)
let geocoder: any = null

function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu(e: MouseEvent) {
  if (!menuOpen.value) return
  if (!(e.target as HTMLElement).closest('.dropdown')) menuOpen.value = false
}

function tryMountGeocoder() {
/*
  const map = layersStore.map
  if (!geocoder && map && geocoderHost.value) {
    geocoder = mountGeocoder(map, geocoderHost.value, maplibregl)
  }
*/
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
  tryMountGeocoder()
})

//watch(() => layersStore.map, () => tryMountGeocoder(), { immediate: true })

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
  // Optional: geocoder?.onRemove?.()
})
</script>

<template>
<!--
<header class="header" style="display:flex;align-items:center;justify-content:space-between;padding:0.25rem 0.75rem;background:#1f2937;color:#f9fafb;">
  <div class="header-left" style="display:flex;align-items:center;gap:0.5rem;">
    <div class="dropdown" style="position:relative;">
      <button class="dropdown-toggle"
        @click="toggleMenu"
        style="background:transparent;border:none;color:#f9fafb;padding:.35rem .5rem;cursor:pointer;">
        ☰ Menü
     </button>

      <div class="dropdown-menu" 
        :style="{
          position:'absolute',
          left:'0',          // statt right:0
          top:'100%',
          background:'#fff',
          color:'#111827',
          border:'1px solid var(--border)',
          borderRadius:'.35rem',
          boxShadow:'0 2px 8px rgba(0,0,0,.15)',
          minWidth:'160px',
          zIndex:200,
          display: menuOpen ? 'block' : 'none'
        }">
        <a href="#" style="display:block;padding:.5rem .75rem;text-decoration:none;color:inherit;">Profil</a>
        <a href="#" style="display:block;padding:.5rem .75rem;text-decoration:none;color:inherit;">Einstellungen</a>
      </div>
    </div>
  </div>

  <div class="header-title" style="font-weight:bold;">Demo-Web-GIS</div>

  <div class="header-right" style="display:flex;align-items:center;gap:.5rem;margin-left:auto;justify-content:flex-end;">
    <div ref="geocoderHost" style="min-width:300px;"></div>
  </div>
</header>
-->

<header class="header"
  style="display:flex;align-items:center;gap:.5rem;padding:.25rem .75rem;background:#1f2937;color:#f9fafb;">
  <div class="header-left" style="display:flex;align-items:center;gap:.5rem;">
    <div class="dropdown" style="position:relative;">
      <button @click="toggleMenu"
        style="background:transparent;border:none;color:#f9fafb;padding:.35rem .5rem;cursor:pointer;">☰ Menü</button>

      <div class="dropdown-menu" :style="{
        position:'absolute', left:'0', top:'100%', background:'#fff', color:'#111827',
        border:'1px solid var(--border)', borderRadius:'.35rem', boxShadow:'0 2px 8px rgba(0,0,0,.15)',
        minWidth:'160px', zIndex:200, display: menuOpen ? 'block' : 'none'
      }">
        <a href="#" style="display:block;padding:.5rem .75rem;text-decoration:none;color:inherit;">Profil</a>
        <a href="#" style="display:block;padding:.5rem .75rem;text-decoration:none;color:inherit;">Einstellungen</a>
      </div>
    </div>
  </div>

<!--  <div class="header-title" style="font-weight:600;flex:0 0 auto;">Demo-Web-GIS</div>  -->

  <div class="header-right"
       style="display:flex;align-items:center;gap:.5rem;margin-left:auto;justify-content:flex-end;">
    <div ref="geocoderHost" style="min-width:260px;"></div>
  </div>
</header>

<!--
<header
  style="
    --pad-x:.75rem; --pad-y:.25rem;
    display:grid; grid-template-columns:1fr auto 1fr; align-items:center;
    gap:.5rem; padding:var(--pad-y) var(--pad-x);
    background:#1f2937; color:#f9fafb;
  "
>
  <div style="justify-self:start; display:flex; align-items:center; gap:.5rem;">
    <div style="position:relative;">
      <button
        @click="toggleMenu"
        style="background:transparent; border:none; color:#f9fafb; padding:.35rem .5rem; cursor:pointer;"
      >☰ Menü</button>
      <div class="dropdown-menu" :style="{
        position:'absolute', left:'0', top:'100%', background:'#fff', color:'#111827',
        border:'1px solid var(--border)', borderRadius:'.35rem', boxShadow:'0 2px 8px rgba(0,0,0,.15)',
        minWidth:'160px', zIndex:200, display: menuOpen ? 'block' : 'none'
      }">
        <a href="#" style="display:block;padding:.5rem .75rem;text-decoration:none;color:inherit;">Profil</a>
        <a href="#" style="display:block;padding:.5rem .75rem;text-decoration:none;color:inherit;">Einstellungen</a>
      </div>
    </div>
  </div>

  <div style="justify-self:center; font-weight:600;">Demo-Web-GIS</div>

  <div style="justify-self:end; display:flex; align-items:center; gap:.5rem; margin-right:calc(-1 * var(--pad-x));"> 
    <div ref="geocoderHost" style="min-width:100px;"></div>
  </div>
</header>
-->

</template>

<style>
/* Geocoder selbst noch mal hochstufen (falls nötig) */
.header .maplibregl-ctrl-geocoder,
.header .mapboxgl-ctrl-geocoder { /* je nach Paket-Klassenname */
  position: relative;
  z-index: 2001;
}
</style>
