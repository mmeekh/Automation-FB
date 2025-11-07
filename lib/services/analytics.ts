import { api } from './api';

export interface AnalyticsData {
  totalGenerations: number;
  activeAutomations: number;
  totalRevenue: number;
  conversionRate: number;
  revenue: {
    total: number;
    trend: number;
    chartData: Array<{ date: string; amount: number }>;
  };
  generations: {
    total: number;
    trend: number;
    chartData: Array<{ date: string; count: number }>;
  };
  automations: {
    active: number;
    total: number;
    performance: Array<{
      id: string;
      name: string;
      generations: number;
      revenue: number;
      conversionRate: number;
    }>;
  };
}

export interface RevenueData {
  revenue: {
    total: number;
    trend: number;
    chartData: Array<{ date: string; amount: number }>;
  };
  timeRange: string;
  lastUpdated: string;
}

/**
 * Analytics API service
 */
export const analyticsService = {
  /**
   * Fetch analytics overview data
   */
  getAnalytics: async (): Promise<AnalyticsData> => {
    return api.get<AnalyticsData>('/analytics');
  },

  /**
   * Fetch revenue data with time range
   */
  getRevenue: async (timeRange: string = '7d'): Promise<RevenueData> => {
    return api.post<RevenueData>('/analytics', { timeRange });
  },

  /**
   * Fetch automation performance metrics
   */
  getAutomationPerformance: async (automationId: string) => {
    return api.get(`/analytics/automations/${automationId}`);
  },
};
