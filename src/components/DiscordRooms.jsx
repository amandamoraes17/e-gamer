import { useState } from 'react'
import { discordVoiceRooms, discordTextChannels, discordUrl } from '../data/content.js'

export default function DiscordRooms() {
  const [activeTab, setActiveTab] = useState('all') // 'all', 'voice', 'text'
  const [gameFilter, setGameFilter] = useState('Todos')
  const [notification, setNotification] = useState('')

  const games = ['Todos', 'Valorant', 'Counter-Strike 2', 'Helldivers 2', 'GTA RP', 'League of Legends', 'Bate-papo']

  const filteredVoiceRooms = gameFilter === 'Todos'
    ? discordVoiceRooms
    : discordVoiceRooms.filter((r) => r.game === gameFilter)

  const handleConnect = (name) => {
    setNotification(`Redirecionando para ${name} no aplicativo do Discord...`)
    setTimeout(() => {
      setNotification('')
      window.open(discordUrl, '_blank')
    }, 1200)
  }

  return (
    <section id="salas-discord" className="section">
      <div className="section__header-row">
        <div>
          <div className="section__kicker">COMUNIDADE & DISCORD AO VIVO</div>
          <h2 className="section__title">Salas de Jogos & Canais de Voz</h2>
          <p className="section__desc">
            No nosso Discord você não precisa preencher formulário: basta ver qual sala tem gente jogando, entrar na chamada e puxar partida!
          </p>
        </div>

        <div className="discord-guide-pill">
          <span className="dot-green" />
          <span>Servidor 100% aberto para novos membros</span>
        </div>
      </div>

      {notification && (
        <div className="toast-notification">
          <span>🎧 {notification}</span>
        </div>
      )}

      {/* Tabs de tipo de canal: Voz vs Texto */}
      <div className="discord-tabs-bar">
        <div className="tab-group">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'all' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            🎙️ Todos os Canais
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'voice' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('voice')}
          >
            🔊 Canais de Voz por Jogo ({discordVoiceRooms.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'text' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            💬 Canais de Texto & Debates ({discordTextChannels.length})
          </button>
        </div>

        {/* Filtro por jogo para os canais de voz */}
        {activeTab !== 'text' && (
          <div className="filter-chips-bar">
            {games.map((g) => (
              <button
                key={g}
                type="button"
                className={`chip ${gameFilter === g ? 'chip--active' : ''}`}
                onClick={() => setGameFilter(g)}
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Seção 1: Canais de Voz (Voice Channels) */}
      {(activeTab === 'all' || activeTab === 'voice') && (
        <div className="discord-section-block">
          <div className="block-header">
            <h3 className="block-title">
              <span className="speaker-icon">🔊</span> Canais de Voz Ativos Agora
            </h3>
            <span className="block-count">Salas com microfone liberado</span>
          </div>

          <div className="discord-voice-grid">
            {filteredVoiceRooms.map((room) => {
              const hasLimit = Boolean(room.maxUsers)
              const percentFilled = hasLimit ? (room.activeUsers / room.maxUsers) * 100 : 60

              return (
                <div key={room.id} className="voice-channel-card">
                  <div className="voice-channel-card__top">
                    <div className="voice-channel-card__badge-wrap">
                      <span className="voice-wave-dot" />
                      <span className="voice-channel-card__title">{room.channelName}</span>
                    </div>
                    <span className="voice-channel-card__game-tag">{room.game}</span>
                  </div>

                  <div className="voice-channel-card__activity">
                    <span>Atividade:</span> <strong>{room.activity}</strong>
                  </div>

                  {/* Usuários conectados na sala */}
                  <div className="voice-channel-card__users">
                    <div className="voice-channel-card__users-label">
                      <span>Quem está na call:</span>
                      <strong>
                        {room.activeUsers} {hasLimit ? `de ${room.maxUsers}` : 'pessoas'}
                      </strong>
                    </div>

                    <div className="voice-members-list">
                      {room.members.map((member) => (
                        <span key={member} className="member-chip">
                          <span className="member-dot" />
                          {member}
                        </span>
                      ))}
                    </div>

                    {hasLimit && (
                      <div className="progress-bar" style={{ marginTop: '10px' }}>
                        <div className="progress-bar__fill" style={{ width: `${percentFilled}%` }} />
                      </div>
                    )}
                  </div>

                  <div className="voice-channel-card__bottom">
                    <span className="voice-channel-card__mode">{room.category}</span>
                    <button
                      type="button"
                      className="btn btn--primary btn--small"
                      onClick={() => handleConnect(room.channelName)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Entrar na Call
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Seção 2: Canais de Texto Temáticos (Text Channels) */}
      {(activeTab === 'all' || activeTab === 'text') && (
        <div className="discord-section-block" style={{ marginTop: activeTab === 'all' ? '36px' : '0' }}>
          <div className="block-header">
            <h3 className="block-title">
              <span className="speaker-icon">💬</span> Canais de Texto do Servidor
            </h3>
            <span className="block-count">Entre nos canais para mandar mensagem e debater</span>
          </div>

          <div className="discord-text-grid">
            {discordTextChannels.map((tc) => (
              <div key={tc.id} className="text-channel-card">
                <div className="text-channel-card__top">
                  <span className="text-channel-card__hashtag">{tc.channel}</span>
                  <span className="text-channel-card__tag">{tc.tag}</span>
                </div>

                <span className="text-channel-card__cat">{tc.category}</span>
                <p className="text-channel-card__desc">{tc.desc}</p>

                <div className="text-channel-card__footer">
                  <button
                    type="button"
                    className="btn btn--cyan-glow btn--small"
                    onClick={() => handleConnect(tc.channel)}
                  >
                    Abrir Chat no Discord &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Como Funciona o Discord - Guia Rápido */}
      <div className="discord-how-it-works">
        <div className="step-item">
          <div className="step-num">1</div>
          <div className="step-content">
            <strong>Clique no canal</strong>
            <p>Escolha o jogo que vai jogar ou o tema que quer conversar.</p>
          </div>
        </div>
        <div className="step-item">
          <div className="step-num">2</div>
          <div className="step-content">
            <strong>Entre na chamada</strong>
            <p>O Discord abre direto no canal de voz. Basta conectar seu microfone.</p>
          </div>
        </div>
        <div className="step-item">
          <div className="step-num">3</div>
          <div className="step-content">
            <strong>Jogue e faça amizades</strong>
            <p>Sem burocracia, sem fila. Comunidade gamer ativa 24 horas por dia.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
