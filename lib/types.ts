// Global type definitions
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
  type?: 'auto-reply' | 'scheduler' | 'engagement' | 'custom';
}

export interface Analytics {
  label: string;
  value: number;
  change: number;
  isPercentage?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
