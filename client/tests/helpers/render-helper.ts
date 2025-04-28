import { render, RenderOptions } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { Component } from 'vue';
import { vi } from 'vitest';

interface SetupOptions {
  props?: Record<string, unknown>;
  stores?: Record<string, Record<string, unknown>>;
  stubs?: Record<string, boolean | string | object>;
  global?: Partial<RenderOptions<Component>['global']>;
}

/**
 * Renders a component with common test setup including Pinia stores and stubs
 *
 * @param Component The Vue component to render
 * @param options Configuration options including props, stores, and stubs
 * @returns The rendered component with additional testing utilities
 */
export function renderWithSetup(Component: Component, options: SetupOptions = {}) {
  const { props = {}, stores = {}, stubs = {}, global = {} } = options;

  const result = render(Component, {
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
        VesselFormModal: true,
        ...stubs,
      },
      ...global,
    },
  });

  return result;
}
