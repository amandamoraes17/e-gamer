import { useState, useEffect } from 'react'
import Cover from './Cover.jsx'
import { deals as initialDeals } from '../data/content.js'
import { getLiveDeals } from '../services/apiService.js'

const brl = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Deals({ items = initialDeals }) {
  const [dealsList, setDealsList] = useState(items || initialDeals)
  const [platformFilter, setPlatformFilter] = useState('all')
  const [loadingLive, setLoadingLive] = useState(false)
  const [isLiveActive, setIsLiveActive] = useState(false)

  useEffect(() => {
    if (items && items.length > 0) {
      setDealsList(items)
    }
  }, [items])

  const categories = [
    { id: 'all', label: 'Todas as Ofertas' },
    { id: 'pc', label: 'PC / Steam' },
    { id: 'playstation', label: 'PlayStation' },
    { id: 'xbox', label: 'Xbox' },
    { id: 'nintendo', label: 'Nintendo Switch' },
  ]

  const handleSyncLiveDeals = async () => {
    setLoadingLive(true)
    const live = await getLiveDeals()
    if (live && live.length > 0) {
      setDealsList(live)
      setIsLiveActive(true)
    }
    setLoadingLive(false)
  }

  const handleResetCurated = () => {
    setDealsList(initialDeals)
    setIsLiveActive(false)
  }

  const filteredDeals = platformFilter === 'all'
    ? dealsList
    : dealsList.filter((d) => d.platformCategory === platformFilter)

  return (
    <section id="ofertas" className="section">
      <div className="section__header-row">
        <div>
          <div className="section__kicker">ECONOMIZE NO SEU SETUP</div>
          <h2 className="section__title">Jogos com Preços Imperdíveis</h2>
          <p className="section__desc">
            As melhores promoções ativas na Steam, PlayStation Store, Xbox e Nintendo eShop.
          </p>
        </div>

        {/* Controles de Sincronização ao Vivo e Filtros */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {!isLiveActive ? (
            <button
              type="button"
              className="btn btn--cyan-glow btn--tiny"
              onClick={handleSyncLiveDeals}
              disabled={loadingLive}
              title="Busca ofertas ao vivo na Steam via API pública"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              {loadingLive ? 'Atualizando...' : 'Buscar Ofertas ao Vivo da Steam'}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--glass btn--tiny"
              onClick={handleResetCurated}
            >
              Voltar para Seleção Especial
            </button>
          )}

          <div className="filter-chips-bar">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip chip--tab ${platformFilter === c.id ? 'chip--active' : ''}`}
                onClick={() => setPlatformFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="deals-grid">
        {filteredDeals.map((d) => (
          <article className="deal-card" key={d.game}>
            {/* Imagem comentada temporariamente:
            <div className="deal-card__media">
              <Cover
                className="deal-card__img"
                src={d.image}
                fallbackSrc={d.fallbackImg}
                alt={d.game}
              />
              <span className="deal-card__badge-discount">-{d.discount}%</span>
              {d.tag && <span className="deal-card__badge-tag">{d.tag}</span>}
            </div>
            */}

            <div className="deal-card__body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="deal-card__store-tag">{d.store}</span>
                <span className="deal-card__badge-discount" style={{ position: 'static' }}>
                  -{d.discount}%
                </span>
              </div>
              <h3 className="deal-card__title">{d.game}</h3>
              {d.tag && (
                <span className="deal-card__badge-tag" style={{ position: 'static', display: 'inline-block', marginBottom: '8px' }}>
                  {d.tag}
                </span>
              )}
              <p className="deal-card__desc">{d.desc}</p>

              <div className="deal-card__pricing">
                <div className="deal-card__price-values">
                  <span className="deal-card__old-price">{brl(d.oldPrice)}</span>
                  <strong className="deal-card__current-price">{brl(d.price)}</strong>
                </div>

                <a
                  className="btn btn--cyan-glow btn--small"
                  href={d.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pegar Oferta
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
