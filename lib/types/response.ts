/**
 * Single conversation message in automation flow
 */
export interface ConversationMessage {
  id: string;
  sender: 'bot' | 'user';
  type: 'text' | 'image' | 'button_click';
  content: string; // text content or image URL
  timestamp: string;
  nodeId?: string; // which flow node sent/received this
}

/**
 * Complete automation response - one user's interaction
 */
export interface AutomationResponse {
  id: string;
  flowId: string;
  flowName: string;

  // User info
  userId: string;
  username: string;
  profilePicture: string;

  // Key images for 4-column table display
  inputImage1: string; // first photo user sent
  inputImage2: string; // second photo user sent
  outputImage: string; // AI generated result

  // Status
  status: 'completed' | 'failed' | 'in_progress' | 'abandoned';
  failureReason?: string; // if failed

  // Full conversation log
  conversationLog: ConversationMessage[];

  // Metadata
  startedAt: string;
  completedAt?: string;
  duration?: number; // seconds
  retriesCount: number; // how many times user made mistakes

  // Analytics
  buttonClicks: Record<string, number>; // buttonId -> click count
}

/**
 * Response filters for table
 */
export interface ResponseFilters {
  status?: 'completed' | 'failed' | 'in_progress' | 'abandoned';
  dateFrom?: string;
  dateTo?: string;
  username?: string;
  flowId?: string;
}

/**
 * Response table pagination
 */
export interface ResponsePagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Response list result
 */
export interface ResponseListResult {
  responses: AutomationResponse[];
  pagination: ResponsePagination;
}
