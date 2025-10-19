<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSplit } from '../composables/useSplit.js';

import TheMap from './TheMap.vue';

//import MapView from './MapView.vue';
//import LayerList from './LayerList.vue'
//import { api } from '../api'
//import { useLayersStore } from '../stores/useLayersStore'
//import Dialog from './Dialog.vue'

const currentItem = ref(null)
/*
const dlgAAFEGraves             = ref<InstanceType<typeof Dialog> | null>(null)
const dlgAAFERituals            = ref<InstanceType<typeof Dialog> | null>(null)
const dlgAAFEFindspots          = ref<InstanceType<typeof Dialog> | null>(null)
const dlgAAFEObjects            = ref<InstanceType<typeof Dialog> | null>(null)
const dlgAAFEGenericChronology  = ref<InstanceType<typeof Dialog> | null>(null)
const dlgAAFESpecificChronology = ref<InstanceType<typeof Dialog> | null>(null)
const dlgAAFEBibliography       = ref<InstanceType<typeof Dialog> | null>(null)
const dlgAAFEImages             = ref<InstanceType<typeof Dialog> | null>(null)
const dlgAAFEAncientStreets     = ref<InstanceType<typeof Dialog> | null>(null)
const dlgAAFEExcavators         = ref<InstanceType<typeof Dialog> | null>(null)

function openDlgAAFEGraves()             { dlgAAFEGraves.value?.open() }
function openDlgAAFERituals()            { dlgAAFERituals.value?.open() }
function openDlgAAFEFindspots()          { dlgAAFEFindspots.value?.open() }
function openDlgAAFEObjects()            { dlgAAFEObjects.value?.open() }
function openDlgAAFEGenericChronology()  { dlgAAFEGenericChronology.value?.open() }
function openDlgAAFESpecificChronology() { dlgAAFESpecificChronology.value?.open() }
function openDlgAAFEBibliography()       { dlgAAFEBibliography.value?.open() }
function openDlgAAFEImages()             { dlgAAFEImages.value?.open() }
function openDlgAAFEAncientStreets()     { dlgAAFEAncientStreets.value?.open() }
function openDlgAAFEExcavators()         { dlgAAFEExcavators.value?.open() }

const mapRef = ref(null);
*/
const { init: initCols } = useSplit();

//const layersStore = useLayersStore();

onMounted(() => {
  // Drei vertikale Panels (links | map | rechts)
  initCols(['#leftPanel', '#mapPanel', '#rightPanel'], {
    direction: 'horizontal',
    sizes: [20, 60, 20],
    minSize: [0, 200, 7]
  }, () => { mapRef.value?.resize(); });
});
/*
function zoomToFeature(feature) {
  // close dialog
  dlgAAFEGraves.value?.close() // TODO Close the currently open dialog instead

  const lon = Number(feature?.geometry?.coordinates[0]).toFixed(10) ?? 0.0
  const lat = Number(feature?.geometry?.coordinates[1]).toFixed(10) ?? 0.0

  layersStore.zoomTo(lon, lat, 24);
};
*/
</script>

<template>
  <div id="topArea" class="top-area">
    <section id="leftPanel" class="panel">
      <div class="panel-head">Layer-Verwaltung</div>
      <div class="panel-body">
<!--        <LayerList />  -->
      </div>
    </section>

    <section id="mapPanel" class="panel">
      <TheMap ref="mapRef" /> 
    </section>

    <section id="rightPanel" class="panel">
      <div class="panel-head">Daten-Operationen</div>
      <div class="panel-body">
<!--
         <button @click="openDlgAAFEGraves">AAFE: Dialog 'Graves' öffnen</button>
         <p></p> 
         <button @click="openDlgAAFERituals">AAFE: Dialog 'Rituals' öffnen</button> 
         <p></p> 
         <button @click="openDlgAAFEFindspots">AAFE: Dialog 'Findspots' öffnen</button> 
         <p></p> 
         <button @click="openDlgAAFEObjects">AAFE: Dialog 'Objects (=Artefacts?)' öffnen</button> 
         <p></p> 
         <button @click="openDlgAAFEGenericChronology">AAFE: Dialog 'Generic Chronology' öffnen</button> 
         <p></p> 
         <button @click="openDlgAAFESpecificChronology">AAFE: Dialog 'Specific Chronology' öffnen</button> 
         <p></p> 
         <button @click="openDlgAAFEBibliography">AAFE: Dialog 'Bibliography' öffnen</button> 
         <p></p> 
         <button @click="openDlgAAFEImages">AAFE: Dialog 'Images' öffnen</button> 
         <p></p> 
         <button @click="openDlgAAFEAncientStreets">AAFE: Dialog 'Ancient Streets' öffnen</button> 
         <p></p> 
         <button @click="openDlgAAFEExcavators">AAFE: Dialog 'Excavators' öffnen</button> 
-->
      </div>
    </section>
<!--
  <Dialog
    ref="dlgAAFEGraves"
    endpoint-url="/api/collections/aafe_graves"
    :columns="[{ key:'zkp_gra', label:'zkp_gra' }, 
               { key:'name_tomb', label:'name_tomb' }, 
               { key:'remarks', label: 'remarks' },
               { key:'zlg_nomecreazione', label: 'zlg_nomecreazione' },
              ]"
    :form-fields="[
      { key:'name_tomb', label:'name_tomb', type:'text', required:true, placeholder:'Name...' },
      { key:'zlg_nomecreazione', label:'zlg_nomecreazione', type:'text', required:false, placeholder:'Created by...' },
      { key:'zlg_creazione', label:'zlg_creazione', type:'text', required:false, placeholder:'Created on...' },
      { key:'zlg_modifnome', label:'zlg_modifnome', type:'text', required:false, placeholder:'Modified by...' },
      { key:'zlg_modifica', label:'zlg_modifica', type:'text', required:false, placeholder:'Modified on...' },
      { key:'age_specifications', label:'age_specifications', type:'text', required:false, placeholder:'Age...' },
      { key:'remarks', label:'remarks', type:'text', required:false, placeholder:'Remarks...' },
      { key:'agora_archive_link', label:'agora_archive_link', type:'text', required:false, placeholder:'AGORA archive link...' },

      //{ key:'age_specifications', label:'age_specification', type:'text', required:false, placeholder:'Age...' },
      //{ key:'longitude', label:'Geographische Länge [°]', type:'text', required:true, placeholder:'10.0' },
      //{ key:'latitude', label:'Geographische Breite [°]', type:'text', required:true, placeholder:'53.0' },
      // Beispiel: Dropdown
      //{ key:'status', label:'Status', type:'select', options:['active','inactive'], defaultValue:'active' }
    ]"
    @zoomToFeature="zoomToFeature"
  />
-->
<!--
  <Dialog
    ref="dlgAAFERituals"
    endpoint-url="/api/collections/aafe_rituals"
    :columns="[{ key:'zkp_rit', label:'zkp_rit' }, { key:'nom_ritual', label:'nom_ritual' }]"
    :form-fields="[
      { key:'nom_ritual', label:'nom_ritual', type:'text', required:true, placeholder:'Name...' },
    ]"
  />

  <Dialog
    ref="dlgAAFEFindspots"
    endpoint-url="/api/collections/aafe_findspots"
    :columns="[{ key:'zkp_fin', label:'zkp_fin' }, { key:'name', label:'name' }]"
    :form-fields="[
      { key:'name', label:'name', type:'text', required:true, placeholder:'Name...' },
    ]"
  />

  <Dialog
    ref="dlgAAFEObjects"
    endpoint-url="/api/collections/aafe_objects"
    :columns="[{ key:'zkp_obj', label:'zkp_obj' }, { key:'usualname', label:'usualname' }]"
    :form-fields="[
      { key:'usualname', label:'usualname', type:'text', required:true, placeholder:'Name...' },
    ]"
  />

  <Dialog
    ref="dlgAAFEGenericChronology"
    endpoint-url="/api/collections/aafe_genericchronology"
    :columns="[{ key:'zkp_gech', label:'zkp_gech' }, { key:'nom_generic_chronology', label:'nom_generic_chronology' }]"
    :form-fields="[
      { key:'nom_generic_chronology', label:'nom_generic_chronology', type:'text', required:true, placeholder:'Name...' },
    ]"
  />

  <Dialog
    ref="dlgAAFESpecificChronology"
    endpoint-url="/api/collections/aafe_specificchronology"
    :columns="[{ key:'zkp_spch', label:'zkp_spch' }, { key:'nom_specefic_chronology', label:'nom_specefic_chronology' }]"
    :form-fields="[
      { key:'nom_specefic_chronology', label:'nom_specefic_chronology', type:'text', required:true, placeholder:'Name...' },
    ]"
  />

  <Dialog
    ref="dlgAAFEBibliography"
    endpoint-url="/api/collections/aafe_bibliography"
    :columns="[{ key:'zkp_bib', label:'zkp_bib' }, { key:'title', label:'title' }]"
    :form-fields="[
      { key:'title', label:'title', type:'text', required:true, placeholder:'Title...' },
    ]"
  />

  <Dialog
    ref="dlgAAFEImages"
    endpoint-url="/api/collections/aafe_images"
    :columns="[{ key:'zkp_ima', label:'zkp_ima' }, { key:'description', label:'description' }]"
    :form-fields="[
      { key:'description', label:'description', type:'text', required:true, placeholder:'Description...' },
    ]"
  />

  <Dialog
    ref="dlgAAFEAncientStreets"
    endpoint-url="/api/collections/aafe_ancientstreets"
    :columns="[{ key:'zkp_as', label:'zkp_as' }, { key:'name', label:'name' }]"
    :form-fields="[
      { key:'name', label:'name', type:'text', required:true, placeholder:'Name...' },
    ]"
  />

  <Dialog
    ref="dlgAAFEExcavators"
    endpoint-url="/api/collections/aafe_excavators"
    :columns="[{ key:'zkp_exca', label:'zkp_exca' }, { key:'name', label:'name' }]"
    :form-fields="[
      { key:'zkp_exca', label:'zkp_exca', type:'text', required:true, placeholder:'Primary key...' },
      { key:'name', label:'name', type:'text', required:true, placeholder:'Name...' },
    ]"
  />
-->
  </div>

</template>

<style scoped>
.top-area{
  display:flex;
  border-bottom:1px solid var(--border);
  background:#fff;
  min-height:120px;
  height:100%;     
}
.btn{border:1px solid var(--border); background:#f3f4f6; padding:.35rem .6rem; border-radius:.5rem; cursor:pointer;}
.btn:hover{background:#e5e7eb;}
</style>
