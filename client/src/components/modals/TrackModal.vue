<template>
  <n-modal
    v-model:show="show"
    class="modal"
    preset="dialog"
    :show-icon="false"
    @after-leave="handleModelClose"
  >
    <h2>Track New Vessel</h2>
    <n-form ref="formRef" :model="formValue" :rules="rules">
      <n-form-item label="Vessel Name" path="name">
        <n-input v-model:value="formValue.name" placeholder="Enter vessel name" />
      </n-form-item>
      <n-form-item label="Latitude" path="latitude">
        <n-input-number v-model:value="formValue.latitude" placeholder="Enter latitude" />
      </n-form-item>
      <n-form-item label="Longitude" path="longitude">
        <n-input-number
          v-model:value="formValue.longitude"
          placeholder="Enter longitude"
        />
      </n-form-item>
      <div class="action-buttons">
        <n-form-item>
          <n-button @click="handleModelClose">Cancel</n-button>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="handleValidateClick" style="width: 100%">
            Track Vessel
          </n-button>
        </n-form-item>
      </div>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

const show = defineModel<boolean>('show');
const message = useMessage();

const { emitAddVessel } = useSocket();

const formRef = ref<FormInst | null>(null);
const formValue = ref({
  name: '',
  latitude: 0,
  longitude: 0,
});

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
        emitAddVessel(formValue.value);

        message.success('Started tracking Vessel');
        show.value = false;

        formValue.value = { name: '', latitude: 0, longitude: 0 };
      })
      .catch((errors) => {
        console.log('Form validation failed:', errors);
      });
  }
};

const handleModelClose = () => {
  show.value = false;
  formValue.value = { name: '', latitude: 0, longitude: 0 };
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
