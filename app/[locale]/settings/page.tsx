import { getTranslations } from 'next-intl/server';
import { CheckCircleIcon, ShieldCheckIcon, SignalIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { Header, Button, Card, CardHeader, CardTitle, CardBadge } from '@/components';
import { fetchSettingsOverview } from '@/lib/api';

export default async function SettingsPage() {
  const t = await getTranslations('settingsPage');
  const { profile, notifications, team, integrations, security } = await fetchSettingsOverview();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="grid lg:grid-cols-[1.3fr,1fr] gap-10">
          <Card>
            <CardHeader className="items-start">
              <div>
                <CardTitle>{t('account.title')}</CardTitle>
                <p className="text-sm text-neutral-500 mt-1">{t('account.subtitle')}</p>
              </div>
              <CardBadge>{profile.plan}</CardBadge>
            </CardHeader>
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-neutral-50/80 border border-neutral-100 p-5">
                <p className="text-xs uppercase tracking-wide text-neutral-400">{t('account.fields.workspace')}</p>
                <p className="text-xl font-semibold text-neutral-900 mt-2">{profile.displayName}</p>
                <p className="text-sm text-neutral-500 mt-2">{t('account.fields.timezone', { value: profile.timezone })}</p>
              </div>
              <div className="rounded-2xl bg-neutral-50/80 border border-neutral-100 p-5">
                <p className="text-xs uppercase tracking-wide text-neutral-400">{t('account.fields.security')}</p>
                <div className="flex items-center gap-2 mt-2">
                  <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-neutral-600">
                    {profile.twoFactorEnabled ? t('account.fields.twoFactorOn') : t('account.fields.twoFactorOff')}
                  </span>
                </div>
                <Button variant="secondary" size="sm" className="mt-4">
                  {t('account.manage')}
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-neutral-900 text-neutral-100 border border-neutral-800">
            <CardHeader className="items-start">
              <div>
                <CardTitle className="text-neutral-50">{t('usage.title')}</CardTitle>
                <p className="text-sm text-neutral-400 mt-1">{t('usage.subtitle')}</p>
              </div>
              <CardBadge className="bg-white text-neutral-900">{t('usage.badge')}</CardBadge>
            </CardHeader>
            <div className="space-y-5">
              {security.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white/10 border border-white/10 p-5">
                  <p className="text-sm text-neutral-300">{item.label}</p>
                  <p className="text-3xl font-semibold text-white mt-2">{item.value}</p>
                  <p className="text-xs text-neutral-400 mt-2">{t('usage.updated')}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid lg:grid-cols-[1.2fr,1fr] gap-10">
          <Card>
            <CardHeader className="items-start">
              <div>
                <CardTitle>{t('notifications.title')}</CardTitle>
                <p className="text-sm text-neutral-500 mt-1">{t('notifications.subtitle')}</p>
              </div>
              <CardBadge>{t('notifications.badge')}</CardBadge>
            </CardHeader>
            <div className="space-y-4">
              {notifications.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/70 p-5">
                  <div>
                    <p className="font-semibold text-neutral-800">{item.label}</p>
                    <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
                  </div>
                  <button
                    className={`relative inline-flex h-9 w-16 items-center rounded-full transition-colors ${
                      item.enabled ? 'bg-primary-500' : 'bg-neutral-300'
                    }`}
                    type="button"
                    aria-label={t('notifications.toggle')}
                  >
                    <span
                      className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-neu-sm transition ${
                        item.enabled ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader className="items-start">
              <div>
                <CardTitle>{t('integrations.title')}</CardTitle>
                <p className="text-sm text-neutral-500 mt-1">{t('integrations.subtitle')}</p>
              </div>
              <CardBadge>{t('integrations.badge')}</CardBadge>
            </CardHeader>
            <ul className="space-y-4">
              {integrations.map((integration) => (
                <li key={integration.id} className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/70 p-5">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className={`w-6 h-6 ${integration.status === 'connected' ? 'text-emerald-500' : 'text-neutral-400'}`} />
                    <div>
                      <p className="font-semibold text-neutral-800">{integration.name}</p>
                      <p className="text-xs uppercase tracking-wide text-neutral-400">{t(`integrations.status.${integration.status}`)}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary">
                    {integration.status === 'connected' ? t('integrations.manage') : t('integrations.connect')}
                  </Button>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader className="items-start">
              <div>
                <CardTitle>{t('team.title')}</CardTitle>
                <p className="text-sm text-neutral-500 mt-1">{t('team.subtitle')}</p>
              </div>
              <CardBadge>{t('team.badge')}</CardBadge>
            </CardHeader>
            <div className="grid md:grid-cols-2 gap-6">
              {team.map((member) => (
                <div key={member.id} className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white font-semibold flex items-center justify-center">
                        {member.avatar}
                      </span>
                      <div>
                        <p className="font-semibold text-neutral-900">{member.name}</p>
                        <p className="text-sm text-neutral-500">{member.role}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        member.status === 'online'
                          ? 'bg-emerald-50 text-emerald-600'
                          : member.status === 'busy'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      <SignalIcon className="w-4 h-4" />
                      {t(`team.status.${member.status}`)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <Button size="sm" variant="secondary">
                      {t('team.permissions')}
                    </Button>
                    <Button size="sm">
                      <UserGroupIcon className="w-4 h-4" />
                      {t('team.assign')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
