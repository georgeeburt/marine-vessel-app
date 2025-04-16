<template>
  <div class="vessel-list">
    <h3 class="vessel-list-title">Tracked Vessels ({{ vesselStore.vessels.length }})</h3>
    <VesselListItem v-for="vessel in filteredVessels" :key="vessel.id" :vessel="vessel" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useVesselStore } from '../../stores/vessel-store';
import VesselListItem from './VesselListItem.vue';

const props = defineProps({
  filterQuery: {
    type: String,
    default: '',
  },
});

const vesselStore = useVesselStore();
const { vessels } = storeToRefs(vesselStore);

const filteredVessels = computed(() => {
  if (!props.filterQuery) return vessels.value;

  const query = props.filterQuery.toLowerCase();
  return vessels.value.filter((vessel) => vessel.name.toLowerCase().includes(query));
});
</script>
<style scoped>
.vessel-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
  overflow-y: auto;
  margin-bottom: 50px;
  width: 100%;
}

.vessel-list-title {
  margin: 0;
  font-size: 1.5rem;
  color: #d8d8d9;
  font-weight: 400;
}

.vessel-list::-webkit-scrollbar {
  width: 6px;
}

.vessel-list::-webkit-scrollbar-track {
  background: #253071;
  border-radius: 4px;
}

.vessel-list::-webkit-scrollbar-thumb {
  background: #3a4c99;
  border-radius: 4px;
}

.vessel-list::-webkit-scrollbar-thumb:hover {
  background: #475fc0;
}
</style>
