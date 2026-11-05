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
const TYPEWRITER_TITLES = ['AI Engineer', 'Data Scientist', 'Full Stack Developer', 'Machine Learning']

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
      <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{displayed || '\u00A0'}</span>
      <span
        className="inline-block w-[2px] h-[1.1em] ml-1 animate-blink"
        style={{
          background: 'var(--accent)',
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
      className="project-card flex flex-col justify-between h-full p-5 sm:p-6 rounded-[12px]"
      style={{
        background: 'var(--card)',
        border: `1px solid ${accent ? 'color-mix(in srgb, var(--accent) 35%, var(--border))' : 'var(--border)'}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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
          <div className="text-xs mb-1.5 font-medium" style={{ color: 'var(--muted-foreground)' }}>
            {period}
          </div>
          <h3 className="display font-semibold text-[1.02rem] leading-snug" style={{ color: 'var(--foreground)' }}>
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
              className="mono text-xs flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all duration-200"
              style={{
                background: 'var(--surface-soft)',
                border: '1px solid color-mix(in srgb, var(--primary) 35%, transparent)',
                color: 'var(--primary)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'color-mix(in srgb, var(--primary) 18%, transparent)'
                el.style.borderColor = 'var(--primary)'
                el.style.boxShadow = 'var(--shadow-sm)'
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--surface-soft)'
                el.style.borderColor = 'color-mix(in srgb, var(--primary) 35%, transparent)'
                el.style.boxShadow = 'none'
                el.style.transform = 'none'
              }}
            >
              <GithubIcon size={14} />
              <span>View on GitHub</span>
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200"
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
  location,
  bullets,
  certificateImg,
  liveUrl,
  liveLabel,
  tech,
}: {
  role: string
  org: string
  type: string
  period: string
  location?: string
  bullets: string[]
  certificateImg?: string
  liveUrl?: string
  liveLabel?: string
  tech?: string[]
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
      <article
        className="exp-card relative ml-3 sm:ml-4 pl-6 sm:pl-8 py-6 sm:py-7 pr-5 sm:pr-7 rounded-2xl"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderLeftWidth: '3px',
          borderLeftColor: 'var(--primary)',
        }}
      >
        <div
          className="absolute"
          style={{
            left: '-8px',
            top: '30px',
            width: '13px',
            height: '13px',
            background: 'var(--primary)',
            border: '3px solid var(--background)',
            borderRadius: '50%',
            boxShadow: '0 0 0 3px color-mix(in srgb, var(--primary) 25%, transparent)',
          }}
        />

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4">
          <div className="min-w-0">
            <h3 className="display font-semibold text-lg sm:text-xl leading-snug" style={{ color: 'var(--foreground)' }}>
              {role}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-sm sm:text-[0.95rem]" style={{ color: 'var(--primary)' }}>{org}</span>
              <span
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={{
                  color: 'var(--muted-foreground)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface-soft)',
                }}
              >
                {type}
              </span>
              {location && (
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{location}</span>
              )}
            </div>
          </div>
          <div
            className="text-xs sm:text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-full self-start"
            style={{
              color: 'var(--foreground)',
              background: 'var(--secondary)',
              border: '1px solid var(--border)',
            }}
          >
            {period}
          </div>
        </div>

        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tech.map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        )}

        <ul className="space-y-2.5 mb-1">
          {bullets.map((b, i) => (
            <li key={i} className="text-sm sm:text-[0.95rem] leading-relaxed flex gap-2.5" style={{ color: 'var(--muted-foreground)' }}>
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--primary)' }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {liveUrl && (
          <div className="mt-5 pt-4 flex flex-wrap items-center gap-3" style={{ borderTop: '1px solid var(--border)' }}>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-live-link inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full"
            >
              <span>{liveLabel || 'View live product'}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}

        {certificateImg && (
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="cert-view-btn max-w-xs"
            >
              View internship certificate
            </button>
          </div>
        )}
      </article>

      {modalOpen && certificateImg && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex flex-col justify-center items-center p-4 sm:p-8 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(12px)' }}
          onClick={() => setModalOpen(false)}
        >
          <button
            onClick={() => setModalOpen(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100000] text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-200 hover:scale-105"
            style={{
              background: '#8B1515',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.4)',
              cursor: 'pointer',
            }}
            aria-label="Close certificate"
          >
            Close
          </button>

          <div
            className="w-full max-w-6xl flex flex-col p-5 sm:p-6 rounded-2xl border border-white/10 my-auto relative"
            style={{ background: '#0B1220' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                Certificate of Completion, Data Scraping Trainee Program
              </div>
            </div>

            <img
              src={certificateImg}
              alt="Data Scraping internship certificate from Programmers Force"
              className="max-h-[72vh] sm:max-h-[78vh] w-full object-contain rounded-xl shadow-2xl mx-auto"
            />

            <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-3 mt-4 border-t border-white/10 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <span>Issued to <strong>Muhammad Abdul Rehman</strong> · Jul 2025 to Feb 2026 · Programmers Force</span>
              <a
                href={certificateImg}
                download="Muhammad_Abdul_Rehman_Data_Scraping_Certificate.png"
                className="px-4 py-1.5 rounded-full transition-all duration-200"
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontWeight: 700, textDecoration: 'none' }}
              >
                Download image
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
        background: scrolled ? 'color-mix(in srgb, var(--card) 92%, transparent)' : 'color-mix(in srgb, var(--background) 78%, transparent)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{
              background: 'var(--primary)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span className="display font-bold text-xs" style={{ color: 'var(--primary-foreground)' }}>MAR</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="display text-sm font-semibold header-logo-title" style={{ color: 'var(--foreground)' }}>M. Abdul Rehman</span>
            <span className="text-[11px] header-logo-subtitle" style={{ color: 'var(--muted-foreground)' }}>AI · ML · CS</span>
          </div>
        </a>

        {/* Desktop nav + Theme toggle */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
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
            className="theme-toggle-btn text-xs font-semibold flex items-center gap-2 px-3.5 py-2 rounded-full transition-all duration-200"
            style={{
              background: 'var(--surface-soft)',
              border: '1px solid var(--border)',
              color: 'var(--primary)',
              cursor: 'pointer',
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="theme-toggle-btn text-xs font-semibold px-3 py-2 rounded-full"
            style={{
              background: 'var(--surface-soft)',
              border: '1px solid var(--border)',
              color: 'var(--primary)',
              cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>

          <button
            className="flex flex-col justify-center items-center gap-1.5 p-2 rounded-xl"
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
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between p-6 transition-all duration-300 animate-fadeInUp"
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
                className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200"
                style={{
                  textDecoration: 'none',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                  background: 'var(--card)',
                }}
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>{item.num}</span>
                <span className="display font-semibold text-base">{item.label}</span>
                <span style={{ color: 'var(--muted-foreground)' }}>→</span>
              </a>
            ))}

            {/* Mobile CV Button */}
            <button
              onClick={() => {
                setMenuOpen(false)
                setCvModalOpen(true)
              }}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200"
              style={{
                border: '1px solid var(--primary)',
                background: 'var(--surface-soft)',
                color: 'var(--primary)',
                cursor: 'pointer',
              }}
            >
              <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>CV</span>
              <span className="display font-semibold text-base">View CV</span>
              <span>→</span>
            </button>

            {/* Mobile Contact Button */}
            <a
              href="#contact"
              className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200"
              style={{
                textDecoration: 'none',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
                background: 'var(--card)',
              }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>08</span>
              <span className="display font-semibold text-base">Contact</span>
              <span style={{ color: 'var(--muted-foreground)' }}>→</span>
            </a>
          </nav>

          <div className="pt-4 border-t border-white/10 text-center">
            <span className="mono text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Muhammad Abdul Rehman
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
              <span className="display font-bold text-xs sm:text-sm" style={{ color: '#FFFFFF' }}>
                Curriculum Vitae
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
                <span>Download PDF</span>
              </a>

              {/* Close Button */}
              <button
                onClick={() => setCvModalOpen(false)}
                className="mono text-xs px-3 py-2 rounded-xl border transition-all duration-200"
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
                Close
              </button>
            </div>
          </div>

          {/* Full Screen View Body */}
          <div className="flex-1 overflow-hidden p-2 sm:p-6 flex justify-center items-center">
            <div className="relative max-w-5xl w-full h-[85vh] bg-neutral-900 rounded-xl shadow-2xl overflow-hidden border" style={{ borderColor: 'rgba(232, 185, 10, 0.4)' }}>
              <object
                data={cvPdf}
                type="application/pdf"
                className="w-full h-full block"
              >
                <iframe
                  src={cvPdf}
                  title="Muhammad Abdul Rehman CV"
                  className="w-full h-full border-0 block"
                >
                  <img
                    src={cvImg}
                    alt="Muhammad Abdul Rehman CV"
                    className="w-full h-auto object-contain block"
                  />
                </iframe>
              </object>
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
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-[100svh]"
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '3.5rem',
      }}
    >
      <div className="relative z-10 section-shell text-center" style={{ maxWidth: '46rem' }}>
        <p
          className="text-sm font-medium mb-4"
          style={{ color: 'var(--primary)' }}
        >
          Open to full-time and internship roles
        </p>

        <h1
          className="display font-semibold leading-[1.12] mb-3"
          style={{
            fontSize: 'clamp(2.1rem, 6vw, 3.85rem)',
            color: 'var(--foreground)',
          }}
        >
          Muhammad Abdul Rehman
        </h1>

        <div
          className="mb-4"
          style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', color: 'var(--muted-foreground)' }}
        >
          <Typewriter />
        </div>

        <p
          className="mx-auto leading-relaxed mb-7"
          style={{
            maxWidth: '36rem',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
            color: 'var(--muted-foreground)',
          }}
        >
          Computer Science graduate specializing in Data Science. I build RAG systems, local LLM deployments, computer vision apps, REST APIs, and automation with Python, FastAPI, LangChain, TensorFlow, and React.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-6">
          <a href="#projects" className="inline-flex">
            <button type="button" className="cta-primary w-full sm:w-auto">See my work</button>
          </a>
          <a href="#contact" className="inline-flex">
            <button type="button" className="cta-secondary w-full sm:w-auto">Get in touch</button>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8">
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
              className="quiet-link"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          className="flex flex-col items-center gap-1.5 animate-float"
          style={{ color: 'var(--muted-foreground)' }}
          aria-hidden="true"
        >
          <span className="text-[11px] font-medium tracking-wide">Scroll</span>
          <div
            className="w-px h-6"
            style={{ background: 'linear-gradient(to bottom, var(--primary), transparent)' }}
          />
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="section-pad section-block">
      <div className="section-shell">
        <Reveal>
          <div className="section-head">
            <h2 className="display font-semibold text-2xl sm:text-3xl">About</h2>
            <div className="amber-rule" />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <Reveal delay={80}>
              <div className="relative flex justify-center items-center py-1">
                <div
                  className="absolute rounded-[50%]"
                  style={{
                    width: '270px',
                    height: '340px',
                    background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 18%, transparent) 0%, transparent 70%)',
                    filter: 'blur(16px)',
                  }}
                />
                <div
                  className="relative p-[3px] rounded-[50%]"
                  style={{
                    background: 'linear-gradient(145deg, color-mix(in srgb, var(--primary) 70%, transparent), color-mix(in srgb, var(--accent) 30%, transparent))',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <div
                    className="overflow-hidden rounded-[50%]"
                    style={{
                      width: '250px',
                      height: '320px',
                      background: 'var(--card)',
                      border: '3px solid var(--background)',
                    }}
                  >
                    <img
                      src={profileImg}
                      alt="Muhammad Abdul Rehman"
                      width={250}
                      height={320}
                      decoding="async"
                      fetchPriority="high"
                      className="profile-oval-img"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={120}>
              <div className="space-y-4">
                <h3 className="display text-xl sm:text-2xl font-semibold" style={{ color: 'var(--accent)' }}>
                  AI Engineer and Data Scientist
                </h3>

                <p className="text-[0.98rem] sm:text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  Computer Science graduate from{' '}
                  <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>COMSATS University Islamabad</span>{' '}
                  specializing in Data Science, with hands-on experience building AI-powered applications using Python, FastAPI, LangChain, TensorFlow, React, and modern LLM frameworks.
                </p>

                <p className="text-[0.98rem] sm:text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  Experienced in developing production-oriented RAG systems, local LLM deployments, multimodal AI solutions, REST APIs, and intelligent automation platforms. Focused on AI Engineering, Machine Learning, NLP, Computer Vision, Generative AI, and Software Development.
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=mabdulrehman.cui@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quiet-link"
                  >
                    mabdulrehman.cui@gmail.com
                  </a>
                  <a href="tel:+923235623669" className="quiet-link">
                    +92 323 5623669
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={160}>
          <div className="meta-strip mt-8">
            {[
              { k: 'Status', v: 'Open to work' },
              { k: 'Location', v: 'Pakistan / Remote' },
              { k: 'Graduation', v: 'Jun 2026 · BS CS' },
              { k: 'Focus', v: 'AI / ML / LLMs' },
            ].map(row => (
              <div key={row.k} className="meta-strip-item">
                <span className="meta-strip-label">{row.k}</span>
                <span className="meta-strip-value">{row.v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}


// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const categories = [
    {
      name: 'AI and ML',
      tags: ['Generative AI', 'RAG', 'LLMs', 'NLP', 'Computer Vision', 'Machine Learning', 'Prompt Engineering', 'LLM Evaluation'],
    },
    {
      name: 'Frameworks',
      tags: ['LangChain', 'TensorFlow', 'FastAPI', 'Scikit-learn', 'OpenCV', 'LoRA', 'Hugging Face', 'Groq'],
    },
    {
      name: 'Programming and Web',
      tags: ['Python', 'JavaScript', 'TypeScript', 'React', 'Flask', 'REST APIs', 'Streamlit'],
    },
    {
      name: 'Data and Databases',
      tags: ['Pandas', 'NumPy', 'ETL Pipelines', 'PostgreSQL', 'MongoDB', 'Pinecone', 'Firebase', 'Power BI'],
    },
    {
      name: 'Cloud and DevOps',
      tags: ['AWS EC2', 'Azure AI Services', 'Docker', 'GitHub', 'Swagger', 'ReDoc'],
    },
  ]

  return (
    <section id="skills" className="section-pad section-block" style={{ background: 'var(--secondary)' }}>
      <div className="section-shell">
        <Reveal>
          <div className="section-head">
            <h2 className="display font-semibold text-2xl sm:text-3xl">Skills</h2>
            <div className="amber-rule" />
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 60}>
              <div
                className="skill-card p-5 sm:p-6 rounded-[12px] h-full"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                <h3 className="skill-title display font-semibold text-[0.95rem] mb-3.5" style={{ color: 'var(--foreground)' }}>
                  {cat.name}
                </h3>
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
    <section id="experience" className="section-pad section-block">
      <div className="section-shell">
      <Reveal>
        <div className="section-head">
          <h2 className="display font-semibold text-2xl sm:text-3xl">Experience</h2>
          <div className="amber-rule" />
        </div>
      </Reveal>

      <div className="relative pl-3 sm:pl-4">
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, var(--primary), transparent)' }}
        />

        <div className="space-y-6">
          <Reveal delay={60}>
            <ExpEntry
              role="AI/ML Intern"
              org="Appcrates"
              type="On-site"
              location="Gujranwala"
              period="Oct 2026 to Present"
              liveUrl="https://system.digitalkarobar.shop/"
              liveLabel="Open live product"
              tech={['Python', 'Flask', 'MySQL', 'Groq API', 'Web Scraping', 'Gunicorn', 'Nginx', 'Linux', 'edge-tts', 'Multi-Tenant']}
              bullets={[
                'Built a Flask LinkedIn job scraper with live filtering by tech stack, country, location, and experience. Searches auto-split to get past the 1,000 result cap, with stop/resume and Excel export.',
                'Added fake job detection and automated CEO, CTO, and HR contact lookup for every scraped listing.',
                'Built an ATS-friendly CV generator that rewrites each CV to match the job description and experience level.',
                'Shipped an interview prep module on the Groq API with three modes: question banks, Q&A, and AI graded practice across MCQs, technical prompts, and coding challenges.',
                'Built outreach for email, WhatsApp, and voice notes with edge-tts, including sent history and resend tracking.',
                'Designed a multi-tenant platform with admin, company, and individual roles, a shared package catalogue with per-feature quotas, and strict data isolation.',
                'Deployed on Linux with Gunicorn, Nginx, and systemd plus Git webhook auto-deploy, CSRF protection, rate limiting, encrypted email credentials, and a pytest suite.',
              ]}
            />
          </Reveal>

          <Reveal delay={120}>
            <ExpEntry
              role="Visa Consultant"
              org="Nujoom Al Falak Travel & Tourism"
              type="On-site"
              location="Gujranwala"
              period="Sep 2026 to Oct 2026"
              bullets={[
                'Processed visa applications for GCC, Pakistani, and Indian clients and resolved day to day visa questions.',
                'Shared clear travel guidance so clients could move through visa and trip planning with confidence.',
              ]}
            />
          </Reveal>

          <Reveal delay={180}>
            <ExpEntry
              role="Full Stack Developer"
              org="Freelance"
              type="Remote"
              period="Oct 2025 to Present"
              tech={['Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Chrome Extension', 'Excel']}
              bullets={[
                'Built a Manifest V3 Chrome extension that fills job application fields, dropdowns, and file uploads from saved or JSON imported candidate data.',
                'Developed a REST API and CLI with Python, FastAPI, SQLAlchemy, and SQLite for event bookings, with concurrency safe logic so slots never overbook.',
                'Designed Excel budget and expense sheets for corporate clients using formulas, lookups, pivot tables, and validation to cut manual work.',
              ]}
            />
          </Reveal>

          <Reveal delay={240}>
            <ExpEntry
              role="Data Scraping Trainee"
              org="Programmers Force"
              type="Remote"
              period="Jul 2025 to Feb 2026"
              certificateImg={certDataScraping}
              tech={['Web Scraping', 'Chrome Extension', 'Data QA']}
              bullets={[
                'Scraped and cleaned data from 2,000+ websites across 30+ countries using a custom Chrome extension and CSS/HTML selectors.',
                'Built entity filtering pipelines that keep only verified person records, with QA, preprocessing, and clear error reports when scrapes failed.',
              ]}
            />
          </Reveal>
        </div>
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
    title: 'IntraView AI: AI-Based Interview System',
    period: 'Sep 2025 to May 2026 · Final Year Project',
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
    period: 'Feb 2026 to Apr 2026',
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
    period: 'Sep 2025 to Dec 2025',
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
      'Developed an end-to-end GenAI application generating 5 to 50 custom MCQs from uploaded PDF/TXT files using LangChain chains and Groq\'s Llama 3.3-70B model.',
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
    title: 'AlgoMan: DSA-Driven Pac-Man Game Engine',
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
    <section id="projects" className="section-pad section-block" style={{ background: 'var(--secondary)' }}>
      <div className="section-shell">
        <Reveal>
          <div className="section-head">
            <h2 className="display font-semibold text-2xl sm:text-3xl">Projects</h2>
            <div className="amber-rule" />
          </div>
        </Reveal>

        {/* Category Filter Tabs */}
        <Reveal delay={40}>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {categories.map(cat => {
              const isActive = activeCategory === cat
              const count = cat === 'All'
                ? ALL_PROJECTS.length
                : ALL_PROJECTS.filter(p => p.category === cat).length

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`project-filter-btn mono text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2 ${
                    isActive ? 'active' : ''
                  }`}
                  style={{
                    background: isActive ? 'var(--primary)' : 'var(--card)',
                    color: isActive ? 'var(--primary-foreground)' : 'var(--foreground)',
                    border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                  }}
                >
                  <span>{cat}</span>
                  <span
                    className="count-badge px-1.5 py-0.5 rounded-xl text-[10px] transition-colors"
                    style={{
                      background: isActive ? 'rgba(0,0,0,0.25)' : 'var(--surface-soft)',
                      color: isActive ? '#fff' : 'var(--primary)',
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

        {/* Load More / Show less Controls */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {visibleCount < filteredProjects.length && (
            <button
              onClick={loadMore}
              className="cta-primary flex items-center gap-2"
            >
              <span>Show more ({filteredProjects.length - visibleCount} left)</span>
            </button>
          )}

          {visibleCount > 3 && (
            <button
              onClick={showLess}
              className="cta-secondary flex items-center gap-2"
            >
              <span>Show less</span>
            </button>
          )}
        </div>
      </div>
    </section>
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
        className="cert-card p-6 rounded-xl flex flex-col justify-between h-full group"
        style={{
          background: 'var(--card)',
          border: `1px solid ${accent ? 'color-mix(in srgb, var(--primary) 40%, transparent)' : 'var(--border)'}`,
          borderTopWidth: '2px',
          borderTopColor: accent ? 'var(--primary)' : 'var(--accent)',
        }}
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1.5"
              style={{
                color: accent ? 'var(--primary)' : 'var(--accent)',
                background: accent ? 'var(--surface-soft)' : 'var(--surface-accent)',
                border: `1px solid ${accent ? 'color-mix(in srgb, var(--primary) 30%, transparent)' : 'color-mix(in srgb, var(--accent) 30%, transparent)'}`,
              }}
            >
              Certification
            </span>
            <span className="mono text-xs" style={{ color: 'var(--muted-foreground)' }}>{date}</span>
          </div>

          <h3 className="display font-bold text-base mb-1.5 leading-snug" style={{ color: 'var(--foreground)' }}>
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
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="cert-view-btn"
            >
              View certificate
            </button>
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
            Close
          </button>

          <div
            className="w-full max-w-6xl flex flex-col bg-black p-5 sm:p-6 rounded-xl border border-white/10 my-auto relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="mono text-xs sm:text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                {title} · {issuer}
              </div>
            </div>

            {/* Certificate Full Image */}
            <img
              src={certImg}
              alt={title}
              className="max-h-[72vh] sm:max-h-[78vh] w-full object-contain rounded-xl shadow-2xl mx-auto"
            />

            {/* Modal Footer */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-3 mt-4 border-t border-white/10 mono text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <span>Issued to <strong>Muhammad Abdul Rehman</strong> by <strong>{issuer}</strong> · {date}</span>
              <a
                href={certImg}
                download={downloadFileName}
                className="px-4 py-1.5 rounded-xl transition-all duration-200"
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontWeight: 700, textDecoration: 'none' }}
              >
                Download image
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
  const entries = [
    {
      institution: 'COMSATS University Islamabad',
      level: 'BS Computer Science · Data Science',
      location: 'Pakistan',
      duration: 'Sep 2022 to Jun 2026',
      subjects: ['Data Science', 'AI/ML', 'Software Engineering'],
    },
    {
      institution: 'Punjab College of Science',
      level: 'Intermediate (FSc)',
      location: 'Gujranwala, Pakistan',
      duration: '2019 to 2021',
      subjects: ['Math', 'Chemistry', 'Physics'],
    },
    {
      institution: 'Science Locus School',
      level: 'Matric (Secondary School)',
      location: 'Gujranwala, Pakistan',
      duration: '2017 to 2019',
      subjects: ['Biology', 'Physics', 'Math'],
    },
  ]

  return (
    <section id="education" className="section-pad section-block">
      <div className="section-shell">
        <Reveal>
          <div className="section-head">
            <h2 className="display font-semibold text-2xl sm:text-3xl">Education</h2>
            <div className="amber-rule" />
          </div>
        </Reveal>

        <div className="edu-timeline">
          {entries.map((entry, i) => (
            <Reveal key={entry.institution} delay={i * 70}>
              <article className="edu-card">
                <div className="edu-year" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="edu-body">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                    <div>
                      <h3 className="display font-semibold text-base sm:text-lg" style={{ color: 'var(--foreground)' }}>
                        {entry.institution}
                      </h3>
                      <p className="edu-level text-sm font-semibold mt-1" style={{ color: 'var(--primary)' }}>
                        {entry.level}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        {entry.location}
                      </p>
                    </div>
                    <span className="edu-duration self-start">{entry.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {entry.subjects.map(subject => (
                      <span key={subject} className="tech-badge">{subject}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
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
      title: "Certificate of Organizer: 20th Episode of VisioSpark",
      issuer: "COMSATS University Islamabad (CS Department)",
      date: "VisioSpark 2024",
      accent: true,
      description: "Organized the 20th Episode of VisioSpark 2024, a major flagship tech competition sponsored by PSEB, IEEE, ACM, and Tech Destination Pakistan. Managed event logistics, teamwork, and tech community operations.",
      tags: ['Organizer', 'VisioSpark 2024', 'COMSATS CS', 'Tech Event', 'PSEB & IEEE'],
      certImg: certVisiospark,
    },
    {
      id: 'cert-4',
      title: "Certificate of Promotion: Co-Lead of Registration Club",
      issuer: "ACM CUI Wah Chapter (COMSATS University)",
      date: "Leadership Promotion",
      accent: false,
      description: "Promoted to the position of Co-Lead of Registration Club for ACM CUI Wah Chapter. Responsible for leading registration operations, managing event logistics, and guiding student teams for major events.",
      tags: ['Promotion', 'Co-Lead', 'Registration Club', 'ACM COMSATS', 'Leadership'],
      certImg: certAcmPromotion,
    },
    {
      id: 'cert-5',
      title: "Certificate of Appreciation: Registration Co-Lead",
      issuer: "ACM CUI Wah Chapter (COMSATS University)",
      date: "Leadership Honor",
      accent: false,
      description: "Awarded for meaningful involvement, consistent effort, and positive presence as Registration Club Co-Lead for ACM CUI Wah Chapter. Recognized by Faculty Head & Adviser for successful execution of events including VisionSpark Episode 20.",
      tags: ['Appreciation', 'Registration Co-Lead', 'ACM COMSATS', 'Event Management', 'Teamwork'],
      certImg: certAcmAppreciation,
    },
    {
      id: 'cert-6',
      title: "Certificate of Organizer: Student Week",
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
    <section id="certifications" className="section-pad section-block">
      <div className="section-shell">
        <Reveal>
          <div className="section-head">
            <h2 className="display font-semibold text-2xl sm:text-3xl">Certificates and leadership</h2>
            <div className="amber-rule" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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

        {/* Load More / Show less Controls for Certifications */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {visibleCertsCount < ALL_CERTS.length && (
            <button
              onClick={() => setVisibleCertsCount(prev => prev + 3)}
              className="cta-primary flex items-center gap-2"
            >
              <span>Show more ({ALL_CERTS.length - visibleCertsCount} left)</span>
            </button>
          )}

          {visibleCertsCount > 3 && (
            <button
              onClick={() => setVisibleCertsCount(3)}
              className="cta-secondary flex items-center gap-2"
            >
              <span>Show less</span>
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
    { label: 'Email', value: 'mabdulrehman.cui@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=mabdulrehman.cui@gmail.com' },
    { label: 'GitHub', value: 'github.com/mabdulrehman-CS', href: 'https://github.com/mabdulrehman-CS' },
    { label: 'LinkedIn', value: 'linkedin.com/in/muhammad-abdul-rehman-cs', href: 'https://linkedin.com/in/muhammad-abdul-rehman-cs' },
    { label: 'Phone', value: '+92 323 5623669', href: 'tel:+923235623669' },
  ]

  return (
    <section id="contact" className="section-pad section-block" style={{ background: 'var(--secondary)' }}>
      <div className="section-shell" style={{ maxWidth: '42rem' }}>
        <Reveal>
          <div className="section-head justify-center">
            <h2 className="display font-semibold text-2xl sm:text-3xl">Contact</h2>
          </div>
          <p className="text-center text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
            Open to opportunities, collaborations, and project discussions. I usually reply within a day.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card flex flex-col gap-1 p-4 sm:p-5 rounded-[12px] text-left"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                }}
              >
                <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--muted-foreground)' }}>
                  {link.label}
                </span>
                <span className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>
                  {link.value}
                </span>
              </a>
            ))}
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
          backgroundImage: 'radial-gradient(circle at center, color-mix(in srgb, var(--primary) 18%, transparent) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
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
                className="footer-social-btn w-9 h-9 rounded-xl flex items-center justify-center"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Center: name + year */}
          <div className="text-center">
            <div className="display font-semibold text-sm footer-title">
              Muhammad Abdul Rehman
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
    return (saved as 'dark' | 'light') || 'light'
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
    <div className="page-bg min-h-screen">
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
    </div>
  )
}

