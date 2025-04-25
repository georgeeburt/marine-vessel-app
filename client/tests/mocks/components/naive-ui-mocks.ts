import { vi } from 'vitest';

export const mockDialogCreate = vi.fn();

export const mockDialog = {
  create: mockDialogCreate,
  destroyAll: vi.fn(),
  success: vi.fn(),
  warning: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
};

export const mockMessage = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
};

export const naiveUIMocks = {
  useDialog: () => mockDialog,
  useMessage: () => mockMessage,
  NCard: {
    template: '<div class="mock-card"><slot /><slot name="header-extra" /></div>',
  },
  NIcon: { template: '<div class="mock-icon"></div>' },
  NTooltip: { template: '<div><slot /><slot name="trigger" /></div>' },
  NModal: {
    template: '<div class="mock-modal" :data-show="show"><slot /></div>',
    props: ['show'],
  },
  NForm: {
    template: '<form class="mock-form" @submit.prevent><slot /></form>',
    props: ['model', 'rules'],
    methods: {
      validate() {
        if (this.model && this.rules && this.model.name && this.rules.name) {
          const nameRules = this.rules.name;

          for (const rule of nameRules) {
            if (rule.validator) {
              const isValid = rule.validator(rule, this.model.name);
              if (!isValid) {
                return Promise.reject(new Error('Validation failed'));
              }
            }
          }
        }
        return Promise.resolve();
      },
    },
  },
  NFormItem: {
    template:
      '<div class="mock-form-item"><label v-if="label">{{ label }}</label><slot /></div>',
    props: ['label', 'path'],
  },
  NInput: {
    template:
      '<input class="mock-input" :value="value" @input="$emit(\'update:value\', $event.target.value)" />',
    props: ['value'],
    emits: ['update:value'],
  },
  NInputNumber: {
    template:
      '<input type="number" class="mock-input-number" :value="value" @input="$emit(\'update:value\', Number($event.target.value))" />',
    props: ['value', 'min', 'max'],
    emits: ['update:value'],
  },
  NButton: {
    template: '<button class="mock-button" @click="$emit(\'click\')"><slot /></button>',
    props: ['type'],
    emits: ['click'],
  },
};

export function resetNaiveUIMocks() {
  Object.values(mockDialog).forEach(
    (mock) => vi.isMockFunction(mock) && mock.mockReset()
  );
  Object.values(mockMessage).forEach(
    (mock) => vi.isMockFunction(mock) && mock.mockReset()
  );
}
