'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CustomizationData } from '../types/customization';

interface ActivatedAutomation {
  templateId: string;
  customizationData: CustomizationData;
  activatedAt: Date;
  status: 'active' | 'paused';
}

interface AutomationStore {
  activatedAutomations: Record<string, ActivatedAutomation>;
  activateAutomation: (templateId: string, data: CustomizationData) => void;
  updateAutomation: (templateId: string, data: CustomizationData) => void;
  pauseAutomation: (templateId: string) => void;
  resumeAutomation: (templateId: string) => void;
  deleteAutomation: (templateId: string) => void;
  isActivated: (templateId: string) => boolean;
  getAutomationData: (templateId: string) => CustomizationData | undefined;
}

export const useAutomationStore = create<AutomationStore>()(
  persist(
    (set, get) => ({
      activatedAutomations: {},

      activateAutomation: (templateId, data) =>
        set((state) => ({
          activatedAutomations: {
            ...state.activatedAutomations,
            [templateId]: {
              templateId,
              customizationData: data,
              activatedAt: new Date(),
              status: 'active',
            },
          },
        })),

      updateAutomation: (templateId, data) =>
        set((state) => ({
          activatedAutomations: {
            ...state.activatedAutomations,
            [templateId]: {
              ...state.activatedAutomations[templateId],
              customizationData: data,
            },
          },
        })),

      pauseAutomation: (templateId) =>
        set((state) => ({
          activatedAutomations: {
            ...state.activatedAutomations,
            [templateId]: {
              ...state.activatedAutomations[templateId],
              status: 'paused',
            },
          },
        })),

      resumeAutomation: (templateId) =>
        set((state) => ({
          activatedAutomations: {
            ...state.activatedAutomations,
            [templateId]: {
              ...state.activatedAutomations[templateId],
              status: 'active',
            },
          },
        })),

      deleteAutomation: (templateId) =>
        set((state) => {
          const { [templateId]: _, ...rest } = state.activatedAutomations;
          return { activatedAutomations: rest };
        }),

      isActivated: (templateId) => !!get().activatedAutomations[templateId],

      getAutomationData: (templateId) =>
        get().activatedAutomations[templateId]?.customizationData,
    }),
    {
      name: 'automation-storage',
    }
  )
);
