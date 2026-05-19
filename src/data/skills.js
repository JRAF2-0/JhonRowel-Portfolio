import { FaReact, FaNodeJs } from 'react-icons/fa'
import {
  SiVite,
  SiSupabase,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiPhp,
  SiPython,
  SiCplusplus,
  SiArduino,
  SiN8N,
  SiMysql,
  SiGit,
  SiGithub,
  SiOpenai,
  SiSlack,
  SiTelegram,
  SiAirtable,
  SiDotnet,
  SiSharp,
  SiClaude,
  SiXampp,
  SiTailwindcss,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

export const skillGroups = [
  {
    title: 'Web',
    skills: [
      { name: 'React', Icon: FaReact },
      { name: 'Vite', Icon: SiVite },
      { name: 'Tailwind', Icon: SiTailwindcss },
      { name: 'HTML', Icon: SiHtml5 },
      { name: 'CSS', Icon: SiCss },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'PHP', Icon: SiPhp },
      { name: 'Node.js', Icon: FaNodeJs },
      { name: 'MySQL', Icon: SiMysql },
      { name: 'Supabase', Icon: SiSupabase },
    ],
  },
  {
    title: 'Desktop',
    skills: [
      { name: 'C#', Icon: SiSharp },
      { name: '.NET', Icon: SiDotnet },
    ],
  },
  {
    title: 'Embedded',
    skills: [
      { name: 'C++', Icon: SiCplusplus },
      { name: 'Arduino', Icon: SiArduino },
    ],
  },
  {
    title: 'Automation & AI',
    skills: [
      { name: 'n8n', Icon: SiN8N },
      { name: 'OpenAI', Icon: SiOpenai },
      { name: 'Claude', Icon: SiClaude },
      { name: 'Telegram', Icon: SiTelegram },
      { name: 'Slack', Icon: SiSlack },
      { name: 'Airtable', Icon: SiAirtable },
    ],
  },
  {
    title: 'Tooling',
    skills: [
      { name: 'Visual Studio', Icon: VscVscode },
      { name: 'XAMPP', Icon: SiXampp },
      { name: 'Git', Icon: SiGit },
      { name: 'GitHub', Icon: SiGithub },
    ],
  },
  {
    title: 'Languages I also know',
    skills: [
      { name: 'Python', Icon: SiPython },
    ],
  },
]

export const skillsFlat = skillGroups.flatMap((g) => g.skills)
