import { vi } from 'vitest';

export const mockVesselFormSubmit = vi.fn();
export const mockVesselFormCancel = vi.fn();

export const vesselFormModalMock = {
  default: {
    name: 'VesselFormModal',
    template: `<div class="vessel-form-modal" :data-shown="show">
      <h2>{{ isEditing ? 'Edit Vessel' : 'Track New Vessel' }}</h2>
      <div class="mock-form-content"></div>
    </div>`,
    props: ['show', 'vessel'],
    emits: ['update:show'],
    setup(props) {
      const isEditing = props.vessel?.id ? true : false;
      return { isEditing };
    },
    mounted() {
      this.$el.setAttribute('data-shown', this.show ? 'true' : 'false');
    },
    updated() {
      this.$el.setAttribute('data-shown', this.show ? 'true' : 'false');
    },
  },
};

export function resetVesselFormModalMocks() {
  mockVesselFormSubmit.mockReset();
  mockVesselFormCancel.mockReset();
}

export function mockVesselFormModal() {
  vi.mock('../../../src/components/ui/VesselFormModal.vue', () => vesselFormModalMock);
}
