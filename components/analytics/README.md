# Analytics Components

Modular and reusable analytics components for the AutoFlow dashboard.

## Structure

```
components/analytics/
├── AnalyticsMetricCard.tsx    # Individual metric cards
├── RevenueInsights.tsx         # Revenue & Appointment insights with real-time data
├── UserBehaviorChart.tsx       # User behavior and CTA engagement
├── SocialImpactSection.tsx     # Social content performance
├── RealtimeHighlights.tsx      # Real-time impact highlights
├── index.ts                    # Export barrel file
└── README.md                   # This file
```

## Components

### AnalyticsMetricCard
Displays individual metrics with icons, values, and change indicators.

**Props:**
- `title`: string - Metric title
- `value`: string - Metric value
- `change?`: string - Change percentage (optional)
- `icon`: LucideIcon - Icon component
- `accent?`: string - Custom accent color (optional)
- `description?`: string - Additional description (optional)

**Example:**
```tsx
<AnalyticsMetricCard
  title="Total AI Transformations"
  value="4,823 this week"
  change="+14.2%"
  icon={Sparkles}
/>
```

### RevenueInsights
Displays comprehensive revenue and appointment data with real-time updates.

**Features:**
- Real-time data syncing (updates every 60 seconds)
- Revenue statistics grid
- Peak booking hours visualization
- Manual refresh capability

**Data Structure:**
```typescript
{
  totalRevenue: string;
  appointmentCount: number;
  averageBookingValue: string;
  conversionRate: string;
  peakHours: string[];
  growthRate: string;
}
```

### UserBehaviorChart
Shows user behavior patterns and CTA engagement distribution.

**Features:**
- Pie chart visualization (placeholder)
- CTA distribution breakdown
- Quick statistics cards

### SocialImpactSection
Displays social media content performance metrics.

**Features:**
- Post performance cards
- Engagement metrics
- Export and comparison tools

### RealtimeHighlights
Shows real-time AI automation impacts and highlights.

**Features:**
- Auto-curated highlights
- Live activity feed
- Impact summaries

## API Integration

### Endpoint: `/api/analytics`

**GET Request:**
Returns complete analytics overview including metrics, revenue, user behavior, and social content.

**Response:**
```typescript
{
  metrics: AnalyticsMetrics;
  revenue: RevenueInsightsData;
  userBehavior: {
    ctaDistribution: Array<{...}>;
    quickStats: Array<{...}>;
  };
  socialContent: Array<{...}>;
}
```

**POST Request:**
Returns revenue-specific data with time range filtering.

**Body:**
```json
{
  "timeRange": "7d" // Options: 7d, 30d, 90d
}
```

## Adding New Components

1. Create component file in `components/analytics/`
2. Export component from `index.ts`
3. Import and use in `app/[locale]/analytics/page.tsx`

**Example:**
```tsx
// components/analytics/NewComponent.tsx
export function NewComponent() {
  return <div>New Analytics Component</div>;
}

// components/analytics/index.ts
export { NewComponent } from './NewComponent';

// app/[locale]/analytics/page.tsx
import { NewComponent } from '@/components/analytics';
```

## Styling

All components use:
- Tailwind CSS for styling
- Custom gradients from design system
- Consistent spacing and shadows
- Hover effects and transitions
- Responsive design patterns

## Data Refresh

Components support real-time data updates:
- **Automatic**: Updates every 60 seconds
- **Manual**: Refresh button in UI
- **API-driven**: Fetch from `/api/analytics`

## Future Enhancements

- [ ] Add real chart library (Chart.js, Recharts)
- [ ] Implement data export functionality
- [ ] Add date range picker
- [ ] Create dashboard customization
- [ ] Add drill-down analytics
- [ ] Implement A/B testing insights
- [ ] Add performance benchmarking
