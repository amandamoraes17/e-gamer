import { useState } from 'react'
import Logo from './Logo.jsx'
import { nav, discordUrl, communityStats } from '../data/content.js'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="header__inner">
        <Logo />

        <div className="header__center-nav">
          <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Navegação Principal">
            {nav.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="nav__link">
                {item.label}
              </a>
            ))}
            <a
              className="btn btn--pill-white nav__cta-mobile"
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Entrar no Discord
            </a>
          </nav>
        </div>

        <div className="header__right">
          <div className="header__status-badge">
            <span className="header__status-dot" />
            <span className="header__status-text">
              <strong>{communityStats.onlineMembers.toLocaleString('pt-BR')}</strong> online
            </span>
          </div>

          <a className="btn btn--pill-white header__cta" href={discordUrl} target="_blank" rel="noopener noreferrer">
            <span>Comunidade Discord</span>
          </a>

          <button
            className={`menu-toggle ${open ? 'menu-toggle--active' : ''}`}
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
