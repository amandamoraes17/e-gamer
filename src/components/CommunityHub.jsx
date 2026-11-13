import { useState } from 'react'
import { discordUrl } from '../data/content.js'
import './community-hub.css'

const topics = [
  { category: 'PAPO DE GAMER', title: 'Qual jogo você queria esquecer só para jogar de novo?', description: 'Aquela história, boss ou final que ficou na memória.', channel: '#papo-gamer', icon: '01', tone: 'blue' },
  { category: 'DICAS & ESTRATÉGIAS', title: 'Qual dica mudou o seu jeito de jogar?', description: 'Compartilhe o que você gostaria de ter aprendido antes.', channel: '#dicas-e-guias', icon: '02', tone: 'purple' },
  { category: 'CULTURA GEEK', title: 'Qual universo dos games merecia uma série?', description: 'Vale defender sua adaptação dos sonhos. Sem spoilers!', channel: '#filmes-e-series', icon: '03', tone: 'orange' },
]
const options = [
  { id: 'competitive', title: 'Foco na vitória', description: 'Ranqueada, estratégia e aquele clutch.', icon: '↗' },
  { id: 'coop', title: 'Melhor com a galera', description: 'Co-op, call e boas risadas.', icon: '＋' },
  { id: 'story', title: 'Só mais uma missão', description: 'Uma boa história para mergulhar.', icon: '◇' },
  { id: 'explorer', title: 'Um pouco de tudo', description: 'O que importa é descobrir o próximo jogo.', icon: '✳' },
]
const storageKey = 'egamer-playstyle-v1'

export default function CommunityHub() {
  const [choice, setChoice] = useState(() => {
    try {
      const saved = window.localStorage.getItem(storageKey)
      return options.some((option) => option.id === saved) ? saved : null
    } catch { return null }
  })
  const select = (id) => {
    setChoice(id)
    try { window.localStorage.setItem(storageKey, id) } catch { /* Choice remains available for this visit. */ }
  }

  return (
    <section id="comunidade" className="section community-refresh" aria-labelledby="community-heading">
      <div className="community-refresh__heading">
        <div><div className="section__kicker">INTERAÇÃO & DEBATES</div><h2 id="community-heading" className="section__title">O próximo papo começa com você.</h2><p className="section__desc">Entre na conversa, compartilhe suas descobertas e encontre quem curte o mesmo que você.</p></div>
        <a className="community-refresh__link" href={discordUrl} target="_blank" rel="noopener noreferrer">Ir para o Discord <span aria-hidden="true">↗</span></a>
      </div>
      <div className="community-refresh__grid">
        <div className="conversation-list">
          <div className="conversation-list__heading"><h3>Assuntos para puxar conversa</h3><span>ESCOLHA SEU PAPO</span></div>
          {topics.map((topic) => <a className={`conversation conversation--${topic.tone}`} key={topic.icon} href={discordUrl} target="_blank" rel="noopener noreferrer">
            <span className="conversation__number" aria-hidden="true">{topic.icon}</span>
            <div className="conversation__body"><span className="conversation__category">{topic.category}</span><h4>{topic.title}</h4><p>{topic.description}</p><span className="conversation__action">Conversar no Discord <span aria-hidden="true">↗</span></span></div>
          </a>)}
          <p className="conversation-list__note">Tem outro assunto em mente? Leve sua ideia para o servidor.</p>
        </div>
        <div className="playstyle">
          <div className="playstyle__eyebrow"><span aria-hidden="true">◈</span> SEU JEITO DE JOGAR</div>
          <h3 id="playstyle-question">Na hora de dar o play,<br />qual é a sua vibe?</h3>
          <p className="playstyle__intro">Todo estilo tem lugar por aqui.</p>
          <div className="playstyle__options" role="group" aria-labelledby="playstyle-question">
            {options.map((option) => <button type="button" className="playstyle-option" key={option.id} aria-pressed={choice === option.id} onClick={() => select(option.id)}><span className="playstyle-option__icon" aria-hidden="true">{option.icon}</span><span className="playstyle-option__text"><strong>{option.title}</strong><small>{option.description}</small></span><span className="playstyle-option__check" aria-hidden="true">{choice === option.id ? '✓' : ''}</span></button>)}
          </div>
          <p className="playstyle__feedback" role="status">{choice ? 'Boa! Agora encontre sua galera no Discord.' : 'Selecione a opção que mais combina com você.'}</p>
          <a className="btn btn--pill-white btn--full playstyle__cta" href={discordUrl} target="_blank" rel="noopener noreferrer">{choice ? 'Encontrar minha galera' : 'Participar da comunidade'} <span aria-hidden="true">↗</span></a>
          <small className="playstyle__note">Sua escolha fica apenas neste navegador.</small>
        </div>
      </div>
    </section>
  )
}
