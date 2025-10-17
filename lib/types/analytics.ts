export type RevenueInsightsData = {
  totalRevenue: string;
  appointmentCount: number;
  averageBookingValue: string;
  conversionRate: string;
  peakHours: string[];
  growthRate: string;
  revenueHistory: {
    date: string;
    revenue: number;
    appointments: number;
  }[];
};

export type AnalyticsMetrics = {
  totalTransformations: number;
  conversionRate: string;
  activeUsers: number;
  mostRequestedStyle: string;
  changeTransformations: string;
  changeConversion: string;
  changeUsers: string;
};

export type AnalyticsOverview = {
  metrics: AnalyticsMetrics;
  revenue: RevenueInsightsData;
  userBehavior: {
    ctaDistribution: Array<{
      label: string;
      value: number;
      color: string;
    }>;
    quickStats: Array<{
      title: string;
      value: string;
      description: string;
    }>;
  };
  socialContent: Array<{
    id: string;
    title: string;
    type: string;
    reach: string;
    saves: string;
    engagement: string;
    growth: string;
  }>;
};
