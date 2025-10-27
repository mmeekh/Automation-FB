// Export all components for easy imports
export * from './layout';
export * from './automations';
export { TwoFactorInput } from './TwoFactorInput';
export { Footer } from './Footer';
export { AuthModal } from './auth/AuthModal';

// Dashboard components
export { FloatingFeatureCard } from './dashboard/FloatingFeatureCard';
export { MetricCard } from './dashboard/MetricCard';
export { QuickAction } from './dashboard/QuickAction';
export { AITemplateCard } from './dashboard/AITemplateCard';
export { ProgressBar as DashboardProgressBar } from './dashboard/ProgressBar';
export { ChartCard, PlaceholderChart } from './dashboard/ChartCard';

// Customization components
export { CustomizationModal } from './customization/CustomizationModal';
export { ProgressBar as CustomizationProgressBar } from './customization/ProgressBar';
export * from './customization/steps/WelcomeStep';
export * from './customization/steps/MessagesStep';
export * from './customization/steps/ImagesStep';
export * from './customization/steps/SettingsStep';
export * from './customization/steps/PreviewStep';
export * from './customization/steps/ReviewStep';

// UI Components
export { Button } from './ui/Button';
export { Input } from './ui/Input';
export { Card, CardHeader, CardTitle, CardBadge } from './ui/Card';
export { CardSpotlight } from './ui/CardSpotlight';
export { TextHoverEffect } from './ui/TextHoverEffect';
export { AnimatedAvatarTooltip } from './ui/AnimatedAvatarTooltip';
