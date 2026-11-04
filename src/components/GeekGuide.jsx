import { useState } from 'react'
import Cover from './Cover.jsx'
import { geek as defaultGeek } from '../data/content.js'

export default function GeekGuide({ items = defaultGeek }) {
  const displayItems = items && items.length > 0 ? items : defaultGeek
  const [filter, setFilter] = useState('all')

  const filterTabs = [
    { id: 'all', label: 'Tudo do Guia' },
    { id: 'series', label: 'Séries' },
    { id: 'movies', label: 'Cinema' },
    { id: 'anime', label: 'Animações & Jogos' },
  ]

  const filteredItems = filter === 'all'
    ? displayItems
    : displayItems.filter((g) => g.type === filter)

  return (
    <section id="geek" className="section">
      <div className="section__header-row">
        <div>
          <div className="section__kicker">CULTURA POP & STREAMING</div>
          <h2 className="section__title">Seu Guia Geek de Séries e Filmes</h2>
          <p className="section__desc">
            As melhores produções, adaptações de games e estreias imperdíveis da cultura pop.
          </p>
        </div>

        <div className="filter-chips-bar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`chip chip--tab ${filter === tab.id ? 'chip--active' : ''}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="geek-grid">
        {filteredItems.map((item) => (
          <article className="geek-card" key={item.title}>
            <div className="geek-card__poster">
              <Cover
                className="geek-card__img"
                src={item.image}
                fallbackSrc={item.fallbackImg}
                alt={item.title}
              />
              <div className="geek-card__rating">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>{item.rating || '9.0'}</span>
              </div>
              <span className="geek-card__streaming-pill">{item.streaming || item.platform}</span>
            </div>

            <div className="geek-card__info">
              <span className="geek-card__cat">
                {item.category} • {item.year || item.date}
              </span>
              <h3 className="geek-card__title">{item.title}</h3>
              <p className="geek-card__desc">{item.desc || item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
