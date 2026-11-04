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
    }, 800)
  }

  return (
    <section className="hero">
      <div className="hero__main">
        <div className="hero__badge">
          <span className="hero__badge-pulse" />
          <span>{hero.badge}</span>
        </div>

        <h1 className="hero__title">
          Conecte-se, Entre na <span className="hero__gradient">Call</span> & Jogue Junto
        </h1>

        <p className="hero__text">{hero.subtitle}</p>

        <div className="hero__actions">
          <a className="btn btn--primary btn--large" href="#salas-discord">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
            {hero.primaryCta}
          </a>
          <a className="btn btn--glass btn--large" href="#ofertas">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {hero.secondaryCta}
          </a>
        </div>

        {/* Métricas da comunidade */}
        <div className="hero__stats">
          <div className="hero__stat">
            <strong>{communityStats.totalGamers}</strong>
            <span>Gamers no Discord</span>
          </div>
          <div className="hero__stat-sep" />
          <div className="hero__stat">
            <strong className="text-emerald">{communityStats.onlineMembers.toLocaleString('pt-BR')}</strong>
            <span>Membros Online</span>
          </div>
          <div className="hero__stat-sep" />
          <div className="hero__stat">
            <strong className="text-cyan">{communityStats.voiceActiveCount}</strong>
            <span>Salas de Voz Ativas</span>
          </div>
        </div>
      </div>

      {/* Widget Salas de Voz Ativas no Discord */}
      <div className="hero__widget">
        <div className="lfg-card">
          <div className="lfg-card__header">
            <div className="lfg-card__title-wrap">
              <span className="live-dot" />
              <h2 className="lfg-card__title">Salas de Voz ao Vivo (Discord)</h2>
            </div>
            <span className="lfg-card__counter">AO VIVO</span>
          </div>

          <p className="lfg-card__sub">
            Veja quem já está em call no servidor e entre direto para jogar:
          </p>

          <div className="lfg-card__filters">
            {games.map((g) => (
              <button
                key={g}
                type="button"
                className={`chip ${selectedGame === g ? 'chip--active' : ''}`}
                onClick={() => setSelectedGame(g)}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="lfg-card__list">
            {filteredRooms.map((room) => (
              <div key={room.id} className="squad-mini">
                <div className="squad-mini__left">
                  <div className="squad-mini__header">
                    <span className="squad-mini__game">{room.channelName}</span>
                  </div>
                  <div className="squad-mini__meta">
                    <span className="squad-mini__mode">{room.activity}</span>
                  </div>
                  <div className="voice-members-preview">
                    <span className="voice-icon">🎙️</span>
                    <span className="voice-members-names">{room.members.join(', ')}</span>
                  </div>
                </div>

                <div className="squad-mini__right">
                  <div className="squad-mini__slots">
                    <span className="squad-mini__slots-num">
                      {room.activeUsers}{room.maxUsers ? `/${room.maxUsers}` : ''}
                    </span>
                    <span className="squad-mini__slots-label">na call</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn--cyan-glow btn--tiny"
                    onClick={() => handleJoinVoice(room)}
                  >
                    {connectingId === room.id ? 'Conectando...' : 'Entrar no Voz'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lfg-card__footer">
            <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="lfg-card__link">
              Abrir lista completa de canais no Discord &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
