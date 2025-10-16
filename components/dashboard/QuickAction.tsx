import React from 'react';
import { Button } from '@/components/ui/Button';

interface QuickActionProps {
  icon: React.ReactNode | string;
  title: string;
  action: string;
  onClick?: () => void;
}

export function QuickAction({ icon, title, action, onClick }: QuickActionProps) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-white to-neutral-100 shadow-neu-sm hover:shadow-neu-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="font-medium text-sm">{title}</div>
      </div>
      <Button size="sm" variant="secondary">
        {action}
      </Button>
    </div>
  );
}
