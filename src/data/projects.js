// ── Project cover images ──────────────────────────────────────────────
// Drop screenshots into src/assets/images/projects/ and import here.
import capstoneCover from '../assets/images/projects/capstone-cover.jpg'
import karaokeCover from '../assets/images/projects/karaoke-cover.webp'
import karaokeAdmin from '../assets/images/projects/karaoke-shot-1-admin.webp'
import karaokeBooking from '../assets/images/projects/karaoke-shot-2-booking.webp'
import karaokeHistory from '../assets/images/projects/karaoke-shot-3-history.webp'
import helpdeskCover from '../assets/images/projects/helpdesk-cover.webp'
import feedbackCover from '../assets/images/projects/feedback-cover.webp'
import aiTrendsCover from '../assets/images/projects/ai-trends-cover.webp'
import aiTrendsErrorHandler from '../assets/images/projects/ai-trends-shot-1-error-handler.webp'
import bugReportCover from '../assets/images/projects/bug-report-cover.webp'
import schedulerCover from '../assets/images/projects/scheduler-cover.webp'

// Shared GitHub repo that hosts all n8n workflow JSONs
const N8N_REPO = 'https://github.com/jraf-tech/n8n-workflows'

export const tagLabels = {
  capstone: 'capstone',
  web: 'web dev',
  automation: 'automation',
  freelance: 'freelance',
  internship: 'internship',
}

/**
 * Project shape
 *   title, description, tag, client, features[], tech[]
 *   image?     — imported screenshot/GIF (top-of-card thumbnail)
 *   liveUrl?   — "Live Demo" link
 *   repoUrl?   — "View Code" link
 *   caseStudy? — extended content for the modal overlay
 *                { period, problem, approach, outcome, gallery[], detailedFeatures[] }
 *
 * Drop screenshots into src/assets/images/projects/ and import them at the
 * top of this file, e.g. `import helpdeskCover from '../assets/images/projects/helpdesk-cover.png'`
 */

export const featuredProjects = [
  // ── FLAGSHIP: CAPSTONE ─────────────────────────────────────────────────
  {
    title: 'Motorcycle Fingerprint + Voice Auth (Capstone)',
    description:
      'Capstone project — led a 6-person team building a security system that uses fingerprint + voice authentication to start a motorcycle, controlled via a companion mobile app.',
    tag: 'capstone',
    client: 'CTU Capstone · Team Lead',
    features: [
      'Fingerprint + voice multi-factor auth',
      'Companion app for remote ignition (MIT App Inventor)',
      'Arduino Uno hardware integration',
    ],
    tech: ['C++', 'Arduino', 'MIT App Inventor', 'PlatformIO'],
    image: capstoneCover,
    // liveUrl and repoUrl intentionally omitted — hardware project, repo lost
    caseStudy: {
      period: '2025 – 2026',
      problem:
        "Motorcycle theft is a real problem in our area, and traditional ignition keys can be copied or hot-wired. The brief was to build a security layer that's harder to spoof than a key and gives the owner remote control.",
      approach:
        "We designed a two-factor auth flow: enroll a fingerprint and a voice phrase, then require BOTH to ignite. A companion app (built in MIT App Inventor) gives the owner an extra remote ignition channel — useful if the sensors fail or the bike is loaned out.",
      outcome:
        "Working prototype demoed to the panel — full ignition control through the app and dual-biometric flow. As team lead I coordinated 6 people across hardware, mobile, and integration. Biggest lesson: scoping aggressively beats trying to ship everything.",
      // gallery: [capstoneShot1, capstoneShot2],
      detailedFeatures: [
        {
          title: 'Dual-factor biometric ignition',
          description:
            'Both fingerprint and voice must match an enrolled user before the ignition relay closes. Either alone is not enough.',
        },
        {
          title: 'Companion app',
          description:
            'MIT App Inventor app over Bluetooth gives the owner remote ignition, start, and lock controls.',
        },
        {
          title: 'Hardware logic in C++',
          description:
            'Authentication state machine and secure app-to-device messaging programmed on Arduino Uno via PlatformIO.',
        },
      ],
    },
  },

  // ── FLAGSHIP: HELPDESK AI ──────────────────────────────────────────────
  {
    title: 'Helpdesk AI Assistant',
    description:
      'Telegram bot that uses AI to classify messages and route them — users can file issues, update status, assign, and list tickets via natural language.',
    tag: 'automation',
    client: 'Personal project',
    features: [
      'AI message classification (OpenAI)',
      'Full CRUD via Telegram commands',
      'Duplicate detection & Sheets sync',
    ],
    tech: ['n8n', 'Telegram', 'OpenAI', 'Google Sheets'],
    image: helpdeskCover,
    repoUrl: 'https://github.com/jraf-tech/n8n-workflows/blob/main/Helpdesk%20AI%20Assistant.json',
    caseStudy: {
      period: '2025',
      problem:
        "Small teams don't have time to learn a ticketing tool. Most issues get reported in chat and then forgotten. I wanted a helpdesk that lives inside the chat people already use.",
      approach:
        "Built an n8n workflow that listens to a Telegram bot, runs incoming messages through OpenAI to classify them (new issue / status update / assignment / list query), then either creates, updates, or queries a Google Sheets ticket log. Added duplicate detection so two people reporting the same issue don't spam the queue.",
      outcome:
        "Anyone on the team can file or update a ticket in plain language — 'pwede ka mag-assign sa akin nung database bug?' just works. Took the friction of opening a separate tool out of the loop.",
      // gallery: [helpdeskShot1, helpdeskShot2],
      detailedFeatures: [
        {
          title: 'Natural-language ticket CRUD',
          description:
            'File, assign, update, or list tickets without learning commands — the AI parses intent and extracts fields.',
        },
        {
          title: 'Duplicate detection',
          description:
            'Before creating a new ticket, the workflow checks Sheets for similar open issues and links the report to the existing ticket.',
        },
        {
          title: 'Google Sheets as the database',
          description:
            'No backend to host — Sheets is the single source of truth, and anyone with access can audit the ticket log.',
        },
      ],
    },
  },

  // ── FLAGSHIP: KARAOKE MANAGEMENT ───────────────────────────────────────
  {
    title: 'Karaoke Management System',
    description:
      'Landing page and management dashboard for a karaoke business — handles room booking, song queue management, and billing in one system.',
    tag: 'web',
    client: 'Personal project',
    features: [
      'Room booking system',
      'Song queue management',
      'Billing & dashboard',
    ],
    tech: ['React', 'Vite', 'Supabase'],
    image: karaokeCover,
    liveUrl: 'https://jraf2-0.github.io/Karaoke-Room-Management-App/',
    repoUrl: 'https://github.com/JRAF2-0/Karaoke-Room-Management-App',
    caseStudy: {
      period: '2024',
      problem:
        "Karaoke venues in the area still run on pen and paper — staff juggle a booking notebook, a song list printout, and a calculator for the bill. Mistakes cost money and slow service.",
      approach:
        "Designed a single web app that handles three jobs: customer-facing room booking landing page, staff dashboard for queue and session management, and an automatic billing flow. React + Vite on the front, Supabase on the back for data and auth. Layout designed to work on a touchscreen so staff can use a tablet.",
      outcome:
        "One system replaces three separate processes. Staff onboarding dropped from hours to minutes — anyone who can use Facebook can run a session.",
      gallery: [karaokeAdmin, karaokeBooking, karaokeHistory],
      detailedFeatures: [
        {
          title: 'Customer booking landing',
          description:
            'Public-facing page where customers see available rooms, pick a slot, and confirm — no phone call needed.',
        },
        {
          title: 'Song queue dashboard',
          description:
            'Staff add, reorder, or skip songs in real time. Designed for one-handed touchscreen use.',
        },
        {
          title: 'Auto-billed sessions',
          description:
            'Session timer + add-ons (drinks, snacks) feed into a single bill — no manual computation.',
        },
      ],
    },
  },

  // ── AUTOMATION ─────────────────────────────────────────────────────────
  {
    title: 'AI Customer Feedback Classifier',
    description:
      "An n8n workflow built for a donut business called SweetCircle Donuts. It receives customer feedback via webhook, then uses Ollama and OpenAI to classify each message into Positive Feedback, Negative Feedback, Recommendation, or Unrelated Feedback. Based on the category, the system auto-generates a warm, on-brand response. A custom JavaScript step cleans and formats the AI's JSON output, then stores everything in Google Sheets — with separate tabs per category for easy tracking. Finally, the workflow sends a personalized thank-you email via Gmail, closing the loop into a fully automated AI-driven customer support and feedback management solution.",
    tag: 'automation',
    client: 'Personal project',
    features: [
      'Multi-model AI classification (Ollama + OpenAI)',
      'Category-aware Sheets routing (4 tabs)',
      'JS step for JSON cleanup',
      'Auto thank-you email via Gmail',
    ],
    tech: ['n8n', 'Ollama', 'OpenAI', 'Gmail', 'Google Sheets'],
    image: feedbackCover,
    repoUrl: N8N_REPO,
    caseStudy: {
      period: '2025',
      problem:
        "SweetCircle Donuts wanted to actually use customer feedback — but reading every form, sorting it into the right bucket, and writing a warm-toned reply is hours of manual work per week. Worse, replies done in a hurry start to sound robotic, which is the opposite of the brand they wanted to project.",
      approach:
        "Built an n8n workflow that listens for a feedback webhook, then sends each message through Ollama and OpenAI to classify it into one of four buckets: Positive, Negative, Recommendation, or Unrelated. Based on the bucket, the workflow asks the model to generate a personalized response that matches the SweetCircle brand voice. A custom JavaScript node cleans the AI's JSON output before it's written to Google Sheets — and instead of one flat list, each category gets routed to its own tab so complaints, ideas, and praise are visible at a glance. A thank-you email goes out automatically via Gmail to close the loop.",
      outcome:
        "End-to-end automation: feedback in → AI categorizes → reply goes out → message lands in the right Sheets tab. The team gets clean, categorized data they can actually act on, customers get a fast on-brand reply, and no human has to triage the inbox.",
      detailedFeatures: [
        {
          title: 'Two-model AI classification',
          description:
            'Ollama handles local fast classification while OpenAI generates the customer-facing response — two models picked for what each does best instead of forcing one to do both.',
        },
        {
          title: 'Category-aware Sheets routing',
          description:
            'Each of the four classifications (Positive, Negative, Recommendation, Unrelated) gets written to its own Google Sheets tab. The business sees complaints, ideas, and praise as separate streams.',
        },
        {
          title: 'JavaScript JSON cleanup',
          description:
            'LLM JSON output is famously messy — extra prose, code fences, malformed quotes. A small custom JS node sanitizes and parses the response before anything downstream touches it.',
        },
        {
          title: 'Brand-voice replies',
          description:
            "The response prompt is tuned to match SweetCircle Donuts' warm, friendly tone — so the auto-reply feels human, not like a templated bot message.",
        },
      ],
    },
  },
  {
    title: 'AI Trends Intelligence Bot',
    description:
      'Weekly intelligence bot that pulls from 10 AI-focused news sources, deduplicates, tags every story by AI relevance and category, rewrites summaries with GPT-4.1, and delivers the digest to Slack every Saturday — with a dedicated error-handler branch that catches failures and reports them.',
    tag: 'internship',
    client: 'Luna AI Systems · Internship',
    features: [
      '10-source AI-news RSS aggregation & dedup',
      'AI summary rewrite (GPT-4.1)',
      'Smart AI-relevance tagging system',
      'Error-handler branch for failed runs',
    ],
    tech: ['n8n', 'OpenAI', 'RSS', 'Slack'],
    image: aiTrendsCover,
    repoUrl: 'https://github.com/jraf-tech/n8n-workflows/blob/main/AI%20Trends%20Intelligence%20Bot.json',
    caseStudy: {
      period: 'Feb 2026 — May 2026',
      problem:
        "Keeping up with AI news is a full-time job by itself. The team needed a single Saturday digest that filtered out non-AI noise, ranked what actually mattered, and landed in a place we already check — Slack.",
      approach:
        "Built an n8n workflow that pulls from 10 AI-focused RSS sources every Saturday, deduplicates articles, runs each through OpenAI to summarize and tag by AI category, then formats and posts the digest into Slack. Added a dedicated error-handler branch so a single bad feed doesn't kill the whole run — failures get logged and reported instead of silently dropping articles.",
      outcome:
        "Saturday digest delivers consistently. The error-handler branch caught two source-format changes in the first month — exactly the kind of silent failure that ruins a 'set it and forget it' automation. Built during my internship at Luna AI Systems.",
      gallery: [aiTrendsErrorHandler],
      detailedFeatures: [
        {
          title: 'Error-handler branch',
          description:
            'A dedicated subflow catches errors anywhere in the pipeline, logs the failure, and continues processing the remaining sources instead of crashing the whole run.',
        },
        {
          title: '10-source dedup',
          description:
            'Multiple sources often cover the same story. The workflow hashes article URLs and titles to avoid duplicate entries in the digest.',
        },
        {
          title: 'AI summary + tagging',
          description:
            'GPT-4.1 rewrites each item into a tight one-paragraph summary and assigns a relevance category so the digest is scannable.',
        },
      ],
    },
  },
  {
    title: 'Social Media Posting Scheduler',
    description:
      'Automated social media scheduler that reads approved posts from Google Sheets, checks if the scheduled posting time has arrived, then automatically publishes content to Telegram, Slack, Facebook, Instagram, or TikTok. After posting, it updates the sheet status (Posted / Failed), saves post links or IDs, and sends confirmation notifications via Gmail or Slack.',
    tag: 'internship',
    client: 'Luna AI Systems · Internship',
    features: [
      'Reads scheduled content automatically',
      'Checks date / time before publishing',
      'Posts to multiple social platforms',
      'Updates status and logs results',
      'Handles errors and confirmations automatically',
    ],
    tech: ['n8n', 'Google Sheets', 'Facebook', 'Instagram', 'TikTok'],
    image: schedulerCover,
    repoUrl: 'https://github.com/jraf-tech/n8n-workflows/blob/main/Social%20Media%20Automation%20v1.json',
    caseStudy: {
      period: '2026',
      problem:
        "Social media managers waste hours every week manually posting the same content across five-plus platforms. Each one has its own UI, scheduling quirks, and timing rules. The team needed one queue that fed all of them automatically — with a safety net for failed posts.",
      approach:
        "Built an n8n workflow that polls Google Sheets for posts marked 'approved', checks each one against the current time, then routes the content through platform-specific publishers — Telegram, Slack, Facebook, Instagram, TikTok. Each platform's response is parsed for the post ID or URL and written back to the sheet. If a publish fails, the workflow flips the status to 'Failed' and sends a Slack / Gmail alert instead of silently dropping the post.",
      outcome:
        "One queue replaces five separate posting workflows. Status (Posted / Failed) is visible at a glance in the sheet, and failures get caught instead of going unnoticed. Built end-to-end during my internship at Luna AI Systems.",
      detailedFeatures: [
        {
          title: 'Time-gated publishing',
          description:
            'Every record is checked against the current time before publishing — late posts trigger a warning, future posts wait in the queue.',
        },
        {
          title: 'Multi-platform routing',
          description:
            'A single workflow targets Telegram, Slack, Facebook, Instagram, and TikTok. Each platform branch handles its own auth, payload shape, and rate limits.',
        },
        {
          title: 'Status tracking',
          description:
            'After each publish attempt the row is updated with Posted / Failed plus the resulting post URL or ID — Google Sheets becomes the source of truth for what shipped.',
        },
        {
          title: 'Error handling with notifications',
          description:
            'A platform failure does not kill the queue. The failure is logged, the record marked, and a Slack / Gmail alert fires so someone knows to retry.',
        },
      ],
    },
  },
]

export const allProjects = [
  ...featuredProjects,
  {
    title: 'Slack Bug Report Processor',
    description:
      'Listens to a Slack bug-reports channel, validates fields, uses AI to rewrite the report in third-person, then auto-creates a structured Google Doc.',
    tag: 'automation',
    client: 'Personal project',
    features: [
      'Slack trigger with field validation',
      'AI rewrite via Gemini / OpenAI',
      'Auto-creates Google Docs reports',
    ],
    tech: ['n8n', 'Slack', 'Gemini', 'Google Docs'],
    image: bugReportCover,
    repoUrl: 'https://github.com/jraf-tech/n8n-workflows/blob/main/Automated%20Slack%20Bug%20Report%20Processing%20and%20Documentation%20Workflow.json',
  },
  {
    title: 'Inventory Management System',
    description:
      'A desktop system for managing inventory records with search, filter, and report generation capabilities.',
    tag: 'freelance',
    client: 'Freelance',
    features: [
      'CRUD for records, sections & contacts',
      'Search and filter functions',
      'Printable reports',
    ],
    tech: ['C#', 'Windows Forms', 'MySQL', 'XAMPP'],
  },
  {
    title: 'Student Information System',
    description:
      'A Windows desktop application for managing student records with a clean, user-friendly interface built in Visual Studio.',
    tag: 'freelance',
    client: 'Freelance',
    features: [
      'CRUD operations for student records',
      'Drag-and-drop UI controls',
      'Local database storage',
    ],
    tech: ['C#', 'Windows Forms', 'MySQL', 'XAMPP'],
  },
  {
    title: 'Fast Food POS System',
    description:
      'A point of sale system for a fast food business handling the full order flow from product selection to receipt printing.',
    tag: 'freelance',
    client: 'Freelance',
    features: [
      'Product selection & cart summary',
      'Receipt generation',
      'Local MySQL database',
    ],
    tech: ['C#', '.NET Framework', 'MySQL', 'XAMPP'],
  },
  {
    title: 'Product Advertising Management System',
    description:
      'A desktop app for managing product advertisements with full CRUD functionality and printable ad summary.',
    tag: 'freelance',
    client: 'Freelance',
    features: [
      'CRUD for product listings & ads',
      'Printable listings & ad summaries',
      'MySQL database integration',
    ],
    tech: ['C#', '.NET Framework', 'MySQL', 'XAMPP'],
  },
  {
    title: 'Payroll Application',
    description:
      'A payroll management system for computing employee salaries, deductions, and generating payslips — built during internship using Lovable with Supabase as the backend.',
    tag: 'internship',
    client: 'Luna AI Systems · Internship',
    features: [
      'Salary computation & deductions',
      'Employee records management',
      'Payslip generation',
    ],
    tech: ['Lovable', 'Supabase'],
  },
]
