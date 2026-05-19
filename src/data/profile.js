const EMAIL = 'jraf2003@gmail.com'
const MAIL_SUBJECT = 'Inquiry from your portfolio'
const MAIL_BODY = 'Hi Jhon,\n\n'

export const profile = {
  name: 'Jhon Rowel Abines',
  shortName: 'Jhon Rowel',
  role: 'AI Automation Specialist & Web Developer',
  tagline: 'building production n8n workflows and full-stack web apps',
  location: 'Moalboal, Cebu',
  email: EMAIL,
  mailtoHref: `mailto:${EMAIL}?subject=${encodeURIComponent(
    MAIL_SUBJECT
  )}&body=${encodeURIComponent(MAIL_BODY)}`,
  phone: '+63 905 682 0085',
  resumeUrl: '/JhonRowel_Resume.pdf',
  social: {
    github: 'https://github.com/JRAF2-0?tab=repositories',
    linkedin: 'https://www.linkedin.com/in/jhonrowel20/',
    facebook: 'https://www.facebook.com/jhonrowel.abines.90',
    instagram: 'https://www.instagram.com/jrrrr_af/',
  },
  about: [
    "I just wrapped a four-month internship at Luna AI Systems as their AI Automation Intern, where I built production n8n workflows that publish across five social platforms, summarize 10 AI news sources every Saturday, and run payroll on Lovable + Supabase. Now I'm a fresh Computer Technology graduate from Cebu Technological University looking for a full-time role where I can keep building things that take repetitive work off people's plates.",
    "I work across the stack — React + Supabase for web, n8n + OpenAI / Claude for automation, C# / .NET for desktop, and even C++ / Arduino when the project calls for it (I led my capstone team of six on a fingerprint + voice authentication system for motorcycles). If it can be automated, I'd rather automate it.",
  ],
  stats: [
    { value: '12+', label: 'Projects built' },
    { value: '6+', label: 'Automation workflows' },
    { value: '2026', label: 'BIT graduate' },
  ],
}
