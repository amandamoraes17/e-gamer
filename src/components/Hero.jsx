import { useState } from 'react'
import { hero, discordVoiceRooms, discordUrl, communityStats } from '../data/content.js'

export default function Hero() {
  const [selectedGame, setSelectedGame] = useState('Todos')
  const [connectingId, setConnectingId] = useState(null)

  const games = ['Todos', 'Valorant', 'Counter-Strike 2', 'Helldivers 2', 'GTA RP', 'Bate-papo']

  const filteredRooms = selectedGame === 'Todos'
    ? discordVoiceRooms.slice(0, 3)
    : discordVoiceRooms.filter((r) => r.game === selectedGame).slice(0, 3)

  const handleJoinVoice = (room) => {
    setConnectingId(room.id)
    setTimeout(() => {
      setConnectingId(null)
      window.open(discordUrl, '_blank')
    }, 600)
  }

  return (
    <section className="hero">
      {/* Halo de luz cósmico / Portal Neon do Zyno */}
      <div className="hero__halo-container" aria-hidden="true">
        <div className="hero__halo-ring" />
        <div className="hero__halo-glow" />
      </div>

      <div className="hero__main">
        <div className="hero__kicker-pill">
          <span className="pill-dot" />
          <span>EVERYTHING IN ONE PLACE // GAMING HUB</span>
        </div>

        <h1 className="hero__title">
          CONECTE-SE, ENTRE NA <span className="hero__glow-word">CALL</span> & DOMINE O JOGO
        </h1>

        <p className="hero__subtitle">{hero.subtitle}</p>

        <div className="hero__actions">
          <a className="btn btn--pill-white btn--large" href="#salas-discord">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
            </svg>
            Entrar nas Salas de Voz
          </a>
          <a className="btn btn--pill-glass btn--large" href="#lancamentos">
            Ver Lançamentos & Ofertas
          </a>
        </div>

        {/* Métricas estilo Specs do Zyno */}
        <div className="hero__specs-grid">
          <div className="spec-item">
            <span className="spec-label">COMUNIDADE ATIVA</span>
            <strong className="spec-value">{communityStats.totalGamers}</strong>
            <span className="spec-sub">Membros registrados</span>
          </div>
          <div className="spec-divider" />
          <div className="spec-item">
            <span className="spec-label">STATUS ATUAL</span>
            <strong className="spec-value text-emerald">
              {communityStats.onlineMembers.toLocaleString('pt-BR')}
            </strong>
            <span className="spec-sub">Gamers online agora</span>
          </div>
          <div className="spec-divider" />
          <div className="spec-item">
            <span className="spec-label">SALAS DE VOZ</span>
            <strong className="spec-value text-cyan">{communityStats.voiceActiveCount}</strong>
            <span className="spec-sub">Canais com pessoas</span>
          </div>
        </div>
      </div>

      {/* Widget HUD das Salas de Voz do Discord */}
      <div className="hero__widget">
        <div className="hud-card">
          <div className="hud-card__header">
            <div className="hud-card__status">
              <span className="pulse-indicator" />
              <h2 className="hud-card__title">SALAS DE VOZ // AO VIVO</h2>
            </div>
            <span className="hud-card__code">[DISCORD // ACTIVE]</span>
          </div>

          <p className="hud-card__sub">
            Partidas com membros conectados agora no servidor:
          </p>

          <div className="hud-card__filters">
            {games.map((g) => (
              <button
                key={g}
                type="button"
                className={`hud-chip ${selectedGame === g ? 'hud-chip--active' : ''}`}
                onClick={() => setSelectedGame(g)}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="hud-card__list">
            {filteredRooms.map((room) => (
              <div key={room.id} className="hud-room-item">
                <div className="hud-room-item__info">
                  <div className="hud-room-item__top">
                    <span className="hud-room-item__name">{room.channelName}</span>
                    <span className="hud-room-item__badge">{room.game}</span>
                  </div>
                  <span className="hud-room-item__act">{room.activity}</span>
                  <div className="hud-room-item__members">
                    <span className="member-icon">🎙️</span>
                    <span className="member-names">{room.members.join(' • ')}</span>
                  </div>
                </div>

                <div className="hud-room-item__action">
                  <div className="hud-room-item__count">
                    <strong>{room.activeUsers}</strong>
                    <span>{room.maxUsers ? `/${room.maxUsers}` : ' on'}</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn--pill-white btn--tiny"
                    onClick={() => handleJoinVoice(room)}
                  >
                    {connectingId === room.id ? 'Conectando...' : 'Conectar'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hud-card__footer">
            <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="hud-card__link">
              VER TODAS AS SALAS NO DISCORD &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
