'use client';

import { useState } from 'react';
import { AutomationSidebar } from '@/components/layout/AutomationSidebar';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  RocketLaunchIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Getting Started',
    question: 'How do I create my first automation?',
    answer: 'Click on "Automation" in the sidebar, then select a template from our gallery. Customize the messages, connect your Instagram account, and click "Activate". Your automation will start running immediately!',
  },
  {
    category: 'Getting Started',
    question: 'How do I connect my Instagram account?',
    answer: 'Go to Settings > Integrations, click on "Meta Business Suite", and follow the OAuth flow to connect your Instagram account. Make sure you have admin access to the Instagram account you want to connect.',
  },
  {
    category: 'Automations',
    question: 'What are the 4 node types?',
    answer: 'Trigger nodes start the automation when keywords match. Message nodes send text, images, and buttons to users. Image Request nodes ask users to send photos. Result nodes show AI-generated results with appointment buttons.',
  },
  {
    category: 'Automations',
    question: 'How does the quota system work?',
    answer: 'Each automation has a daily quota limit (e.g., 1000 generations per day). The quota resets every 24 hours. You can monitor usage in the progress bar and adjust limits in Settings.',
  },
  {
    category: 'Automations',
    question: 'What is Test Mode?',
    answer: 'Test Mode lets you run the full automation flow for selected Instagram usernames only. This helps you verify everything works before activating it for all followers.',
  },
  {
    category: 'Editing',
    question: 'How do I edit messages in nodes?',
    answer: 'In Edit Mode, hover over any node and click "Edit". You can modify text, add emojis, upload images, and configure buttons. Changes are saved when you click "Save Automation".',
  },
  {
    category: 'Editing',
    question: 'Can I undo changes?',
    answer: 'Yes! When in Edit Mode, use the Undo/Redo buttons in the top bar. We keep the last 50 changes in history.',
  },
  {
    category: 'Analytics',
    question: 'What statistics are tracked?',
    answer: 'Each node shows: messages sent, delivery rate %, and open rate %. Result nodes also track click-through rates on appointment buttons.',
  },
  {
    category: 'Billing',
    question: 'How does pricing work?',
    answer: 'We offer flexible plans starting at $49/month for the Pro plan. Pricing is based on monthly automation runs and connected accounts. Check Settings > Billing for details.',
  },
  {
    category: 'Troubleshooting',
    question: 'Automation not triggering?',
    answer: 'Check: 1) Is the automation Active (not Inactive or Test)? 2) Are keywords correct? 3) Is Instagram account connected? 4) Have you hit daily quota? Go to the automation and check the status indicator.',
  },
  {
    category: 'Troubleshooting',
    question: 'Images not generating?',
    answer: 'Verify your API keys in Settings > API Keys. Check that Gemini Vision AI is connected. Also ensure users are sending valid image formats (JPG, PNG).',
  },
];

const quickLinks = [
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides',
    icon: VideoCameraIcon,
    link: '#',
    color: 'from-red-500 to-pink-500',
  },
  {
    title: 'Documentation',
    description: 'Complete API reference',
    icon: BookOpenIcon,
    link: '#',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Live Chat Support',
    description: 'Get help from our team',
    icon: ChatBubbleLeftRightIcon,
    link: '#',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Quick Start Guide',
    description: 'Launch in 5 minutes',
    icon: RocketLaunchIcon,
    link: '#',
    color: 'from-purple-500 to-violet-500',
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map((faq) => faq.category)))];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      <AutomationSidebar />

      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-200/50 mb-4">
              <QuestionMarkCircleIcon className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-600">Help Center</span>
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">How can we help you?</h1>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Search our FAQ, browse documentation, or contact support
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all text-lg"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.title}
                  href={link.link}
                  className="group p-6 rounded-2xl bg-white border-2 border-neutral-200 hover:border-transparent hover:shadow-xl transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-1">{link.title}</h3>
                  <p className="text-sm text-neutral-600">{link.description}</p>
                </a>
              );
            })}
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
              <h2 className="text-xl font-bold text-neutral-900">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'}
              </p>
            </div>

            <div className="divide-y divide-neutral-200">
              {filteredFAQs.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-6 py-5 text-left hover:bg-neutral-50 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 rounded-md bg-primary-100 text-primary-700 text-xs font-semibold mr-3">
                        {faq.category}
                      </span>
                      <h3 className="font-semibold text-neutral-900 mt-2">{faq.question}</h3>
                    </div>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-neutral-400 transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openFAQ === index && (
                    <div className="px-6 pb-5 text-neutral-700 leading-relaxed bg-neutral-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
            <p className="mb-6 opacity-90">Our support team is available 24/7 to assist you</p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:shadow-xl transition-all">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-white/20 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/30 transition-all">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
