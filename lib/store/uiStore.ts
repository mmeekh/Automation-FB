'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  // Sidebar state
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;

  // Modals
  isAddAccountModalOpen: boolean;
  openAddAccountModal: () => void;
  closeAddAccountModal: () => void;

  isNodeEditorOpen: boolean;
  editingNodeId: string | null;
  openNodeEditor: (nodeId: string) => void;
  closeNodeEditor: () => void;

  // Confirmation dialogs
  showSaveConfirmation: boolean;
  setShowSaveConfirmation: (show: boolean) => void;

  // Loading states
  isSavingFlow: boolean;
  setIsSavingFlow: (saving: boolean) => void;

  isActivatingFlow: boolean;
  setIsActivatingFlow: (activating: boolean) => void;

  // Toast/notifications
  notification: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    visible: boolean;
  } | null;
  showNotification: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  hideNotification: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      // Sidebar
      isSidebarCollapsed: false,

      toggleSidebar: () => {
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed }));
      },

      collapseSidebar: () => {
        set({ isSidebarCollapsed: true });
      },

      expandSidebar: () => {
        set({ isSidebarCollapsed: false });
      },

      // Modals
      isAddAccountModalOpen: false,

      openAddAccountModal: () => {
        set({ isAddAccountModalOpen: true });
      },

      closeAddAccountModal: () => {
        set({ isAddAccountModalOpen: false });
      },

      isNodeEditorOpen: false,
      editingNodeId: null,

      openNodeEditor: (nodeId) => {
        set({
          isNodeEditorOpen: true,
          editingNodeId: nodeId,
        });
      },

      closeNodeEditor: () => {
        set({
          isNodeEditorOpen: false,
          editingNodeId: null,
        });
      },

      // Confirmation
      showSaveConfirmation: false,

      setShowSaveConfirmation: (show) => {
        set({ showSaveConfirmation: show });
      },

      // Loading
      isSavingFlow: false,

      setIsSavingFlow: (saving) => {
        set({ isSavingFlow: saving });
      },

      isActivatingFlow: false,

      setIsActivatingFlow: (activating) => {
        set({ isActivatingFlow: activating });
      },

      // Notifications
      notification: null,

      showNotification: (message, type = 'info') => {
        set({
          notification: {
            message,
            type,
            visible: true,
          },
        });

        // Auto-hide after 3 seconds
        setTimeout(() => {
          set((state) => ({
            notification: state.notification
              ? { ...state.notification, visible: false }
              : null,
          }));
        }, 3000);
      },

      hideNotification: () => {
        set({ notification: null });
      },
    }),
    {
      name: 'ui-storage',
      // Don't persist modals and notifications
      partialize: (state) => ({
        isSidebarCollapsed: state.isSidebarCollapsed,
      }),
    }
  )
);
