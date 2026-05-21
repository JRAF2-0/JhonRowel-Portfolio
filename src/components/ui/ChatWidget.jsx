import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { profile } from '../../data/profile'

const WEBHOOK_URL = import.meta.env.VITE_CHAT_WEBHOOK_URL

const QUICK_PROMPTS = [
  "What's your availability?",
  'Tell me about your Luna AI Systems work',
  'What tech stack do you use?',
]

const WELCOME = `Hi! I'm Jhon's portfolio assistant. Ask me anything about his experience, projects, or availability — I'm trained on his resume.`

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: WELCOME },
  ])

  const scrollRef = useRef(null)

  // Scroll to bottom on every new message
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, open])

  async function send(textOverride) {
    const text = (textOverride ?? input).trim()
    if (!text || sending) return

    const userMsg = { role: 'user', text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setSending(true)

    try {
      if (!WEBHOOK_URL) {
        // Graceful fallback when webhook isn't configured yet
        await new Promise((r) => setTimeout(r, 600))
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            text: `I'm not connected to my brain yet — Jhon is still wiring up the n8n workflow. In the meantime, reach him at ${profile.email}.`,
          },
        ])
        return
      }

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newMessages.map(({ role, text }) => ({ role, content: text })),
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      const reply =
        data.response ?? data.message ?? data.text ?? data.output ?? ''

      setMessages((m) => [
        ...m,
        { role: 'assistant', text: reply || "Hmm, I didn't quite catch that." },
      ])
    } catch (err) {
      console.error('Chat error:', err)
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          text: `Sorry, I'm having trouble responding right now. You can reach Jhon directly at ${profile.email}.`,
        },
      ])
    } finally {
      setSending(false)
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    send()
  }

  return (
    <>
      {/* Floating action button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-white shadow-glow transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
      >
        <span className="absolute -top-1 -right-1 inline-flex h-3 w-3">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-accent ring-2 ring-bg" />
        </span>
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Panel */}
      {open && (
        <div className="chat-panel fixed inset-x-4 bottom-24 z-[60] flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-border bg-bg-soft shadow-card backdrop-blur md:inset-x-auto md:right-6 md:w-[380px]">
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-white">
              <Sparkles size={16} />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold">
                Ask Jhon's AI
              </p>
              <p className="text-[11px] text-text-faint">
                Trained on his resume & projects
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online
            </span>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} text={m.text} />
            ))}

            {sending && <TypingIndicator />}

            {/* Quick prompts (only show before user has sent anything) */}
            {messages.length === 1 && !sending && (
              <div className="space-y-2 pt-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-faint">
                  Try asking
                </p>
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => send(p)}
                    className="block w-full rounded-lg border border-border bg-card px-3 py-2 text-left text-xs text-text-muted transition-colors hover:border-accent hover:text-text"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about availability, projects..."
              disabled={sending}
              className="flex-1 bg-transparent px-2 py-1.5 text-sm text-text placeholder:text-text-faint focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="grid h-8 w-8 place-items-center rounded-md bg-gradient-brand text-white transition-opacity disabled:opacity-40"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

function Bubble({ role, text }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-brand text-white'
            : 'border border-border bg-card text-text'
        }`}
      >
        {text}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-card px-3 py-2.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-faint [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-faint [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-faint" />
      </div>
    </div>
  )
}
