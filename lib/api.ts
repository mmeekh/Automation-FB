// Mock API for development
export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'JD'
};

export const mockAccounts = [
  { id: '1', username: '@johndoe', followers: 12500, posts: 89, status: 'active' as const },
  { id: '2', username: '@socialmedia', followers: 8200, posts: 156, status: 'active' as const },
  { id: '3', username: '@techbrand', followers: 25100, posts: 234, status: 'active' as const },
];

export const mockWorkflows = [
  { id: '1', name: 'Welcome DM', description: 'Send welcome message to new followers', status: 'active' as const },
  { id: '2', name: 'Content Scheduler', description: 'Auto-post content at optimal times', status: 'active' as const },
  { id: '3', name: 'Comment Auto-Reply', description: 'Reply to comments with predefined messages', status: 'inactive' as const },
];

export const mockAnalytics = [
  { label: 'newFollowers', value: 2847, change: 12.5 },
  { label: 'engagementRate', value: 89.2, change: 5.3, isPercentage: true },
  { label: 'postsPublished', value: 156, change: -2.1 },
  { label: 'comments', value: 4200, change: 18.7 },
];

// Mock API functions
export async function login(email: string, password: string, twoFactorCode: string) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (twoFactorCode.length === 6) {
    return { success: true, user: mockUser };
  }
  throw new Error('Invalid credentials');
}

export async function fetchDashboardData() {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    accounts: mockAccounts,
    workflows: mockWorkflows,
    analytics: mockAnalytics
  };
}
