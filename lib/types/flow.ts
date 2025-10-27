import { Node, Edge } from 'reactflow';

/**
 * Node types for automation flow
 * Only 4 types - we keep it simple, logic handled on backend
 */
export type NodeType = 'trigger' | 'message' | 'image_request' | 'result';

/**
 * Button types for message nodes
 */
export interface Button {
  id: string;
  text: string;
  type: 'whatsapp' | 'cancel';
  whatsappConfig?: {
    phoneNumber: string;
    messageTemplate: string;
  };
  statistics?: {
    clicked: number; // count
    clickRate: number; // percentage
  };
}

/**
 * Appointment button for result nodes
 */
export interface AppointmentButton {
  text: string;
  phoneNumber: string;
  autoMessage: string; // template: "Merhaba randevu almak istiyorum"
}

/**
 * Node statistics - displayed on every node
 */
export interface NodeStatistics {
  sent: number; // total count
  delivered: number; // count
  deliveredRate: number; // percentage
  opened: number; // count
  openedRate: number; // percentage
  clicked?: number; // only for buttons
  clickRate?: number; // percentage
}

/**
 * Base node data interface
 */
export interface BaseNodeData {
  label: string; // node title
  icon?: string; // emoji icon
  statistics?: NodeStatistics;
}

/**
 * Trigger node data
 */
export interface TriggerNodeData extends BaseNodeData {
  keywords: string[]; // ["saç", "SAÇ", "sac degisimi"]
  exactMatch: boolean; // if true, word must be standalone
}

/**
 * Message node data
 */
export interface MessageNodeData extends BaseNodeData {
  messageText: string;
  imageUrl: string | null;
  buttons: Button[];
}

/**
 * Image request node data
 */
export interface ImageRequestNodeData extends BaseNodeData {
  requestMessage: string; // "Lütfen fotoğrafınızı gönderin"
  errorMessage: string; // "Hata! Lütfen fotoğraf gönderin"
  retryCount: number; // max retry attempts
}

/**
 * Result node data
 */
export interface ResultNodeData extends BaseNodeData {
  outputTemplate: string; // message with result
  imageUrl: string | null; // AI generated image
  appointmentButton?: AppointmentButton;
  delayedMessages?: {
    // 2-3 additional messages after result
    delay: number; // seconds
    text: string;
  }[];
}

/**
 * Union type for all node data
 */
export type FlowNodeData =
  | TriggerNodeData
  | MessageNodeData
  | ImageRequestNodeData
  | ResultNodeData;

/**
 * Flow node - compatible with React Flow's Node type
 */
export type FlowNode = Node<FlowNodeData> & {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: FlowNodeData;
};

/**
 * Flow edge - compatible with React Flow's Edge type
 */
export type FlowEdge = Edge & {
  id: string;
  source: string;
  target: string;
  type?: 'default' | 'conditional';
  animated?: boolean;
};

/**
 * Complete automation flow
 */
export interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  templateId: string; // links to original template from /automations

  // Instagram account this flow belongs to
  instagramAccountId: string;

  // Current status
  status: 'inactive' | 'test' | 'active';
  testUsers: string[]; // usernames allowed in test mode

  // Trigger configuration
  trigger: {
    keywords: string[];
    exactMatch: boolean;
  };

  // Flow structure (React Flow format)
  nodes: FlowNode[];
  edges: FlowEdge[];

  // Quota & settings
  settings: {
    followerOnly: boolean; // only followers can use
    dailyQuota: number; // max generations per day
    usedQuota: number; // current usage
    quotaResetPeriod: 'hourly' | 'daily';
  };

  // Timestamps
  createdAt: string;
  updatedAt: string;

  // Overall flow statistics
  totalInteractions: number;
  totalCompletions: number;
  averageCompletionTime: number; // seconds
}

/**
 * Flow template metadata
 */
export interface FlowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  defaultNodes: FlowNode[];
  defaultEdges: FlowEdge[];
}
