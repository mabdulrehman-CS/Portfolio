import { useState, useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import profileImg from './imports/profile.png'
import certDataScraping from './imports/certificate_data_scraping.png'
import certAiAutomation from './imports/certificate_ai_automation.png'
import certHpLife from './imports/certificate_hp_life.png'
import certAcmAppreciation from './imports/certificate_acm_appreciation.png'
import certAcmPromotion from './imports/certificate_acm_promotion.png'
import certStudentWeek from './imports/certificate_student_week.png'
import certVisiospark from './imports/certificate_visiospark.png'
import cvImg from './imports/cv.jpg'
import cvPdf from './imports/Muhammad_Abdul_Rehman_CV.pdf'

// ─── Matrix Rain Canvas ───────────────────────────────────────────────────────
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const chars = '01アイウエオカキクケコABCDEF∑∆Ω∇⊕⊗λπ'
    const fontSize = 13
    let cols: number[] = []
    let animId: number

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      cols = Array(Math.floor(canvas.width / fontSize)).fill(1)
    }

    function draw() {
      if (!canvas || !ctx) return
      const isLight = document.body.classList.contains('light-mode')
      ctx.fillStyle = isLight ? 'rgba(248,250,252,0.08)' : 'rgba(5,5,5,0.055)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`

      for (let i = 0; i < cols.length; i++) {
        const y = cols[i]
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize

        ctx.fillStyle = isLight
          ? (Math.random() > 0.95 ? 'rgba(184,123,0,0.7)' : 'rgba(184,123,0,0.18)')
          : (Math.random() > 0.95 ? 'rgba(232,185,10,1)' : 'rgba(232,185,10,0.35)')
        ctx.fillText(char, x, y * fontSize)

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          cols[i] = 0
        }
        cols[i]++
      }
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.18 }}
    />
  )
}

// ─── Neural Network Canvas ────────────────────────────────────────────────────
function NeuralNet() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    type Node = { x: number; y: number; vx: number; vy: number; r: number; pulse: number }
    let nodes: Node[] = []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const count = Math.floor((canvas.width * canvas.height) / 22000)
      const maxNodes = Math.min(Math.max(count, 12), 28)
      nodes = Array.from({ length: maxNodes }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 1.2,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    function draw() {
      if (!canvas || !ctx) return
      const isLight = document.body.classList.contains('light-mode')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.025
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < 16000) { // 126px threshold
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / 126) * 0.22
            ctx.beginPath()
            ctx.strokeStyle = isLight ? `rgba(184,123,0,${alpha * 0.7})` : `rgba(232,185,10,${alpha})`
            ctx.lineWidth = 0.75
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const glow = (Math.sin(n.pulse) + 1) / 2
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + glow * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = isLight ? `rgba(184,123,0,${0.35 + glow * 0.35})` : `rgba(232,185,10,${0.6 + glow * 0.4})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  )
}



// ─── Gear SVG ────────────────────────────────────────────────────────────────
function GearIcon({ size = 64, className = '', style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" className={className} style={style}>
      <path d="M32 20a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm0 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
      <path d="M54.2 28h-3.4a19.4 19.4 0 0 0-2-4.8l2.4-2.4a2 2 0 0 0 0-2.8l-5.2-5.2a2 2 0 0 0-2.8 0L41 15.2a19.4 19.4 0 0 0-4.8-2V9.8A2 2 0 0 0 34.2 8h-4.4A2 2 0 0 0 28 9.8v3.4a19.4 19.4 0 0 0-4.8 2l-2.4-2.4a2 2 0 0 0-2.8 0l-5.2 5.2a2 2 0 0 0 0 2.8L15.2 23a19.4 19.4 0 0 0-2 4.8H9.8A2 2 0 0 0 8 29.8v4.4A2 2 0 0 0 9.8 36h3.4a19.4 19.4 0 0 0 2 4.8l-2.4 2.4a2 2 0 0 0 0 2.8l5.2 5.2a2 2 0 0 0 2.8 0L23 48.8a19.4 19.4 0 0 0 4.8 2v3.4A2 2 0 0 0 29.8 56h4.4A2 2 0 0 0 36 54.2v-3.4a19.4 19.4 0 0 0 4.8-2l2.4 2.4a2 2 0 0 0 2.8 0l5.2-5.2a2 2 0 0 0 0-2.8L48.8 41a19.4 19.4 0 0 0 2-4.8h3.4A2 2 0 0 0 56 34.2v-4.4A2 2 0 0 0 54.2 28zm-2.2 5H48.6a2 2 0 0 0-1.96 1.6 15.4 15.4 0 0 1-2.8 6.7 2 2 0 0 0 .22 2.6l2.44 2.43-2.37 2.37-2.44-2.44a2 2 0 0 0-2.6-.22 15.4 15.4 0 0 1-6.7 2.8A2 2 0 0 0 31 50.4V54h-3.35v-3.35a2 2 0 0 0-1.6-1.96 15.4 15.4 0 0 1-6.7-2.8 2 2 0 0 0-2.6.22l-2.44 2.44-2.37-2.37 2.44-2.44a2 2 0 0 0 .22-2.6 15.4 15.4 0 0 1-2.8-6.7A2 2 0 0 0 13.6 33H10v-2h3.35a2 2 0 0 0 1.96-1.6 15.4 15.4 0 0 1 2.8-6.7 2 2 0 0 0-.22-2.6l-2.44-2.43 2.37-2.37 2.44 2.44a2 2 0 0 0 2.6.22 15.4 15.4 0 0 1 6.7-2.8A2 2 0 0 0 31 13.6V10h3.35v3.35a2 2 0 0 0 1.6 1.96 15.4 15.4 0 0 1 6.7 2.8 2 2 0 0 0 2.6-.22l2.44-2.44 2.37 2.37-2.44 2.44a2 2 0 0 0-.22 2.6 15.4 15.4 0 0 1 2.8 6.7A2 2 0 0 0 52.05 31H54v2h-2z" />
    </svg>
  )
}

// ─── Circuit SVG decoration ───────────────────────────────────────────────────
function CircuitLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="#E8B90A" />
          <circle cx="110" cy="110" r="2" fill="#E8B90A" />
          <circle cx="60" cy="10" r="1.5" fill="#8B1515" />
          <circle cx="10" cy="60" r="1.5" fill="#8B1515" />
          <line x1="10" y1="10" x2="60" y2="10" stroke="#E8B90A" strokeWidth="0.8" />
          <line x1="60" y1="10" x2="110" y2="60" stroke="#E8B90A" strokeWidth="0.8" />
          <line x1="110" y1="60" x2="110" y2="110" stroke="#E8B90A" strokeWidth="0.8" />
          <line x1="10" y1="10" x2="10" y2="60" stroke="#8B1515" strokeWidth="0.6" />
          <line x1="10" y1="60" x2="40" y2="90" stroke="#8B1515" strokeWidth="0.6" />
          <rect x="55" y="55" width="10" height="10" fill="none" stroke="#E8B90A" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  )
}

// ─── Section reveal hook ──────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className="section-hidden"
      style={{
        ...(visible ? { opacity: 1, transform: 'translateY(0)' } : {}),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
const TYPEWRITER_TITLES = ['AI Engineer', 'Data Scientist', 'ML Developer', 'Full Stack Dev', 'RAG Systems Builder']

function Typewriter({ strings = TYPEWRITER_TITLES }: { strings?: string[] }) {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIdx, setCharIdx] = useState(0)

  const stringsRef = useRef(strings)
  useEffect(() => {
    stringsRef.current = strings
  }, [strings])

  useEffect(() => {
    const list = stringsRef.current
    const current = list[idx] || ''
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      }, 55)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      }, 30)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setIdx(i => (i + 1) % list.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, idx])

  return (
    <span className="inline-flex items-center justify-center min-h-[1.5em] align-middle">
      <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{displayed || '\u00A0'}</span>
      <span
        className="inline-block w-[2px] h-[1.1em] ml-1 animate-blink"
        style={{
          background: 'var(--primary)',
          boxShadow: '0 0 10px var(--primary)',
          verticalAlign: 'middle',
        }}
      />
    </span>
  )
}

// ─── Skill tag ────────────────────────────────────────────────────────────────
function SkillTag({ label }: { label: string }) {
  return (
    <span className="tech-badge">
      {label}
    </span>
  )
}

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({
  title,
  period,
  stack,
  bullets,
  accent = false,
  githubUrl,
  demoUrl,
}: {
  title: string
  period: string
  stack: string[]
  bullets: string[]
  accent?: boolean
  githubUrl?: string
  demoUrl?: string
}) {
  return (
    <div
      className="project-card flex flex-col justify-between h-full p-6 rounded-sm"
      style={{
        background: 'var(--card)',
        border: `1px solid ${accent ? 'rgba(139,21,21,0.4)' : 'var(--border)'}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner decoration */}
      <svg
        className="absolute top-0 right-0 opacity-20"
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <path d="M40 0 L40 40 L0 40" fill="none" stroke="#E8B90A" strokeWidth="1" />
        <circle cx="38" cy="2" r="2" fill="#E8B90A" />
        <circle cx="2" cy="38" r="2" fill="#8B1515" />
      </svg>

      {/* Red top accent line */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '2px',
          background: accent
            ? 'linear-gradient(90deg, var(--accent), transparent)'
            : 'linear-gradient(90deg, var(--primary), transparent)',
        }}
      />

      <div>
        <div className="mb-3">
          <div className="mono text-xs mb-1" style={{ color: 'var(--muted-foreground)' }}>
            {period}
          </div>
          <h3 className="orbitron font-bold text-base leading-tight" style={{ color: 'var(--primary)' }}>
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {stack.map(s => (
            <span key={s} className="tech-badge">
              {s}
            </span>
          ))}
        </div>

        <ul className="space-y-2 mb-4">
          {bullets.map((b, i) => (
            <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--muted-foreground)' }}>
              <span style={{ color: 'var(--primary)', flexShrink: 0 }}>›</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {(githubUrl || demoUrl) && (
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-xs flex items-center gap-2 px-3.5 py-1.5 rounded-sm transition-all duration-200"
              style={{
                background: 'rgba(232,185,10,0.06)',
                border: '1px solid rgba(232,185,10,0.3)',
                color: 'var(--primary)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(232,185,10,0.15)'
                el.style.borderColor = 'var(--primary)'
                el.style.boxShadow = '0 0 12px rgba(232,185,10,0.2)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(232,185,10,0.06)'
                el.style.borderColor = 'rgba(232,185,10,0.3)'
                el.style.boxShadow = 'none'
              }}
            >
              <GithubIcon size={14} />
              <span>GitHub Repo ↗</span>
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all duration-200"
              style={{
                background: 'rgba(139,21,21,0.15)',
                border: '1px solid rgba(139,21,21,0.4)',
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              <span>Live Demo ↗</span>
            </a>
          )}
        </div>
      )}
    </div>
  )
}


// ─── Experience entry ─────────────────────────────────────────────────────────
function ExpEntry({
  role,
  org,
  type,
  period,
  bullets,
  certificateImg,
}: {
  role: string
  org: string
  type: string
  period: string
  bullets: string[]
  certificateImg?: string
}) {
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (!modalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalOpen])

  return (
    <>
      <div
        className="exp-card relative pl-8 py-6 pr-6"
        style={{
          borderLeft: '2px solid rgba(232,185,10,0.3)',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderLeftWidth: '3px',
          borderLeftColor: 'rgba(232,185,10,0.3)',
        }}
      >
        {/* Timeline dot */}
        <div
          className="absolute"
          style={{
            left: '-7px',
            top: '26px',
            width: '12px',
            height: '12px',
            background: '#E8B90A',
            border: '2px solid #050505',
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(232,185,10,0.6)',
          }}
        />

        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="orbitron font-bold text-sm" style={{ color: 'var(--primary)' }}>{role}</h3>
            <div className="mt-0.5">
              <span className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{org}</span>
              <span className="mono text-xs ml-2 px-2 py-0.5 rounded-sm" style={{ color: 'var(--accent)', border: '1px solid rgba(139,21,21,0.4)', background: 'rgba(139,21,21,0.08)' }}>
                {type}
              </span>
            </div>
          </div>
          <div className="mono text-xs" style={{ color: 'var(--muted-foreground)' }}>{period}</div>
        </div>

        <ul className="space-y-2 mb-3">
          {bullets.map((b, i) => (
            <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--muted-foreground)' }}>
              <span style={{ color: 'var(--primary)', flexShrink: 0 }}>▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {certificateImg && (
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(232,185,10,0.2)' }}>
            <div className="mono text-xs mb-2.5 flex items-center justify-between" style={{ color: 'var(--primary)' }}>
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2a7a2a' }} />
                VERIFIED INTERNSHIP CERTIFICATE
              </span>
              <span style={{ color: 'var(--muted-foreground)', fontSize: '11px' }}>Programmers Force Private Limited</span>
            </div>

            {/* Certificate Thumbnail Button */}
            <div
              onClick={() => setModalOpen(true)}
              className="group relative cursor-pointer overflow-hidden rounded-sm border transition-all duration-300 max-w-md"
              style={{
                borderColor: 'rgba(232,185,10,0.35)',
                background: 'rgba(5,5,5,0.9)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={certificateImg}
                alt="Data Scraping Internship Certificate - Programmers Force"
                className="w-full h-44 object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="mono text-xs px-4 py-2 rounded-sm flex items-center gap-2" style={{ background: 'var(--primary)', color: '#050505', fontWeight: 700 }}>
                  <span>🔍</span> Click to View Certificate
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full Screen Lightbox Modal */}
      {modalOpen && certificateImg && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex flex-col justify-center items-center p-4 sm:p-8 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(12px)' }}
          onClick={() => setModalOpen(false)}
        >
          {/* Floating Screen Close Button */}
          <button
            onClick={() => setModalOpen(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100000] mono text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-200 hover:scale-105"
            style={{
              background: '#8B1515',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 4px 20px rgba(139,21,21,0.7), 0 0 12px rgba(0,0,0,0.9)',
              cursor: 'pointer',
            }}
            aria-label="Close Certificate Modal"
          >
            <span className="text-sm leading-none">✕</span> CLOSE
          </button>

          <div
            className="w-full max-w-6xl flex flex-col bg-black p-5 sm:p-6 rounded-sm border border-white/10 my-auto relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="mono text-xs sm:text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                📜 Certificate of Completion — Data Scraping Trainee Program
              </div>
            </div>

            {/* Certificate Full Image */}
            <img
              src={certificateImg}
              alt="Data Scraping Internship Certificate - Programmers Force"
              className="max-h-[72vh] sm:max-h-[78vh] w-full object-contain rounded-sm shadow-2xl mx-auto"
            />

            {/* Modal Footer */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-3 mt-4 border-t border-white/10 mono text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <span>Issued to <strong>Muhammad Abdul Rehman</strong> · Jul 2025 - Feb 2026</span>
              <a
                href={certificateImg}
                download="Muhammad_Abdul_Rehman_Data_Scraping_Certificate.png"
                className="px-4 py-1.5 rounded-sm transition-all duration-200"
                style={{ background: 'var(--primary)', color: '#050505', fontWeight: 700, textDecoration: 'none' }}
              >
                ⬇ Download Certificate Image
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}


// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [cvModalOpen, setCvModalOpen] = useState(false)

  useEffect(() => {
    if (menuOpen || cvModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, cvModalOpen])

  useEffect(() => {
    if (!cvModalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCvModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cvModalOpen])

  const mainNavItems = [
    { num: '01', label: 'Home', href: '#hero' },
    { num: '02', label: 'About', href: '#about' },
    { num: '03', label: 'Skills', href: '#skills' },
    { num: '04', label: 'Experience', href: '#experience' },
    { num: '05', label: 'Projects', href: '#projects' },
    { num: '06', label: 'Education', href: '#education' },
    { num: '07', label: 'Certifications', href: '#certifications' },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--card)' : 'rgba(5, 5, 5, 0.75)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
          <div
            className="flex items-center justify-center w-9 h-9 rounded-sm"
            style={{
              background: 'var(--primary)',
              boxShadow: '0 0 12px rgba(232,185,10,0.4)',
            }}
          >
            <span className="orbitron font-black text-xs" style={{ color: '#050505' }}>MAR</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="orbitron text-xs font-bold header-logo-title" style={{ color: 'var(--foreground)' }}>M. Abdul Rehman</span>
            <span className="mono text-xs header-logo-subtitle" style={{ color: 'var(--muted-foreground)' }}>AI // CS // ML</span>
          </div>
        </a>

        {/* Desktop nav + Theme toggle */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {mainNavItems.map(item => (
              <a
                key={item.num}
                href={item.href}
                className="nav-link flex items-center gap-1.5 transition-colors duration-200"
                style={{ textDecoration: 'none', color: 'var(--muted-foreground)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--foreground)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)' }}
              >
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}

            {/* CV Button right before Contact */}
            <button
              onClick={() => setCvModalOpen(true)}
              className="nav-link flex items-center gap-1.5 transition-colors duration-200"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: 'var(--muted-foreground)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--foreground)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)' }}
            >
              <span className="text-sm font-medium">CV</span>
            </button>

            {/* Contact Link */}
            <a
              href="#contact"
              className="nav-link flex items-center gap-1.5 transition-colors duration-200"
              style={{ textDecoration: 'none', color: 'var(--muted-foreground)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--foreground)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)' }}
            >
              <span className="text-sm font-medium">Contact</span>
            </a>
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="theme-toggle-btn mono text-xs flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all duration-200"
            style={{
              background: 'rgba(232,185,10,0.08)',
              border: '1px solid var(--border)',
              color: 'var(--primary)',
              cursor: 'pointer',
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span>{theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="theme-toggle-btn mono text-xs px-3 py-1.5 rounded-sm"
            style={{
              background: 'rgba(232,185,10,0.1)',
              border: '1px solid var(--border)',
              color: 'var(--primary)',
              cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>

          <button
            className="flex flex-col justify-center items-center gap-1.5 p-2 rounded-sm"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', minWidth: '40px', minHeight: '40px' }}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '20px',
                  height: '2px',
                  background: 'var(--primary)',
                  transition: 'all 0.3s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                      : i === 1 ? 'scale(0)'
                        : 'rotate(-45deg) translate(4px, -4px)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between p-6 transition-all duration-300 animate-fadeInUp"
          style={{
            background: 'var(--background)',
            borderTop: '1px solid var(--border)',
            height: 'calc(100vh - 4rem)',
          }}
        >
          <nav className="flex flex-col gap-2">
            {mainNavItems.map(item => (
              <a
                key={item.num}
                href={item.href}
                className="flex items-center justify-between px-4 py-3.5 rounded-sm transition-all duration-200"
                style={{
                  textDecoration: 'none',
                  color: 'var(--foreground)',
                  border: '1px solid rgba(232,185,10,0.1)',
                  background: 'var(--card)',
                }}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mono text-xs" style={{ color: 'var(--primary)' }}>{item.num}</span>
                <span className="orbitron font-semibold text-base">{item.label}</span>
                <span style={{ color: 'var(--muted-foreground)' }}>→</span>
              </a>
            ))}

            {/* Mobile CV Button */}
            <button
              onClick={() => {
                setMenuOpen(false)
                setCvModalOpen(true)
              }}
              className="flex items-center justify-between px-4 py-3.5 rounded-sm transition-all duration-200"
              style={{
                border: '1px solid var(--primary)',
                background: 'rgba(232, 185, 10, 0.12)',
                color: 'var(--primary)',
                cursor: 'pointer',
              }}
            >
              <span className="mono text-xs font-bold" style={{ color: 'var(--primary)' }}>📄</span>
              <span className="orbitron font-semibold text-base">View CV / Resume</span>
              <span>→</span>
            </button>

            {/* Mobile Contact Button */}
            <a
              href="#contact"
              className="flex items-center justify-between px-4 py-3.5 rounded-sm transition-all duration-200"
              style={{
                textDecoration: 'none',
                color: 'var(--foreground)',
                border: '1px solid rgba(232,185,10,0.1)',
                background: 'var(--card)',
              }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mono text-xs" style={{ color: 'var(--primary)' }}>08</span>
              <span className="orbitron font-semibold text-base">Contact</span>
              <span style={{ color: 'var(--muted-foreground)' }}>→</span>
            </a>
          </nav>

          <div className="pt-4 border-t border-white/10 text-center">
            <span className="mono text-xs" style={{ color: 'var(--muted-foreground)' }}>
              MUHAMMAD ABDUL REHMAN · PORTFOLIO
            </span>
          </div>
        </div>
      )}

      {/* Full Screen CV Modal */}
      {cvModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-md transition-all duration-300 animate-fadeInUp">
          {/* Top Header Bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-3 border-b"
            style={{
              background: '#080808',
              borderColor: 'rgba(232, 185, 10, 0.3)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#2a7a2a' }} />
              <span className="orbitron font-bold text-xs sm:text-sm" style={{ color: '#FFFFFF' }}>
                MUHAMMAD ABDUL REHMAN — CURRICULUM VITAE
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Download CV PDF Button */}
              <a
                href={cvPdf}
                download="Muhammad_Abdul_Rehman_CV.pdf"
                className="cta-primary text-xs flex items-center gap-2 px-3.5 py-2"
                style={{ textDecoration: 'none' }}
              >
                <span>📥 Download PDF</span>
              </a>

              {/* Close Button */}
              <button
                onClick={() => setCvModalOpen(false)}
                className="mono text-xs px-3 py-2 rounded-sm border transition-all duration-200"
                style={{
                  background: 'rgba(139, 21, 21, 0.25)',
                  borderColor: 'rgba(139, 21, 21, 0.6)',
                  color: '#FF7777',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#8B1515'
                  el.style.color = '#FFFFFF'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(139, 21, 21, 0.25)'
                  el.style.color = '#FF7777'
                }}
                title="Close CV Viewer (Esc)"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Full Screen View Body */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-8 flex justify-center items-start">
            <div className="relative max-w-4xl w-full bg-white rounded-sm shadow-2xl overflow-hidden border border-amber-500/30">
              <img
                src={cvImg}
                alt="Muhammad Abdul Rehman CV"
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  )
}


// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!sectionRef.current || !maskRef.current) return
    const r = sectionRef.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const mask = `radial-gradient(circle at ${x}px ${y}px, #000 90px, transparent 140px)`
    maskRef.current.style.maskImage = mask
    maskRef.current.style.webkitMaskImage = mask
    maskRef.current.style.opacity = '1'
  }

  const handlePointerLeave = () => {
    if (maskRef.current) {
      maskRef.current.style.opacity = '0'
    }
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen pt-20 pb-10 overflow-hidden circuit-bg"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ background: 'var(--background)' }}
    >
      {/* Cursor dot bloom */}
      <div
        ref={maskRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(232,185,10,0.18) 1.5px, transparent 2px)',
          backgroundSize: '22px 22px',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Gear decorations */}
      <GearIcon
        size={220}
        className="absolute animate-spin-slow pointer-events-none"
        style={{ top: '-40px', right: '-40px', color: 'rgba(232,185,10,0.06)' } as React.CSSProperties}
      />
      <GearIcon
        size={140}
        className="absolute animate-spin-reverse pointer-events-none"
        style={{ bottom: '60px', left: '-20px', color: 'rgba(139,21,21,0.08)' } as React.CSSProperties}
      />
      <GearIcon
        size={80}
        className="absolute animate-spin-slow pointer-events-none"
        style={{ bottom: '120px', right: '10%', color: 'rgba(232,185,10,0.07)' } as React.CSSProperties}
      />

      {/* Matrix rain */}
      <MatrixRain />

      {/* Circuit lines SVG */}
      <CircuitLines />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Status label */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span
            className="mono text-xs px-3 py-1 rounded-sm"
            style={{ border: '1px solid rgba(232,185,10,0.3)', color: 'var(--primary)', background: 'rgba(232,185,10,0.06)' }}
          >
            ◉ AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>

        {/* Name */}
        <h1
          className="orbitron font-black leading-none mb-2"
          style={{
            fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
            color: 'var(--foreground)',
            letterSpacing: '-0.02em',
          }}
        >
          MUHAMMAD
          <br />
          <span className="animate-data-flow">ABDUL REHMAN</span>
        </h1>

        {/* Typewriter */}
        <div
          className="orbitron font-semibold mb-4"
          style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.25rem)', color: 'var(--muted-foreground)' }}
        >
          <Typewriter />
        </div>

        {/* Summary */}
        <p
          className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-5"
          style={{ color: 'var(--muted-foreground)' }}
        >
          CS graduate specializing in AI-powered applications, RAG systems, local LLMs, Computer Vision, and intelligent automation.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-5">
          <a href="#projects">
            <button className="cta-primary">View Projects</button>
          </a>
          <a href="#contact">
            <button className="cta-secondary">Get In Touch</button>
          </a>
        </div>

        {/* Quick links */}
        <div className="flex items-center justify-center gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/mabdulrehman-CS' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/muhammad-abdul-rehman-cs' },
            { label: 'Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=mabdulrehman.cui@gmail.com' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-xs transition-colors duration-200 px-2 py-1 rounded-sm"
              style={{
                color: 'var(--muted-foreground)',
                background: 'rgba(232,185,10,0.04)',
                border: '1px solid rgba(232,185,10,0.15)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'var(--primary)'
                el.style.borderColor = 'var(--primary)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'var(--muted-foreground)'
                el.style.borderColor = 'rgba(232,185,10,0.15)'
              }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-float"
        style={{ color: 'var(--muted-foreground)' }}
      >
        <span className="mono text-[10px]">SCROLL</span>
        <div
          className="w-px h-6"
          style={{ background: 'linear-gradient(to bottom, var(--primary), transparent)' }}
        />
      </div>

      {/* Bottom amber rule */}
      <div className="absolute bottom-0 left-0 right-0 amber-rule" />
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-10 sm:py-12 px-6 max-w-7xl mx-auto">
      <Reveal>
        <div className="mb-6 flex items-center gap-4">
          <h2 className="orbitron font-bold text-2xl">About</h2>
          <div className="flex-1 amber-rule" />
        </div>
      </Reveal>

      {/* Main About Row: Oval Picture Left, Description Right */}
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Oval Shape Picture */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <Reveal delay={100}>
            <div className="relative flex justify-center items-center py-2">
              {/* Radial glow background */}
              <div
                className="absolute rounded-[50%]"
                style={{
                  width: '290px',
                  height: '370px',
                  background: 'radial-gradient(circle, rgba(232,185,10,0.2) 0%, rgba(139,21,21,0.1) 60%, transparent 80%)',
                  filter: 'blur(24px)',
                }}
              />

              {/* Glowing gradient border frame */}
              <div
                className="relative p-1 rounded-[50%]"
                style={{
                  background: 'linear-gradient(135deg, rgba(232,185,10,0.8), rgba(139,21,21,0.4), rgba(232,185,10,0.3))',
                  boxShadow: '0 0 35px rgba(232,185,10,0.25)',
                }}
              >
                {/* Oval Image Container */}
                <div
                  className="overflow-hidden rounded-[50%] relative"
                  style={{
                    width: '270px',
                    height: '350px',
                    background: '#080808',
                    border: '3px solid #050505',
                  }}
                >
                  <img
                    src={profileImg}
                    alt="Muhammad Abdul Rehman"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Cyber status badge overlay */}
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 mono text-[11px] px-4 py-1.5 rounded-full flex items-center gap-2 whitespace-nowrap"
                  style={{
                    background: '#080808',
                    border: '1px solid rgba(232,185,10,0.5)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.8)',
                    color: 'var(--primary)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2a7a2a' }} />
                  AI & DATA SCIENCE
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Description */}
        <div className="lg:col-span-7">
          <Reveal delay={150}>
            <div className="space-y-6">
              <div>
                <span
                  className="mono text-xs px-3 py-1 rounded-sm inline-block mb-3"
                  style={{
                    border: '1px solid rgba(232,185,10,0.3)',
                    color: 'var(--primary)',
                    background: 'rgba(232,185,10,0.06)',
                  }}
                >
                  BIO & OVERVIEW
                </span>
                <h3 className="orbitron text-xl sm:text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                  AI Engineer & Data Scientist
                </h3>
              </div>

              <p className="text-base leading-loose" style={{ color: 'var(--muted-foreground)' }}>
                I am a Computer Science graduate from{' '}
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>COMSATS University Islamabad</span>{' '}
                specializing in Data Science, with hands-on experience building AI-powered applications using Python, FastAPI, LangChain, TensorFlow, React, and modern LLM frameworks.
              </p>

              <p className="text-base leading-loose" style={{ color: 'var(--muted-foreground)' }}>
                Experienced in production-oriented <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>RAG systems</span>, local LLM deployments, multimodal AI solutions, REST APIs, and intelligent automation platforms. Passionate about AI Engineering, Machine Learning, NLP, Computer Vision, and Generative AI.
              </p>

              {/* Contact Links Row */}
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { icon: '✉', label: 'mabdulrehman.cui@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=mabdulrehman.cui@gmail.com' },
                  { icon: '☎', label: '+92-323-5623669', href: 'tel:+923235623669' },
                ].map(c => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono text-xs flex items-center gap-2.5 px-4 py-2.5 rounded-sm transition-all duration-200"
                    style={{
                      color: 'var(--foreground)',
                      textDecoration: 'none',
                      background: 'var(--card)',
                      border: '1px solid rgba(232,185,10,0.25)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--primary)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(232,185,10,0.15)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,185,10,0.25)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--foreground)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    <span style={{ color: 'var(--primary)' }}>{c.icon}</span>
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Full-Width Stats Banner: Left to Right */}
      <Reveal delay={200}>
        <div
          className="mt-16 p-6 sm:p-8 rounded-sm w-full transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(232,185,10,0.5)] hover:shadow-[0_0_32px_rgba(232,185,10,0.18),0_16px_40px_rgba(0,0,0,0.5)]"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top amber/accent gradient rule */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent), transparent)' }}
          />

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8">
            {/* Stat Counters Grid spanning left side of banner */}
            <div className="grid grid-cols-3 gap-4 flex-1">
              {[
                { num: '12', label: 'PROJECTS' },
                { num: '2', label: 'ROLES' },
                { num: '6', label: 'CERTIFICATIONS' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="group text-center p-4 rounded-sm flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(232,185,10,0.09)] hover:border-[rgba(232,185,10,0.45)] hover:shadow-[0_0_20px_rgba(232,185,10,0.25)]"
                  style={{ background: 'rgba(232,185,10,0.03)', border: '1px solid rgba(232,185,10,0.15)' }}
                >
                  <div
                    className="orbitron text-3xl sm:text-4xl font-bold transition-transform duration-300 group-hover:scale-110"
                    style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 6px rgba(232,185,10,0.3))' }}
                  >
                    {stat.num}
                  </div>
                  <div
                    className="mono text-xs mt-1 font-medium transition-colors duration-300 group-hover:text-[var(--primary)]"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider Line */}
            <div className="hidden lg:block w-px self-stretch" style={{ background: 'var(--border)' }} />

            {/* System details grid spanning right side of banner */}
            <div className="lg:w-96 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {[
                  { k: 'STATUS', v: 'Open to Work' },
                  { k: 'LOCATION', v: 'Pakistan/Remote' },
                  { k: 'GRAD', v: 'Jun 2026 · BS CS' },
                  { k: 'FOCUS', v: 'AI / ML / LLMs' },
                ].map(row => (
                  <div
                    key={row.k}
                    className="group flex justify-between items-center mono text-xs px-2.5 py-1.5 rounded-sm transition-all duration-200 hover:bg-[rgba(232,185,10,0.08)] hover:translate-x-1 hover:border-[rgba(232,185,10,0.3)] cursor-pointer"
                    style={{ borderBottom: '1px solid rgba(232,185,10,0.15)' }}
                  >
                    <span className="transition-colors duration-200 group-hover:text-[var(--primary)]" style={{ color: 'var(--muted-foreground)' }}>
                      {row.k}
                    </span>
                    <span className="transition-colors duration-200 group-hover:text-[var(--primary)]" style={{ color: 'var(--foreground)', fontWeight: 600 }}>
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}


// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const categories = [
    {
      name: 'AI / ML',
      icon: '⬡',
      tags: ['Generative AI', 'RAG', 'LLMs', 'NLP', 'Computer Vision', 'Machine Learning', 'Prompt Engineering', 'LLM Evaluation'],
    },
    {
      name: 'Frameworks',
      icon: '⬢',
      tags: ['LangChain', 'TensorFlow', 'FastAPI', 'Scikit-learn', 'OpenCV', 'LoRA', 'Hugging Face', 'Groq'],
    },
    {
      name: 'Programming & Web',
      icon: '◈',
      tags: ['Python', 'JavaScript', 'TypeScript', 'React', 'Flask', 'REST APIs', 'Streamlit'],
    },
    {
      name: 'Data & Databases',
      icon: '◧',
      tags: ['Pandas', 'NumPy', 'ETL Pipelines', 'PostgreSQL', 'MongoDB', 'Pinecone', 'Firebase', 'Power BI'],
    },
    {
      name: 'Cloud & DevOps',
      icon: '◫',
      tags: ['AWS EC2', 'Azure AI Services', 'Docker', 'GitHub', 'Swagger', 'ReDoc'],
    },
  ]

  return (
    <section id="skills" className="relative py-10 sm:py-12 px-6 overflow-hidden" style={{ background: 'var(--secondary)' }}>
      <NeuralNet />
      <div className="relative z-10 max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <h2 className="orbitron font-bold text-2xl">Technical Skills</h2>
            <div className="flex-1 amber-rule" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 80}>
              <div
                className="skill-card p-6 rounded-sm h-full group"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="flex items-center gap-2.5 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(232,185,10,0.1)' }}>
                  <span className="skill-icon text-xl transition-transform duration-300 inline-block" style={{ color: 'var(--primary)' }}>{cat.icon}</span>
                  <span className="skill-title orbitron font-bold text-sm transition-colors duration-300" style={{ color: 'var(--foreground)' }}>{cat.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map(t => <SkillTag key={t} label={t} />)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="py-10 sm:py-12 px-6 max-w-7xl mx-auto">
      <Reveal>
        <div className="mb-12 flex items-center gap-4">
          <h2 className="orbitron font-bold text-2xl">Experience</h2>
          <div className="flex-1 amber-rule" />
        </div>
      </Reveal>

      <div className="relative pl-4">
        {/* Vertical amber line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, var(--primary), rgba(232,185,10,0.1))' }}
        />

        <div className="space-y-6">
          <Reveal delay={100}>
            <ExpEntry
              role="Full Stack Developer"
              org="Freelance"
              type="Remote"
              period="Oct 2025 – Present"
              bullets={[
                "Built a Chrome Extension (Manifest V3) that auto-fills job application fields using stored JSON/resume data, eliminating repetitive manual entry.",
                "Built a REST API and CLI (Python, FastAPI, SQLAlchemy, SQLite) for event management with full CRUD, concurrency-safe booking logic using WAL mode.",
                "Designed advanced financial and expense tracking sheets for corporate clients utilizing complex Excel formulas, pivot tables, and data validation.",
              ]}
            />
          </Reveal>

          <Reveal delay={200}>
            <ExpEntry
              role="Data Scraping Intern"
              org="Programmers Force"
              type="Remote"
              period="Jul 2025 – Feb 2026"
              certificateImg={certDataScraping}
              bullets={[
                "Scraped and processed data from 2,000+ websites across 30+ countries using a custom Chrome extension, configuring CSS/HTML tag selectors via DevTools.",
                "Built entity-filtering pipelines to retain only records with verified person names, performing QA and data preprocessing with detailed error reports.",
              ]}
            />
          </Reveal>

        </div>
      </div>
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────
type ProjectData = {
  id: string
  title: string
  period: string
  category: 'AI & ML' | 'Systems & Distributed' | 'Java & OOP' | 'Web Development'
  githubUrl?: string
  demoUrl?: string
  accent?: boolean
  stack: string[]
  bullets: string[]
}

const ALL_PROJECTS: ProjectData[] = [
  {
    id: 'fyp',
    title: 'IntraView AI — AI-Based Interview System',
    period: 'Sept 2025 – May 2026 · Final Year Project',
    category: 'AI & ML',
    githubUrl: 'https://github.com/mabdulrehman-CS/fyp_final',
    stack: ['Python', 'React', 'TypeScript', 'FastAPI', 'MongoDB', 'TensorFlow', 'Hugging Face', 'OpenCV', 'Docker'],
    bullets: [
      'Co-developed a dual-role full-stack platform (candidate + admin) with JWT auth, role-based access control, and SMTP-based OTP password reset.',
      'Built a 2.5M-question interview bank with difficulty controls and a real-time Gemini API fallback that generates questions on demand.',
      'Built OpenCV + MediaPipe pipelines for real-time facial expression analysis with a browser-based Docker sandbox for automated test-case grading.',
    ],
  },
  {
    id: 'medical-chatbot',
    title: 'Privacy Medical Chatbot',
    period: 'Feb 2026 – Apr 2026',
    category: 'AI & ML',
    githubUrl: 'https://github.com/mabdulrehman-CS/Medical_Chatbot',
    accent: true,
    stack: ['Python', 'Meta Llama 3.1 8B', 'LangChain', 'Hugging Face', 'Pinecone', 'RAG', 'NLP', 'Flask', 'AWS EC2'],
    bullets: [
      'Deployed Meta Llama 3.1 8B locally via Q4_K_M 4-bit quantization (~4.58 GB), achieving zero third-party API dependency with a 2,048-token context window.',
      'Built RAG pipeline using LangChain, MiniLM-L6-v2 (384-dim), Pinecone serverless with 500-char PDF chunks; top-2 retrieval in under 1 second.',
      'Custom hallucination reduction prompt template strictly grounding LLM responses in retrieved content with source attribution.',
    ],
  },
  {
    id: 'face-stylist',
    title: 'AI Face Shape Detector & Stylist',
    period: 'Sep 2025 – Dec 2025',
    category: 'AI & ML',
    githubUrl: 'https://github.com/mabdulrehman-CS/AI-Face-Shape-Detector-and-Recommend-Styling',
    stack: ['Python', 'TensorFlow', 'EfficientNetV2', 'CNN', 'OpenCV', 'MediaPipe', 'DeepFace', 'FastAPI'],
    bullets: [
      'Trained EfficientNetV2 via 2-stage transfer learning (frozen backbone then fine-tune with early stopping), improving validation accuracy from 60% to 83.4%.',
      'Hybrid classifier combining MediaPipe\'s 478-point landmarks with confidence scores.',
      'Integrated DeepFace for gender detection, serving personalized recommendations (beard/hairstyle/glasses) via FastAPI supporting live webcam and file upload.',
    ],
  },
  {
    id: 'parallel-scanner',
    title: 'Parallel File Scanner & Distributed Malware Detector',
    period: 'Parallel & Distributed Systems',
    category: 'Systems & Distributed',
    githubUrl: 'https://github.com/mabdulrehman-CS/Parallel-File-Scanner',
    accent: true,
    stack: ['Python 3.11', 'Multithreading', 'ThreadPoolExecutor', 'Socket Programming', 'Tkinter GUI', 'pefile', 'Pillow', 'ReportLab'],
    bullets: [
      'Engineered a high-performance multithreaded file scanner achieving 2-4x speedup across CPU cores with real-time threat detection and quarantine management.',
      'Implemented socket-based distributed scanning architecture with master node load balancing and worker result aggregation over network nodes.',
      'Integrated forensic analysis module performing PE file entropy inspection (packed code detection), EXIF metadata extraction, and PDF scan report exports.',
    ],
  },
  {
    id: 'movie-discovery',
    title: 'AI Movie Discovery & Recommendation Platform',
    period: 'Machine Learning & NLP',
    category: 'AI & ML',
    githubUrl: 'https://github.com/mabdulrehman-CS/AI-Movie-Discovery-Platform',
    stack: ['Python', 'TF-IDF', 'Cosine Similarity', 'K-Means Clustering', 'Scikit-learn', 'Pandas', 'Gradio', 'Matplotlib'],
    bullets: [
      'Built a content-based movie recommendation system filtering TMDb 5,000 datasets via TF-IDF text vectorization and cosine similarity.',
      'Implemented K-Means Clustering on high-dimensional text features to group movies into thematic clusters with automated EDA genre and rating distributions.',
      'Designed an interactive Gradio dashboard featuring live similarity score sliders, genre filtering controls, and cluster visualization charts.',
    ],
  },
  {
    id: 'mcq-generator',
    title: 'AI MCQ Generator & Evaluator',
    period: 'Generative AI & LLM Systems',
    category: 'AI & ML',
    githubUrl: 'https://github.com/mabdulrehman-CS/MCQs_Generator',
    accent: true,
    stack: ['Python', 'LangChain', 'Groq AI', 'Llama 3.3 70B', 'Streamlit', 'ReportLab', 'AWS EC2', 'PyPDF2'],
    bullets: [
      'Developed an end-to-end GenAI application generating 5–50 custom MCQs from uploaded PDF/TXT files using LangChain chains and Groq\'s Llama 3.3-70B model.',
      'Implemented dual-stage AI evaluation chains to assess question complexity, accuracy, and option distractor quality, rendering structured pandas tables and review summaries.',
      'Integrated ReportLab for PDF test exports, custom CSS glassmorphism Streamlit UI, and deployed on an AWS EC2 Ubuntu instance.',
    ],
  },
  {
    id: 'event-management',
    title: 'Event & Stall Management System',
    period: 'Object-Oriented Programming (OOP)',
    category: 'Java & OOP',
    githubUrl: 'https://github.com/mabdulrehman-CS/Event-Management-System',
    stack: ['Java', 'OOP Principles', 'Object Serialization', 'File I/O', 'Access Control', 'Data Structures'],
    bullets: [
      'Built a modular Java application using core OOP principles (Inheritance, Encapsulation, Polymorphism, Abstraction) for campus event & stall administration.',
      'Implemented a 3-tier role-based access control architecture (Admin, User, Public) with security key authentication and password attempt limits.',
      'Utilized Java Object Serialization and file-based persistence for seamless request tracking, approval workflows, and data state preservation.',
    ],
  },
  {
    id: 'c-compiler',
    title: 'C Language Compiler & Code Analyzer',
    period: 'Compiler Design & Engineering',
    category: 'Systems & Distributed',
    githubUrl: 'https://github.com/mabdulrehman-CS/C-Language-Compiler',
    accent: true,
    stack: ['Python 3.7+', 'Compiler Construction', 'Lexer / Parser', 'AST Generation', 'TAC IR', 'x86 Assembly', 'Tkinter GUI'],
    bullets: [
      'Engineered an 8-stage C language compiler pipeline (Lexical Analysis, Parser AST, Semantic Check, Symbol Table, TAC IR, Optimization, Code Gen, and Execution).',
      'Implemented AST constant folding & dead-code elimination, generating intermediate representation (TAC), pseudocode, and x86-style assembly without external dependencies.',
      'Built a dark-themed Tkinter GUI supporting real-time syntax highlighting and 8 configurable output modes (Tokens, AST, Symbol Table, IR, Assembly, Run).',
    ],
  },
  {
    id: 'barbershop',
    title: 'Barbershop Business Website',
    period: 'Frontend Web Development',
    category: 'Web Development',
    githubUrl: 'https://github.com/mabdulrehman-CS/Barbershop-Business-Website',
    stack: ['HTML5', 'CSS3', 'JavaScript (Vanilla)', 'Responsive Design', 'Google Fonts', 'Flaticon'],
    bullets: [
      'Developed a modern, fully responsive business website for a professional barbershop with smooth UI animations and mobile-first layouts.',
      'Built interactive service catalog, pricing breakdown, haircut gallery showcase, and an online appointment booking form.',
      'Integrated Flaticon and Ionicons iconography with custom CSS styling and vanilla JavaScript interactivity.',
    ],
  },
  {
    id: 'algoman',
    title: 'AlgoMan — DSA-Driven Pac-Man Game Engine',
    period: 'Data Structures & Algorithms',
    category: 'Systems & Distributed',
    githubUrl: 'https://github.com/mabdulrehman-CS/PacMan-Game-DSA',
    accent: true,
    stack: ['C++17', 'Graph (Adjacency List)', 'BFS', 'Dijkstra Algorithm', 'Stack & Queue', 'Win32 Console API'],
    bullets: [
      'Engineered a high-performance C++ console game where core mechanics are driven by custom data structures (Graph, Stack, Queue, Linked List).',
      'Implemented AI ghost behaviors powered by BFS (Blinky/Inky) and Dijkstra\'s algorithm (Pinky), alongside a custom Stack-based real-time undo engine.',
      'Designed flicker-free Win32 API console rendering with buffer management supporting UTF-8 Unicode graphics and power-up state machines.',
    ],
  },
  {
    id: 'cab-booking',
    title: 'Cab Booking System',
    period: 'Desktop Application & OOP',
    category: 'Java & OOP',
    githubUrl: 'https://github.com/mabdulrehman-CS/Cab-Booking-System',
    stack: ['Java', 'Java Swing', 'OOP Principles', 'File I/O', 'RBAC Architecture'],
    bullets: [
      'Developed a multi-role desktop application with Java Swing GUI and console interfaces for managing cab bookings, vehicle inventories, and driver assignments.',
      'Implemented role-based access modules (Admin, Customer, Driver) with credential verification, vehicle preference filtering (Car/Bike/Rickshaw), and booking ID generation.',
      'Applied core OOP principles (Encapsulation, Interfaces, Polymorphism, Abstraction) with file-based persistence for customer, cab, and driver records.',
    ],
  },
  {
    id: 'multiplayer-quiz',
    title: 'Real-Time Multiplayer Quiz System',
    period: 'Networking & Concurrent Systems',
    category: 'Systems & Distributed',
    githubUrl: 'https://github.com/mabdulrehman-CS/Multiplayer-Quiz-System',
    accent: true,
    stack: ['Python 3', 'Socket Programming', 'Tkinter GUI', 'Multithreading', 'TCP Protocol'],
    bullets: [
      'Engineered a real-time client-server multiplayer quiz game supporting 2+ concurrent players using Python TCP socket programming and multithreading.',
      'Built an interactive Tkinter GUI featuring timed question rounds, randomized question shuffling, live scoreboard synchronization, and in-game chat.',
      'Implemented robust network event handling for graceful client disconnections, automatic score calculation, and winner declarations.',
    ],
  },
]

function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [visibleCount, setVisibleCount] = useState<number>(3)

  const categories = ['All', 'AI & ML', 'Systems & Distributed', 'Java & OOP', 'Web Development']

  const filteredProjects = activeCategory === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.category === activeCategory)

  const displayedProjects = filteredProjects.slice(0, visibleCount)

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setVisibleCount(3)
  }

  const loadMore = () => {
    setVisibleCount(prev => prev + 3)
  }

  const showLess = () => {
    setVisibleCount(3)
  }

  return (
    <section id="projects" className="py-10 sm:py-12 px-6" style={{ background: 'var(--secondary)' }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="orbitron font-bold text-2xl">Projects</h2>
            <div className="flex-1 amber-rule" />
          </div>
        </Reveal>

        {/* Category Filter Tabs */}
        <Reveal delay={40}>
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {categories.map(cat => {
              const isActive = activeCategory === cat
              const count = cat === 'All'
                ? ALL_PROJECTS.length
                : ALL_PROJECTS.filter(p => p.category === cat).length

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`project-filter-btn mono text-xs font-semibold px-4 py-2 rounded-sm flex items-center gap-2 ${
                    isActive ? 'active' : ''
                  }`}
                  style={{
                    background: isActive ? 'var(--primary)' : 'var(--card)',
                    color: isActive ? '#050505' : 'var(--foreground)',
                    border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                  }}
                >
                  <span>{cat}</span>
                  <span
                    className="count-badge px-1.5 py-0.5 rounded-sm text-[10px] transition-colors"
                    style={{
                      background: isActive ? '#050505' : 'rgba(232,185,10,0.12)',
                      color: isActive ? 'var(--primary)' : 'var(--primary)',
                    }}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((p, index) => (
            <Reveal key={p.id} delay={(index % 3) * 80}>
              <ProjectCard
                title={p.title}
                period={p.period}
                githubUrl={p.githubUrl}
                demoUrl={p.demoUrl}
                accent={p.accent}
                stack={p.stack}
                bullets={p.bullets}
              />
            </Reveal>
          ))}
        </div>

        {/* Load More / Show Less Controls */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {visibleCount < filteredProjects.length && (
            <button
              onClick={loadMore}
              className="cta-primary flex items-center gap-2"
            >
              <span>Load More Projects ({filteredProjects.length - visibleCount} Remaining)</span>
              <span>↓</span>
            </button>
          )}

          {visibleCount > 3 && (
            <button
              onClick={showLess}
              className="cta-secondary flex items-center gap-2"
            >
              <span>Show Less</span>
              <span>↑</span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Education timeline entry ─────────────────────────────────────────────────

function EduEntry({
  status,
  institution,
  level,
  location,
  subjects,
  duration,
  note,
  side,
  delay = 0,
}: {
  status: 'Completed' | 'Ongoing'
  institution: string
  level: string
  location: string
  subjects: string[]
  duration: string
  note?: string
  side: 'left' | 'right'
  delay?: number
}) {
  const isLeft = side === 'left'
  return (
    <Reveal delay={delay}>
      <div className={`flex items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'} md:gap-0`}>
        {/* Card */}
        <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
          <div
            className="p-5 rounded-sm project-card"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderTopWidth: '2px',
              borderTopColor: status === 'Ongoing' ? 'rgba(232,185,10,0.6)' : 'rgba(139,21,21,0.5)',
            }}
          >
            {/* Status badge */}
            <div className={`flex mb-3 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
              <span
                className="mono text-xs px-2 py-0.5 rounded-sm flex items-center gap-1.5"
                style={{
                  background: status === 'Ongoing' ? 'rgba(232,185,10,0.1)' : 'rgba(139,21,21,0.1)',
                  border: `1px solid ${status === 'Ongoing' ? 'rgba(232,185,10,0.3)' : 'rgba(139,21,21,0.3)'}`,
                  color: status === 'Ongoing' ? 'var(--primary)' : 'var(--accent)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: status === 'Ongoing' ? 'var(--primary)' : 'var(--accent)' }}
                />
                {status === 'Ongoing' ? 'Currently Studying' : 'Completed'}
              </span>
            </div>

            <h3 className="orbitron font-bold text-sm leading-snug mb-1" style={{ color: 'var(--foreground)' }}>
              {institution}
            </h3>
            <div className="font-semibold text-sm mb-1" style={{ color: status === 'Ongoing' ? 'var(--primary)' : '#cc4444' }}>
              {level}
            </div>
            <div className="mono text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>{location}</div>

            <div className="amber-rule mb-3" />

            <div className="mono text-xs space-y-1.5">
              <div className={`flex gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                <span style={{ color: 'var(--muted-foreground)', flexShrink: 0 }}>SUBJECTS</span>
                <span style={{ color: 'var(--foreground)' }}>{subjects.join(' · ')}</span>
              </div>
              <div className={`flex gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                <span style={{ color: 'var(--muted-foreground)', flexShrink: 0 }}>DURATION</span>
                <span style={{ color: 'var(--foreground)' }}>{duration}</span>
              </div>
              {note && (
                <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--muted-foreground)' }}>{note}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center spine + node (desktop only) */}
        <div className="hidden md:flex w-2/12 flex-col items-center relative">
          <div
            className="w-5 h-5 rounded-full z-10 flex items-center justify-center"
            style={{
              background: status === 'Ongoing' ? 'var(--primary)' : '#8B1515',
              boxShadow: `0 0 12px ${status === 'Ongoing' ? 'rgba(232,185,10,0.6)' : 'rgba(139,21,21,0.6)'}`,
              border: '2px solid #050505',
            }}
          >
            <span style={{ fontSize: '10px' }}>◈</span>
          </div>
        </div>

        {/* Spacer for opposite side */}
        <div className="hidden md:block w-5/12" />
      </div>
    </Reveal>
  )
}

// ─── CertCard component ───────────────────────────────────────────────────────
function CertCard({
  title,
  issuer,
  date,
  code,
  description,
  tags,
  certImg,
  accent = false,
}: {
  title: string
  issuer: string
  date: string
  code?: string
  description?: string
  tags?: string[]
  certImg?: string
  accent?: boolean
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const downloadFileName = `Muhammad_Abdul_Rehman_${title.replace(/[^a-zA-Z0-9]/g, '_')}.png`

  useEffect(() => {
    if (!modalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalOpen])

  return (
    <>
      <div
        className="cert-card p-6 rounded-sm flex flex-col justify-between h-full group"
        style={{
          background: 'var(--card)',
          border: `1px solid ${accent ? 'rgba(232,185,10,0.4)' : 'var(--border)'}`,
          borderTopWidth: '2px',
          borderTopColor: accent ? 'var(--primary)' : 'rgba(139,21,21,0.5)',
        }}
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span
              className="mono text-xs font-semibold px-2 py-0.5 rounded-sm flex items-center gap-1.5"
              style={{
                color: accent ? 'var(--primary)' : 'var(--accent)',
                background: accent ? 'rgba(232,185,10,0.08)' : 'rgba(139,21,21,0.08)',
                border: `1px solid ${accent ? 'rgba(232,185,10,0.25)' : 'rgba(139,21,21,0.3)'}`,
              }}
            >
              ◈ CERTIFICATION
            </span>
            <span className="mono text-xs" style={{ color: 'var(--muted-foreground)' }}>{date}</span>
          </div>

          <h3 className="orbitron font-bold text-base mb-1.5 leading-snug" style={{ color: 'var(--foreground)' }}>
            {title}
          </h3>

          <div className="mono text-xs mb-3 font-medium flex items-center gap-2" style={{ color: 'var(--primary)' }}>
            <span>{issuer}</span>
            {code && <span style={{ color: 'var(--muted-foreground)' }}>· Code: {code}</span>}
          </div>

          {description && (
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
              {description}
            </p>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map(t => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {certImg && (
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(232,185,10,0.2)' }}>
            <div className="mono text-xs mb-2.5 flex items-center justify-between" style={{ color: 'var(--primary)' }}>
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2a7a2a' }} />
                VERIFIED CERTIFICATE
              </span>
            </div>

            <div
              onClick={() => setModalOpen(true)}
              className="relative cursor-pointer overflow-hidden rounded-sm border transition-all duration-300 group/img"
              style={{ borderColor: 'rgba(232,185,10,0.3)', background: '#050505' }}
            >
              <img
                src={certImg}
                alt={title}
                className="cert-img w-full h-44 object-cover object-top transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="mono text-xs px-3.5 py-1.5 rounded-sm flex items-center gap-1.5" style={{ background: 'var(--primary)', color: '#050505', fontWeight: 700 }}>
                  <span>🔍</span> View Certificate
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full Screen Lightbox Modal */}
      {modalOpen && certImg && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex flex-col justify-center items-center p-4 sm:p-8 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(12px)' }}
          onClick={() => setModalOpen(false)}
        >
          {/* Floating Screen Close Button */}
          <button
            onClick={() => setModalOpen(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100000] mono text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-200 hover:scale-105"
            style={{
              background: '#8B1515',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 4px 20px rgba(139,21,21,0.7), 0 0 12px rgba(0,0,0,0.9)',
              cursor: 'pointer',
            }}
            aria-label="Close Certificate Modal"
          >
            <span className="text-sm leading-none">✕</span> CLOSE
          </button>

          <div
            className="w-full max-w-6xl flex flex-col bg-black p-5 sm:p-6 rounded-sm border border-white/10 my-auto relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="mono text-xs sm:text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                📜 {title} — {issuer}
              </div>
            </div>

            {/* Certificate Full Image */}
            <img
              src={certImg}
              alt={title}
              className="max-h-[72vh] sm:max-h-[78vh] w-full object-contain rounded-sm shadow-2xl mx-auto"
            />

            {/* Modal Footer */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-3 mt-4 border-t border-white/10 mono text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <span>Issued to <strong>Muhammad Abdul Rehman</strong> by <strong>{issuer}</strong> · {date}</span>
              <a
                href={certImg}
                download={downloadFileName}
                className="px-4 py-1.5 rounded-sm transition-all duration-200"
                style={{ background: 'var(--primary)', color: '#050505', fontWeight: 700, textDecoration: 'none' }}
              >
                ⬇ Download Certificate Image
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

// ─── Education ────────────────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education" className="py-10 sm:py-12 px-6 max-w-7xl mx-auto">
      <Reveal>
        <div className="mb-4 flex items-center gap-4">
          <h2 className="orbitron font-bold text-2xl">Education</h2>
          <div className="flex-1 amber-rule" />
        </div>
        <p className="text-sm mb-10" style={{ color: 'var(--muted-foreground)' }}>
          Academic journey from foundational sciences through specialized BS Computer Science (Data Science Track).
        </p>
      </Reveal>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical center line (desktop) */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ background: 'linear-gradient(to bottom, var(--primary), rgba(232,185,10,0.15))' }}
        />

        <div className="space-y-8 md:space-y-10">
          <EduEntry
            status="Completed"
            institution="Science Locus School"
            level="Matric (Secondary School)"
            location="Gujranwala, Pakistan"
            subjects={['Biology', 'Physics', 'Math']}
            duration="2017 – 2019"
            side="left"
            delay={80}
          />
          <EduEntry
            status="Completed"
            institution="Punjab College of Science"
            level="Intermediate (FSc)"
            location="Gujranwala, Pakistan"
            subjects={['Math', 'Chemistry', 'Physics']}
            duration="2019 – 2021"
            side="right"
            delay={160}
          />
          <EduEntry
            status="Completed"
            institution="COMSATS University Islamabad"
            level="BS Computer Science"
            location="Pakistan"
            subjects={['Data Science', 'AI/ML', 'Software Engineering']}
            duration="Sep 2022 – Jun 2026"
            note="Specialization: Data Science"
            side="left"
            delay={240}
          />
        </div>
      </div>
    </section>
  )
}

// ─── Certifications & Leadership ──────────────────────────────────────────────
function Certifications() {
  const [visibleCertsCount, setVisibleCertsCount] = useState<number>(3)

  const ALL_CERTS = [
    {
      id: 'cert-1',
      title: "AI for All Backgrounds & AI Automation with No Code",
      issuer: "INNOVISTA LEARN EASY",
      date: "Feb 18, 2026",
      code: "589-13811-41421",
      accent: true,
      description: "Completed a 3-module course covering AI/ML fundamentals, AI model deployment using Microsoft Azure & Azure Foundry, and no-code workflow automation & chatbot creation using Make.com, Zapier, and n8n.",
      tags: ['AI/ML', 'Azure', 'Azure Foundry', 'Make.com', 'Zapier', 'n8n', 'No-Code Chatbots'],
      certImg: certAiAutomation,
    },
    {
      id: 'cert-2',
      title: "Data Science & Analytics",
      issuer: "HP LIFE | HP Foundation",
      date: "Feb 2, 2026",
      code: "5ca664b4-3cf5-4323-a588-62cfa44ffe11",
      accent: false,
      description: "Gained foundational knowledge in leading data science practices, methodologies, and tools. Examined benefits and challenges of a data-driven approach for businesses to leverage data for process optimization.",
      tags: ['Data Science', 'Data Analytics', 'Data-Driven Strategy', 'Process Optimization'],
      certImg: certHpLife,
    },
    {
      id: 'cert-3',
      title: "Certificate of Organizer — 20th Episode of VisioSpark",
      issuer: "COMSATS University Islamabad (CS Department)",
      date: "VisioSpark 2024",
      accent: true,
      description: "Organized the 20th Episode of VisioSpark 2024, a major flagship tech competition sponsored by PSEB, IEEE, ACM, and Tech Destination Pakistan. Managed event logistics, teamwork, and tech community operations.",
      tags: ['Organizer', 'VisioSpark 2024', 'COMSATS CS', 'Tech Event', 'PSEB & IEEE'],
      certImg: certVisiospark,
    },
    {
      id: 'cert-4',
      title: "Certificate of Promotion — Co-Lead of Registration Club",
      issuer: "ACM CUI Wah Chapter (COMSATS University)",
      date: "Leadership Promotion",
      accent: false,
      description: "Promoted to the position of Co-Lead of Registration Club for ACM CUI Wah Chapter. Responsible for leading registration operations, managing event logistics, and guiding student teams for major events.",
      tags: ['Promotion', 'Co-Lead', 'Registration Club', 'ACM COMSATS', 'Leadership'],
      certImg: certAcmPromotion,
    },
    {
      id: 'cert-5',
      title: "Certificate of Appreciation — Registration Co-Lead",
      issuer: "ACM CUI Wah Chapter (COMSATS University)",
      date: "Leadership Honor",
      accent: false,
      description: "Awarded for meaningful involvement, consistent effort, and positive presence as Registration Club Co-Lead for ACM CUI Wah Chapter. Recognized by Faculty Head & Adviser for successful execution of events including VisionSpark Episode 20.",
      tags: ['Appreciation', 'Registration Co-Lead', 'ACM COMSATS', 'Event Management', 'Teamwork'],
      certImg: certAcmAppreciation,
    },
    {
      id: 'cert-6',
      title: "Certificate of Organizer — Student Week",
      issuer: "COMSATS University Islamabad & ACM Student Society",
      date: "Event Management",
      accent: false,
      description: "Certified as Event Organizer for successfully managing Student Week at COMSATS University Islamabad. Collaborated with the ACM Student Society executive committee and Student Affairs to handle event logistics, team coordination, and student engagement.",
      tags: ['Organizer', 'Student Week', 'COMSATS', 'ACM Society', 'Event Logistics'],
      certImg: certStudentWeek,
    },
  ]

  const displayedCerts = ALL_CERTS.slice(0, visibleCertsCount)

  return (
    <section id="certifications" className="py-10 sm:py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-4 flex items-center gap-4">
            <h2 className="orbitron font-bold text-2xl">Certifications & Leadership</h2>
            <div className="flex-1 amber-rule" />
          </div>
          <p className="text-sm mb-10" style={{ color: 'var(--muted-foreground)' }}>
            Verified credentials, AI/ML automations, and leadership achievements.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCerts.map((c, index) => (
            <Reveal key={c.id} delay={(index % 3) * 80}>
              <CertCard
                title={c.title}
                issuer={c.issuer}
                date={c.date}
                code={c.code}
                accent={c.accent}
                description={c.description}
                tags={c.tags}
                certImg={c.certImg}
              />
            </Reveal>
          ))}
        </div>

        {/* Load More / Show Less Controls for Certifications */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {visibleCertsCount < ALL_CERTS.length && (
            <button
              onClick={() => setVisibleCertsCount(prev => prev + 3)}
              className="cta-primary flex items-center gap-2"
            >
              <span>Load More Certificates ({ALL_CERTS.length - visibleCertsCount} Remaining)</span>
              <span>↓</span>
            </button>
          )}

          {visibleCertsCount > 3 && (
            <button
              onClick={() => setVisibleCertsCount(3)}
              className="cta-secondary flex items-center gap-2"
            >
              <span>Show Less</span>
              <span>↑</span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const links = [
    { icon: '✉', label: 'Email', value: 'mabdulrehman.cui@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=mabdulrehman.cui@gmail.com' },
    { icon: '⌂', label: 'GitHub', value: 'github.com/mabdulrehman-CS', href: 'https://github.com/mabdulrehman-CS' },
    { icon: '◈', label: 'LinkedIn', value: 'linkedin.com/in/muhammad-abdul-rehman-cs', href: 'https://linkedin.com/in/muhammad-abdul-rehman-cs' },
    { icon: '☎', label: 'Phone', value: '+92-323-5623669', href: 'tel:+923235623669' },
  ]

  return (
    <section id="contact" className="py-10 sm:py-12 px-6" style={{ background: 'var(--secondary)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <div className="mb-3 flex items-center gap-4 justify-center">
            <h2 className="orbitron font-bold text-2xl">Contact</h2>
          </div>
          <div className="amber-rule mb-6 max-w-xs mx-auto" />
        </Reveal>

        <Reveal delay={100}>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            Ready to build something extraordinary together. Whether it's an AI-powered product,
            a data pipeline, or the next frontier in LLM applications — let's connect.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div
            className="grid sm:grid-cols-2 gap-4 mb-6"
          >
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-sm transition-all duration-200 group"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(232,185,10,0.45)'
                  el.style.boxShadow = '0 0 16px rgba(232,185,10,0.1)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--border)'
                  el.style.boxShadow = 'none'
                }}
              >
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-sm text-base flex-shrink-0"
                  style={{ background: 'rgba(232,185,10,0.08)', color: 'var(--primary)' }}
                >
                  {link.icon}
                </span>
                <div className="text-left min-w-0">
                  <div className="mono text-xs" style={{ color: 'var(--muted-foreground)' }}>{link.label}</div>
                  <div className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>{link.value}</div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="orbitron font-bold text-xl" style={{ color: 'var(--primary)' }}>
            Let's build the future together.
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Social SVG Icons ────────────────────────────────────────────────────────
function GithubIcon({ size = 18, className = '', style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18, className = '', style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
    </svg>
  )
}

function EmailIcon({ size = 18, className = '', style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative overflow-hidden py-10 px-6">
      {/* Circuit background faint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(232,185,10,0.15) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Gear decoration */}
      <GearIcon
        size={120}
        className="absolute animate-spin-slow"
        style={{ right: '-20px', bottom: '-20px', color: 'rgba(232,185,10,0.04)' } as React.CSSProperties}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: socials with real brand logos */}
          <div className="flex items-center gap-3">
            {[
              { icon: <GithubIcon />, label: 'GitHub', href: 'https://github.com/mabdulrehman-CS' },
              { icon: <LinkedinIcon />, label: 'LinkedIn', href: 'https://linkedin.com/in/muhammad-abdul-rehman-cs' },
              { icon: <EmailIcon />, label: 'Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=mabdulrehman.cui@gmail.com' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="footer-social-btn w-9 h-9 rounded-sm flex items-center justify-center"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Center: name + year */}
          <div className="text-center">
            <div className="orbitron font-black text-sm footer-title">
              MUHAMMAD ABDUL REHMAN
            </div>
            <div className="mono text-xs mt-0.5 footer-subtext">
              © 2026 · All rights reserved
            </div>
          </div>

          {/* Right: built with */}
          <div className="mono text-xs footer-subtext">
            Built with{' '}
            <span className="footer-title font-semibold">React</span>
            {' + '}
            <span style={{ color: '#FF4D4D', fontWeight: 600 }}>Vite</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio_theme')
    return (saved as 'dark' | 'light') || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('portfolio_theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    if (theme === 'light') {
      document.body.classList.add('light-mode')
    } else {
      document.body.classList.remove('light-mode')
    }
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <>
      {/* Scan-line overlay */}
      <div className="scanline-overlay" />

      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

