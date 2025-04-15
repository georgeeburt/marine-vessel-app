<template>
  <n-card
    @click="focusVessel(vessel.id)"
    class="vessel-card"
    :title="vessel.name"
    :bordered="true"
  >
    <template #header-extra>
      <div class="card-action-icons">
        <n-icon
          class="edit-icon"
          :component="Edit"
          @click="showEditModal = true"
          color="#dbdbdb"
          size="20"
        />
        <n-icon
          class="delete-icon"
          :component="TrashSharp"
          @click="handleDeleteConfirm()"
          color="#dbdbdb"
          size="20"
        />
      </div>
    </template>
  </n-card>

  <VesselFormModal
    :show="showEditModal"
    :vessel="vessel"
    @update:show="showEditModal = $event"
  />
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { map } from '../map/map-instance';
import { Edit } from '@vicons/tabler';
import { useDialog, useMessage, NCard, NIcon } from 'naive-ui';
import { TrashSharp } from '@vicons/ionicons5';
import { useSocket } from '../../composables/use-socket';
import { useMarkerStore } from '../../stores/marker-store';
import VesselFormModal from '../ui/VesselFormModal.vue';
import type { Vessel } from '@shared/types/vessel';

const props = defineProps<{
  vessel: Vessel;
}>();
const markerStore = useMarkerStore();
const { emitDeleteVessel } = useSocket();
const deleteDialog = useDialog();
const showEditModal = ref(false);

const message = useMessage();

const focusVessel = (vesselId: number) => {
  const marker = markerStore.markers.find((marker) => marker.id === vesselId);
  if (marker && map.value) {
    map.value.panTo({ lat: marker.latitude, lng: marker.longitude });
    map.value.setZoom(6);
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

.vessel-card:hover {
  background-color: #3347af;
  cursor: pointer;
}

.vessel-card:hover .card-action-icons {
  opacity: 1;
}

.edit-icon,
.delete-icon {
  cursor: pointer;
}
</style>
