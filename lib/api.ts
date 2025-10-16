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

const mockAutomationSummary = [
  { key: 'active', value: 8, change: 12.4, trend: 'up' as const },
  { key: 'paused', value: 3, change: -4.2, trend: 'down' as const },
  { key: 'responses', value: 342, change: 18.3, trend: 'up' as const },
  { key: 'avgResponseTime', value: '2m 18s', change: -7.5, trend: 'up' as const },
];

const mockAutomations = [
  {
    id: 'welcome-flow',
    name: 'Welcome DM Campaign',
    description: 'Greet every new follower and route them to the right product funnel.',
    status: 'running' as const,
    conversionRate: 31.5,
    tasks: 5,
    lastRun: 'Just now',
    tags: ['DM', 'AI assistant'],
    performance: { sent: 1280, replies: 612, completed: 487 },
  },
  {
    id: 'content-scheduler',
    name: 'Content Scheduler',
    description: 'Plan, approve and auto-publish posts when engagement is at its peak.',
    status: 'running' as const,
    conversionRate: 24.1,
    tasks: 8,
    lastRun: '12 minutes ago',
    tags: ['Scheduling'],
    performance: { sent: 842, replies: 0, completed: 29 },
  },
  {
    id: 'vip-support',
    name: 'VIP Lead Follow-up',
    description: 'Assign hot leads to human agents and keep AI assistant on standby.',
    status: 'paused' as const,
    conversionRate: 42.7,
    tasks: 6,
    lastRun: '3 hours ago',
    tags: ['Sales', 'CRM'],
    performance: { sent: 214, replies: 143, completed: 96 },
  },
  {
    id: 'comment-guardian',
    name: 'Comment Guardian',
    description: 'Moderate comments, hide spam and escalate sensitive mentions instantly.',
    status: 'running' as const,
    conversionRate: 0,
    tasks: 4,
    lastRun: '18 minutes ago',
    tags: ['Moderation'],
    performance: { sent: 612, replies: 0, completed: 612 },
  },
];

const mockAutomationActivity = [
  {
    id: 'activity-1',
    time: '09:42',
    title: 'Content Scheduler published new carousel',
    description: '@techbrand • 4 assets delivered automatically',
    type: 'publish' as const,
  },
  {
    id: 'activity-2',
    time: '09:21',
    title: 'AI assistant resolved 23 support tickets',
    description: 'Welcome DM Campaign • 87% satisfaction score',
    type: 'ai' as const,
  },
  {
    id: 'activity-3',
    time: '08:55',
    title: 'VIP Lead Follow-up paused',
    description: 'Paused by Sarah Johnson • Pending review',
    type: 'warning' as const,
  },
  {
    id: 'activity-4',
    time: '08:12',
    title: 'New automation template deployed',
    description: 'Auto Re-engage Inactive Followers',
    type: 'success' as const,
  },
];

const mockAutomationRecommendations = [
  {
    id: 'reactivation',
    name: 'Re-activate inactive followers',
    description: 'Win back dormant followers with seasonal offers and targeted DMs.',
    estimatedLift: 18,
    complexity: 'medium' as const,
    tags: ['Reactivation', 'DM', 'AI'],
  },
  {
    id: 'ugc-harvest',
    name: 'Collect UGC from loyal fans',
    description: 'Automate the outreach, approvals and publication of user generated content.',
    estimatedLift: 24,
    complexity: 'low' as const,
    tags: ['Community', 'Content'],
  },
];

const mockAnalyticsTrend = [
  { label: 'Mon', followers: 1820, engagement: 3.2 },
  { label: 'Tue', followers: 2100, engagement: 3.8 },
  { label: 'Wed', followers: 1980, engagement: 3.1 },
  { label: 'Thu', followers: 2250, engagement: 4.4 },
  { label: 'Fri', followers: 2490, engagement: 5.1 },
  { label: 'Sat', followers: 2700, engagement: 5.7 },
  { label: 'Sun', followers: 3120, engagement: 6.2 },
];

const mockAudienceInsights = {
  locations: [
    { label: 'Istanbul', value: 32 },
    { label: 'Berlin', value: 21 },
    { label: 'London', value: 17 },
    { label: 'San Francisco', value: 9 },
  ],
  ageGroups: [
    { label: '18-24', value: 28 },
    { label: '25-34', value: 41 },
    { label: '35-44', value: 19 },
    { label: '45+', value: 12 },
  ],
  activeHours: [
    { label: '09:00', value: 28 },
    { label: '12:00', value: 45 },
    { label: '15:00', value: 65 },
    { label: '18:00', value: 92 },
    { label: '21:00', value: 74 },
  ],
};

const mockTopPosts = [
  {
    id: 'post-1',
    title: 'Behind-the-scenes reel',
    type: 'Reel',
    reach: 32840,
    saves: 742,
    engagementRate: 8.3,
  },
  {
    id: 'post-2',
    title: 'AI automation teaser',
    type: 'Carousel',
    reach: 28450,
    saves: 518,
    engagementRate: 6.9,
  },
  {
    id: 'post-3',
    title: 'Creator spotlight live',
    type: 'Live',
    reach: 24840,
    saves: 0,
    engagementRate: 11.2,
  },
];

const mockTemplateCategories = [
  {
    id: 'conversions',
    name: 'Conversion Boosters',
    description: 'Automations that turn warm followers into paying customers.',
    templates: [
      { id: 'flash-sale', name: 'Flash sale countdown', duration: '7 days', complexity: 'low' as const, tags: ['DM', 'Urgency'] },
      { id: 'webinar', name: 'Webinar registration flow', duration: '14 days', complexity: 'medium' as const, tags: ['Leads', 'Email'] },
    ],
  },
  {
    id: 'community',
    name: 'Community Builders',
    description: 'Deepen follower loyalty with human+AI touchpoints.',
    templates: [
      { id: 'loyalty', name: 'Loyalty rewards handover', duration: 'Ongoing', complexity: 'medium' as const, tags: ['Rewards'] },
      { id: 'ugc', name: 'UGC sourcing assistant', duration: 'Ongoing', complexity: 'low' as const, tags: ['Content', 'AI'] },
    ],
  },
  {
    id: 'ops',
    name: 'Operations & Care',
    description: 'Keep your team focused while the assistant handles repetitive work.',
    templates: [
      { id: 'moderation', name: 'Comment moderation guard', duration: 'Ongoing', complexity: 'low' as const, tags: ['Moderation'] },
      { id: 'handoff', name: 'Human hand-off wizard', duration: 'Ongoing', complexity: 'high' as const, tags: ['Support', 'CRM'] },
    ],
  },
];

const mockTemplateHighlights = [
  { id: 'featured-1', name: 'Influencer onboarding kit', audience: 'Creators', rating: 4.8, installs: 1280 },
  { id: 'featured-2', name: 'Product launch accelerator', audience: 'Brands', rating: 4.9, installs: 1624 },
  { id: 'featured-3', name: 'Community manager cockpit', audience: 'Agencies', rating: 4.7, installs: 986 },
];

const mockSettingsOverview = {
  profile: {
    displayName: 'AutoFlow HQ',
    plan: 'Scale',
    timezone: 'Europe/Istanbul',
    twoFactorEnabled: true,
  },
  notifications: [
    { id: 'performance-digest', label: 'Performance digests', description: 'Weekly summary of key automation KPIs', enabled: true },
    { id: 'escalations', label: 'Critical escalations', description: 'Notify me when a workflow needs manual review', enabled: true },
    { id: 'news', label: 'Product updates', description: 'Early access to new automation features', enabled: false },
  ],
  team: [
    { id: 'sarah', name: 'Sarah Johnson', role: 'Automation Lead', avatar: 'SJ', status: 'online' as const },
    { id: 'kenan', name: 'Kenan Yıldız', role: 'Creative Strategist', avatar: 'KY', status: 'offline' as const },
    { id: 'amira', name: 'Amira Rahman', role: 'Success Manager', avatar: 'AR', status: 'busy' as const },
  ],
  integrations: [
    { id: 'meta', name: 'Meta Business Suite', status: 'connected' as const },
    { id: 'slack', name: 'Slack', status: 'connected' as const },
    { id: 'hubspot', name: 'HubSpot CRM', status: 'pending' as const },
  ],
  security: [
    { id: 'devices', label: 'Approved devices', value: 6 },
    { id: 'guards', label: 'Automation guards', value: 12 },
    { id: 'alerts', label: 'Security alerts', value: 0 },
  ],
};

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

export async function fetchAutomationsOverview() {
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    summary: mockAutomationSummary,
    automations: mockAutomations,
    activity: mockAutomationActivity,
    recommendations: mockAutomationRecommendations,
  };
}

export async function fetchAnalyticsOverview() {
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    metrics: {
      reach: 58200,
      engagement: 6.2,
      conversions: 1240,
      revenue: 18250,
      change: {
        reach: 14.2,
        engagement: 1.8,
        conversions: 9.6,
        revenue: 22.4,
      },
    },
    trend: mockAnalyticsTrend,
    audience: mockAudienceInsights,
    topPosts: mockTopPosts,
  };
}

export async function fetchTemplatesLibrary() {
  await new Promise(resolve => setTimeout(resolve, 350));
  return {
    categories: mockTemplateCategories,
    highlights: mockTemplateHighlights,
  };
}

export async function fetchSettingsOverview() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSettingsOverview;
}
