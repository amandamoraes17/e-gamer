import { useState, useEffect } from 'react'
import { freeDrops as initialDrops } from '../data/content.js'
import { getLiveFreeGames } from '../services/apiService.js'

export default function FreeDropsBar() {
  const [drops, setDrops] = useState(initialDrops)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    let isMounted = true
    getLiveFreeGames().then((liveData) => {
      if (isMounted && liveData && liveData.length > 0) {
        setDrops(liveData)
        setIsLive(true)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <aside id="drops" className="drops-bar" aria-label="Jogos grátis e drops da semana">
      <div className="drops-bar__header">
        <span className="drops-bar__pulse" />
        <span className="drops-bar__badge">
          RADAR DE JOGOS GRÁTIS {isLive && <small style={{ fontSize: '0.65rem', opacity: 0.8 }}>(AO VIVO)</small>}
        </span>
        <span className="drops-bar__sub">Resgate agora sem pagar nada:</span>
      </div>

      <div className="drops-bar__list">
        {drops.map((drop) => (
          <a
            key={drop.title}
            href={drop.link}
            target="_blank"
            rel="noopener noreferrer"
            className="drop-card"
          >
            <div className={`drop-card__pill drop-card__pill--${drop.tagColor || 'green'}`}>
              {drop.badge}
            </div>
            <div className="drop-card__info">
              <strong className="drop-card__title">{drop.title}</strong>
              <span className="drop-card__meta">
                {drop.store} • {drop.deadline}
              </span>
            </div>
            <svg className="drop-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>
    </aside>
  )
}
