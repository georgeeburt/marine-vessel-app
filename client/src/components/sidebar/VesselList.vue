<template>
  <div class="vessel-list">
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
  gap: 2px;
  list-style: none;
  padding: 0;
  overflow-y: auto;
  width: 100%;
}
</style>
