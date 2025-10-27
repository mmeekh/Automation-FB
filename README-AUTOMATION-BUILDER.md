# 🤖 AUTOMATION BUILDER - Implementation Roadmap

> **Project**: LookLab Instagram Automation Flow Builder
> **Goal**: ManyChat-style visual automation builder with collapsible sidebar navigation
> **Status**: Phase 1 - Flow Builder Foundation (In Progress)

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Architecture Decisions](#architecture-decisions)
3. [Phase Breakdown](#phase-breakdown)
4. [Component Structure](#component-structure)
5. [Mock Data Structures](#mock-data-structures)
6. [Implementation Steps](#implementation-steps)
7. [File Structure](#file-structure)
8. [Dependencies](#dependencies)
9. [Current Progress](#current-progress)

---

## 🎯 PROJECT OVERVIEW

### What We're Building

A visual flow builder for Instagram automation that allows users to:
- Create automation flows with drag & drop nodes
- Configure trigger keywords
- Design message sequences with images and buttons
- Set up image generation workflows
- Monitor real-time statistics (sent, delivered, opened, clicked)
- Test automations before going live
- View user responses in a 4-column table

### Key Differences from ManyChat

**SIMPLER NODE TYPES** - We handle logic on backend:
- ✅ Trigger Node (keyword-based)
- ✅ Message Node (text + image + buttons)
- ✅ Image Request Node (wait for user photo)
- ✅ Result Node (AI output + appointment button)
- ❌ NO: Condition nodes, Action nodes, External API nodes, Another Flow nodes
- **Why**: Users don't need automation expertise - we handle all logic server-side

**FOCUS ON HAIR/AESTHETIC TRANSFORMATIONS**:
- Image-first workflows
- WhatsApp appointment integration
- Multi-account Instagram support

---

## 🏗️ ARCHITECTURE DECISIONS

### 1. **Flow Builder Library**
**DECISION**: Use **React Flow** (https://reactflow.dev/)

**Reasoning**:
- Industry standard for node-based editors
- Excellent TypeScript support
- Handles complex layouts automatically
- Built-in drag & drop, zoom, pan
- Easy to customize node appearance
- Similar to ManyChat's underlying tech

**Installation**:
```bash
npm install reactflow
```

### 2. **Layout Structure**

```
┌─────────────────────────────────────────────────────────┐
│  COLLAPSIBLE SIDEBAR (200px collapsed, 280px expanded)  │
│                                                          │
│  ┌──────────────┐  ┌──────────────────────────────────┐│
│  │              │  │  TOP BAR (automation controls)   ││
│  │  LookLab     │  ├──────────────────────────────────┤│
│  │              │  │                                  ││
│  │  [+] Account │  │                                  ││
│  │  @account1   │  │    FLOW BUILDER CANVAS           ││
│  │  @account2   │  │    (React Flow)                  ││
│  │              │  │                                  ││
│  │  🏠 Home     │  │                                  ││
│  │  👥 Contacts │  │                                  ││
│  │  ⚡ Auto     │  │                                  ││
│  │  ⚙️ Settings │  │                                  ││
│  │              │  │                                  ││
│  │  Profile     │  └──────────────────────────────────┘│
│  │  Help        │                                       │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

### 3. **State Management**

**Zustand stores**:
- `useFlowStore` - Flow nodes, edges, current automation
- `useAutomationStore` - Existing (activation status)
- `useAccountStore` - NEW - Instagram accounts
- `useUIStore` - NEW - Sidebar collapse, edit mode, undo/redo

### 4. **Routing Structure**

```
/automations                    → Template selection (existing)
/automations/[id]/customize     → REMOVED (replaced by builder)
/automations/builder/[flowId]   → NEW - Flow builder page
/automations/[flowId]/responses → NEW - 4-column responses table
```

---

## 📅 PHASE BREAKDOWN

### ✅ **PHASE 0: PREPARATION** (Current)
- [x] Create README-AUTOMATION-BUILDER.md
- [ ] Install dependencies
- [ ] Create mock data structures
- [ ] Set up new routing

### 🚧 **PHASE 1: FLOW BUILDER FOUNDATION** (2-3 days)
**Goal**: Basic visual flow builder with read-only nodes

**Tasks**:
1. Collapsible sidebar layout
2. Account switcher UI
3. React Flow canvas setup
4. 4 basic node types (visual only)
5. Drag & drop functionality
6. Node connections
7. Zoom/pan controls

**Deliverables**:
- Users can see a pre-built flow
- Users can drag nodes around
- Users can zoom/pan canvas
- Sidebar collapses/expands
- Account switcher visible

---

### 🔄 **PHASE 2: NODE EDITING & CUSTOMIZATION** (3-4 days)
**Goal**: Make nodes editable with full customization

**Tasks**:
1. Message node editor
   - Text input with emoji picker
   - Image upload (drag & drop)
   - Button builder (WhatsApp appointment)
2. Image Request node settings
   - Error message customization
   - Retry count setting
3. Trigger node configuration
   - Keyword input
   - Exact match toggle
4. Result node customization
   - Output message template
   - Appointment button auto-generation
5. Undo/Redo system
6. Edit mode vs View mode
7. Save functionality

**Deliverables**:
- Full CRUD for all node types
- Undo/Redo works
- Changes persist to store
- Save button shows on changes

---

### 📊 **PHASE 3: STATISTICS INTEGRATION** (2-3 days)
**Goal**: Display real-time stats on each node

**Tasks**:
1. Mock statistics data
2. Stats display on nodes:
   - Sent count
   - Delivered % (hover for number)
   - Opened % (hover for number)
   - Clicked % for buttons (hover for number)
3. Progress bar in top header
4. Live update simulation

**Deliverables**:
- Every node shows statistics
- Progress bar reflects quota
- Hover tooltips work
- Stats update in real-time (mock)

---

### 🧪 **PHASE 4: TEST/ACTIVE MODES & CONTROLS** (2 days)
**Goal**: Activation controls and test mode

**Tasks**:
1. Three-way switch (Deactive/Test/Active)
2. Test mode user selector
3. Edit mode detection
4. Save changes workflow
5. Activation confirmation modals

**Deliverables**:
- Users can switch modes
- Test mode shows user selector
- Edit mode triggers Save button
- Activation requires confirmation

---

### 📋 **PHASE 5: RESPONSES PAGE** (2-3 days)
**Goal**: 4-column table showing user interactions

**Tasks**:
1. Create `/automations/[flowId]/responses` page
2. 4-column table:
   - Column 1: User avatar + username
   - Column 2: Input Image 1
   - Column 3: Input Image 2
   - Column 4: Output Result
3. Pagination
4. Filters (date, status, username)
5. Inline image preview
6. Export functionality

**Deliverables**:
- Table shows all responses
- Pagination works
- Filters apply correctly
- Images show inline

---

## 🧩 COMPONENT STRUCTURE

```
app/
├── [locale]/
│   └── automations/
│       ├── builder/
│       │   └── [flowId]/
│       │       └── page.tsx           ← NEW: Flow builder page
│       └── [flowId]/
│           └── responses/
│               └── page.tsx           ← NEW: Responses table

components/
├── layout/
│   ├── AutomationSidebar.tsx          ← NEW: Collapsible sidebar
│   └── AccountSwitcher.tsx            ← NEW: Account selector with [+]
│
├── automation-builder/                ← NEW FOLDER
│   ├── FlowCanvas.tsx                 ← React Flow wrapper
│   ├── TopControls.tsx                ← Progress bar + mode switch + save
│   ├── UndoRedoButtons.tsx
│   │
│   ├── nodes/
│   │   ├── TriggerNode.tsx            ← Keyword trigger
│   │   ├── MessageNode.tsx            ← Text + image + buttons
│   │   ├── ImageRequestNode.tsx       ← Wait for user image
│   │   ├── ResultNode.tsx             ← AI output + appointment
│   │   └── BaseNode.tsx               ← Shared node wrapper
│   │
│   ├── editors/                       ← Node editing panels
│   │   ├── MessageEditor.tsx
│   │   ├── ImageRequestEditor.tsx
│   │   ├── TriggerEditor.tsx
│   │   └── ResultEditor.tsx
│   │
│   └── NodeStatistics.tsx             ← Stats overlay component
│
└── responses/                         ← NEW FOLDER
    ├── ResponsesTable.tsx
    ├── ResponseRow.tsx
    ├── ResponseFilters.tsx
    └── ImagePreview.tsx

lib/
├── store/
│   ├── flowStore.ts                   ← NEW: Flow state management
│   ├── accountStore.ts                ← NEW: Instagram accounts
│   └── uiStore.ts                     ← NEW: UI state (sidebar, edit mode)
│
└── mock-data/
    ├── flows.ts                       ← NEW: Sample flows
    ├── accounts.ts                    ← NEW: Sample IG accounts
    ├── responses.ts                   ← NEW: Sample user responses
    └── statistics.ts                  ← NEW: Sample stats
```

---

## 📦 MOCK DATA STRUCTURES

### 1. Flow Structure

```typescript
// lib/types/flow.ts

export type NodeType = 'trigger' | 'message' | 'image_request' | 'result';

export interface FlowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: NodeData;
}

export interface NodeData {
  // Common
  label: string;

  // Trigger specific
  keywords?: string[];
  exactMatch?: boolean;

  // Message specific
  messageText?: string;
  imageUrl?: string | null;
  buttons?: Button[];

  // Image Request specific
  errorMessage?: string;
  retryCount?: number;

  // Result specific
  outputTemplate?: string;
  appointmentButton?: AppointmentButton;

  // Statistics (all nodes)
  statistics?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked?: number; // only for buttons
  };
}

export interface Button {
  id: string;
  text: string;
  type: 'whatsapp' | 'cancel';
  whatsappConfig?: {
    phoneNumber: string;
    messageTemplate: string;
  };
}

export interface AppointmentButton {
  text: string;
  phoneNumber: string;
  autoMessage: string;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type?: 'default' | 'conditional';
}

export interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  templateId: string; // links to original template
  instagramAccountId: string;

  status: 'inactive' | 'test' | 'active';
  testUsers?: string[]; // usernames for test mode

  trigger: {
    keywords: string[];
    exactMatch: boolean;
  };

  nodes: FlowNode[];
  edges: FlowEdge[];

  settings: {
    followerOnly: boolean;
    dailyQuota: number;
    usedQuota: number;
    quotaResetPeriod: 'hourly' | 'daily';
  };

  createdAt: string;
  updatedAt: string;
}
```

### 2. Instagram Account

```typescript
// lib/types/account.ts

export interface InstagramAccount {
  id: string;
  username: string;
  displayName: string;
  profilePicture: string;
  isConnected: boolean;
  followerCount?: number;
  activeFlowsCount: number;
  totalQuota: number;
  usedQuota: number;
}
```

### 3. Response Data

```typescript
// lib/types/response.ts

export interface AutomationResponse {
  id: string;
  flowId: string;
  userId: string;
  username: string;
  profilePicture: string;

  inputImage1: string;
  inputImage2: string;
  outputImage: string;

  status: 'completed' | 'failed' | 'in_progress';

  conversationLog: ConversationMessage[];

  createdAt: string;
}

export interface ConversationMessage {
  id: string;
  sender: 'bot' | 'user';
  type: 'text' | 'image' | 'button_click';
  content: string;
  timestamp: string;
}
```

---

## 🚀 IMPLEMENTATION STEPS - PHASE 1

### Step 1: Install Dependencies

```bash
cd C:\Users\kader\OneDrive\Masaüstü\Automation-FB
npm install reactflow
npm install @xyflow/react  # if reactflow alone doesn't work
npm install zustand immer  # already installed but ensure latest
```

### Step 2: Create Type Definitions

**Files to create**:
- `lib/types/flow.ts`
- `lib/types/account.ts`
- `lib/types/response.ts`

### Step 3: Create Mock Data

**Files to create**:
- `lib/mock-data/flows.ts` - 2-3 sample flows
- `lib/mock-data/accounts.ts` - 3-4 Instagram accounts
- `lib/mock-data/statistics.ts` - Sample stats for nodes

### Step 4: Create Zustand Stores

**Files to create**:
- `lib/store/flowStore.ts`
- `lib/store/accountStore.ts`
- `lib/store/uiStore.ts`

### Step 5: Create Layout Components

**Files to create**:
1. `components/layout/AutomationSidebar.tsx`
   - Collapsible sidebar
   - LookLab logo
   - Account switcher
   - Navigation items
   - Profile section

2. `components/layout/AccountSwitcher.tsx`
   - Account list with avatars (AnimatedTooltip style)
   - [+] button to add account
   - Hover effects

### Step 6: Create Flow Builder Page

**File**: `app/[locale]/automations/builder/[flowId]/page.tsx`

**Layout**:
```tsx
<div className="flex h-screen">
  <AutomationSidebar />

  <div className="flex-1 flex flex-col">
    <TopControls />

    <div className="flex-1">
      <FlowCanvas />
    </div>
  </div>
</div>
```

### Step 7: Create React Flow Canvas

**File**: `components/automation-builder/FlowCanvas.tsx`

**Features**:
- Initialize React Flow
- Register custom node types
- Load flow from store
- Handle node drag
- Handle edge creation
- Zoom/pan controls

### Step 8: Create Node Components

**Files**:
- `components/automation-builder/nodes/TriggerNode.tsx`
- `components/automation-builder/nodes/MessageNode.tsx`
- `components/automation-builder/nodes/ImageRequestNode.tsx`
- `components/automation-builder/nodes/ResultNode.tsx`

**Each node shows**:
- Node type icon
- Node title
- Preview of content
- Statistics (sent, delivered, opened)
- Edit button (Phase 2)

### Step 9: Create Top Controls

**File**: `components/automation-builder/TopControls.tsx`

**Contents**:
```tsx
┌────────────────────────────────────────────────────────────┐
│ [☰ Toggle Sidebar]  [↶ Undo] [↷ Redo]                    │
│                                                            │
│ Progress: ████████░░ 750/1000 (75%)                       │
│                                                            │
│ [○ Inactive] [● Test] [● Active]  [Edit Automation]       │
└────────────────────────────────────────────────────────────┘
```

### Step 10: Connect Everything

- Link sidebar to routing
- Load flow based on flowId
- Display nodes on canvas
- Test drag & drop
- Test zoom/pan
- Test sidebar collapse

---

## 📁 FILE STRUCTURE (Complete)

```
Automation-FB/
├── app/
│   └── [locale]/
│       ├── automations/
│       │   ├── page.tsx                    ← Template selection
│       │   ├── builder/
│       │   │   └── [flowId]/
│       │   │       └── page.tsx            ← Flow builder
│       │   └── [flowId]/
│       │       └── responses/
│       │           └── page.tsx            ← Responses table
│       │
│       ├── dashboard/page.tsx
│       ├── settings/page.tsx
│       └── contacts/page.tsx               ← NEW (future)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                      ← HIDE in automation builder
│   │   ├── AutomationSidebar.tsx           ← NEW
│   │   └── AccountSwitcher.tsx             ← NEW
│   │
│   ├── automation-builder/                 ← NEW FOLDER
│   │   ├── FlowCanvas.tsx
│   │   ├── TopControls.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ModeSwitcher.tsx
│   │   ├── UndoRedoButtons.tsx
│   │   │
│   │   ├── nodes/
│   │   │   ├── BaseNode.tsx
│   │   │   ├── TriggerNode.tsx
│   │   │   ├── MessageNode.tsx
│   │   │   ├── ImageRequestNode.tsx
│   │   │   └── ResultNode.tsx
│   │   │
│   │   ├── editors/                        ← Phase 2
│   │   │   ├── NodeEditorPanel.tsx
│   │   │   ├── MessageEditor.tsx
│   │   │   ├── ImageRequestEditor.tsx
│   │   │   ├── TriggerEditor.tsx
│   │   │   ├── ResultEditor.tsx
│   │   │   ├── ButtonBuilder.tsx
│   │   │   └── ImageUploader.tsx
│   │   │
│   │   └── NodeStatistics.tsx
│   │
│   ├── responses/                          ← NEW FOLDER (Phase 5)
│   │   ├── ResponsesTable.tsx
│   │   ├── ResponseRow.tsx
│   │   ├── ResponseFilters.tsx
│   │   ├── ImagePreview.tsx
│   │   └── ExportButton.tsx
│   │
│   └── automations/
│       ├── AutomationCard.tsx              ← KEEP for template selection
│       ├── CollapsedView.tsx
│       └── DetailView.tsx
│
├── lib/
│   ├── types/
│   │   ├── flow.ts                         ← NEW
│   │   ├── account.ts                      ← NEW
│   │   └── response.ts                     ← NEW
│   │
│   ├── store/
│   │   ├── automationStore.ts              ← EXISTING (activation status)
│   │   ├── flowStore.ts                    ← NEW (flow editing)
│   │   ├── accountStore.ts                 ← NEW (IG accounts)
│   │   └── uiStore.ts                      ← NEW (UI state)
│   │
│   ├── mock-data/
│   │   ├── flows.ts                        ← NEW
│   │   ├── accounts.ts                     ← NEW
│   │   ├── responses.ts                    ← NEW
│   │   └── statistics.ts                   ← NEW
│   │
│   └── utils/
│       ├── whatsappLinkGenerator.ts        ← NEW
│       └── flowValidation.ts               ← NEW
│
└── README-AUTOMATION-BUILDER.md            ← THIS FILE
```

---

## 📦 DEPENDENCIES

### Required NPM Packages

```json
{
  "dependencies": {
    "reactflow": "^11.11.0",           // Flow builder
    "zustand": "^4.5.0",               // Already installed
    "immer": "^10.0.0",                // For undo/redo
    "@heroicons/react": "^2.1.0",      // Already installed
    "next": "^14.2.0",                 // Already installed
    "react": "^18.3.0",                // Already installed
    "framer-motion": "^12.23.24"       // Already installed (animations)
  }
}
```

### React Flow Documentation
- Docs: https://reactflow.dev/
- Examples: https://reactflow.dev/examples
- Custom Nodes: https://reactflow.dev/examples/nodes/custom-node

---

## ✅ CURRENT PROGRESS

### Completed
- [x] Project architecture planning
- [x] README-AUTOMATION-BUILDER.md created
- [x] Dependencies identified
- [x] Mock data structures defined
- [x] Phase breakdown completed

### Next Steps (Phase 1)
1. Install `reactflow` package
2. Create type definitions (`lib/types/flow.ts`, `account.ts`, `response.ts`)
3. Create mock data files
4. Create Zustand stores
5. Build AutomationSidebar component
6. Build AccountSwitcher component
7. Create flow builder page
8. Implement FlowCanvas with React Flow
9. Create 4 node components
10. Build TopControls component

---

## 🎨 DESIGN NOTES

### Sidebar Design
- **Collapsed**: 60px wide (only icons)
- **Expanded**: 280px wide (icons + text)
- **Toggle**: Hamburger icon top-left
- **Accounts**: AnimatedAvatarTooltip style (overlapping circles)
- **Add Account**: [+] button after accounts

### Node Design (ManyChat-inspired)
```
┌──────────────────────────────────┐
│  [Icon] Node Title               │
│                                  │
│  Content Preview...              │
│                                  │
│  📊 Sent: 33 | Opened: 97%       │
│                                  │
│             [Edit] ──────────────┼──> Next Node
└──────────────────────────────────┘
```

### Top Controls Design
```
┌──────────────────────────────────────────────────────────┐
│ [☰] [↶] [↷]                                              │
│                                                          │
│ Daily Quota:  ████████████░░░░░░ 750/1000 (75%)         │
│                                                          │
│ Mode: ○ Inactive  ● Test  ● Active    [Edit Automation] │
└──────────────────────────────────────────────────────────┘
```

---

## 🐛 KNOWN ISSUES & CONSIDERATIONS

### To Handle Later
1. **Multi-language support**: Currently sidebar will be in TR, need i18n
2. **Mobile responsive**: Flow builder not mobile-friendly (desktop-only OK for MVP)
3. **Real-time collaboration**: Future feature (multiple users editing same flow)
4. **Flow versioning**: No version history yet (add in Phase 6)
5. **Keyboard shortcuts**: Add later (e.g., Ctrl+Z for undo)

### Performance Considerations
- Limit max nodes per flow (e.g., 50 nodes)
- Virtualize responses table for large datasets
- Debounce auto-save

---

## 💡 TIPS FOR CONTINUATION

### If Another AI Continues This Work

**Context to provide**:
1. Show this README
2. Show current file structure: `tree /f > structure.txt`
3. Show relevant code files
4. Specify which phase and step you're on

**Key State Management Pattern**:
```typescript
// All stores follow this pattern
export const useFlowStore = create<FlowStore>()(
  persist(
    (set, get) => ({
      // State
      currentFlow: null,

      // Actions
      loadFlow: (flowId) => { /* ... */ },
      updateNode: (nodeId, data) => { /* ... */ },
      addNode: (node) => { /* ... */ },
      deleteNode: (nodeId) => { /* ... */ },
    }),
    { name: 'flow-storage' }
  )
);
```

**React Flow Integration Pattern**:
```typescript
// FlowCanvas.tsx basic structure
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

const nodeTypes = {
  trigger: TriggerNode,
  message: MessageNode,
  image_request: ImageRequestNode,
  result: ResultNode,
};

export function FlowCanvas() {
  const { currentFlow } = useFlowStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(currentFlow?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(currentFlow?.edges || []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}
```

---

## 📞 CONTACT & QUESTIONS

If you have questions while implementing:

1. **Architecture questions**: Refer to "Architecture Decisions" section
2. **Data structure questions**: Refer to "Mock Data Structures" section
3. **UI/UX questions**: Check design screenshots in project root
4. **React Flow questions**: Check https://reactflow.dev/examples

---

## 🎯 SUCCESS CRITERIA

### Phase 1 Complete When:
- [ ] User can navigate to `/automations/builder/[flowId]`
- [ ] Sidebar shows and collapses
- [ ] Account switcher displays accounts + [+] button
- [ ] Flow canvas renders with 4 node types
- [ ] Nodes can be dragged around
- [ ] Canvas can zoom and pan
- [ ] Nodes show mock statistics
- [ ] Top controls show progress bar and mode switcher
- [ ] No console errors

### Overall Project Complete When:
- [ ] All 5 phases completed
- [ ] User can create flows from templates
- [ ] User can edit all node properties
- [ ] User can activate/test automations
- [ ] Statistics display correctly
- [ ] Responses table shows user interactions
- [ ] Ready for backend integration

---

**Last Updated**: 2025-01-XX
**Version**: 1.0.0
**Author**: Claude + Developer Team

---

## 🚀 QUICK START

```bash
# 1. Install dependencies
npm install reactflow

# 2. Run dev server
npm run dev

# 3. Navigate to
http://localhost:3003/automations/builder/hair-restoration-flow

# 4. Start coding! Follow Phase 1 steps above.
```

**Ready to build! Let's start with Phase 1, Step 1** 🎨
