'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getMockFlowByTemplateId } from '@/lib/mock-data/flows';

export const FALLBACK_ACCOUNT_ID = 'default-account';

interface ActiveAutomation {
  templateId: string;
  flowId: string;
  accountId: string;
  addedAt: string;
  isActive: boolean;
  includedInCreditPool: boolean;
  followerModeEnabled?: boolean;
}

interface ActiveAutomationState {
  activeByAccount: Record<string, ActiveAutomation[]>;
  currentByAccount: Record<string, string | null>;
  addAutomation: (accountId: string | null | undefined, templateId: string) => void;
  removeAutomation: (accountId: string | null | undefined, templateId: string) => void;
  setCurrentAutomation: (accountId: string | null | undefined, templateId: string) => void;
  clearAutomations: (accountId: string | null | undefined) => void;
  toggleAutomationActive: (accountId: string | null | undefined, templateId: string) => void;
  toggleAutomationCreditPool: (accountId: string | null | undefined, templateId: string) => void;
  toggleAutomationFollowerMode: (accountId: string | null | undefined, templateId: string) => void;
  reorderAutomations: (
    accountId: string | null | undefined,
    sourceTemplateId: string,
    targetTemplateId: string
  ) => void;
}

const resolveAccountId = (accountId: string | null | undefined) =>
  accountId ?? FALLBACK_ACCOUNT_ID;

const withDefaults = (automation: ActiveAutomation): ActiveAutomation => ({
  ...automation,
  isActive: automation.isActive ?? true,
  includedInCreditPool: automation.includedInCreditPool ?? false,
  followerModeEnabled: automation.followerModeEnabled ?? false,
});

const normalizeList = (automations?: ActiveAutomation[]) =>
  (automations ?? []).map(withDefaults);

export const useActiveAutomationStore = create<ActiveAutomationState>()(
  persist(
    (set, get) => ({
      activeByAccount: {},
      currentByAccount: {},

      addAutomation: (accountId, templateId) => {
        const resolvedAccountId = resolveAccountId(accountId);
        const flow = getMockFlowByTemplateId(templateId);
        if (!flow) {
          console.warn(`No mock flow found for template "${templateId}"`);
          return;
        }

        set((state) => {
          const existing = normalizeList(state.activeByAccount[resolvedAccountId]);
          if (existing.some((automation) => automation.templateId === templateId)) {
            return {
              currentByAccount: {
                ...state.currentByAccount,
                [resolvedAccountId]: templateId,
              },
            };
          }

          const nextAutomation: ActiveAutomation = {
            templateId,
            flowId: flow.id,
            accountId: resolvedAccountId,
            addedAt: new Date().toISOString(),
            isActive: true,
            includedInCreditPool: false,
            followerModeEnabled: false,
          };

          return {
            activeByAccount: {
              ...state.activeByAccount,
              [resolvedAccountId]: [...existing, nextAutomation],
            },
            currentByAccount: {
              ...state.currentByAccount,
              [resolvedAccountId]: templateId,
            },
          };
        });
      },

      removeAutomation: (accountId, templateId) => {
        const resolvedAccountId = resolveAccountId(accountId);

        set((state) => {
          const existing = normalizeList(state.activeByAccount[resolvedAccountId]);
          const filtered = existing.filter((automation) => automation.templateId !== templateId);

          if (filtered.length === existing.length) {
            return {};
          }

          const current = state.currentByAccount[resolvedAccountId];
          const nextCurrent = filtered[0]?.templateId ?? null;

          return {
            activeByAccount: {
              ...state.activeByAccount,
              [resolvedAccountId]: filtered,
            },
            currentByAccount: {
              ...state.currentByAccount,
              [resolvedAccountId]: current === templateId ? nextCurrent : current,
            },
          };
        });
      },

      setCurrentAutomation: (accountId, templateId) => {
        const resolvedAccountId = resolveAccountId(accountId);
        const { activeByAccount } = get();
        const existing = normalizeList(activeByAccount[resolvedAccountId]);

        if (!existing.some((automation) => automation.templateId === templateId)) {
          return;
        }

        set((state) => ({
          currentByAccount: {
            ...state.currentByAccount,
            [resolvedAccountId]: templateId,
          },
        }));
      },

      clearAutomations: (accountId) => {
        const resolvedAccountId = resolveAccountId(accountId);
        set((state) => {
          if (!state.activeByAccount[resolvedAccountId]) return {};
          const { [resolvedAccountId]: _, ...restActive } = state.activeByAccount;
          const { [resolvedAccountId]: __, ...restCurrent } = state.currentByAccount;
          return {
            activeByAccount: restActive,
            currentByAccount: restCurrent,
          };
        });
      },

      toggleAutomationActive: (accountId, templateId) => {
        const resolvedAccountId = resolveAccountId(accountId);
        set((state) => {
          const existing = normalizeList(state.activeByAccount[resolvedAccountId]);
          let mutated = false;
          const nextList = existing.map((automation) => {
            if (automation.templateId !== templateId) {
              return automation;
            }
            mutated = true;
            return { ...automation, isActive: !automation.isActive };
          });

          if (!mutated) {
            return {};
          }

          return {
            activeByAccount: {
              ...state.activeByAccount,
              [resolvedAccountId]: nextList,
            },
          };
        });
      },

      toggleAutomationCreditPool: (accountId, templateId) => {
        const resolvedAccountId = resolveAccountId(accountId);
        set((state) => {
          const existing = normalizeList(state.activeByAccount[resolvedAccountId]);
          let mutated = false;
          const nextList = existing.map((automation) => {
            if (automation.templateId !== templateId) {
              return automation;
            }
            mutated = true;
            return {
              ...automation,
              includedInCreditPool: !automation.includedInCreditPool,
            };
          });

          if (!mutated) {
            return {};
          }

          return {
            activeByAccount: {
              ...state.activeByAccount,
              [resolvedAccountId]: nextList,
            },
          };
        });
      },

      toggleAutomationFollowerMode: (accountId, templateId) => {
        const resolvedAccountId = resolveAccountId(accountId);
        set((state) => {
          const existing = normalizeList(state.activeByAccount[resolvedAccountId]);
          let mutated = false;
          const nextList = existing.map((automation) => {
            if (automation.templateId !== templateId) {
              return automation;
            }
            mutated = true;
            return {
              ...automation,
              followerModeEnabled: !(automation.followerModeEnabled ?? false),
            };
          });

          if (!mutated) {
            return {};
          }

          return {
            activeByAccount: {
              ...state.activeByAccount,
              [resolvedAccountId]: nextList,
            },
          };
        });
      },

      reorderAutomations: (accountId, sourceTemplateId, targetTemplateId) => {
        const resolvedAccountId = resolveAccountId(accountId);
        set((state) => {
          const existing = normalizeList(state.activeByAccount[resolvedAccountId]);
          if (existing.length === 0) {
            return {};
          }

          const fromIndex = existing.findIndex(
            (automation) => automation.templateId === sourceTemplateId
          );
          const toIndex = existing.findIndex(
            (automation) => automation.templateId === targetTemplateId
          );

          if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
            return {};
          }

          const updated = [...existing];
          const [moved] = updated.splice(fromIndex, 1);
          updated.splice(toIndex, 0, moved);

          return {
            activeByAccount: {
              ...state.activeByAccount,
              [resolvedAccountId]: updated,
            },
          };
        });
      },
    }),
    {
      name: 'active-automations',
    }
  )
);
