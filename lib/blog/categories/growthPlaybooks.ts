'use client';

import type { BlogCategory } from '../types';

const author = (name: string, role: string, avatar: string) => ({ name, role, avatar });

export const growthPlaybooksCategory: BlogCategory = {
  slug: 'growth-playbooks',
  title: 'Growth Playbooks',
  description:
    'SEO-led funnels, launch cadences, and monetisation frameworks that transform Instagram discovery into predictable LookLab revenue.',
  posts: [
    {
      slug: 'instagram-seo-dm-funnel-blueprint',
      title: 'Instagram SEO DM Funnel Blueprint for Organic Bookings',
      excerpt:
        'Align bio keywords, content hooks, and LookLab trigger nodes so every organic visit journeys toward a booked consultation within minutes.',
      cover: '/blog/GPblog1.jpg',
      coverWidth: 2400,
      coverHeight: 1600,
      category: 'Growth Playbooks',
      readTime: '11 min read',
      publishedAt: '26 Oct 2025',
      author: author('Naz Aydın', 'Growth Strategist', '/media/avatars/naz.png'),
      keywords: [
        'instagram seo automation',
        'organic instagram bookings',
        'dm funnel strategy',
        'looklab playbook',
      ],
      metaDescription:
        'Comprehensive Instagram SEO automation playbook that maps search intent to LookLab DM flows, boosts profile-to-booking conversion, and tracks ROI with analytics.',
      sections: [
        {
          heading: 'Map keyword intent to LookLab trigger nodes',
          body: `Group transactional, commercial research, and local discovery queries into a living intent grid. For each keyword cluster, build a LookLab trigger node that echoes the exact phrase in the opening line, tags the audience, and routes them to proof, pricing, or booking options that mirror the original search intent. Map each node to stage-specific KPIs and embed UTM parameters so every profile tap surfaces inside Search Console attribution dashboards.

Layer local search phrases and seasonal modifiers into your node prompts. When a visitor lands in the DM, repeat the phrase they typed, display proof anchored to that keyword, and include a quick-reply that offers the next best action - book, learn, or compare. This resonance keeps retention high across complex flows and signals to Instagram that your playbook satisfies the query.`,
          highlights: [
            'Use session parameters to persist keyword context across the flow',
            'Surface pinned story highlights that reinforce the chosen CTA',
            'Send conversion data to Analytics → Journeys to compare keyword ROI',
            'Sync LookLab trigger tags with your CRM for faster stylist handoffs',
          ],
        },
        {
          heading: 'Synchronise on-profile SEO signals with DM messaging',
          body: `Refresh bio headline, link-in-bio hero, and highlight covers weekly so the same promise appears inside Instagram search results, Reels captions, and automated DM buttons. This consistency trains the algorithm and your audience to associate the outcome you sell with a single keyword set. Align the first sentence of each script with the long tail phrase used in your most recent Reel or Guide to reinforce ranking momentum.

Stitch the experience together with structured data: alt text loaded with service keywords, CTA buttons labelled with verb led prompts, and pinned comment replies that restate your differentiator. The more surfaces that repeat your positioning, the faster followers connect the topic to your signature offer.`,
          highlights: [
            'Mirror top-ranking keywords inside CTA buttons and alt text',
            'Schedule quarterly brand audits to retire outdated phrasing',
            'Use LookLab experiments to A/B test hook variations without redeploying flows',
          ],
        },
        {
          heading: 'Run 14-day optimisation sprints and document lift',
          body: `Review LookLab funnel reports every Friday. Compare entry to booking conversion by keyword, adjust button copy or media blocks with the lowest CTR, and feed the improvements back into your content calendar. Publish the wins as LinkedIn or Threads updates to capture secondary traffic and backlinks.

Pair each sprint with a hypothesis template that documents the tested keyword, the node that changed, and the metric that proves success. Store the results in a shared Notion database so future stylists can replicate the playbook without rebuilding flows from scratch.`,
          highlights: [
            'Track keyword-level conversion lift in a shared analytics workspace',
            'Archive losing variations with notes so the team avoids repeating failed tests',
            'Repurpose sprint recaps into SEO articles for additional organic reach',
          ],
        },
        {
          heading: 'Publish proof-of-performance content to compound SERP reach',
          body: `Transform each optimisation win into a case study carousel or Stories recap. Link those assets back to an SEO checklist blog on your site, then reference that blog again inside the DM flow. This internal linking loop helps Google understand topical authority while reminding followers that you operate a high performing system.

Encourage satisfied clients to comment with the keyword they originally searched. Their language becomes fresh social proof that prospects read before tapping the CTA, reinforcing the same phrases you rank for in Explore and on the web.`,
          highlights: [
            'Embed DM trigger links inside every case study to shorten the path to booking',
            'Pitch PR outlets using the same keyword narrative to earn authoritative backlinks',
            'Collect client quotes that repeat target phrases for reuse in future flows',
          ],
        },
      ],
    },
    {
      slug: 'ugc-to-dm-revenue-engine',
      title: 'UGC-to-DM Revenue Engine: Automate Warm Leads at Scale',
      excerpt:
        'Convert social proof into booked services by piping every testimonial into LookLab media nodes and letting automation deliver offers instantly.',
      cover: '/blog/GPblog2.jpg',
      coverWidth: 2400,
      coverHeight: 1350,
      category: 'Growth Playbooks',
      readTime: '9 min read',
      publishedAt: '20 Oct 2025',
      author: author('Deniz Kurt', 'Lifecycle Lead', '/media/avatars/deniz.png'),
      keywords: [
        'instagram ugc automation',
        'social proof funnel',
        'dm revenue engine',
      ],
      metaDescription:
        'Playbook for injecting user-generated content into LookLab DM funnels so warm followers glide from testimonial to tailored offer without human effort.',
      sections: [
        {
          heading: 'Automate UGC intake and curation',
          body: `Collect creator clips via a "Share your result" mini flow. Approve assets in ClickUp or Notion, push approved files into LookLab media nodes, and tag them by outcome so downstream automations pull the most relevant clip instantly. Automate rights management reminders so every piece of content stays compliant.

Standardise filenames with service keywords and client outcomes. When the workflow drops media into a DM sequence or landing page, Instagram and Google pick up on the consistent metadata, giving your testimonials extra search surface area.`,
          highlights: [
            'Centralise model releases and licensing expirations inside your project hub',
            'Write SEO-rich alt text for every clip before publishing to LookLab',
            'Use Airtable automations to flag when a service lacks fresh proof content',
          ],
        },
        {
          heading: 'Branch offers based on proof preference',
          body: `Ask each follower which transformation convinced them. Use the response to deliver a mini carousel, price anchoring, and a booking link that references the same before or after story. This micro personalisation keeps conversion rates high while the entire journey remains automated.

Track click behaviour inside LookLab analytics to see which proof themes convert each persona. Rotate in fresh videos quarterly so repeat visitors never see the same asset twice yet still receive a predictable structure that moves them forward.`,
          highlights: [
            'Translate captions automatically for multilingual audiences',
            'Retire underperforming clips after 45 days and replace with fresher wins',
            'Attribute revenue back to each asset via LookLab order webhooks',
            'Tag offer variants with persona attributes to sharpen retargeting',
          ],
        },
        {
          heading: 'Report revenue lift to the leadership team',
          body: `Build a Looker Studio dashboard that charts UGC triggered DM starts, button CTR, average order value, and refund rate. Use the report during monthly stand ups to request more creator budget armed with proven ROI. Incorporate a rolling 90 day view so leadership can see compounding revenue rather than one off spikes.

Overlay qualitative notes from stylists or sales reps next to the data. Insights about why a testimonial resonated help prioritise the next batch of creators and keep messaging sharp in every customer touchpoint.`,
          highlights: [
            'Overlay LookLab revenue data with CRM retention metrics for full context',
            'Embed dashboard links inside executive updates to speed decision making',
            'Document qualitative takeaways alongside the numbers for future launches',
          ],
        },
        {
          heading: 'Repackage UGC into evergreen search assets',
          body: `Turn top performing clips into vertical landing pages and YouTube Shorts that target the same service keywords. Embed the LookLab DM trigger link on each page so organic visitors can reproduce the testimonial journey instantly.

Repurpose transcripts into blog posts optimised for long tail queries. Link each article back to Instagram Guides and the automated DM flow to create a loop of authority signals that outrank competitor salons.`,
          highlights: [
            'Transcribe top performing clips and optimise H2s with service plus location keywords',
            'Add schema markup for reviews to surface star ratings in Google and Bing',
            'Link DM flows to companion blog posts for additional topical authority',
          ],
        },
      ],
    },
    {
      slug: 'instagram-story-lead-net',
      title: 'Instagram Story Lead Net with Automated Follow-Up',
      excerpt:
        'Stack story stickers and timed reminders so LookLab nurtures new leads for forty-eight hours while your team focuses on in-person service.',
      cover: '/blog/GPblog3.jpg',
      coverWidth: 2400,
      coverHeight: 1600,
      category: 'Growth Playbooks',
      readTime: '8 min read',
      publishedAt: '13 Oct 2025',
      author: author('Kerem Özkan', 'Lifecycle Specialist', '/media/avatars/kerem.png'),
      keywords: [
        'instagram story automation',
        'lead nurture bot',
        'story sticker funnel',
      ],
      metaDescription:
        'Action plan for building Instagram Story capture campaigns that tag preferences, launch LookLab nurture flows, and convert leads within 48 hours.',
      sections: [
        {
          heading: 'Design a three-story capture cadence',
          body: `Lead with a hook story, follow with social proof, and finish with a question sticker that qualifies intent. Every reply hits LookLab through a webhook, creating a tagged contact with preference data ready for segmentation. Rotate creative based on the offers you are ranking for in Instagram search so the capture cadence always aligns with trending queries.

Design captions or motion graphics that repeat the keyword you target that week. Viewers who screenshot a step by step slide often share it in DMs, creating secondary referrals that keep the lead net full even after the story disappears.`,
          highlights: [
            'Alternate between motion graphics and raw footage to avoid ad fatigue',
            'Tag each sticker response with urgency level for faster prioritisation',
            'Archive story packs with performance notes for future campaign reuse',
          ],
        },
        {
          heading: 'Deliver a three-touch nurture automation',
          body: `Schedule automated follow ups at t0, t+12, and t+36 hours. Message one highlights proof, message two surfaces pricing and financing, message three offers a scarcity driven consultation slot. Allow human takeover by monitoring the Live Inbox for high value responses and trigger Slack or email alerts when someone signals they are ready to buy.

Use conditional delays to respect time zones and off hours. LookLab can pause nurture during overnight windows so your brand feels responsive without overwhelming new leads.`,
          highlights: [
            'Introduce an optional quiz branch for colder leads who need more context',
            'Use conditional wait nodes that adapt to local time zones automatically',
            'Pass hot leads to stylists with a full summary of prior touchpoints',
          ],
        },
        {
          heading: 'Measure lead velocity and drop-off points',
          body: `Inside LookLab analytics, compare lead progression rates by story set. Export the data every week to refine creative, button copy, and send times for your top performing audience segments. Layer in benchmarks from Instagram Insights so you know whether a drop-off is tied to content fatigue or automation friction.

Document the insights in a rev ops dashboard that other teams can reach. Visibility into lead velocity keeps marketing, ops, and stylists aligned on which stories deserve ad spend or creator amplification.`,
          highlights: [
            'Compare sticker response rate versus DM start rate to spot creative gaps',
            'Export weekly CSVs into your BI tool for longitudinal analysis',
            'Annotate spikes with campaign notes directly inside LookLab reports',
          ],
        },
        {
          heading: 'Blend offline experiences with automated follow-up',
          body: `Sync offline appointment notes back into LookLab within 24 hours. Tag each client with the story pack that attracted them so you can personalise post visit follow ups and encourage referrals.

Trigger a satisfaction survey and a review request once the service is complete. When happy clients mention the original story keyword in their feedback, archive the quote for future campaigns and embed it in the nurture path to keep the loop closed.`,
          highlights: [
            'Give front desk teams canned DM scripts that reference the original story hook',
            'Sync booking tools so no-show gaps trigger an instant follow-up offer',
            'Request testimonials 48 hours post service to capture fresh momentum',
          ],
        },
      ],
    },
    {
      slug: 'instagram-live-promo-automation',
      title: 'Automating Instagram Live Promotions with LookLab',
      excerpt:
        'Sync RSVP reminders, live-event keywords, and AI recap messages so every broadcast ends with concrete bookings and tracked revenue.',
      cover: '/blog/GPblog4.jpg',
      coverWidth: 2400,
      coverHeight: 1600,
      category: 'Growth Playbooks',
      readTime: '10 min read',
      publishedAt: '02 Oct 2025',
      author: author('Merve Yılmaz', 'Automation Architect', '/media/avatars/merve.png'),
      keywords: [
        'instagram live automation',
        'event reminder bot',
        'dm offer flow',
      ],
      metaDescription:
        'Guide to automating Instagram Live campaigns with LookLab, covering reminder flows, live keyword triggers, AI recap messaging, and conversion attribution.',
      sections: [
        {
          heading: 'Collect RSVPs and warm the audience',
          body: `Embed countdown stickers in Stories and route every RSVP into a LookLab segment. Send reminders one hour and five minutes before you go live, delivering teaser content that builds desire for the upcoming offer. Add a day-before reminder that restates the value proposition and gives followers the option to submit questions you can answer on air.

Heat up the segment with behind the scenes clips, playlists, or mini trainings. The more context warm leads receive, the more likely they are to stay through the pitch and tap keyword triggers the second you mention them.`,
          highlights: [
            'Embed reminder buttons that add the event to native phone calendars',
            'Tag registrants by interest level to tailor warm up content',
            'Send audio teasers for premium launches that need a personal touch',
          ],
        },
        {
          heading: 'Trigger offers mid-broadcast',
          body: `Mention a unique keyword three times during the live. Followers who DM the keyword receive an instant bundle of offer cards, testimonials, and the booking link. LookLab tags each lead so you can attribute revenue back to the live session and compare it with other acquisition channels.

Pin the CTA comment and recycle it every fifteen minutes. Viewers who join midstream instantly understand how to participate, and you avoid flooding the chat with repetitive instructions.`,
          highlights: [
            'Pin a comment that repeats the keyword and outlines the bonus offer',
            'Use progressive disclosure to unlock deeper discounts for engaged viewers',
            'Add a limited-time upsell node that disappears after the broadcast ends',
          ],
        },
        {
          heading: 'Send AI-powered recaps and close procrastinators',
          body: `Twelve hours after the event, a LookLab AI node sends a recap highlighting timestamped benefits, scarcity reminders, and next steps. Leads who still have questions are escalated to a human closer with full context attached. Include a limited time bonus that expires within 48 hours to keep momentum high.

Split test the tone of your recaps. Some audiences respond best to structured bullet points while others prefer conversational summaries. Store the winning variant as the default template for future lives.`,
          highlights: [
            'Include a scannable timestamp table so viewers can jump to key moments',
            'Automate a follow-up survey to collect objections for the next broadcast',
            'Escalate complex questions to closers via Slack or email webhooks',
          ],
        },
        {
          heading: 'Analyse post-live performance and retarget intelligently',
          body: `Compare live attendance, replay views, and DM conversion rates inside LookLab analytics. Tag segments based on show-up status so future campaigns can send targeted reminders or upsells. Build a simple ROI model that tracks revenue per minute of live streaming so executives can see the payoff instantly.

Export high intent attendees to Meta Custom Audiences and serve reminder ads for the next broadcast. Matching messaging across automation, paid media, and email compounds visibility and keeps the pipeline full.`,
          highlights: [
            'Segment replay viewers separately to craft tailored follow-up offers',
            'Push high intent contacts into paid retargeting synced with offer deadlines',
            'Store lessons learned in a reusable launch checklist so new hosts ramp fast',
          ],
        },
      ],
    },
    {
      slug: 'instagram-ads-to-dm-bridge',
      title: 'Bridge Instagram Ads to DM Sales with Pixel-Ready Flows',
      excerpt:
        'Pipe ad clicks into LookLab, qualify intent in-DM, and return conversion events to Meta so ad spend scales with confidence.',
      cover: '/blog/GPblog5.jpg',
      coverWidth: 2400,
      coverHeight: 1600,
      category: 'Growth Playbooks',
      readTime: '9 min read',
      publishedAt: '24 Sep 2025',
      author: author('Can Acar', 'Data Analyst', '/media/avatars/can.png'),
      keywords: [
        'instagram ads automation',
        'conversion api funnel',
        'dm qualification flow',
      ],
      metaDescription:
        'Blueprint for connecting Instagram ads to LookLab DM automation, scoring leads, and syncing Meta Conversion API events for precise ROAS tracking.',
      sections: [
        {
          heading: 'Set up the Conversion API correctly',
          body: `Mirror Meta pixel events inside LookLab by firing "Lead" and "Purchase" events server-side. Include event IDs and customer match parameters so attribution survives iOS privacy updates. Document the data schema in your analytics runbook so engineers and marketers are aligned on required fields.

Validate each event with Meta Event Manager before scaling spend. Catching deduplication issues early keeps your ROAS reporting clean and prevents the algorithm from misreading performance.`,
          highlights: [
            'Mirror Meta pixel naming conventions for seamless event deduplication',
            'Validate server events in Test Events before pushing campaigns live',
            'Use consent mode parameters when operating in strict privacy regions',
          ],
        },
        {
          heading: 'Qualify and route leads instantly',
          body: `Ask three rapid-fire questions about budget, urgency, and desired outcome. Hot leads receive a booking or checkout link, while cooler leads enter an educational drip that overcomes objections. Use quick replies to shorten response time and give prospects a guided path to conversion.

Layer in optional branching for lead magnets or waitlists. When ad fatigue sets in, your automation still captures value by redirecting colder audiences to softer offers that nurture them toward readiness.`,
          highlights: [
            'Score leads in real time and sync ratings back to your CRM',
            'Tag drop-offs with objection themes for creative and sales enablement',
            'Offer alternative CTAs like demos or quizzes to salvage mid-intent clicks',
          ],
        },
        {
          heading: 'Build an optimisation dashboard',
          body: `Push LookLab conversion values back to Ads Manager and create Looker Studio dashboards that compare campaign ROAS, assisting you in scaling only the audiences that deliver profitable bookings. Add filters for creative theme, audience segment, and device so patterns emerge quickly.

Share a weekly digest with creative, acquisition, and leadership teams. When everyone sees the same metrics, testing velocity increases and campaign pivots happen before performance drops.`,
          highlights: [
            'Blend ad spend, DM conversions, and downstream revenue in one report',
            'Automate alerts when CPA creeps above threshold so you can pause fast',
            'Log creative notes next to performance data for better story building',
          ],
        },
        {
          heading: 'Scale profitable campaigns with creative intelligence',
          body: `Review your top performing DM transcripts to understand which hooks drove replies. Feed those phrases back into ad copy, headline tests, and Instagram Reel scripts. The closer your ads mimic organic conversations, the lower your cost per qualified DM.

Run quarterly creative retrospectives that combine paid and organic data. Spot gaps where your funnel lacks proof for specific personas and commission new assets before launching the next sprint.`,
          highlights: [
            'Tag transcripts by persona and campaign to build a searchable messaging library',
            'Use AI summarisation to extract objection themes for creative briefs',
            'Phrase match top DM hooks inside ad set keyword targeting to boost relevance scores',
          ],
        },
      ],
    },
    {
      slug: 'multilingual-dm-funnels',
      title: 'Multilingual DM Funnels that Reply in 15 Seconds',
      excerpt:
        'Detect language automatically, localise offers, and maintain consistent analytics as your Instagram brand expands globally.',
      cover: '/blog/GPblog6.jpg',
      coverWidth: 2400,
      coverHeight: 1715,
      category: 'Growth Playbooks',
      readTime: '7 min read',
      publishedAt: '15 Sep 2025',
      author: author('Esra Demir', 'Workflow Lead', '/media/avatars/esra.png'),
      keywords: [
        'multilingual instagram automation',
        'auto language detection',
        'localized dm flows',
      ],
      metaDescription:
        'Explains how to serve multilingual Instagram audiences using LookLab locale detection, localised assets, and cross-market reporting.',
      sections: [
        {
          heading: 'Branch flows with locale detection',
          body: `Use LookLab locale hooks to detect Turkish, English, or Arabic within the first two messages. Display the right pricing tables, testimonials, and FAQs without duplicating entire flows. Maintain a fallback default that invites the user to choose their preferred language in case detection is uncertain.

Keep response templates short, clear, and culturally aware. Provide examples of tone and formality for each locale inside your playbook so team members and AI assistants stay on brand.`,
          highlights: [
            'Add locale metadata to CRM records for downstream segmentation',
            'Route high value languages to specialist closers during business hours',
            'Track satisfaction scores by language to surface training needs early',
          ],
        },
        {
          heading: 'Maintain brand consistency across languages',
          body: `Store approved translations inside knowledge bases, standardise tone, and review transcripts weekly to ensure AI responses remain culturally accurate and conversion-driven. Give translators access to LookLab so they can preview automations in context before publishing.

Document brand voice guardrails and taboo phrases for every market. When copywriters and stylists share a single localisation guide, you avoid awkward phrasing that erodes trust.`,
          highlights: [
            'Create a shared glossary with approved product and service terms',
            'Schedule quarterly tone reviews with regional market leads',
            'Use bilingual loom walkthroughs to onboard new translators quickly',
          ],
        },
        {
          heading: 'Compare performance across markets',
          body: `Segment dashboards by locale to track conversion rates, average order values, and refund rates. Share the insights with regional teams so campaigns feel truly local while the HQ maintains a unified playbook. Incorporate currency conversions and tax considerations so revenue comparisons stay apples to apples.

Spot trends early by running cohort analysis on newsletter signups, consultations booked, and repeat purchases. When gaps appear, launch micro tests in the underperforming market and log the results centrally.`,
          highlights: [
            'Visualise cancellation volume by locale to flag fulfilment issues fast',
            'Export KPI snapshots with commentary for executive reviews',
            'Benchmark each market against a global rolling average to highlight outliers',
          ],
        },
        {
          heading: 'Localise nurture assets without losing velocity',
          body: `Design modular creative blocks that swap language, testimonial, and pricing content without breaking automation timing. Preload seasonal campaigns in each language so you can launch simultaneously across markets.

Sync email, SMS, and paid retargeting calendars with your DM workflow. A cohesive message across channels builds authority and reinforces the keywords you target in organic search, helping each market climb SERPs faster.`,
          highlights: [
            'Build translation-ready templates with placeholders for currency and offers',
            'Automate QA loops that send test flows to bilingual reviewers before launch',
            'Archive retired assets with usage notes to speed future localisation sprints',
          ],
        },
      ],
    },
  ],
};
