/**
 * Timeline entries — rendered top-to-bottom in `Experience.jsx`.
 * `kind` affects the accent color: 'now' | 'education' | 'internship' | 'capstone'
 */
export const experience = [
  {
    kind: 'now',
    period: 'Now',
    title: 'Building AI workflows & modern web apps',
    org: 'Self-directed learning',
    location: 'Moalboal, Cebu',
    highlights: [
      'Designing n8n workflows that pair OpenAI / Claude with Slack, Telegram, Airtable, and Gmail',
      'Sharpening React, Tailwind, and GSAP through this portfolio and side projects',
    ],
  },
  {
    kind: 'capstone',
    period: '2025 – 2026',
    title: 'Capstone Team Leader — Motorcycle Auth System',
    org: 'Cebu Technological University · Moalboal',
    location: 'Team of 6',
    highlights: [
      'Led a 6-person team building a fingerprint + voice authentication security system for motorcycles',
      'Designed and shipped a companion app in MIT App Inventor for remote ignition and start control',
      'Integrated fingerprint sensor + voice recognition module with the bike via Arduino Uno',
      'Programmed hardware logic in C++ (PlatformIO / Arduino IDE) with secure app-to-device comms',
      'Presented a working prototype and full documentation to the panel',
    ],
  },
  {
    kind: 'internship',
    period: 'Feb 2026 — May 2026',
    title: 'AI Automation Intern',
    org: 'Luna AI Systems',
    location: 'Remote',
    highlights: [
      'Built a multi-platform social media posting scheduler in n8n — Airtable / Sheets queue feeding Telegram, Slack, Facebook, Instagram, and TikTok',
      'Built the AI Trends Weekly Digest — 10-source RSS aggregation with AI summarization and a dedicated error-handler branch for failed runs',
      'Built a Payroll Application in Lovable backed by Supabase — salary computation, deductions, and payslip generation',
      'Designed status tracking and error-handling patterns so failed runs trigger Slack / Gmail alerts instead of going silent',
    ],
  },
  {
    kind: 'internship',
    period: '2024',
    title: 'QA Tester Intern',
    org: 'Complete Development (CoDev)',
    location: 'Web applications',
    highlights: [
      'Ran manual testing of web apps — identified, documented, and reproduced bugs',
      'Wrote detailed bug reports and worked directly with developers to drive fixes',
      'Performed regression testing to keep the system stable after each release',
      'Designed and executed test cases from scratch',
    ],
  },
  {
    kind: 'education',
    period: '2022 – 2026',
    title: 'BS Industrial Technology · Major in Computer Technology',
    org: 'Cebu Technological University · Moalboal Campus',
    location: 'Undergraduate',
    highlights: [
      'Focus on embedded systems',
      'Capstone Team Leader (see above)',
      'Hands-on coursework in C#, .NET, MySQL, and full-stack web',
    ],
  },
  {
    kind: 'education',
    period: '2016 – 2022',
    title: 'San Juan High School',
    org: 'Moalboal, Cebu',
    location: 'Junior & Senior High',
    highlights: [
      'Where the love for tinkering with computers first kicked in',
    ],
  },
]
