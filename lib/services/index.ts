/**
 * Centralized API services
 *
 * Usage:
 * import { analyticsService, automationService, accountService } from '@/lib/services';
 *
 * // Analytics
 * const data = await analyticsService.getAnalytics();
 *
 * // Automation/Flow
 * const flow = await automationService.getFlow('flow-123');
 * await automationService.saveFlow('flow-123', updatedFlow);
 *
 * // Account
 * const accounts = await accountService.getAccounts();
 * await accountService.updateAccount('acc-123', { isActive: true });
 */

export { api, ApiError } from './api';
export { analyticsService } from './analytics';
export { automationService } from './automation';
export { accountService } from './account';

export type { AnalyticsData, RevenueData } from './analytics';
export type { SaveFlowRequest, SaveFlowResponse, PublishFlowRequest, PublishFlowResponse } from './automation';
export type { UpdateAccountRequest, UpdateAccountResponse } from './account';
