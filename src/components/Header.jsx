import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { nav, discordUrl } from '../data/content.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <header className="header header--refresh">
      <div className="header__inner">
        <Logo />
        <nav id="main-navigation" className={`nav ${open ? 'nav--open' : ''}`} aria-label="Navegação principal">
          {nav.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="nav__link">
              {['Início', 'Comunidade', 'Lançamentos', 'Ofertas', 'Consoles', 'Guia Geek'][index] || item.label}
            </a>
          ))}
          <a className="btn btn--pill-white nav__cta-mobile" href={discordUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Entrar no Discord ↗</a>
        </nav>
        <div className="header__right">
          <a className="btn btn--pill-white header__cta" href={discordUrl} target="_blank" rel="noopener noreferrer">Entrar no Discord <span aria-hidden="true">↗</span></a>
          <button type="button" className={`menu-toggle ${open ? 'menu-toggle--active' : ''}`} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        </div>
      </div>
    </header>
  )
}
