<template>
  <n-card class="vessel" :title="vessel.name" :bordered="true">
    <template #header-extra>
      <div class="card-action-icons">
        <n-icon class="edit-icon" :component="Edit" size="20" />
        <n-icon class="delete-icon" :component="TrashSharp" @click="handleDeleteConfirm()" color="red" size="20" />
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Edit } from '@vicons/tabler';
import { useDialog, NCard, NIcon } from 'naive-ui';
import { TrashSharp } from '@vicons/ionicons5';
import { useSocket } from '../../composables/use-socket';
import type { Vessel } from '@shared/types/vessel';

const props = defineProps<{
  vessel: Vessel;
}>();

const { emitDeleteVessel } = useSocket();
const deleteDialog = useDialog();

const handleDelete = () => {
  emitDeleteVessel(props.vessel);
};

const handleDeleteConfirm = () => {
  deleteDialog.create({
    title: `Delete Vessel`,
    content: `Are you sure you want to delete ${props.vessel.name}?`,
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    onPositiveClick: () => {
      handleDelete();
    },
    onNegativeClick: () => {
      deleteDialog.destroyAll();
    },
  })
}
</script>

<style scoped>
.card-action-icons {
  align-items: center;
  display: flex;
  gap: 5px;
  justify-content: center;
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
}

.vessel:hover .card-action-icons {
  opacity: 1;
}

.edit-icon,
.delete-icon {
  cursor: pointer;
}
</style>
