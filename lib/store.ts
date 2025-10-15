import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface InstagramAccount {
  id: string;
  username: string;
  followers: number;
  posts: number;
  status: 'active' | 'inactive';
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

interface AppState {
  user: User | null;
  accounts: InstagramAccount[];
  workflows: Workflow[];
  setUser: (user: User | null) => void;
  setAccounts: (accounts: InstagramAccount[]) => void;
  setWorkflows: (workflows: Workflow[]) => void;
  toggleWorkflow: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  accounts: [],
  workflows: [],
  setUser: (user) => set({ user }),
  setAccounts: (accounts) => set({ accounts }),
  setWorkflows: (workflows) => set({ workflows }),
  toggleWorkflow: (id) =>
    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === id
          ? { ...w, status: w.status === 'active' ? 'inactive' : 'active' }
          : w
      ),
    })),
}));
