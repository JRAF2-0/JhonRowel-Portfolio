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
    period: 'Feb 2026 — June 2026',
    title: 'AI Automation Intern',
    org: 'Luna AI Systems',
    location: 'Remote',
    highlights: [
      'Developed 5+ automation workflows using n8n, OpenAI, Claude, and third-party APIs, reducing repetitive manual processes for internal operations',
      'Developed a multi-platform social media scheduling system supporting automated content posting across messaging and social platforms',
      'Built a full-stack payroll management application with automated salary computation, leveraging Supabase for backend services, authentication, and database management',
      'Designed status tracking and error-handling patterns so failed runs trigger Slack / Gmail alerts instead of going silent',
    ],
  },
  {
    kind: 'internship',
    period: 'Aug 2025 — Dec 2025',
    title: 'QA Tester Intern',
    org: 'Complete Development (CoDev)',
    location: 'Web applications',
    highlights: [
      'Performed manual testing on web apps — identified, documented, and tracked software defects',
      'Designed and executed test cases for regression and functional testing',
      'Collaborated with developers to validate fixes and improve software stability before release',
    ],
  },
  {
    kind: 'education',
    period: '2025 – 2026',
    title: 'Bachelor of Industrial Technology · Major in Computer Technology',
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
