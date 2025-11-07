import { api } from './api';
import type { AutomationFlow } from '@/lib/types/flow';

export interface SaveFlowRequest {
  flowId: string;
  flow: AutomationFlow;
}

export interface SaveFlowResponse {
  success: boolean;
  flowId: string;
  message?: string;
}

export interface PublishFlowRequest {
  flowId: string;
  publish: boolean;
}

export interface PublishFlowResponse {
  success: boolean;
  published: boolean;
  message?: string;
}

/**
 * Automation/Flow API service
 */
export const automationService = {
  /**
   * Get flow by ID
   */
  getFlow: async (flowId: string): Promise<AutomationFlow> => {
    return api.get<AutomationFlow>(`/flows/${flowId}`);
  },

  /**
   * Save flow changes
   */
  saveFlow: async (flowId: string, flow: AutomationFlow): Promise<SaveFlowResponse> => {
    return api.post<SaveFlowResponse>('/flows/save', { flowId, flow });
  },

  /**
   * Publish or unpublish a flow
   */
  publishFlow: async (flowId: string, publish: boolean): Promise<PublishFlowResponse> => {
    return api.post<PublishFlowResponse>('/flows/publish', { flowId, publish });
  },

  /**
   * Delete a flow
   */
  deleteFlow: async (flowId: string): Promise<{ success: boolean }> => {
    return api.delete(`/flows/${flowId}`);
  },

  /**
   * Duplicate a flow
   */
  duplicateFlow: async (flowId: string): Promise<{ success: boolean; newFlowId: string }> => {
    return api.post(`/flows/${flowId}/duplicate`);
  },
};
