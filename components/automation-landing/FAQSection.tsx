'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AutomationContent } from '@/lib/automation-content/types';

interface FAQSectionProps {
  faq: AutomationContent['faq'];
}

export function FAQSection({ faq }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Sıkça Sorulan Sorular</h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Merak ettiğiniz her şey burada
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faq.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border-2 border-neutral-200 overflow-hidden hover:border-primary-200 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between gap-4 p-6 text-left"
            >
              <span className="text-lg font-semibold text-neutral-900">{item.question}</span>
              <ChevronDownIcon
                className={`w-6 h-6 text-neutral-500 flex-shrink-0 transition-transform ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
