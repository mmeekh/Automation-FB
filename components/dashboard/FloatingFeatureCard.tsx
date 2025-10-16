import React from 'react';

interface FloatingFeatureCardProps {
  icon: string;
  title: string;
}

export function FloatingFeatureCard({ icon, title }: FloatingFeatureCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-neu-md border border-white/30 w-40">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-2xl mb-3">
        {icon}
      </div>
      <div className="font-semibold text-sm">{title}</div>
    </div>
  );
}
