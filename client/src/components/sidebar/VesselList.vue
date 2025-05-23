<template>
  <div class="vessel-list-header">
    <h3 class="vessel-list-title">Tracked Vessels ({{ vesselStore.vessels.length }})</h3>
    <button class="sort-button" @click="sortAsc = !sortAsc">
      <n-icon size="1.1rem">
        <SortAlphaUp v-if="sortAsc" />
        <SortAlphaDown v-else />
      </n-icon>
    </button>
  </div>
  <div class="vessel-list">
    <n-skeleton v-if="loading" height="180px" :sharp="false" :repeat="4" />
    <div class="empty-message" v-if="vessels.length === 0 && !loading">
      <p>No current tracked vessels.</p>
    </div>
    <VesselListItem
      v-for="vessel in sortedVessels"
      :key="vessel.id"
      :vessel="vessel"
      v-else
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { NSkeleton, NIcon } from 'naive-ui';
import { SortAlphaUp, SortAlphaDown } from '@vicons/fa';
import { useVesselStore } from '@/stores/vessel-store';
import VesselListItem from './VesselListItem.vue';

const props = defineProps({
  filterQuery: {
    type: String,
    default: '',
  },
});

const loading = ref(true);
const sortAsc = ref(true);

const vesselStore = useVesselStore();
const { vessels } = storeToRefs(vesselStore);

const filteredVessels = computed(() => {
  if (!props.filterQuery) return vessels.value;

  const query = props.filterQuery.toLowerCase();
  return vessels.value.filter((vessel) => vessel.name.toLowerCase().includes(query));
});

const sortedVessels = computed(() => {
  return [...filteredVessels.value].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (sortAsc.value) {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });
});

onMounted(() => {
  if (vessels.value.length > 0) {
    loading.value = false;
  } else {
    setTimeout(() => {
      loading.value = false;
    }, 800);
  }
});

watch(vessels, (newVessels) => {
  if (newVessels.length > 0 && loading.value) {
    loading.value = false;
  }
});

watch(
  () => vesselStore.selectedVesselId,
  async (newSelectedId) => {
    if (!newSelectedId) return;

    await nextTick();

    const scrollIfNeeded = () => {
      const element = document.getElementById(`vessel-${newSelectedId}`);
      const container = document.querySelector('.vessel-list');

      if (!element || !container) return;

      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Only scroll if selected vessel card is not fully visible
      if (
        elementRect.top < containerRect.top ||
        elementRect.bottom > containerRect.bottom
      ) {
        const containerEl = container as HTMLElement;
        const elementEl = element as HTMLElement;

        const scrollPosition =
          elementEl.offsetTop -
          containerEl.offsetTop -
          containerRect.height / 2 +
          elementRect.height / 2;

        containerEl.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        });
      }
    };

    scrollIfNeeded();
    setTimeout(scrollIfNeeded, 50);
  }
);
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

.vessel-list-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.vessel-list-title {
  color: #d8d8d9;
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0;
}

.sort-button {
  background: #3d51c220;
  border: solid 1px #283788;
  border-radius: 3px;
  color: #3244ac;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sort-button:hover {
  background: #28368861;
  color: #3d51c2;
}

.empty-message {
  color: #c2c2c2;
  font-size: 1.1rem;
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
