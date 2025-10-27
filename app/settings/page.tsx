import { Button, Card, CardBadge, CardHeader, CardTitle, DashboardProgressBar } from '@/components';
import { cn } from '@/lib/utils';
import {
  BellRing,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  KeyRound,
  Layers,
  Link2,
  Lock,
  Plus,
  RefreshCcw,
  Settings2,
  Share2,
  ShieldCheck,
  Users,
} from 'lucide-react';

const workspaceRoles = ['Admin', 'Developer', 'Social Media Manager'];

const integrations = [
  {
    name: 'Meta Business Suite',
    status: 'connected',
    description: 'Instagram & Facebook account automation',
  },
  {
    name: 'n8n Webhook',
    status: 'connected',
    description: 'Advanced workflow hand-offs',
  },
  {
    name: 'Supabase API Key',
    status: 'connected',
    description: 'User segments and historical data',
  },
  {
    name: 'Gemini Vision AI',
    status: 'pending',
    description: 'High fidelity hairstyle recognition',
  },
] as const;

const sharedAccounts = [
  { handle: '@swordnest.salon', credits: 420, color: 'from-[#e9d5ff] to-[#fce7f3]' },
  { handle: '@hairai.istanbul', credits: 370, color: 'from-[#bae6fd] to-[#dbeafe]' },
  { handle: '@swordnest.ai', credits: 210, color: 'from-[#fde68a] to-[#fef9c3]' },
];

const notifications = [
  { label: 'Limit Reached Alert', description: 'Notify owners when credit pool hits thresholds.' },
  { label: 'API Error Notification', description: 'Escalate integration errors to engineering.' },
  { label: 'New Salon Added', description: 'Alert workspace when new locations are onboarded.' },
];

const apiActivity = [
  { time: 'Today · 08:42', action: 'Token rotated · automation-admin', ip: '185.214.92.14' },
  { time: 'Today · 07:18', action: 'n8n webhook sync completed', ip: '185.214.92.14' },
  { time: 'Yesterday · 21:07', action: 'Gemini Vision AI requested access', ip: '34.120.110.8' },
];

type ToggleProps = {
  active?: boolean;
  label: string;
};

function SettingsToggle({ active = true, label }: ToggleProps) {
  return (
    <button
      type="button"
      className={cn(
        'relative inline-flex h-9 w-16 items-center rounded-full transition-all duration-300',
        active ? 'bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg' : 'bg-neutral-300'
      )}
      aria-label={label}
    >
      <span
        className={cn(
          'inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition-all duration-300',
          active ? 'translate-x-8' : 'translate-x-1'
        )}
      />
    </button>
  );
}

function IntegrationBadge({ status }: { status: typeof integrations[number]['status'] }) {
  if (status === 'connected') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
        <CheckCircle2 className="h-3 w-3" />
        Connected
      </span>
    );
  }

  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-600">
        <CircleAlert className="h-3 w-3" />
        Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">
      <CircleAlert className="h-3 w-3" />
      Error
    </span>
  );
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf5ff] via-[#fdf2f8] to-white">
      <main className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-10">
        <header className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-semibold text-primary-600 shadow-sm">
            <Settings2 className="h-4 w-4" />
            SwordNest Studio Control Center
          </span>
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">Automation Settings</h1>
          <p className="max-w-2xl text-sm text-neutral-500 sm:text-base">
            Configure integrations, guardrails, and shared credit pools across the SwordNest salon network.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
          <Card className="border border-white/70 bg-white/95 backdrop-blur">
            <CardHeader className="items-start pb-4">
              <div>
                <CardTitle>Workspace Settings</CardTitle>
                <p className="text-sm text-neutral-500">
                  Manage your HQ workspace identity and collaboration rules.
                </p>
              </div>
              <CardBadge className="bg-gradient-to-r from-[#e9d5ff] to-[#fce7f3] text-primary-600">
                SwordNest HQ
              </CardBadge>
            </CardHeader>

            <div className="space-y-6 px-6 pb-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    Workspace Name
                  </p>
                  <p className="mt-2 text-lg font-semibold text-neutral-800">SwordNest HQ</p>
                  <p className="mt-2 text-xs text-neutral-500">
                    Visible to teammates and Instagram automations.
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Timezone</p>
                  <p className="mt-2 text-lg font-semibold text-neutral-800">Europe/Istanbul</p>
                  <p className="mt-2 text-xs text-neutral-500">
                    All automation schedules respect this timezone.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" className="hover-lift">
                  <Users className="h-4 w-4" />
                  Manage Access
                </Button>
                <Button className="hover-lift">
                  <Plus className="h-4 w-4" />
                  Invite Teammate
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {workspaceRoles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-gradient-to-r from-[#f1efff] to-[#fde7f6] px-4 py-2 text-xs font-semibold text-primary-600 shadow-sm"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card className="border border-white/70 bg-white">
            <CardHeader className="items-start">
              <div>
                <CardTitle>Team Sentiment Snapshot</CardTitle>
                <p className="text-sm text-neutral-500">
                  AI autopilot coverage across core departments.
                </p>
              </div>
              <CardBadge className="bg-white text-primary-600 shadow-sm">
                9 active members
              </CardBadge>
            </CardHeader>

            <div className="space-y-4 px-6 pb-6">
              {[
                { label: 'Automation Operators', progress: 86 },
                { label: 'Creative Strategists', progress: 64 },
                { label: 'Support & Success', progress: 72 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-dashed border-primary-200/60 bg-primary-50/30 p-4"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-neutral-600">{item.label}</span>
                    <span className="text-sm font-semibold text-primary-600">{item.progress}%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-neutral-200">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section>
          <Card className="border border-white/70 bg-white">
            <CardHeader className="items-start">
              <div>
                <CardTitle>Integrations</CardTitle>
                <p className="text-sm text-neutral-500">
                  Connect trusted tools and keep your automations in sync.
                </p>
              </div>
            </CardHeader>

            <div className="grid gap-4 px-6 pb-6 md:grid-cols-2">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="flex flex-col justify-between rounded-2xl border border-white/80 bg-white/95 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">{integration.name}</h3>
                      <p className="mt-2 text-sm text-neutral-500">{integration.description}</p>
                    </div>
                    <IntegrationBadge status={integration.status} />
                  </div>
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <Button variant="secondary" className="hover-lift">
                      <Link2 className="h-4 w-4" />
                      Manage
                    </Button>
                    <ChevronRight className="h-4 w-4 text-neutral-300" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
          <Card className="border border-white/70 bg-white">
            <CardHeader className="items-start">
              <div>
                <CardTitle>Automation Control</CardTitle>
                <p className="text-sm text-neutral-500">
                  Configure daily guardrails across high-volume AI journeys.
                </p>
              </div>
            </CardHeader>

            <div className="space-y-6 px-6 pb-6">
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-neutral-600">Daily Limit</span>
                  <span className="text-sm font-semibold text-primary-600">1,000 / 5,000</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={5000}
                  defaultValue={1000}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 accent-primary-500"
                />
                <div className="mt-3 flex justify-between text-xs text-neutral-400">
                  <span>500</span>
                  <span>5,000</span>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    Reset Interval
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['12h', '24h', 'Custom'].map((option) => (
                      <button
                        key={option}
                        className={cn(
                          'rounded-full border px-4 py-2 text-xs font-semibold transition-all',
                          option === '24h'
                            ? 'border-transparent bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow'
                            : 'border-neutral-200 text-neutral-500 hover:border-primary-200'
                        )}
                        type="button"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    Error Handling
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Retry', 'Skip', 'Notify'].map((option) => (
                      <button
                        key={option}
                        className={cn(
                          'rounded-full border px-4 py-2 text-xs font-semibold transition-all',
                          option === 'Notify'
                            ? 'border-transparent bg-gradient-to-r from-[#e9d5ff] to-[#fce7f3] text-primary-600 shadow'
                            : 'border-neutral-200 text-neutral-500 hover:border-primary-200'
                        )}
                        type="button"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-primary-200/60 bg-primary-50/40 p-5">
                <DashboardProgressBar current={750} max={1000} label="Credits used today" />
              </div>
            </div>
          </Card>

          <Card className="border border-white/70 bg-white">
            <CardHeader className="items-start">
              <div>
                <CardTitle>Shared Credits (Multi-Account Pool)</CardTitle>
                <p className="text-sm text-neutral-500">
                  Distribute purchased credits across connected Instagram shops.
                </p>
              </div>
            </CardHeader>

            <div className="space-y-5 px-6 pb-6">
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">Total Credits Pool</span>
                  <span className="text-lg font-semibold text-primary-600">1,000 credits</span>
                </div>
              </div>

              <div className="space-y-4">
                {sharedAccounts.map((account) => (
                  <div key={account.handle} className="space-y-2 rounded-2xl border border-white/70 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-neutral-700">{account.handle}</span>
                      <span className="text-sm font-semibold text-neutral-500">
                        {account.credits} credits
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-100">
                      <div
                        className={cn('h-2 rounded-full bg-gradient-to-r', account.color)}
                        style={{ width: `${(account.credits / 1000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" className="hover-lift">
                  <Plus className="h-4 w-4" />
                  Add Account
                </Button>
                <Button className="hover-lift">
                  <Share2 className="h-4 w-4" />
                  Adjust Share %
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-dashed border-primary-200/60 bg-primary-50/30 px-4 py-3 text-sm text-neutral-600">
                <span>Auto-redistribute when an account reaches 0</span>
                <SettingsToggle label="Auto-redistribute credits" />
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
          <Card className="border border-white/70 bg-white">
            <CardHeader className="items-start">
              <div>
                <CardTitle>Notifications</CardTitle>
                <p className="text-sm text-neutral-500">
                  Keep teams in sync when automations shift states.
                </p>
              </div>
            </CardHeader>
            <div className="space-y-4 px-6 pb-6">
              {notifications.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">{item.label}</p>
                    <p className="mt-1 text-xs text-neutral-500">{item.description}</p>
                  </div>
                  <SettingsToggle label={item.label} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="border border-white/70 bg-white">
            <CardHeader className="items-start">
              <div>
                <CardTitle>Security &amp; API</CardTitle>
                <p className="text-sm text-neutral-500">Protect sensitive keys and track access.</p>
              </div>
              <CardBadge className="bg-white text-primary-600 shadow-sm">
                Zero trust enforced
              </CardBadge>
            </CardHeader>

            <div className="space-y-4 px-6 pb-6">
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">Two-factor Authentication</p>
                    <p className="mt-1 text-xs text-neutral-500">Required for all workspace admins.</p>
                  </div>
                  <SettingsToggle label="Two-factor Authentication" />
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">Token Rotation Scheduler</p>
                    <p className="mt-1 text-xs text-neutral-500">Automatic every 12 hours.</p>
                  </div>
                  <Button variant="secondary" className="hover-lift">
                    <RefreshCcw className="h-4 w-4" />
                    Rotate now
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <Lock className="h-4 w-4 text-primary-500" />
                  Recent API Activity
                </div>
                <div className="mt-4 space-y-3 text-sm text-neutral-600">
                  {apiActivity.map((activity) => (
                    <div
                      key={activity.time}
                      className="rounded-xl border border-white/70 bg-gradient-to-r from-white to-[#fdf2f8]/70 p-4 shadow-inner"
                    >
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span>{activity.time}</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-1 text-[11px] font-semibold text-primary-600">
                          <KeyRound className="h-3 w-3" />
                          Secure
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-neutral-700">{activity.action}</p>
                      <p className="mt-1 text-xs text-neutral-500">IP · {activity.ip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        <footer className="flex flex-col items-start gap-3 rounded-3xl border border-dashed border-primary-200/60 bg-primary-50/40 px-6 py-5 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BellRing className="h-5 w-5 text-primary-500" />
            AutoFlow monitors your automations 24/7 and rebalances credits every night at 02:00.
          </div>
          <Button variant="secondary" className="hover-lift">
            <Layers className="h-4 w-4" />
            View automation change-log
          </Button>
        </footer>
      </main>
    </div>
  );
}
