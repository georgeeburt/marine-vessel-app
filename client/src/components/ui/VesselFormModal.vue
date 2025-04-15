<template>
  <n-modal
    :show="show"
    class="modal"
    preset="dialog"
    :show-icon="false"
    @update:show="$emit('update:show', $event)"
    @after-leave="resetForm"
  >
    <h2>{{ isEditing ? 'Edit Vessel' : 'Track New Vessel' }}</h2>
    <n-form ref="formRef" :model="formValue" :rules="rules">
      <n-form-item label="Vessel Name" path="name">
        <n-input
          v-model:value="formValue.name"
          placeholder="Enter vessel name"
          clearable
        />
      </n-form-item>
      <n-form-item label="Latitude" path="latitude">
        <n-input-number
          v-model:value="formValue.latitude"
          :min="-90"
          :max="90"
          placeholder="Enter latitude"
          clearable
        />
      </n-form-item>
      <n-form-item label="Longitude" path="longitude">
        <n-input-number
          v-model:value="formValue.longitude"
          :min="-180"
          :max="180"
          placeholder="Enter longitude"
          clearable
        />
      </n-form-item>
      <div class="action-buttons">
        <n-form-item>
          <n-button @click="$emit('update:show', false)">Cancel</n-button>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="handleValidateClick" style="width: 100%">
            {{ isEditing ? 'Update Vessel' : 'Track Vessel' }}
          </n-button>
        </n-form-item>
      </div>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useSocket } from '../../composables/use-socket';
import {
  NForm,
  NFormItem,
  NButton,
  NInput,
  NInputNumber,
  NModal,
  useMessage,
} from 'naive-ui';
import type { FormInst } from 'naive-ui';
import type { Vessel } from '@shared/types/vessel';

const props = defineProps<{
  show: boolean;
  vessel?: Vessel | null;
}>();

const emit = defineEmits(['update:show']);
const message = useMessage();
const { emitAddVessel, emitUpdateVessel } = useSocket();

const formRef = ref<FormInst | null>(null);
const formValue = ref<{
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
}>({
  name: '',
  latitude: 0,
  longitude: 0,
});

const isEditing = computed(() => !!props.vessel?.id);

watch(
  () => props.vessel,
  (newVessel) => {
    if (newVessel) {
      formValue.value = { ...newVessel };
    }
  },
  { immediate: true }
);

const rules = {
  name: {
    required: true,
    trigger: ['input', 'blur'],
    message: 'Please enter a vessel name',
  },
  latitude: {
    required: true,
    trigger: ['input', 'blur'],
    message: 'Please enter a latitude',
    type: 'number' as const,
  },
  longitude: {
    required: true,
    trigger: ['input', 'blur'],
    message: 'Please enter a longitude',
    type: 'number' as const,
  },
};

const handleValidateClick = () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then(() => {
        if (isEditing.value) {
          emitUpdateVessel(formValue.value as Vessel);
          message.success(`Updated vessel: ${formValue.value.name}`);
        } else {
          emitAddVessel(formValue.value);
          message.success(`Started tracking vessel: ${formValue.value.name}`);
        }
        emit('update:show', false);
      })
      .catch((errors) => {
        message.error(`Failed to ${isEditing.value ? 'update' : 'track'} vessel`);
        console.log('Form validation failed:', errors);
      });
  }
};

const resetForm = () => {
  if (!isEditing.value) {
    formValue.value = {
      name: '',
      latitude: 0,
      longitude: 0,
    };
  }
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
