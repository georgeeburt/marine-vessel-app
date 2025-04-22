import { vi } from 'vitest';

export const mockDialogCreate = vi.fn();

export const mockDialog = {
  create: mockDialogCreate,
  destroyAll: vi.fn(),
  success: vi.fn(),
  warning: vi.fn(),
  error: vi.fn(),
  info: vi.fn()
};

export const mockMessage = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn()
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
    props: ['show']
  }
};

export function resetNaiveUIMocks() {
  Object.values(mockDialog).forEach(mock =>
    vi.isMockFunction(mock) && mock.mockReset()
  );
  Object.values(mockMessage).forEach(mock =>
    vi.isMockFunction(mock) && mock.mockReset()
  );
};
