import { useState, useEffect } from 'react'
import Cover from './Cover.jsx'
import { upcoming as defaultUpcoming } from '../data/content.js'

export default function Upcoming({ items = defaultUpcoming }) {
  const displayItems = items && items.length > 0 ? items : defaultUpcoming
  const [index, setIndex] = useState(0)

  // Reseta o índice se a lista mudar
  useEffect(() => {
    setIndex(0)
  }, [displayItems.length])

  useEffect(() => {
    if (displayItems.length <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % displayItems.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [displayItems.length])

  const current = displayItems[index] || displayItems[0]

  return (
    <section id="lancamentos" className="section">
      <div className="section__header-row">
        <div>
          <div className="section__kicker">RADAR DE LANÇAMENTOS</div>
          <h2 className="section__title">Jogos Mais Aguardados do Mundo Gamer</h2>
          <p className="section__desc">
            Grandes produções que estão chegando para definir a nova geração de consoles e PC.
          </p>
        </div>
      </div>

      <div className="upcoming-showcase">
        {/* Banner Principal em Destaque */}
        <div className="upcoming-main">
          <div className="upcoming-main__media">
            <Cover
              className="upcoming-main__img"
              src={current.image}
              fallbackSrc={current.fallbackImg}
              alt={current.title}
            />
            <div className="upcoming-main__gradient" />
            <span className="upcoming-main__tag">{current.tag || 'Lançamento'}</span>
          </div>

          <div className="upcoming-main__details">
            <div className="upcoming-main__meta">
              <span className="badge-release">LANÇAMENTO: {current.release}</span>
              <span className="badge-dev">{current.developer || 'Estúdio'}</span>
            </div>

            <h3 className="upcoming-main__title">{current.title}</h3>
            <p className="upcoming-main__desc">{current.desc}</p>

            <div className="upcoming-main__platforms">
              <span className="upcoming-main__platform-label">Disponível em:</span>
              <div className="platform-chips">
                {(current.platforms || []).map((p) => (
                  <span key={p} className="platform-chip">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="upcoming-main__actions">
              <a
                className="btn btn--primary"
                href={current.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Ver Trailer Oficial
              </a>
              <a className="btn btn--glass" href="#salas-discord">
                Discutir no Discord
              </a>
            </div>
          </div>
        </div>

        {/* Miniaturas laterais para alternar rapidamente */}
        <div className="upcoming-sidebar">
          <span className="upcoming-sidebar__title">Outros Destaques</span>
          <div className="upcoming-sidebar__list">
            {displayItems.map((item, i) => (
              <button
                key={item.title}
                type="button"
                className={`upcoming-thumb ${i === index ? 'upcoming-thumb--active' : ''}`}
                onClick={() => setIndex(i)}
              >
                <Cover
                  className="upcoming-thumb__img"
                  src={item.image}
                  fallbackSrc={item.fallbackImg}
                  alt={item.title}
                />
                <div className="upcoming-thumb__content">
                  <span className="upcoming-thumb__badge">{item.release}</span>
                  <strong className="upcoming-thumb__name">{item.title}</strong>
                  <span className="upcoming-thumb__genre">{item.tag || item.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
