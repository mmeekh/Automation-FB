import { NextResponse } from 'next/server';
import type { AnalyticsOverview } from '@/lib/types/analytics';

// Simulate real-time data generation
function generateMockAnalytics(): AnalyticsOverview {
  const now = new Date();
  const revenueHistory = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 5000 + 10000),
      appointments: Math.floor(Math.random() * 50 + 100),
    };
  });

  return {
    metrics: {
      totalTransformations: Math.floor(Math.random() * 1000 + 4500),
      conversionRate: (Math.random() * 2 + 4).toFixed(1) + '%',
      activeUsers: Math.floor(Math.random() * 300 + 1000),
      mostRequestedStyle: 'Long Blonde Bob 💇‍♀️',
      changeTransformations: '+' + (Math.random() * 5 + 10).toFixed(1) + '%',
      changeConversion: '+' + (Math.random() * 2).toFixed(1) + '%',
      changeUsers: '+' + (Math.random() * 5 + 5).toFixed(1) + '%',
    },
    revenue: {
      totalRevenue: '€' + (Math.random() * 5000 + 10000).toFixed(0),
      appointmentCount: Math.floor(Math.random() * 50 + 100),
      averageBookingValue: '€' + (Math.random() * 50 + 80).toFixed(2),
      conversionRate: (Math.random() * 2 + 4).toFixed(1) + '%',
      peakHours: ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
      growthRate: '+' + (Math.random() * 10 + 15).toFixed(0) + '%',
      revenueHistory,
    },
    userBehavior: {
      ctaDistribution: [
        { label: 'Try Again ✨', value: 45, color: 'from-pink-400 to-rose-500' },
        { label: 'Plan New Style 📅', value: 32, color: 'from-teal-400 to-cyan-500' },
        { label: 'Book Appointment 💬', value: 23, color: 'from-amber-400 to-orange-500' },
      ],
      quickStats: [
        {
          title: 'Avg Response Time',
          value: Math.floor(Math.random() * 10 + 10) + 's',
          description: 'AI replies across flows',
        },
        {
          title: 'Returning Users',
          value: Math.floor(Math.random() * 10 + 30) + '%',
          description: 'Users completing ≥2 flows',
        },
        {
          title: 'Avg Selfies per User',
          value: (Math.random() * 1 + 2).toFixed(1),
          description: 'Inputs collected per journey',
        },
      ],
    },
    socialContent: [
      {
        id: 'post-1',
        title: 'Transformation Reveal',
        type: 'Reel',
        reach: Math.floor(Math.random() * 50 + 100) + 'K',
        saves: (Math.random() * 2 + 2).toFixed(1) + 'K',
        engagement: (Math.random() * 3 + 7).toFixed(1) + '%',
        growth: '+' + Math.floor(Math.random() * 15 + 20) + '%',
      },
      {
        id: 'post-2',
        title: 'Book with AI Stylist',
        type: 'Carousel',
        reach: Math.floor(Math.random() * 30 + 70) + 'K',
        saves: (Math.random() * 1 + 1.5).toFixed(1) + 'K',
        engagement: (Math.random() * 2 + 6).toFixed(1) + '%',
        growth: '+' + Math.floor(Math.random() * 10 + 15) + '%',
      },
      {
        id: 'post-3',
        title: 'Live Consultation Recap',
        type: 'Live',
        reach: Math.floor(Math.random() * 30 + 60) + 'K',
        saves: '—',
        engagement: (Math.random() * 3 + 9).toFixed(1) + '%',
        growth: '+' + Math.floor(Math.random() * 20 + 25) + '%',
      },
    ],
  };
}

export async function GET() {
  try {
    const data = generateMockAnalytics();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

// Revenue-specific endpoint
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { timeRange = '7d' } = body;

    // Generate data based on time range
    const data = generateMockAnalytics();

    return NextResponse.json({
      revenue: data.revenue,
      timeRange,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revenue API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch revenue data' },
      { status: 500 }
    );
  }
}
