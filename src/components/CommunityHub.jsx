import { useState } from 'react'
import { communityTopics, discordUrl } from '../data/content.js'

export default function CommunityHub() {
  const [pollVotes, setPollVotes] = useState({
    gta6: 624,
    doom: 412,
    monsterHunter: 298,
    witcher: 195,
  })
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState(null)

  const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0)

  const handleVote = (key) => {
    if (hasVoted) return
    setPollVotes((prev) => ({ ...prev, [key]: prev[key] + 1 }))
    setHasVoted(true)
    setUserVote(key)
  }

  const pollOptions = [
    { key: 'gta6', label: 'Grand Theft Auto VI' },
    { key: 'doom', label: 'DOOM: The Dark Ages' },
    { key: 'monsterHunter', label: 'Monster Hunter Wilds' },
    { key: 'witcher', label: 'Novo The Witcher (Polaris)' },
  ]

  return (
    <section id="comunidade" className="section community-hub">
      <div className="section__header-row">
        <div>
          <div className="section__kicker">INTERAÇÃO & DEBATES</div>
          <h2 className="section__title">Voz da Comunidade Gamer</h2>
          <p className="section__desc">
            Vote nas enquetes da semana e participe das discussões mais quentes da galera.
          </p>
        </div>
      </div>

      <div className="community-hub__grid">
        {/* Tópicos em alta */}
        <div className="topics-column">
          <h3 className="column-title">
            <span className="fire-icon">🔥</span> Discussões em Alta
          </h3>
          <div className="topics-list">
            {communityTopics.map((topic) => (
              <a
                key={topic.id}
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="topic-card"
              >
                <span className="topic-card__tag">{topic.tag}</span>
                <h4 className="topic-card__title">{topic.title}</h4>
                <div className="topic-card__meta">
                  <span>Por @{topic.author}</span>
                  <div className="topic-card__stats">
                    <span>💬 {topic.replies} respostas</span>
                    <span>❤️ {topic.likes}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Enquete da Comunidade */}
        <div className="poll-column">
          <div className="poll-card">
            <div className="poll-card__badge">ENQUETE DA SEMANA</div>
            <h3 className="poll-card__question">
              Qual é o lançamento que você mais está ansioso para jogar em 2025?
            </h3>
            <span className="poll-card__sub">
              {totalVotes.toLocaleString('pt-BR')} gamers já votaram
            </span>

            <div className="poll-card__options">
              {pollOptions.map((opt) => {
                const votes = pollVotes[opt.key]
                const percent = Math.round((votes / totalVotes) * 100)
                const isSelected = userVote === opt.key

                return (
                  <button
                    key={opt.key}
                    type="button"
                    className={`poll-option ${isSelected ? 'poll-option--selected' : ''}`}
                    onClick={() => handleVote(opt.key)}
                  >
                    <div
                      className="poll-option__progress"
                      style={{ width: hasVoted ? `${percent}%` : '0%' }}
                    />
                    <div className="poll-option__content">
                      <span className="poll-option__label">{opt.label}</span>
                      {hasVoted && (
                        <span className="poll-option__percent">{percent}%</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {hasVoted && (
              <div className="poll-card__voted-msg">
                ✅ Seu voto foi registrado! Obrigado por participar.
              </div>
            )}

            <div className="poll-card__cta">
              <a
                className="btn btn--primary btn--full"
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Participe do Discord para Comentar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
