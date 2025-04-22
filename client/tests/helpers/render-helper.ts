import { render, RenderOptions } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { Component } from 'vue';
import { vi } from 'vitest';

interface SetupOptions {
  props?: Record<string, any>;
  stores?: Record<string, any>;
  stubs?: Record<string, any>;
  global?: Partial<RenderOptions<Component>['global']>;
}

export function renderWithSetup(Component: Component, options: SetupOptions = {}) {
  const { props = {}, stores = {}, stubs = {}, global = {} } = options;

  return render(Component, {
    props,
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: stores,
        }),
      ],
      stubs: {
        'n-tooltip': true,
        'n-icon': true,
        'n-card': { template: '<div><slot /><slot name="header-extra" /></div>' },
        'VesselFormModal': true,
        ...stubs,
      },
      ...global,
    }
  });
};
