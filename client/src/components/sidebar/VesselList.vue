<template>
  <div class="vessel-list">
    <VesselListItem v-for="vessel in vessels" :key="vessel.id" :vessel="vessel" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useVesselStore } from '../../stores/vessel-store';
import VesselListItem from './VesselListItem.vue';

const vesselStore = useVesselStore();
const { vessels } = storeToRefs(vesselStore);
</script>
<style scoped>
.vessel-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  list-style: none;
  padding: 0;
  overflow-y: auto;
  width: 100%;
}
</style>
