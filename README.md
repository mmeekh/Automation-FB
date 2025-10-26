# 🚀 LookLab - No-Code Instagram Automation Platform

> **Ready-to-use automation templates** with visual customization - no coding required. Built for beauty professionals, content creators, and businesses.

**Inspiration:** ManyChat simplicity + Buffer scheduling + AI-powered transformations

**Status:** 🚧 Development Phase → Facebook Review → Production Launch

---

## 📋 Table of Contents

- [Vision & Overview](#-vision--overview)
- [Key Features](#-key-features)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [Automation Templates](#-automation-templates)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [User Journey](#-user-journey)
- [Flow Node Types](#-flow-node-types)
- [API Integration](#-api-integration)
- [Customization Levels](#-customization-levels)
- [Facebook Review Preparation](#-facebook-review-preparation)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)

---

## 🎯 Vision & Overview

### What is LookLab?

LookLab is a **no-code automation platform** that provides **pre-built, production-ready workflows** for Instagram (with future support for WhatsApp, TikTok, WordPress). Think of it as:

- 🎨 **ManyChat** - Visual flow builder (but simpler - customize, don't build)
- 📅 **Buffer** - Post scheduling and batch management
- 🤖 **AI-Powered** - Google Gemini for image transformations

### Who Is It For?

#### Primary Users (Launch)
- 💇 **Hair Salons** - Hair transformation previews via Instagram DM
- 🏥 **Hair Transplant Clinics** - Restoration simulations
- 💅 **Beauty Centers** - Nail art, aesthetic previews

#### Future Users (Post-Launch)
- 📱 **Content Creators** - Batch scheduling for TikTok/Instagram/WP
- 🏢 **Small Businesses** - Customer support automation
- 🎨 **Social Media Managers** - Multi-platform campaign management

### Key Differentiators

- ✅ **Zero Code Required** - Pre-built automations, just customize content
- ✅ **Visual Flow Editor** - See the workflow, edit messages/images only
- ✅ **Backend-Managed Flows** - Logic is fixed, users can't break it
- ✅ **VIP Access Control** - Set generation limits per user
- ✅ **Multi-Platform Ready** - Instagram now, TikTok/WP/WhatsApp next
- ✅ **AI-Native** - Gemini 2.0 Flash for instant transformations
- ✅ **Mobile-First** - Fully responsive, works on phones/tablets

---

## ✨ Key Features

### 🎨 Core Features (MVP)

#### 1. **Pre-Built Automation Templates**
- **Hair Restoration** - AI hair transformation flow
- **Nail Designer** - Virtual nail art try-on
- **Aesthetic AI** - Nose preview simulation

**What users do:**
- ✅ Select template from library
- ✅ Customize messages (text + emojis)
- ✅ Upload custom images
- ✅ Set VIP access rules
- ✅ Configure generation limits
- ❌ **Cannot** modify flow logic (nodes are fixed)

#### 2. **Visual Flow Customization**
- **Read-Only Flow View** - Users see the automation flow
- **Inline Editing** - Click node → Edit content
- **Live Preview** - Test before activation
- **Multi-Language** - Turkish & English support

#### 3. **VIP Access & Limits**
Per-automation settings:
- **Who can use:** All followers / Tagged users / VIP list
- **Generation limit:** X per user per day/week/month
- **Quota reset:** Daily / Weekly / Monthly
- **Priority queue:** VIP users get faster processing

#### 4. **Instagram DM Management**
- **Trigger:** User sends DM / Applies tag / Custom field changes
- **Actions:** Send message, request image, call AI, send result
- **Conditions:** Tag checks, quota validation, error handling
- **Analytics:** Track sent/delivered/opened/clicked rates

### 🚀 Future Features (Post-MVP)

#### 5. **Multi-Platform Automations** (Q3 2025)
- **WhatsApp** - Meta Business API integration
- **TikTok** - Batch video scheduler
- **WordPress** - Auto-publish blog posts
- **Twitter/X** - Thread scheduler

#### 6. **Batch Scheduling** (Buffer-like) (Q3 2025)
- **Post Queue** - Schedule posts in advance
- **Optimal Time** - AI suggests best posting times
- **Multi-Account** - Manage multiple Instagram/TikTok accounts
- **Content Calendar** - Visual timeline view

#### 7. **Advanced DM Automations** (Q4 2025)
- **Welcome Flow** - Greet new followers
- **Lead Qualification** - Ask questions, tag, route
- **Support Bot** - FAQ automation with AI fallback
- **Abandoned Cart** - E-commerce recovery flow

---

## 🔄 How It Works

### User Perspective

```
1. Login with Instagram
         ↓
2. Dashboard → "Explore Automations"
         ↓
3. Browse Templates (Hair, Nail, Nose)
         ↓
4. Click "Use This Template"
         ↓
5. Customize Screen Opens:
   ├── 📝 Messages Tab (Edit text, add emojis)
   ├── 🖼️ Images Tab (Upload custom photos)
   ├── ⚙️ Settings Tab
   │   ├── VIP Access (who can use)
   │   ├── Generation Limit (5 per user per day)
   │   └── Quota Reset (daily/weekly/monthly)
   └── 👁️ Preview Tab (Test flow)
         ↓
6. Click "Activate Automation"
         ↓
7. Users start sending DMs → Automation runs
         ↓
8. Analytics Dashboard (track performance)
```

### Technical Flow (Behind the Scenes)

```
User sends Instagram DM
         ↓
Instagram Webhook → Backend
         ↓
Load user's customized automation from DB
         ↓
Execute flow nodes sequentially:
  1️⃣ Trigger: Contact event occurs
  2️⃣ Condition: Check tag / quota
  3️⃣ Action: Request selfie image
  4️⃣ Delay: Wait for user response
  5️⃣ Action: Send to Gemini AI
  6️⃣ Message: Send transformed image
  7️⃣ Action: Log analytics
         ↓
Return response to Instagram
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.4
- **Styling:** TailwindCSS 3.4
- **UI Components:** Custom + Headless UI
- **Icons:** Heroicons + Lucide React
- **Animations:** Framer Motion 12
- **State:** Zustand 4.5
- **i18n:** next-intl 3.15

### Backend (Integration Ready)
- **API:** FastAPI (Python) / Node.js Express
- **Database:** PostgreSQL (user data, customizations, analytics)
- **Cache:** Redis (session, rate limiting)
- **Queue:** Celery / BullMQ (async processing)
- **AI:** Google Gemini 2.0 Flash
- **Storage:** AWS S3 / Cloudflare R2 (images)
- **Auth:** Instagram OAuth 2.0 + JWT

### Infrastructure
- **Hosting:** Vercel (frontend) / Railway (backend)
- **CDN:** Vercel Edge Network
- **Monitoring:** Sentry (errors) + Vercel Analytics
- **Logging:** Logflare / Axiom

---

## 🤖 Automation Templates

### Current Templates (MVP)

#### 1. Hair Restoration Flow
**Use Case:** Hair salon/clinic offers virtual hair transformation

**Flow:**
```
📩 Send Message #1
   "Welcome! 📸 Please send your selfie."
      ↓
🖼️ Wait for Image
      ↓
📩 Send Message #2
   "Great! Now send your desired hairstyle reference."
      ↓
🖼️ Wait for Image #2
      ↓
⚙️ Condition: Check Quota
   ├── ✅ Has credits → Continue
   └── ❌ No credits → Send error message
      ↓
🤖 AI Processing
   Gemini analyzes + transforms image (15-30 sec)
      ↓
📩 Send Result
   "Here's your transformation! ✨ [Image]"
   [Book Appointment Button]
      ↓
📊 Log Analytics
```

**Customization Options:**
- ✅ Edit all message texts
- ✅ Upload example hairstyle images
- ✅ Change button URL (appointment booking)
- ✅ Set generation limit (e.g., 5 per user per day)
- ✅ VIP list (specific usernames bypass limits)

#### 2. Nail Transformation Flow
*(Similar structure to Hair Restoration)*

#### 3. Aesthetic AI (Nose Preview)
*(Similar structure to Hair Restoration)*

### Future Templates (Roadmap)

#### 4. Instagram Post Scheduler (Q3 2025)
- Batch upload posts
- Schedule publish time
- Auto-hashtag suggestions
- Multi-account support

#### 5. TikTok Batch Upload (Q3 2025)
- Upload multiple videos
- Schedule optimal posting times
- Auto-caption generation
- Trend analytics

#### 6. WordPress Auto-Publish (Q3 2025)
- Write post in LookLab
- Auto-publish to WP
- SEO optimization
- Image compression

#### 7. Welcome DM Flow (Q4 2025)
- Trigger: New follower
- Send welcome message
- Ask qualification questions
- Tag based on answers

---

## 📁 Project Structure

```
Automation-FB/
├── app/                              # Next.js App Router
│   ├── [locale]/                     # Internationalized routes
│   │   ├── login/                    # Instagram OAuth login
│   │   ├── dashboard/                # Main dashboard
│   │   ├── automations/              # Automation management
│   │   │   └── [id]/                 # Single automation detail
│   │   │       ├── customize/        # Customization UI
│   │   │       ├── analytics/        # Automation analytics
│   │   │       └── settings/         # VIP/limit settings
│   │   ├── templates/                # Template library
│   │   ├── analytics/                # Global analytics
│   │   └── settings/                 # User settings
│   │
│   ├── api/                          # API routes (future backend proxy)
│   │   ├── automations/
│   │   ├── templates/
│   │   ├── analytics/
│   │   └── flows/
│   │
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Landing page redirect
│
├── components/                       # React components
│   ├── flow/                         # Flow builder components (FUTURE)
│   │   ├── FlowCanvas.tsx            # Visual flow renderer
│   │   ├── NodeTypes/                # Node UI components
│   │   │   ├── TriggerNode.tsx
│   │   │   ├── ConditionNode.tsx
│   │   │   ├── ActionNode.tsx
│   │   │   ├── MessageNode.tsx
│   │   │   └── DelayNode.tsx
│   │   ├── NodeEditor.tsx            # Inline content editor
│   │   └── FlowPreview.tsx           # Test mode simulator
│   │
│   ├── customization/                # Customization UI
│   │   ├── MessageEditor.tsx         # Rich text editor for messages
│   │   ├── ImageUploader.tsx         # Drag & drop image upload
│   │   ├── VIPSettings.tsx           # Access control panel
│   │   └── LimitSettings.tsx         # Quota configuration
│   │
│   ├── analytics/                    # Analytics widgets
│   │   ├── MetricCard.tsx
│   │   ├── RevenueInsights.tsx
│   │   └── UserBehaviorChart.tsx
│   │
│   ├── dashboard/                    # Dashboard components
│   │   ├── AutomationCard.tsx
│   │   ├── QuickStats.tsx
│   │   └── RecentActivity.tsx
│   │
│   ├── templates/                    # Template browser
│   │   ├── TemplateCard.tsx
│   │   ├── TemplateDetail.tsx
│   │   └── CategoryFilter.tsx
│   │
│   ├── layout/                       # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   │
│   ├── ui/                           # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Toast.tsx
│   │
│   └── index.ts                      # Component exports
│
├── lib/                              # Core logic
│   ├── automations/                  # Automation system
│   │   ├── flows/                    # Pre-built flow definitions
│   │   │   ├── hair-restoration/
│   │   │   │   ├── flow.json         # Node structure (READ-ONLY)
│   │   │   │   ├── config.ts         # Default configuration
│   │   │   │   ├── schema.ts         # Customization schema
│   │   │   │   └── README.md         # Setup instructions
│   │   │   ├── nail-transformation/
│   │   │   └── aesthetic-ai/
│   │   │
│   │   ├── customization/            # Customization layer
│   │   │   ├── messages.ts           # Message template handlers
│   │   │   ├── images.ts             # Image upload/management
│   │   │   ├── settings.ts           # VIP/limit settings
│   │   │   └── validation.ts         # Input validation
│   │   │
│   │   ├── templates/                # Template metadata
│   │   │   ├── hair-restoration.ts
│   │   │   ├── nail-transformation.ts
│   │   │   └── aesthetic-ai.ts
│   │   │
│   │   ├── registry.ts               # Template registry
│   │   ├── types.ts                  # Type definitions
│   │   └── index.ts                  # Public API
│   │
│   ├── types/                        # Shared types
│   │   ├── automation.ts             # Automation types
│   │   ├── flow.ts                   # Flow node types
│   │   ├── user.ts                   # User types
│   │   └── analytics.ts              # Analytics types
│   │
│   ├── api.ts                        # API client (mock → real)
│   ├── auth.ts                       # Auth handlers (OAuth)
│   ├── store.ts                      # Zustand global store
│   ├── types.ts                      # Global type exports
│   └── utils.ts                      # Utility functions
│
├── i18n/                             # Internationalization
│   └── request.ts                    # i18n config
│
├── messages/                         # Translation files
│   ├── en.json                       # English
│   └── tr.json                       # Turkish
│
├── public/                           # Static assets
│   ├── images/                       # Images
│   ├── icons/                        # Icons
│   ├── favicon.ico
│   └── robots.txt
│
├── docs/                             # Documentation (FUTURE)
│   ├── images/                       # Screenshots
│   ├── api/                          # API docs
│   └── guides/                       # User guides
│
├── .env.local                        # Local env variables
├── .env.example                      # Environment template
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **Git** for version control

### Installation

```bash
# Clone repository
git clone <repository-url>
cd Automation-FB

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Configure environment (see below)
```

### Environment Variables

Create `.env.local`:

```bash
# ============================================================
# APPLICATION
# ============================================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3007

# ============================================================
# BACKEND API (when ready)
# ============================================================
NEXT_PUBLIC_API_URL=http://localhost:8000
# Production: https://api.yourdomain.com

# ============================================================
# INSTAGRAM OAUTH (Facebook Developer Console)
# ============================================================
# Get from: https://developers.facebook.com
NEXT_PUBLIC_INSTAGRAM_APP_ID=your_app_id
NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI=http://localhost:3007/auth/callback

# ============================================================
# GOOGLE OAUTH (Optional - backup auth)
# ============================================================
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# ============================================================
# ANALYTICS (Future)
# ============================================================
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# ============================================================
# FEATURE FLAGS (Future)
# ============================================================
NEXT_PUBLIC_ENABLE_FLOW_BUILDER=false  # Visual flow builder
NEXT_PUBLIC_ENABLE_BATCH_SCHEDULER=false
NEXT_PUBLIC_ENABLE_WHATSAPP=false
```

### Development Server

```bash
# Start development server (port 3007)
npm run dev

# Open browser
open http://localhost:3007
```

### Build for Production

```bash
# Type checking
npm run type-check

# Build optimized bundle
npm run build

# Start production server
npm start
```

---

## 👤 User Journey

### 1. First-Time User

```
Step 1: Landing Page
  ├── Hero: "No-code Instagram Automation"
  ├── 3 Template Showcases (Hair, Nail, Nose)
  ├── "How It Works" section
  └── [Login with Instagram] button
       ↓
Step 2: Instagram OAuth
  ├── Redirect to Facebook Login
  ├── User authorizes permissions
  └── Callback to /auth/callback
       ↓
Step 3: Dashboard (first load)
  ├── Welcome modal: "Explore our templates"
  ├── Quick stats (0 automations active)
  └── [Explore Automations] button → Templates page
       ↓
Step 4: Templates Library
  ├── Browse templates (grid view)
  ├── Filter by category (Beauty, Social, DM)
  └── Click template card → Detail modal
       ↓
Step 5: Template Detail
  ├── Flow preview (read-only)
  ├── Example results
  ├── Features list
  └── [Use This Template] button
       ↓
Step 6: Customization Screen (4 tabs)
  ├── Tab 1: Messages
  │   ├── List of all message nodes
  │   ├── Click to edit text
  │   ├── Emoji picker
  │   └── Variable insertion {{user_name}}
  │
  ├── Tab 2: Images
  │   ├── Upload zones for each image node
  │   ├── Drag & drop support
  │   ├── Preview before save
  │   └── Image optimization info
  │
  ├── Tab 3: Settings
  │   ├── VIP Access
  │   │   ├── Radio: All users / Tagged users / VIP list
  │   │   └── Input: VIP usernames (if selected)
  │   ├── Generation Limit
  │   │   ├── Input: Number (e.g., 5)
  │   │   └── Dropdown: Per day/week/month
  │   └── Quota Reset
  │       └── Radio: Daily / Weekly / Monthly
  │
  └── Tab 4: Preview
      ├── Simulate flow with test data
      ├── See messages as user would
      └── Test buttons/interactions
       ↓
Step 7: Activate
  ├── Review summary
  ├── Confirm button
  └── Success message: "Automation activated!"
       ↓
Step 8: Active Automation
  ├── Dashboard shows active automation
  ├── Real-time analytics update
  └── Users start sending DMs → Flow executes
```

### 2. Returning User

```
Login → Dashboard
  ├── View active automations (cards)
  ├── Quick metrics (total sent, delivered, clicked)
  ├── Recent activity feed
  └── Actions:
      ├── [Edit] → Customization screen
      ├── [Pause/Resume] → Toggle activation
      ├── [Analytics] → Detailed metrics
      └── [Settings] → Update VIP/limits
```

---

## 🧩 Flow Node Types

### Node Categories

#### 1. **Trigger Nodes** (🟢 Green)
Start point of automation flow.

**Types:**
- `Contact Event Occurs`
  - Tag applied
  - Custom field value changed
  - Specific message received

**Example:**
```json
{
  "id": "trigger_1",
  "type": "trigger",
  "config": {
    "event": "custom_field_changed",
    "field": "sacdegistir_count"
  }
}
```

#### 2. **Condition Nodes** (🟦 Blue)
Branching logic based on user data.

**Types:**
- `Tag Check` - User has/doesn't have tag
- `Quota Check` - Generation limit validation
- `Custom Field Check` - Field value comparison

**Example:**
```json
{
  "id": "condition_quota",
  "type": "condition",
  "config": {
    "check": "quota_available",
    "limit": "{{automation.settings.generationLimit}}",
    "period": "{{automation.settings.quotaPeriod}}"
  },
  "branches": {
    "true": "action_request_image",
    "false": "message_quota_exceeded"
  }
}
```

#### 3. **Action Nodes** (🟨 Yellow)
Perform operations on user data.

**Types:**
- `Set User Field` - Update custom field (increase/decrease)
- `Add Tag` - Apply tag to user
- `Remove Tag` - Remove tag from user
- `Clear User Field` - Reset field value

**Example:**
```json
{
  "id": "action_increment",
  "type": "action",
  "config": {
    "operation": "increment_field",
    "field": "generation_count",
    "amount": 1
  }
}
```

#### 4. **Delay Nodes** (🟥 Red)
Wait before next action.

**Types:**
- `Smart Delay` - Wait X hours/minutes
- `Wait for Response` - Pause until user replies

**Example:**
```json
{
  "id": "delay_12h",
  "type": "delay",
  "config": {
    "duration": 12,
    "unit": "hours",
    "skipIfResponse": true
  }
}
```

#### 5. **Message Nodes** (💬 Purple)
Send Instagram DM to user.

**Types:**
- `Send Message` - Text message
- `Send Image` - Image with optional caption
- `Send Button` - CTA button (URL)
- `Request Image` - Ask user to send photo

**Customizable Fields:**
- ✅ Message text (supports variables)
- ✅ Image URL (upload custom)
- ✅ Button text & URL
- ❌ Cannot change flow position

**Example:**
```json
{
  "id": "message_welcome",
  "type": "message",
  "config": {
    "text": "{{customization.messages.welcome}}",
    "variables": {
      "welcome": "Welcome! 📸 Please send your selfie."
    }
  }
}
```

#### 6. **Terminal Nodes** (✅ Green)
End or trigger another flow.

**Types:**
- `Start Automation` - Trigger another flow
- `End Flow` - Terminate current flow

**Example:**
```json
{
  "id": "terminal_success",
  "type": "terminal",
  "config": {
    "action": "end",
    "analyticsEvent": "hair_transformation_completed"
  }
}
```

---

## 🔌 API Integration

### Required Backend Endpoints

When backend is ready, implement these endpoints:

#### Authentication
```
POST /api/auth/instagram/oauth       # Initiate Instagram OAuth
POST /api/auth/instagram/callback    # Handle OAuth callback
GET  /api/auth/me                    # Get current user
POST /api/auth/logout                # Logout user
```

#### Templates
```
GET  /api/templates                  # List all templates
GET  /api/templates/{id}             # Get template details
POST /api/templates/{id}/install     # Install template (create automation)
```

#### Automations
```
GET    /api/automations              # List user's automations
GET    /api/automations/{id}         # Get automation details
PATCH  /api/automations/{id}         # Update automation (messages/images)
POST   /api/automations/{id}/activate    # Activate automation
POST   /api/automations/{id}/deactivate  # Pause automation
DELETE /api/automations/{id}         # Delete automation
```

#### Customization
```
GET    /api/automations/{id}/messages    # Get message customizations
PATCH  /api/automations/{id}/messages    # Update messages
POST   /api/automations/{id}/images      # Upload images
GET    /api/automations/{id}/settings    # Get VIP/limit settings
PATCH  /api/automations/{id}/settings    # Update settings
```

#### Flow Execution (Backend-only)
```
POST /api/flows/webhook              # Instagram webhook receiver
POST /api/flows/{id}/execute         # Execute flow step
GET  /api/flows/{id}/status          # Get flow execution status
```

#### Analytics
```
GET  /api/analytics                  # Global analytics
GET  /api/analytics/automation/{id}  # Automation-specific metrics
GET  /api/analytics/export           # Export data (CSV/JSON)
```

#### Quota & Limits
```
GET  /api/users/{user_id}/quota      # Check user quota
GET  /api/automations/{id}/limits    # Get limit config
PATCH /api/automations/{id}/limits   # Update limits
```

---

## ⚙️ Customization Levels

### What Users CAN Customize

| Component | Customization Level | Example |
|-----------|---------------------|---------|
| **Messages** | ✅ Full text editing | "Welcome!" → "Hoş geldiniz!" |
| **Images** | ✅ Upload custom images | Replace example hairstyle photos |
| **Button URLs** | ✅ Change destination URL | Appointment booking link |
| **Emojis** | ✅ Add/remove emojis | 📸 💇 ✨ |
| **Variables** | ✅ Use predefined variables | {{user_name}}, {{date}} |
| **VIP Access** | ✅ Set access rules | Only tagged users / VIP list |
| **Generation Limit** | ✅ Set quota | 5 per user per day |
| **Quota Period** | ✅ Daily/Weekly/Monthly | Reset every Monday |

### What Users CANNOT Customize

| Component | Restriction | Reason |
|-----------|-------------|--------|
| **Flow Logic** | ❌ Cannot add/remove nodes | Prevents breaking automation |
| **Node Order** | ❌ Cannot rearrange | Maintains workflow integrity |
| **Conditions** | ❌ Cannot change logic | Backend-controlled validation |
| **AI Settings** | ❌ Cannot change model | Cost/quality optimization |
| **Webhook URLs** | ❌ Cannot modify | Security |
| **Rate Limits** | ❌ Cannot exceed platform limits | Instagram API restrictions |

### Customization Schema Example

```typescript
// lib/automations/flows/hair-restoration/schema.ts
interface HairRestorationCustomization {
  messages: {
    welcome: string;              // "Welcome! 📸 Send your selfie."
    requestStyle: string;         // "Now send desired hairstyle."
    processing: string;           // "Processing your transformation..."
    result: string;               // "Here's your new look! ✨"
    quotaExceeded: string;        // "Daily limit reached."
  };

  images: {
    exampleBefore: string;        // URL to example before photo
    exampleAfter: string;         // URL to example after photo
    styleReference1: string;      // Hairstyle option 1
    styleReference2: string;      // Hairstyle option 2
    styleReference3: string;      // Hairstyle option 3
  };

  settings: {
    vipAccess: {
      mode: 'all' | 'tagged' | 'vip_list';
      vipUsernames?: string[];    // Instagram usernames
    };
    generationLimit: {
      count: number;              // e.g., 5
      period: 'day' | 'week' | 'month';
    };
    quotaReset: 'daily' | 'weekly' | 'monthly';
  };

  buttons: {
    bookAppointment: {
      text: string;               // "Book Appointment"
      url: string;                // "https://booking.example.com"
    };
  };
}
```

---

## ✅ Facebook Review Preparation

### Required Before Submission

#### 1. Legal Pages (MANDATORY)

Create these pages:

**Privacy Policy** (`/privacy`)
```
Required sections:
- What data we collect (Instagram profile, photos)
- How we use data (AI processing, analytics)
- Data retention (30 days default, configurable)
- Third-party sharing (none, except Instagram API)
- User rights (deletion, export, opt-out)
- GDPR/CCPA compliance
- Contact information
```

**Terms of Service** (`/terms`)
```
Required sections:
- Service description
- User responsibilities
- Acceptable use policy
- Generation limits and quotas
- Payment terms (future)
- Liability disclaimer
- Cancellation policy
- Intellectual property
```

**Data Deletion Instructions** (`/data-deletion`)
```
Required sections:
- How to delete account (Settings → Delete Account)
- What data gets deleted (all automation configs, images, analytics)
- Data retention period (30 days grace period)
- Confirmation process
- Contact email for issues
```

#### 2. Instagram OAuth Setup

**Facebook Developer Console:**
- [ ] Create Instagram Basic Display App
- [ ] Configure redirect URIs
  - Development: `http://localhost:3007/auth/callback`
  - Production: `https://yourdomain.com/auth/callback`
- [ ] Add test users (minimum 2)
- [ ] Enable Instagram Basic Display permission
- [ ] Prepare Use Case document

**Use Case Document:**
```markdown
# Instagram Login Use Case

**Purpose:** Authenticate beauty professionals and their clients for AI transformation services

**Permissions Requested:**
- instagram_basic (profile data: username, profile picture)

**Data Usage:**
1. User logs in with Instagram
2. Profile displayed in dashboard
3. AI transformations sent via Instagram DM
4. Analytics tracked (sent/delivered/opened)
5. No data shared with third parties

**User Benefits:**
- Seamless authentication
- Personalized automation experience
- Secure data handling
- Easy account management
```

#### 3. Demo Materials

**Video Requirements (2-3 minutes):**
- [ ] Instagram login flow
- [ ] Template selection
- [ ] Customization process (messages, images, settings)
- [ ] Activation
- [ ] Test DM flow (user sends photo → receives result)
- [ ] Analytics dashboard
- [ ] Settings & logout

**Screenshots Required (minimum 5):**
- [ ] Landing page
- [ ] Login screen
- [ ] Dashboard
- [ ] Template library
- [ ] Customization UI
- [ ] Flow preview
- [ ] Analytics
- [ ] Settings page

#### 4. App Details

- [ ] App icon (1024x1024 PNG, no transparency)
- [ ] App name: "LookLab"
- [ ] Tagline: "No-code Instagram automation for beauty professionals"
- [ ] Detailed description (500+ words)
- [ ] Privacy Policy URL
- [ ] Terms of Service URL
- [ ] Data Deletion URL
- [ ] Support email
- [ ] App category: Business / Productivity

#### 5. Test Users

Create 2 Instagram test accounts:
```
Test User 1:
- Username: looklab_test1
- Password: [secure password]
- Role: Beauty salon owner

Test User 2:
- Username: looklab_test2
- Password: [secure password]
- Role: End customer
```

Provide credentials to Facebook reviewers in submission form.

---

## 🚢 Deployment

### Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Node Version: 18.x

**Environment Variables:**
Add all `.env.local` variables in Vercel dashboard (Settings → Environment Variables).

### Domain Setup

1. Purchase domain (e.g., `looklab.app`)
2. Configure DNS in Vercel
3. SSL automatically provisioned
4. Update Instagram OAuth redirect URI

### Post-Deployment Checklist

- [ ] Domain with SSL working
- [ ] Environment variables set
- [ ] Instagram OAuth redirect URIs updated
- [ ] Legal pages accessible
- [ ] Test with Instagram test users
- [ ] Analytics tracking enabled
- [ ] Error monitoring (Sentry) configured
- [ ] Performance tested (Lighthouse >90)

---

## 🗺️ Roadmap

### Phase 1: MVP (Current - Q1 2025)

**Goal:** Launch with 3 beauty automations, Instagram OAuth, and basic customization.

- [x] Next.js 14 frontend architecture
- [x] 3 beauty automation templates (Hair, Nail, Nose)
- [x] Template registry system
- [x] Analytics dashboard
- [x] Multi-language support (TR/EN)
- [ ] **Customization UI** (messages, images, settings)
- [ ] **Instagram OAuth integration**
- [ ] **Backend API connection**
- [ ] **Legal pages** (privacy, terms, data deletion)
- [ ] **Facebook review submission**

**Timeline:** 4-6 weeks

---

### Phase 2: Launch & Iterate (Q2 2025)

**Goal:** Facebook approval, production deployment, onboard first 100 users.

- [ ] Facebook review approval
- [ ] Production deployment (Vercel + backend)
- [ ] Stripe payment integration
- [ ] Credit system implementation
- [ ] Email notifications (automation results)
- [ ] Enhanced analytics (funnel analysis)
- [ ] User onboarding flow
- [ ] Help center / documentation

**Metrics:**
- 100 active users
- 1,000+ AI transformations
- <3% error rate
- >90% user satisfaction

**Timeline:** 8 weeks

---

### Phase 3: Multi-Platform Expansion (Q3 2025)

**Goal:** Add WhatsApp, TikTok, WordPress automations.

**Features:**
- [ ] **WhatsApp Business API**
  - Welcome flow template
  - Product catalog automation
  - Order confirmation flow

- [ ] **TikTok Integration**
  - Batch video scheduler
  - Auto-caption generation
  - Trend analytics
  - Multi-account management

- [ ] **WordPress Auto-Publish**
  - Write post in LookLab
  - Schedule publish time
  - SEO optimization
  - Image compression

- [ ] **Instagram Post Scheduler** (Buffer-like)
  - Visual content calendar
  - Optimal time suggestions
  - Hashtag generator
  - First comment scheduler

**Metrics:**
- 500 active users
- 3 platforms supported
- 10,000+ posts scheduled

**Timeline:** 12 weeks

---

### Phase 4: Advanced DM Automations (Q4 2025)

**Goal:** Build comprehensive DM automation suite.

**Templates:**
- [ ] **Welcome Flow**
  - Greet new followers
  - Introduce services
  - Collect preferences

- [ ] **Lead Qualification Bot**
  - Ask qualifying questions
  - Tag based on answers
  - Route to sales/support

- [ ] **Customer Support Automation**
  - FAQ responder
  - AI chatbot integration (GPT-4)
  - Human handoff
  - Ticket creation

- [ ] **Abandoned Cart Recovery** (for e-commerce)
  - Detect abandoned checkout
  - Send reminder DM
  - Offer discount
  - Track conversions

**Features:**
- [ ] AI chatbot training (custom knowledge base)
- [ ] Sentiment analysis
- [ ] Multi-step conversation flows
- [ ] CRM integration (Salesforce, HubSpot)

**Metrics:**
- 1,000 active users
- 50,000+ automated conversations
- 30% conversion improvement

**Timeline:** 16 weeks

---

### Phase 5: Enterprise & Marketplace (2026)

**Goal:** Scale to enterprise clients, enable custom template marketplace.

**Features:**
- [ ] **Team Collaboration**
  - Multi-user accounts
  - Role-based permissions
  - Shared template library
  - Activity logs

- [ ] **White-Label Solution**
  - Custom branding (logo, colors)
  - Custom domain
  - Remove "Powered by LookLab"

- [ ] **API Access for Developers**
  - REST API
  - Webhooks
  - SDKs (JS, Python)
  - API documentation

- [ ] **Template Marketplace**
  - Community-created templates
  - Rating/review system
  - Paid templates (revenue share)
  - Template editor (advanced users)

- [ ] **Advanced Flow Builder**
  - Visual drag & drop (add/remove nodes)
  - Custom node creation
  - JavaScript code blocks
  - Version control

**Metrics:**
- 5,000 active users
- 50+ enterprise clients
- 100+ marketplace templates

**Timeline:** 2026 full year

---

## 📊 Performance Targets

### Lighthouse Scores

- **Performance:** >90
- **Accessibility:** >95
- **Best Practices:** >90
- **SEO:** >90

### Core Web Vitals

- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

### Optimizations

- [x] Image optimization (next/image)
- [x] Code splitting (dynamic imports)
- [x] Tree shaking (automatic)
- [x] Font optimization (next/font)
- [ ] Edge caching (Vercel CDN)
- [ ] Service worker (offline support)
- [ ] Lazy loading (below-the-fold content)

---

## 📚 Resources

### Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
- [next-intl](https://next-intl-docs.vercel.app)
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Meta Business API](https://developers.facebook.com/docs/whatsapp/business-platform)

### Design Inspiration
- [ManyChat](https://manychat.com) - Flow builder reference
- [Buffer](https://buffer.com) - Scheduling UI
- [Zapier](https://zapier.com) - Automation templates
- [Notion](https://notion.so) - Customization UX

### Legal Resources
- [Privacy Policy Generator](https://www.termsfeed.com/privacy-policy-generator/)
- [Terms of Service Generator](https://www.termsfeed.com/terms-service-generator/)
- [GDPR Compliance](https://gdpr.eu)

---

## 🤝 Contributing

This is a private project. For internal team members:

1. Create feature branch: `git checkout -b feature/my-feature`
2. Follow code style (ESLint + Prettier)
3. Write tests (future)
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature/my-feature`
6. Open Pull Request

---

## 📝 License

*Proprietary - All Rights Reserved*

---

## 👥 Team

- **Founder & Lead Developer** - [Your Name]
- **Backend Engineer** - [Name] (when hired)
- **UI/UX Designer** - [Name] (when hired)

---

## 📧 Support

- **Email:** support@looklab.app *(update after domain purchase)*
- **Documentation:** https://docs.looklab.app *(coming soon)*
- **Bug Reports:** GitHub Issues (private repo)
- **Feature Requests:** GitHub Discussions

---

## 🙏 Acknowledgments

- **Inspiration:** ManyChat (flow builder), Buffer (scheduling), Zapier (automation templates)
- **AI Partner:** Google Gemini 2.0 Flash
- **Community:** Next.js, TailwindCSS, React ecosystems

---

**Built with ❤️ by beauty professionals, for beauty professionals**

🚀 **Next Steps:**
1. ✅ Complete customization UI
2. ✅ Instagram OAuth integration
3. ✅ Backend API connection
4. ✅ Legal pages
5. ✅ Facebook review submission
6. 🎉 **Launch!**
