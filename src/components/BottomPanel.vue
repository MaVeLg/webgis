<script setup>
import { ref, onMounted } from 'vue';
import { useSplit } from '../composables/useSplit.js';

const emit = defineEmits(['sizes-change', 'collapsed-change']);

const bottomCollapsed = ref(false);
const lastSizes = ref([70, 30]);

// Split oben|unten liegt NICHT hier, sondern im App-Root (siehe App.vue).
// Diese Komponente enthält nur den Innenaufbau des unteren Panels.
</script>

<template>
  <div id="bottomArea" class="bottom-area">
    <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;">
      <span>Unteres Panel</span>
      <slot name="actions"></slot>
    </div>
    <div class="panel-body">
      <slot>Unterer Inhalt</slot>
    </div>
  </div>
</template>

<style scoped>
.bottom-area{
  display:flex;
  flex-direction:column;
  background:#fff;
  height:100%;      
}
</style>
