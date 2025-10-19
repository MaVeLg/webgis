<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useSplit } from '../composables/useSplit.js';
import HeaderBar from '../components/HeaderBar.vue';
import Footer from '../components/Footer.vue';
import TopSplit from '../components/TopSplit.vue';
import BottomPanel from '../components/BottomPanel.vue';
//import { useLayersStore } from '../stores/useLayersStore';

// Split-Instanz top/bottom
const { init: initRows, setSizes: setRowSizes, getSizes: getRowSizes, collapse: collapseRow } = useSplit();
const bottomCollapsed = ref(false);
//const layersStore = useLayersStore();

function toggleBottom() {
  const sizes = getRowSizes();
  if (!sizes.length) return;
  if (Math.round(sizes[1]) === 0 || bottomCollapsed.value) {
    setRowSizes([70, 30]);
    bottomCollapsed.value = false;
  } else {
    collapseRow(1);
    bottomCollapsed.value = true;
  }
}

function setBottom(percent: number) {
  percent = Math.max(0, Math.min(100, percent));
  setRowSizes([100 - percent, percent]);
  bottomCollapsed.value = percent === 0;
}

onMounted(async () => {
/*
  layersStore.initFromConfig([
    { id: 'osm', 
      name: 'OpenStreetMap', 
      group: 'Geobasisdaten', 
      layerType: 'raster', 
      sourceType: 'raster', 
      visible: true,
      tiles: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
      attribution: '© OpenStreetMap', 
      extent: [-180, -90, 180, 90] 
    },
    { id: 'sentinel', 
      name: 'Sentinel', 
      group: 'Geobasisdaten', 
      layerType: 'raster', 
      sourceType: 'raster', 
      visible: false,
      tiles: 'https://tiles.maps.eox.at/?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&LAYERS=s2cloudless-2024_3857&STYLES=&FORMAT=image/jpeg&TRANSPARENT=false&SRS=EPSG:3857&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-3857}',
      attribution: '© Copernicus Sentinel data', extent: [-180, -90, 180, 90] },
    { id: 'esri_world_imagery', 
      name: 'ESRI World Imagery', 
      group: 'Geobasisdaten', 
      layerType: 'raster', 
      sourceType: 'raster',
      visible: false, 
      tiles: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '© ESRI',
      extent: [-180, -90, 180, 90] },
    { id: 'tiles', 
      name: 'Kacheln (Wiesbaden, ab Zoom-Stufe 10)', 
      group: 'Geofachdaten', 
      layerType: 'circle', 
      sourceType: 'vector',
      visible: false, 
      tiles: 'http://89.58.14.148/tiles/xxx/{z}/{x}/{y}.pbf', 
      sourceLayer: 'nsha',
      layerPaint: { 'circle-radius': 10, 'circle-stroke-width': 0, 'circle-color': 'red' },
      extent: [8.2313, 50.0576, 8.2570, 50.0716] 
    },
    { id: 'tiles2', 
      name: 'Kacheln (Iserlohn)', 
      group: 'Geofachdaten', 
      layerType: 'line', 
      sourceType: 'vector',
      visible: false, 
      tiles: 'http://dev.tetraeder.solar:8825/tilesets/3f59adf41da6/{z}/{x}/{y}.pbf',
      sourceLayer: 'flurstuecke_iserlohn_12_18',
      layerPaint: { 'line-color': '#ff0000', 'line-width': 2 },
      extent: [7.64, 51.32, 7.77, 51.4]
    },
    { id: 'countries', 
      name: 'KGR: Länder', 
      group: 'Geofachdaten', 
      layerType: 'line', 
      sourceType: 'geojson',
      visible: false, 
      sourceData: '/api/collections/kgr_countries/items?f=json&limit=100&bbox=-180.0,-90.0,180.0,90.0',
      layerPaint: { 'line-color': '#ff0000', 'line-width': 2 }, 
      extent: [-180, -90, 180, 90] 
    },
    { id: 'offices', 
      name: 'KGR: Niederlassungen', 
      group: 'Geofachdaten', 
      layerType: 'circle', 
      sourceType: 'geojson',
      visible: false, 
      sourceData: '/api/collections/kgr_offices/items?f=json',
      layerPaint: { 'circle-radius': 6, 'circle-color': '#00ff00', 'circle-stroke-width': 0, 'circle-stroke-color': '#00ff00' },
      extent: [7.7, 36.2, 25.0, 53.6] 
    },
    { id: 'choropleth', 
      name: 'KGR: Choroplethen (INFORM-Risiko)', 
      group: 'Geofachdaten', 
      layerType: 'fill', 
      sourceType: 'geojson',
      visible: false, 
      sourceData: '/api/collections/kgr_countries/items?f=json&limit=150',
      layerPaint: { 'fill-color': [ 'step', ['get', 'inform_risk'], '#ffffff', 1, '#e5e5e5', 2, '#cccccc', 3, '#b2b2b2', 4, '#999999', 5, '#7f7f7f', 6, '#666666', 7, '#4c4c4c', 8, '#333333', 9, '#1a1a1a', 10, '#000000' ],
                    'fill-opacity': 0.55, 'fill-outline-color': '#ffffff' },
      extent: [-180, -90, 180, 90] 
    },
    { id: 'GRA_Graves', 
      name: 'AAFE: GRA_Graves', 
      group: 'Geofachdaten', 
      layerType: 'circle', 
      sourceType: 'geojson',
      visible: false, 
      sourceData: '/api/collections/aafe_graves/items?f=json&limit=1500',
      layerPaint: { 'circle-radius': 4, 'circle-color': '#0000ff', 'circle-stroke-width': 0, 'circle-stroke-color': '#0000ff' },
      extent: [23.7130970000000012, 37.9623739393996473, 23.7403669999999991, 37.9862439999999992] 
    },
    { id: 'FIN_Findspots',
      name: 'AAFE: FIN_Findspots',
      group: 'Geofachdaten',
      layerType: 'circle',
      sourceType: 'geojson',
      visible: false,
      sourceData: '/api/collections/aafe_findspots/items?f=json&limit=100',
      layerPaint: { 'circle-radius': 8, 'circle-color': '#00ff00', 'circle-stroke-width': 0, 'circle-stroke-color': '#00ff00'},
      extent: [23.7130970000000012, 37.9623739393996473, 23.7403669999999991, 37.9862439999999992]
    },

  ]);
*/
  await nextTick();
  // Vertikale Teilung: [topArea | bottomArea]
  initRows(['#topWrap', '#bottomWrap'], {
    direction: 'vertical',
    sizes: [100, 0],
    minSize: [120, 0]
  }, () => {});
});
</script>

<template>
  <div style="display:flex;flex-direction:column;height:100%;">
    <HeaderBar />

    <div class="root">
      <div id="topWrap">
        <TopSplit />
      </div>

      <div id="bottomWrap">
        <BottomPanel>
          <template #actions>
            <div style="display:flex;gap:.5rem;">
              <button class="btn" @click="setBottom(0)">Schließen</button>
              <button class="btn" @click="setBottom(20)">20%</button>
              <button class="btn" @click="setBottom(35)">35%</button>
              <button class="btn" @click="setBottom(50)">50%</button>
            </div>
          </template>
          <p>Abfragen, Attributtabelle, Diagramme, ...</p>
        </BottomPanel>
      </div>
    </div>

    <Footer class="footer" />
  </div>
</template>

<style scoped>
.root {
  height: calc(100vh - var(--header-h, 56px) - var(--footer-h, 40px));
  display: flex;
  flex-direction: column;
  overflow: hidden; /* wichtig: kein Parent-Scroll */
}

/* Split-Panels */
#topWrap, #bottomWrap {
  min-height: 0;       /* Flex-Kinder dürfen schrumpfen */
  overflow: hidden;    /* Scrollen erst im Inhalt */
}
#topWrap > *, #bottomWrap > * {
  height: 100%;
  min-height: 0;
  overflow: auto;      /* hier wird gescrollt (Map/Tabellen) */
}

/* Buttons etc. */
.btn{border:1px solid var(--border,#d1d5db); background:#f3f4f6; padding:.35rem .6rem; border-radius:.5rem; cursor:pointer;}
.btn:hover{background:#e5e7eb;}
.footer { height: var(--footer-h, 40px); background:#1e293b; color:#f9fafb; display:flex; align-items:center; justify-content:space-between; padding:0 .75rem; font-size:.9rem; }
.footer a { color:#f9fafb; margin-left:.5rem; text-decoration: underline; }

</style>

