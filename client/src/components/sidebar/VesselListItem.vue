<template>
  <n-card
    :id="`vessel-${vessel.id}`"
    @click="toggleFocusVessel(vessel.id)"
    class="vessel-card"
    :class="{ 'vessel-card-selected': isSelected }"
    :title="capitaliseLetters(vessel.name)"
    :bordered="true"
    :segmented="{ content: true }"
  >
    <template #header-extra>
      <div class="card-action-icons">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon
              class="edit-icon"
              :component="Edit"
              @click="showEditModal = true"
              color="#dbdbdb"
              size="20"
            />
          </template>
          <span>Edit</span>
        </n-tooltip>
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon
              class="delete-icon"
              :component="TrashSharp"
              @click="handleDeleteConfirm()"
              color="#dbdbdb"
              size="20"
            />
          </template>
          <span>Delete</span>
        </n-tooltip>
      </div>
    </template>
    <div class="card-content">
      <p>
        Latitude: {{ vessel.latitude }}
        <br />
        Longitude: {{ vessel.longitude }}
      </p>
    </div>
  </n-card>

  <VesselFormModal
    :show="showEditModal"
    :vessel="vessel"
    @update:show="showEditModal = $event"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { map, openInfoWindowForVessel } from '../map/map-instance';
import { Edit } from '@vicons/tabler';
import { TrashSharp } from '@vicons/ionicons5';
import { useSocket } from '@/composables/use-socket';
import { useVesselStore } from '@/stores/vessel-store';
import { useMarkerStore } from '@/stores/marker-store';
import { capitaliseLetters } from '@/utils/text-formatters';
import { useDialog, useMessage, NCard, NIcon, NTooltip } from 'naive-ui';
import VesselFormModal from '../ui/VesselFormModal.vue';
import type { Vessel } from '@shared/types/vessel';

const props = defineProps<{
  vessel: Vessel;
}>();

const showEditModal = ref(false);

const { emitDeleteVessel } = useSocket();
const message = useMessage();
const vesselStore = useVesselStore();
const markerStore = useMarkerStore();
const deleteDialog = useDialog();

const isSelected = computed(() => vesselStore.selectedVesselId === props.vessel.id);

const toggleFocusVessel = (vesselId: number) => {
  vesselStore.toggleSelectedVessel(vesselId);

  if (vesselStore.selectedVesselId === vesselId) {
    const marker = markerStore.markers.find((marker) => marker.id === vesselId);
    if (marker && map.value) {
      map.value.panTo({ lat: marker.latitude, lng: marker.longitude });
      map.value.setZoom(6);

      openInfoWindowForVessel(props.vessel);
    }
  }
};

const handleDelete = () => {
  emitDeleteVessel(props.vessel);
};

const handleDeleteConfirm = () => {
  deleteDialog.create({
    title: `Delete Vessel`,
    type: 'warning',
    content: `Are you sure you want to delete ${props.vessel.name}?`,
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    onPositiveClick: () => {
      handleDelete();
      message.success(`Successfully deleted Vessel: ${props.vessel.name}`);
    },
    onNegativeClick: () => {
      deleteDialog.destroyAll();
    },
  });
};
</script>

<style scoped>
.card-action-icons {
  align-items: center;
  display: flex;
  gap: 5px;
  justify-content: center;
  transition: opacity 0.25s ease-in-out;
  opacity: 0;
}

.vessel-card {
  margin-right: 9px;
  min-width: 100px;
  width: 95%;
}

.vessel-card:hover {
  background-color: #3347af;
  cursor: pointer;
}

.vessel-card-selected {
  background-color: #3347af;
  border-left: 3px solid #4d6bfe;
  box-shadow: 0 0 8px rgba(77, 107, 254, 0.5);
}

.vessel-card:hover .card-action-icons {
  opacity: 1;
}

.edit-icon,
.delete-icon {
  cursor: pointer;
}
</style>
