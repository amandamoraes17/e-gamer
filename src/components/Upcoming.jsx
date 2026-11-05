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

  // Pausa a rotação automática se houver muitos itens para o usuário explorar com calma
  useEffect(() => {
    if (displayItems.length <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % displayItems.length)
    }, 9000)
    return () => clearInterval(timer)
  }, [displayItems.length])

  const current = displayItems[index] || displayItems[0]

  const handleNext = () => setIndex((prev) => (prev + 1) % displayItems.length)
  const handlePrev = () => setIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length)

  return (
    <section id="lancamentos" className="section">
      <div className="section__header-row">
        <div>
          <div className="section__kicker">CALENDÁRIO // RADAR DE LANÇAMENTOS</div>
          <h2 className="section__title">Jogos Mais Aguardados do Mundo Gamer</h2>
          <p className="section__desc">
            Grandes produções que estão chegando para definir a nova geração de consoles e PC.
          </p>
        </div>

        <div className="upcoming-header-actions">
          <span className="upcoming-count-badge">
            {index + 1} de {displayItems.length} títulos
          </span>
          <div className="nav-arrows">
            <button
              type="button"
              className="btn-arrow"
              onClick={handlePrev}
              aria-label="Jogo anterior"
            >
              &larr;
            </button>
            <button
              type="button"
              className="btn-arrow"
              onClick={handleNext}
              aria-label="Próximo jogo"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      <div className="upcoming-showcase">
        {/* Banner Principal em Destaque */}
        <div className="upcoming-main">
          <div className="upcoming-main__media">
            <Cover
              key={`${current.title}_${current.bannerImage || current.image || index}`}
              className="upcoming-main__img"
              src={current.bannerImage || current.image}
              fallbackSrc={current.fallbackImg}
              alt={current.title}
            />
            <div className="upcoming-main__gradient" />
            <span className="upcoming-main__tag">
              {current.status || current.tag || 'Lançamento'}
            </span>
          </div>

          <div className="upcoming-main__details">
            <div className="upcoming-main__meta">
              <span className="badge-release">PREVISTO: {current.release}</span>
              {current.status && (
                <span className="badge-status-pill">
                  {current.status}
                </span>
              )}
            </div>

            <h3 className="upcoming-main__title">{current.title}</h3>
            <p className="upcoming-main__desc">{current.desc}</p>

            <div className="upcoming-main__platforms">
              <span className="upcoming-main__platform-label">Plataformas:</span>
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
                className="btn btn--pill-white"
                href={current.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Ver Trailer Oficial
              </a>

              {current.infoUrl && (
                <a
                  className="btn btn--pill-glass"
                  href={current.infoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  Mais Informações
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Miniaturas laterais para alternar rapidamente com Scroll Suave */}
        <div className="upcoming-sidebar">
          <div className="upcoming-sidebar__top">
            <span className="upcoming-sidebar__title">Lista de Títulos ({displayItems.length})</span>
          </div>

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
                  src={item.image || item.bannerImage}
                  fallbackSrc={item.fallbackImg}
                  alt={item.title}
                />
                <div className="upcoming-thumb__content">
                  <div className="upcoming-thumb__row">
                    <span className="upcoming-thumb__badge">{item.release}</span>
                    {item.status && <span className="upcoming-thumb__status">{item.status}</span>}
                  </div>
                  <strong className="upcoming-thumb__name">{item.title}</strong>
                  <span className="upcoming-thumb__genre">
                    {(item.platforms || []).slice(0, 3).join(' • ')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
