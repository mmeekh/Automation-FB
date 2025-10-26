'use client';

import { Header } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AtSign, TrendingUp, Users, Calendar } from 'lucide-react';

// Mock data - gerçek API'den gelecek
const instagramAccounts = [
  { username: '@hairsalon_istanbul', outputs: 342, growth: '+12%' },
  { username: '@beautystudio_ankara', outputs: 256, growth: '+8%' },
  { username: '@looklab_izmir', outputs: 189, growth: '+15%' },
  { username: '@hairstyle_bursa', outputs: 147, growth: '+5%' },
  { username: '@salon_antalya', outputs: 98, growth: '+22%' },
];

const dailyStats = [
  { date: '2025-10-26', total: 127, avgPerAccount: 25.4 },
  { date: '2025-10-25', total: 118, avgPerAccount: 23.6 },
  { date: '2025-10-24', total: 134, avgPerAccount: 26.8 },
  { date: '2025-10-23', total: 109, avgPerAccount: 21.8 },
  { date: '2025-10-22', total: 143, avgPerAccount: 28.6 },
];

export default function AnalyticsPage() {
  const totalOutputs = instagramAccounts.reduce((sum, acc) => sum + acc.outputs, 0);
  const todayStats = dailyStats[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/10 to-accent-50/10">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Analytics</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Instagram hesaplarınızın output istatistikleri
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-white/70 bg-white/95 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-600">
                Toplam Output
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neutral-900">{totalOutputs}</div>
              <p className="text-xs text-neutral-500 mt-1">Tüm hesaplar</p>
            </CardContent>
          </Card>

          <Card className="border border-white/70 bg-white/95 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-600">
                Aktif Hesaplar
              </CardTitle>
              <Users className="h-4 w-4 text-accent-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neutral-900">{instagramAccounts.length}</div>
              <p className="text-xs text-neutral-500 mt-1">Instagram hesabı</p>
            </CardContent>
          </Card>

          <Card className="border border-white/70 bg-white/95 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-600">
                Bugün Toplam
              </CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neutral-900">{todayStats.total}</div>
              <p className="text-xs text-neutral-500 mt-1">{todayStats.date}</p>
            </CardContent>
          </Card>

          <Card className="border border-white/70 bg-white/95 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-600">
                Hesap Başı Ortalama
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neutral-900">{todayStats.avgPerAccount}</div>
              <p className="text-xs text-neutral-500 mt-1">Bugün</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Instagram Accounts Table */}
          <Card className="border border-white/70 bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AtSign className="h-5 w-5 text-pink-500" />
                Instagram Hesapları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instagramAccounts.map((account) => (
                  <div
                    key={account.username}
                    className="flex items-center justify-between p-4 rounded-lg bg-neutral-50/50 hover:bg-neutral-100/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                        {account.username.charAt(1).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{account.username}</p>
                        <p className="text-xs text-neutral-500">{account.outputs} outputs</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        {account.growth}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Stats Table */}
          <Card className="border border-white/70 bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary-500" />
                Günlük İstatistikler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailyStats.map((stat, index) => (
                  <div
                    key={stat.date}
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                      index === 0
                        ? 'bg-primary-50/50 border border-primary-200'
                        : 'bg-neutral-50/50 hover:bg-neutral-100/50'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-neutral-900">{stat.date}</p>
                      <p className="text-xs text-neutral-500">
                        {index === 0 ? 'Bugün' : `${index} gün önce`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-neutral-900">{stat.total}</p>
                      <p className="text-xs text-neutral-500">
                        ~{stat.avgPerAccount} / hesap
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
