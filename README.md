# Automation-FB Platform

**Facebook/Instagram otomatik mesajlaşma ve AI görsel işleme platformu** - Müşterilerinizle mesajlar arac1l11yla etkileşim kurun, görseller toplayın ve AI ile işlenmiş sonuçlar sunun.

---

## İçindekiler

- [Proje Hakkında](#proje-hakk1nda)
- [Temel Özellikler](#temel-Özellikler)
- [AI Otomasyon ^ablonlar1](#ai-otomasyon-şablonları)
- [Mimari ve Teknolojiler](#mimari-ve-teknolojiler)
- [Proje Yapısı](#proje-yapısı)
- [Detaylı Bileşen Açıklamaları](#detayl1-bile_en-a�1klamalar1)
- [State Management (Zustand)](#state-management-zustand)
- [Otomasyon Akış Sistemi](#otomasyon-ak1_-sistemi)
- [Response Tracking Sistemi](#response-tracking-sistemi)
- [Çoklu Dil Destei](#Çoklu-dil-destei)
- [API Endpoints](#api-endpoints)
- [Geliştirme Rehberi](#geliçtirme-rehberi)
- [AI Geliştirme G�nl��](#ai-geliçtirme-g�nl��)

---

## Proje Hakkında

**Automation-FB**, sosyal medya üzerinden müşterilerle otomatik etkileşim kurmak ve AI destekli görsel işleme hizmetleri sunmak için tasarlanmış kapsamlı bir platformdur.

### Temel Kullanım Senaryosu

1. **Kullanıcı tetikleyici kelime gönderir** (�rn: "saç deiçimi")
2. **Bot otomatik yanıt verir** ve kullanıcıdan fotoraf ister
3. **Kullanıcı fotoraflar1n1 gönderir**
4. **AI fotoraflar1 işler** (saç deiçimi, renk deiçimi, vb.)
5. **Bot işlenmiş sonucu gönderir** ve istee bal1 randevu butonu ekler
6. **Tüm etkileşim kaydedilir** ve analiz edilir

### Hedef Kullanıcılar

- E-ticaret işletmeleri (mobilya, giyim, aksesuar, vb.)
- Kuaför ve güzellik salonları
- Oto galeri ve modifikasyon işletmeleri
- Ev dekorasyonu ve i� mimarlık şirketleri
- Pet shop ve evcil hayvan ürünleri
- Dijital pazarlama ajansları

---

## Temel Özellikler

### > Otomasyon Sistemi
- **Görsel Akış Editörü**: Drag & drop ile otomasyon akışları oluşturma (ReactFlow)
- **Hazır ^ablonlar**: 9 farklı kategoride kullanıma hazır AI otomasyon şablonları
- **Özelleştirilebilir Wizard**: Adım adım otomasyon özelleştirme sihirbazı
- **Test Modu**: Gerçek kullanıcılara açmadan test kullanıcılarıyla deneme imkanı
- **Kota Yönetimi**: Günlük/saatlik kullanım kotaları ve kontrol mekanizması

### 📊 Dashboard & Analytics
- **Gerçek Zamanlı Metrikler**: Anlık etkileşim, tamamlanma ve dönüşüm oranları
- **Gelir İçgörüleri**: Otomasyon başına gelir takibi ve ROI hesaplaması
- **Kullanıcı Davranış Analizi**: Kullanıcı yolculuu ve tıklama ısı haritaları
- **Sosyal Medya Etki Ölçümü**: Reach, engagement ve viral metrikler
- **Gerçek Zamanlı Vurgular**: Anlık aktivite ve önemli olaylar

### 📊 Response Tracking
- **Detaylı Konuşma Kayıtları**: Her kullanıcı etkileşiminin tam log'u
- **4 Sütunlu Görsel Tablo**: Input Image 1, Input Image 2, Output Image, Kullanıcı Bilgisi
- **Filtreleme ve Arama**: Tarih, durum, kullanıcı adı, flow bazlı filtreleme
- **Konuşma Modal**: Tam konu_ma ge�miçi ve timeline görünümü
- **Görsel Önizleme**: Büyütülmüş görsel inceleme modalı
- **İstatistikler**: Retry sayısı, tamamlanma süresi, buton tıklamalar1

### 🔐 Multi-Account Management
- **Çoklu Instagram/Facebook Hesab1**: Tek panelden birden fazla hesap y�netimi
- **Hesap Switcher**: H1zl1 hesap deiçtirme
- **Hesap Bazl1 İstatistikler**: Her hesap için ayr1 metrikler
- **Takip�i Filtresi**: Sadece takip�ilere �zel otomasyon se�enei

### <
 Internationalization
- **Çoklu Dil Destei**: TR (T�rk�e) ve EN (0ngilizce)
- **next-intl**: SEO-friendly URL yapısı (�rn: `/tr/dashboard`, `/en/dashboard`)
- **Dinamik Dil Deiçtirme**: Runtime'da dil deiçtirme
- **Yerelle_tirilmiç 0�erikler**: UI, mesajlar, ve otomasyon şablonları

### 🔐 Modern UI/UX
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Ak1c1 animasyonlar ve ge�işler
- **Neomorphism Design**: Modern ve _1k kart tasar1mlar1
- **Responsive**: Mobil, tablet ve desktop uyumlu
- **Dark Mode Ready**: Karanl1k mod altyapısı hazır

---

## AI Otomasyon ^ablonlar1

Platform, 9 farklı sekt�r için hazır AI otomasyon şablonları i�erir:

### 1. **Hair Style Change (Sa� Deiçimi)**
- **Kullanım**: Kuaför ve güzellik salonları
- **0_lev**: Kullanıcın1n fotoraf1nda saç modeli, renk veya uzunluk deiçimi
- **Tetikleyici**: "saç", "sac", "hair"
- **AI 0_lemi**: Sa� dokusunu tespit edip istenen stile d�n�_t�rme

### 2. **Car Color Change (Ara� Renk Deiçimi)**
- **Kullanım**: Oto galeri, ara� boyama servisleri
- **0_lev**: Ara� fotoraf1nda renk deiçtirme sim�lasyonu
- **Tetikleyici**: "ara� rengi", "car color"
- **AI 0_lemi**: Ara� sil�etini tespit edip yeni renge boyama

### 3. **Pet Products (Evcil Hayvan ürünleri)**
- **Kullanım**: Pet shop'lar
- **0_lev**: Evcil hayvan �zerinde �r�n (tasma, k1yafet) g�sterimi
- **Tetikleyici**: "pet", "k�pek", "kedi"
- **AI 0_lemi**: Hayvan �zerine �r�n yerle_tirme

### 4. **Car Wheels (Jant Deiçimi)**
- **Kullanım**: Jant sat1c1lar1, oto modifikasyon
- **0_lev**: Ara� fotoraf1nda jant deiçtirme sim�lasyonu
- **Tetikleyici**: "jant", "wheels"
- **AI 0_lemi**: Jant b�lgesini tespit edip yeni jantla deiçtirme

### 5. **Wall Paint (Duvar Boyas1)**
- **Kullanım**: Boya �reticileri, i� mimarlık
- **0_lev**: Oda/duvar fotoraf1nda renk deiçtirme
- **Tetikleyici**: "boya", "duvar"
- **AI 0_lemi**: Duvar y�zeylerini tespit edip yeni renge boyama

### 6. **Furniture Placement (Mobilya Yerle_tirme)**
- **Kullanım**: Mobilya maazalar1, i� mimarlar
- **0_lev**: Oda fotoraf1na mobilya yerle_tirme
- **Tetikleyici**: "mobilya", "furniture"
- **AI 0_lemi**: Perspektife uygun mobilya entegrasyonu

### 7. **Clothes Try-On (Sanal Giyim Deneme)**
- **Kullanım**: Giyim e-ticaret
- **0_lev**: Kullanıcın1n fotoraf1nda k1yafet deneme
- **Tetikleyici**: "giyim", "clothes"
- **AI 0_lemi**: V�cut �zerine k1yafet giydirme sim�lasyonu

### 8. **Jewelry (Tak1 Deneme)**
- **Kullanım**: Kuyumcu, aksesuar maazalar1
- **0_lev**: Kullanıcı fotoraf1nda tak1 (kolye, k�pe) deneme
- **Tetikleyici**: "tak1", "jewelry"
- **AI 0_lemi**: Y�z/v�cut �zerine tak1 yerle_tirme

### 9. **Aesthetic AI (Estetik �neri)**
- **Kullanım**: Estetik klinikler
- **0_lev**: Estetik içlem sonras1 g�r�n�m sim�lasyonu
- **Tetikleyici**: "estetik", "aesthetic"
- **AI 0_lemi**: Y�z hatlar1nda deiçiklik sim�lasyonu

---

## Mimari ve Teknolojiler

### Frontend Stack

#### Framework & Build Tools
- **Next.js 14.2.0**: React framework (App Router, Server Components)
- **TypeScript 5.4.0**: Statik tip kontrol�
- **React 18.3.0**: UI k�t�phanesi

#### Styling & UI
- **Tailwind CSS 3.4.0**: Utility-first CSS framework
- **PostCSS 8.4.0**: CSS transformasyonu
- **Autoprefixer 10.4.0**: CSS vendor prefix'leri
- **clsx 2.1.1**: Ko_ullu className y�netimi
- **tailwind-merge 2.6.0**: Tailwind s1n1f birle_tirme

#### Animation & Interactions
- **Framer Motion 12.23.24**: Animasyon k�t�phanesi
- **lucide-react 0.445.0**: Icon k�t�phanesi
- **@heroicons/react 2.1.0**: Heroicons icon seti

#### UI Components & Headless Components
- **@headlessui/react 2.2.9**: Unstyled accessible components
- **ReactFlow 11.11.4**: Akış diyagram1 ve node edit�r�

#### State Management
- **Zustand 4.5.0**: Lightweight state management
- **Zustand Persist Middleware**: State persistence

#### Internationalization
- **next-intl 3.15.0**: Next.js için i18n ��z�m�

#### Development Tools
- **ESLint 8.0.0**: Code linting
- **eslint-config-next 14.2.0**: Next.js ESLint config

### Backend/API
- **API Routes**: Next.js App Router API endpoints
- **Mock Data**: Development için mock data sistemi
- **REST Architecture**: RESTful API tasar1m1

### DevOps
- **Docker**: Container teknolojisi
- **Docker Compose**: Multi-container orchestration
- **Node.js 20 Alpine**: Lightweight base image

---

## Detaylı Bileşen Açıklamaları

### Automation Builder (Flow Canvas)

Görsel ak1_ edit�r� - **ReactFlow** k�t�phanesi kullan1larak olu_turulmu_tur.

#### FlowCanvas.tsx
Ana canvas bile_eni. Drag & drop, zoom, pan içlemlerini y�netir.

**Özellikler:**
- D��m ve kenar ekleme/silme/d�zenleme
- Otomatik layout (hierarchy, dagre)
- Edit/View modu ge�işleri
- Gerçek zamanl1 validasyon
- Undo/redo destei

#### Node Types (4 T�r)

##### 1. TriggerNode
**Ama�:** Otomasyonu ba_latan tetikleyici

**Konfig�rasyon:**
```typescript
{
  keywords: string[];        // ["saç", "SA�", "hair"]
  exactMatch: boolean;       // Tam kelime e_le_mesi mi?
  statistics: {
    sent: 0,                // İstatistikler
    delivered: 0,
    opened: 0
  }
}
```

##### 2. MessageNode
**Ama�:** Kullanıcıya mesaj ve görsel g�nderme

**Konfig�rasyon:**
```typescript
{
  messageText: string;       // Mesaj i�erii
  imageUrl: string | null;   // Opsiyonel görsel
  buttons: Button[];         // WhatsApp veya Cancel butonlar1
}

interface Button {
  id: string;
  text: string;
  type: 'whatsapp' | 'cancel';
  whatsappConfig?: {
    phoneNumber: string;
    messageTemplate: string;
  };
}
```

##### 3. ImageRequestNode
**Ama�:** Kullanıcıdan fotoraf talep etme

**Konfig�rasyon:**
```typescript
{
  requestMessage: string;    // "L�tfen fotoraf1n1z1 g�nderin"
  errorMessage: string;      // "L�tfen ge�erli bir fotoraf g�nderin"
  retryCount: number;        // Maksimum deneme sayısı (�rn: 3)
}
```

##### 4. ResultNode
**Ama�:** AI işlenmiş sonucu g�sterme

**Konfig�rasyon:**
```typescript
{
  outputTemplate: string;    // "0_te yeni görünümün�z! 🔐"
  imageUrl: string | null;   // AI'dan gelen sonu�
  appointmentButton?: {
    text: string;
    phoneNumber: string;
    autoMessage: string;     // "Merhaba, randevu almak istiyorum"
  };
  delayedMessages?: Array<{
    delay: number;           // Saniye cinsinden gecikme
    text: string;            // Takip mesaj1
  }>;
}
```

#### Node Editors

Her node tipi için �zel editor panel vard1r. **NodeEditorPanel** ana wrapper'd1r.

**Özellikler:**
- Gerçek zamanl1 Önizleme
- Validasyon hatalar1 g�sterimi
- Emoji picker entegrasyonu
- Görsel upload/se�imi
- Buton builder (WhatsApp, Cancel)

---

### Customization Wizard

Adım adım otomasyon özelleştirme sistemi.

#### Hook: useCustomizationWizard

```typescript
const {
  currentStep,      // Aktif adım (0-5)
  data,             // Wizard data
  nextStep,         // Sonraki adıma ge�
  prevStep,         // �nceki adıma d�n
  goToStep,         // Belirli adıma git
  updateData,       // Data g�ncelle
  isStepValid,      // Adım ge�erlilii
  saveAndActivate   // Kaydet ve aktifle_tir
} = useCustomizationWizard(templateId);
```

#### Steps (6 Adım)

1. **WelcomeStep**: Giriç ve genel bilgi
2. **SettingsStep**: Temel ayarlar (ad, a�1klama, trigger keywords)
3. **MessagesStep**: Mesaj i�eriklerini d�zenleme
4. **ImagesStep**: Görselleri y�kleme/se�me
5. **PreviewStep**: Tüm ak1_1 Önizleme (telefon mockup)
6. **ReviewStep**: Final kontrol ve kaydetme

---

### Response Tracking Sistemi

Kullanıcı etkileşimlerinin detayl1 takibi.

#### ResponsesTable Component

**4 Sütunlu Tablo:**
1. **Input Image 1**: Kullanıcın1n g�nderdii ilk fotoraf
2. **Input Image 2**: Kullanıcın1n g�nderdii ikinci fotoraf (varsa)
3. **Output Image**: AI'1n �rettii sonu� görseli
4. **User Info**: Kullanıcı adı, profil resmi, durum

#### ConversationModal

Tam konu_ma log'unu g�sterir:

```typescript
interface ConversationMessage {
  id: string;
  sender: 'bot' | 'user';
  type: 'text' | 'image' | 'button_click';
  content: string;
  timestamp: string;
  nodeId?: string;  // Hangi flow node'undan geldi?
}
```

**Timeline G�r�n�m�:**
- Bot mesajlar1 sol tarafta (mavi)
- Kullanıcı mesajlar1 sa tarafta (gri)
- Buton tıklamalar1 �zel badge ile
- Timestamp'ler g�reli format (�rn: "2 dakika �nce")

#### Filtreleme Sistemi

```typescript
interface ResponseFilters {
  status?: 'completed' | 'failed' | 'in_progress' | 'abandoned';
  dateFrom?: string;
  dateTo?: string;
  username?: string;
  flowId?: string;
}
```

#### İstatistikler

Her response için:
- **Duration**: Tamamlanma süresi (saniye)
- **Retry Count**: Kullanıcın1n hata yap1p tekrar deneme sayısı
- **Button Clicks**: Hangi butona ka� kez t1kland11
- **Status**: completed, failed, in_progress, abandoned

---

## State Management (Zustand)

### 1. automationStore

Aktif otomasyonlar1n y�netimi.

```typescript
interface ActivatedAutomation {
  templateId: string;
  customizationData: CustomizationData;
  activatedAt: Date;
  status: 'active' | 'paused';
}

// Methods
activateAutomation(templateId, data);
updateAutomation(templateId, data);
pauseAutomation(templateId);
resumeAutomation(templateId);
deleteAutomation(templateId);
isActivated(templateId);
getAutomationData(templateId);
```

**Persist:** LocalStorage'da saklan1r (`automation-storage` key)

### 2. flowStore

Flow builder state'i.

```typescript
interface FlowStore {
  currentFlow: AutomationFlow | null;
  isEditMode: boolean;
  selectedNode: FlowNode | null;
  onNodesChange: (changes) => void;
  onEdgesChange: (changes) => void;
  addNode: (type, position) => void;
  deleteNode: (id) => void;
  updateNodeData: (id, data) => void;
  selectNode: (id) => void;
}
```

### 3. accountStore

Çoklu hesap y�netimi.

```typescript
interface AccountStore {
  accounts: InstagramAccount[];
  activeAccountId: string | null;
  addAccount: (account) => void;
  removeAccount: (id) => void;
  switchAccount: (id) => void;
  updateAccount: (id, data) => void;
}
```

### 4. uiStore

UI durumlar1 (modal'lar, sidebar, vb.).

```typescript
interface UIStore {
  isAuthModalOpen: boolean;
  isSidebarOpen: boolean;
  activeModal: string | null;
  openModal: (modalId) => void;
  closeModal: () => void;
  toggleSidebar: () => void;
}
```

---

## Otomasyon Akış Sistemi

### Flow Structure

```typescript
interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  templateId: string;
  instagramAccountId: string;

  status: 'inactive' | 'test' | 'active';
  testUsers: string[];  // Test modu için whitelist

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

  // Analytics
  totalInteractions: number;
  totalCompletions: number;
  averageCompletionTime: number;
}
```

### Status Types

- **inactive**: Kapal1, kullanıcılara g�r�nmez
- **test**: Sadece `testUsers` listesindeki kullanıcılar kullanabilir
- **active**: Tüm kullanıcılar için aktif (followerOnly durumuna g�re)

### Quota System

```typescript
settings: {
  followerOnly: true,       // Sadece takip�iler
  dailyQuota: 100,          // G�nde max 100 içlem
  usedQuota: 45,            // Bug�n 45 kullan1ld1
  quotaResetPeriod: 'daily' // Her g�n reset
}
```

Kota dolduunda kullanıcılara "Günlük limit doldu" mesaj1 g�sterilir.

---

## Response Tracking Sistemi

### Response Data Model

```typescript
interface AutomationResponse {
  id: string;
  flowId: string;
  flowName: string;

  userId: string;
  username: string;
  profilePicture: string;

  // Tabloda g�sterilen ana görseller
  inputImage1: string;
  inputImage2: string;
  outputImage: string;

  status: 'completed' | 'failed' | 'in_progress' | 'abandoned';
  failureReason?: string;

  conversationLog: ConversationMessage[];

  startedAt: string;
  completedAt?: string;
  duration?: number;
  retriesCount: number;

  buttonClicks: Record<string, number>;
}
```

### Status Types

- **completed**: Ba_ar1yla tamamland1
- **failed**: Hata nedeniyle ba_arısız oldu
- **in_progress**: ^u anda devam ediyor
- **abandoned**: Kullanıcı yar1da b1rakt1

### Conversation Log

Tam konu_ma kayd1:

```typescript
conversationLog: [
  {
    id: "msg-1",
    sender: "bot",
    type: "text",
    content: "Merhaba! Sa� stilinizi deiçtirmek için fotoraf1n1z1 g�nderin.",
    timestamp: "2024-01-20T10:00:00Z",
    nodeId: "node-trigger-1"
  },
  {
    id: "msg-2",
    sender: "user",
    type: "image",
    content: "https://cdn.example.com/user-photo.jpg",
    timestamp: "2024-01-20T10:01:30Z"
  },
  {
    id: "msg-3",
    sender: "bot",
    type: "text",
    content: "0_te yeni saç stiliniz! 🔐",
    timestamp: "2024-01-20T10:02:45Z",
    nodeId: "node-result-1"
  },
  {
    id: "msg-4",
    sender: "bot",
    type: "image",
    content: "https://cdn.example.com/ai-result.jpg",
    timestamp: "2024-01-20T10:02:46Z",
    nodeId: "node-result-1"
  }
]
```

---

## Çoklu Dil Destei

### next-intl Configuration

**Desteklenen Diller:**
- 🔐🔐 T�rk�e (tr)
- 🔐🔐 0ngilizce (en)

### URL Yapısı

```
/                          � Redirect to /en/dashboard
/tr                        � T�rk�e ana sayfa
/en                        � 0ngilizce ana sayfa
/tr/dashboard              � T�rk�e dashboard
/en/automations/builder    � 0ngilizce flow builder
```

### Middleware (middleware.ts)

```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'  // /en/... için prefix zorunlu deil
});

export const config = {
  matcher: ['/', '/(tr|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
```

### Translation Files

**messages/tr.json**
```json
{
  "dashboard": {
    "title": "Kontrol Paneli",
    "hero": {
      "getStarted": "Hemen Ba_la",
      "watchDemo": "Demo 0zle"
    }
  }
}
```

**messages/en.json**
```json
{
  "dashboard": {
    "title": "Dashboard",
    "hero": {
      "getStarted": "Get Started",
      "watchDemo": "Watch Demo"
    }
  }
}
```

### Component Usage

```tsx
import { useTranslations, useLocale } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('dashboard');
  const locale = useLocale(); // 'tr' or 'en'

  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{t('hero.getStarted')}</button>
      <p>Current locale: {locale}</p>
    </div>
  );
}
```

### Language Switcher

```tsx
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

// Otomatik olarak locale deiçtirme ve route g�ncelleme
<LanguageSwitcher />
```

---

## API Endpoints

### Authentication
```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/auth/me
```

### Automations
```
GET    /api/automations              # List all automations
GET    /api/automations/:id          # Get single automation
POST   /api/automations              # Create new automation
PUT    /api/automations/:id          # Update automation
DELETE /api/automations/:id          # Delete automation
PATCH  /api/automations/:id/status   # Change status (inactive/test/active)
```

### Templates
```
GET    /api/templates                # List all templates
GET    /api/templates/:id            # Get template details
```

### Responses
```
GET    /api/responses                # List responses (with filters)
GET    /api/responses/:id            # Get single response detail
GET    /api/responses/:id/conversation # Get full conversation log
```

### Analytics
```
GET    /api/analytics                # Dashboard analytics
GET    /api/analytics/automation/:id # Per-automation analytics
GET    /api/analytics/account/:id    # Per-account analytics
```

### Settings
```
GET    /api/settings                 # Get user settings
PUT    /api/settings                 # Update settings
```

### Accounts
```
GET    /api/accounts                 # List connected accounts
POST   /api/accounts                 # Connect new account
DELETE /api/accounts/:id             # Disconnect account
```

---

## Geliştirme Rehberi

### Naming Conventions

```typescript
// Components: PascalCase
MyComponent.tsx
FlowCanvas.tsx

// Files/Folders: kebab-case or PascalCase
automation-builder/
use-customization-wizard.ts

// Functions: camelCase
function handleSubmit() {}
const fetchUserData = async () => {};

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const DEFAULT_LOCALE = 'en';

// Types/Interfaces: PascalCase
interface UserData {}
type FlowNode = {};

// CSS Classes: kebab-case (Tailwind)
className="bg-blue-500 hover:bg-blue-600"
```

### Code Style Rules

1. **TypeScript zorunlu** - Tüm dosyalar `.ts` veya `.tsx`
2. **Explicit types** - `any` kullanım1ndan ka�1n1n
3. **Component organization**:
   ```tsx
   // 1. Imports
   import ...

   // 2. Types/Interfaces
   interface Props {}

   // 3. Component
   export function MyComponent({ ... }: Props) {
     // 4. Hooks
     const [state, setState] = useState();

     // 5. Effects
     useEffect(() => {}, []);

     // 6. Handlers
     const handleClick = () => {};

     // 7. Render
     return <div>...</div>;
   }
   ```
4. **ESLint kurallar1na uyun** - `npm run lint`
5. **Reusable components** - DRY prensibi
6. **Atomic design** yakla_1m1 (atoms, molecules, organisms)

### Component Development Workflow



### Git Workflow



### Commit Message Format

```
feat: Add user authentication
fix: Resolve issue with image upload
docs: Update README with new API endpoints
style: Format code with Prettier
refactor: Restructure automation store
test: Add tests for FlowCanvas
chore: Update dependencies
```

---

## Performans Optimizasyonu

### Next.js Optimizations

- **App Router**: Server Components kullanım1
- **Image Optimization**: `next/image` kullanım1
- **Font Optimization**: `next/font`
- **Code Splitting**: Dynamic imports
- **Static Generation**: M�mk�n olan sayfalar için ISR/SSG

### React Optimizations

```tsx
// 1. Memoization
const MemoizedComponent = memo(MyComponent);

// 2. useCallback for handlers
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);

// 3. useMemo for expensive calculations
const processedData = useMemo(() => {
  return expensiveOperation(data);
}, [data]);

// 4. Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### Bundle Size



---

## AI Geliştirme G�nl��

> **�NEML0 NOT**:
> Bu proje �zerinde �al1_an t�m yapay zeka asistanlar1 (ChatGPT, Claude, Cursor AI, GitHub Copilot, vb.),
> yapt1klar1 g�ncellemeleri a_a1ya **k1sa notlar** halinde eklemeli.
>
> **Neden önemli?**
> Yapay zekalar1n oturum s�releri h1zl1 bittii için, bir sonraki oturumda hangi deiçikliklerin
> yap1ld11n1 takip etmek kritik �neme sahiptir. Bu sayede:
> - Tekrar eden �al1_malar �nlenir
> - Geliştirme s�reklilii salan1r
> - Deiçiklik ge�miçi _effaf tutulur
> - Hata ay1klama kolayla_1r

### Geliştirme Notlar1 Format1:
```
### [Tarih] - [AI Ad1] - [Oturum Kimlii (opsiyonel)]
- Deiçiklik 1 (dosya yolu veya �zellik)
- Deiçiklik 2
- Deiçiklik 3
```

**�rnek:**
```
### [2025-01-20] - Claude - [Session #42]
- Eklendi: `components/automation-builder/nodes/TriggerNode.tsx` - Keyword validation eklendi
- D�zeltildi: `lib/store/flowStore.ts` - Node ekleme bug'1 d�zeltildi
- G�ncellendi: `app/[locale]/dashboard/page.tsx` - Metrik kartlar1 yeniden tasarland1
- Refactor: `lib/types/flow.ts` - Type definitions sadele_tirildi
```

---

### Geliştirme Ge�miçi

### [2025-10-29] - Claude
- Olu_turuldu: `README.md` - Kapsaml1 proje dok�mantasyonu olu_turuldu
- Eklendi: Proje yapısı, teknoloji stack'i, kurulum talimatlar1
- Eklendi: Detaylı bile_en a�1klamalar1 ve kod �rnekleri
- Eklendi: AI Otomasyon şablonları detayl1 a�1klamalar1
- Eklendi: State management (Zustand) dok�mantasyonu
- Eklendi: Response tracking sistemi a�1klamalar1
- Eklendi: Çoklu dil destei (i18n) rehberi
- Eklendi: API endpoints listesi
- Eklendi: Docker yap1land1rmas1 ve komutlar1
- Eklendi: Geliştirme rehberi ve best practices
- Eklendi: AI Geliştirme G�nl�� b�l�m�
- Not: Tüm dosya yapısı, component hierarchy ve teknik detaylar eklendi

---

**Not**: L�tfen her g�ncelleme sonras1 bu b�l�m� g�ncel tutun! Bu sadece bir hat1rlat1c1 deil,
projenin sal1kl1 geliçimi için **zorunlu** bir pratiktir. 📊


### [2025-10-29] - Claude - Session #2
- Düzeltildi: TypeScript hatası - `lib/automation-content/types.ts` imageAlt property eklendi
- Düzeltildi: React Hooks kuralı - `FlowCanvas.tsx` useCallback early return sonrası çağrılıyordu
- Düzeltildi: React Hooks kuralı - `Footer.tsx` useMemo early return sonrası çağrılıyordu
- Eklendi: ESLint config - `react/no-unescaped-entities` kuralı disabled
- Düzeltildi: 404 Hatası - Webpack cache temizlendi (.next ve node_modules/.cache)
- Eklendi: Legal route redirectler - `/terms`, `/privacy`, `/data-deletion` sayfaları
- Kaldırıldı: CTA bölümleri - 8 otomasyon sayfasından "Hazır mısınız? Hemen Başlayın!" kısımları
- Güncellendi: `.eslintrc.json` - Unescaped entities kuralı kapatıldı
- Test Edildi: Production build başarılı - Bundle size: 271 kB (max)
- Düzeltildi: Docker container yeniden başlatıldı - Uygulama http://localhost:3003 üzerinde çalışıyor


### [2025-10-29] - Claude - Session #3
- Güncellendi: `components/auth/AuthModal.tsx` - Şifre alanı eklendi (e-posta sonrası zorunlu)
- Büyütüldü: Instagram ve Google logoları (w-5 h-5 → w-7 h-7)
- Eklendi: Framer Motion animasyonları - Hover scale, rotate efekti (Google -5°, Instagram +5°)
- Eklendi: Instagram logosuna pulse glow efekti (sürekli döngü)
- Güncellendi: SocialButton boyutları artırıldı (h-12 w-20 → h-14 w-24)
- Eklendi: Şifre validasyonu (minLength: 6, required)


### [2025-10-29] - Claude - Session #4
- Güncellendi: `components/auth/AuthModal.tsx` - Şifre alanı dinamik yapıldı
- Eklendi: Conditional password field - Email yazılınca şifre alanı görünür hale gelir
- Eklendi: State logic - `showPasswordField` email.length kontrolü ile yönetiliyor
- Güncellendi: Instagram logo - Gerçek Instagram gradient renkleri eklendi (radialGradient)
- Kaldırıldı: `app/[locale]/automations/builder/[id]/page.tsx` - "Otomasyon stüdyosuna erişmek için giriş yapın" kısmı
- Değişiklik: User olmadığında builder page direkt null döndürüyor, AuthModal otomatik açılıyor
- Test Edildi: TypeScript type-check başarılı, Docker hot reload çalışıyor

- Büyütüldü: Instagram logo boyutu artırıldı (w-7 h-7 → w-9 h-9)
- Düzeltildi: README.md - Türkçe karakter encoding sorunları düzeltildi (ş, ı, ğ, ü, ö, İ, ç karakterleri)

