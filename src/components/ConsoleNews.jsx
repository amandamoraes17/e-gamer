import Cover from './Cover.jsx'
import { consoleNews as defaultConsoleNews } from '../data/content.js'

export default function ConsoleNews({ items = defaultConsoleNews }) {
  const displayItems = items && items.length > 0 ? items : defaultConsoleNews

  return (
    <section id="noticias" className="section">
      <div className="section__header-row">
        <div>
          <div className="section__kicker">ASSINATURAS & CATÁLOGOS</div>
          <h2 className="section__title">Novidades no Seu Ecossistema Favorito</h2>
          <p className="section__desc">
            Saiba quais jogos acabaram de aterrissar na PlayStation Plus, Xbox Game Pass e PC.
          </p>
        </div>
      </div>

      <div className="console-news-grid">
        {displayItems.map((item) => (
          <article className="console-card" key={item.title}>
            {/* Imagem comentada temporariamente:
            <div className="console-card__media">
              <Cover className="console-card__img" src={item.image} fallbackSrc={item.fallbackImg} alt={item.title} />
              <span className={`console-card__tag console-card__tag--${item.badgeColor || 'blue'}`}>
                {item.platformTag || item.platform}
              </span>
            </div>
            */}

            <div className="console-card__content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className={`console-card__tag console-card__tag--${item.badgeColor || 'blue'}`} style={{ position: 'static' }}>
                  {item.platformTag || item.platform}
                </span>
                <span className="console-card__date">{item.date}</span>
              </div>
              <h3 className="console-card__title">{item.title}</h3>
              <p className="console-card__text">{item.text || item.desc}</p>

              <div className="console-card__footer">
                <span className="console-card__platform">{item.platform}</span>
                <span className="console-card__more">Ler detalhes &rarr;</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
