'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CustomizationModalProps } from '@/lib/types/customization';
import { useCustomizationWizard } from './useCustomizationWizard';
import { ProgressBar } from './ProgressBar';
import { WelcomeStep } from './steps/WelcomeStep';
import { MessagesStep } from './steps/MessagesStep';
import { ImagesStep } from './steps/ImagesStep';
import { SettingsStep } from './steps/SettingsStep';
import { PreviewStep } from './steps/PreviewStep';
import { ReviewStep } from './steps/ReviewStep';

const STEPS = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'messages', title: 'Messages' },
  { id: 'images', title: 'Images' },
  { id: 'settings', title: 'Settings' },
  { id: 'preview', title: 'Preview' },
  { id: 'review', title: 'Activate' },
];

export function CustomizationModal({ isOpen, onClose, template, onActivate, existingData }: CustomizationModalProps) {
  const wizard = useCustomizationWizard(template, existingData);

  const handleClose = () => {
    if (confirm('Are you sure? Your changes will be lost.')) {
      wizard.reset();
      onClose();
    }
  };

  const handleActivate = () => {
    onActivate(wizard.data);
    wizard.reset();
    onClose();
  };

  const getCurrentStepComponent = () => {
    const stepProps = {
      template,
      data: wizard.data,
      onChange: wizard.updateData,
      onNext: wizard.nextStep,
      onBack: wizard.prevStep,
      isFirst: wizard.currentStep === 0,
      isLast: wizard.currentStep === wizard.totalSteps - 1,
    };

    switch (wizard.currentStep) {
      case 0:
        return <WelcomeStep {...stepProps} />;
      case 1:
        return <MessagesStep {...stepProps} />;
      case 2:
        return <ImagesStep {...stepProps} />;
      case 3:
        return <SettingsStep {...stepProps} />;
      case 4:
        return <PreviewStep {...stepProps} />;
      case 5:
        return <ReviewStep {...stepProps} onActivate={handleActivate} isUpdate={!!existingData} />;
      default:
        return null;
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="relative border-b border-neutral-200 p-6">
                  <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>

                  <Dialog.Title className="text-2xl font-bold text-neutral-900">
                    {template.name}
                  </Dialog.Title>
                  <p className="text-sm text-neutral-600 mt-1">
                    Step {wizard.currentStep + 1} of {wizard.totalSteps}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-8 bg-neutral-50 border-b border-neutral-200">
                  <ProgressBar currentStep={wizard.currentStep} totalSteps={wizard.totalSteps} steps={STEPS} />
                </div>

                {/* Content */}
                <div className="p-8 min-h-[400px]">{getCurrentStepComponent()}</div>

                {/* Navigation Footer (hidden for Welcome step) */}
                {wizard.currentStep > 0 && wizard.currentStep < wizard.totalSteps - 1 && (
                  <div className="border-t border-neutral-200 p-6 flex justify-between">
                    <button
                      onClick={wizard.prevStep}
                      className="px-6 py-2 border-2 border-neutral-200 rounded-xl hover:bg-neutral-50 font-medium text-neutral-700"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={wizard.nextStep}
                      className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:from-primary-600 hover:to-accent-600 font-medium shadow-lg"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
