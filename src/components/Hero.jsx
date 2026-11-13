import { useState } from 'react'
import { discordVoiceRooms, discordUrl } from '../data/content.js'
import './hero-header.css'

function VoiceIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /></svg>
}

export default function Hero() {
  const [selectedGame, setSelectedGame] = useState('Todos')
  const games = ['Todos', ...new Set(discordVoiceRooms.map((room) => room.game))]
  const rooms = (selectedGame === 'Todos' ? discordVoiceRooms : discordVoiceRooms.filter((room) => room.game === selectedGame)).slice(0, 3)

  return (
    <section className="hero hero--refresh" aria-labelledby="hero-heading">
      <div className="hero__ambient" aria-hidden="true" />
      <div className="hero__main">
        <div className="hero__eyebrow"><span /> SEU PRÓXIMO SQUAD COMEÇA AQUI</div>
        <h1 id="hero-heading" className="hero__title">O jogo é bom.<br />Com a sua galera,<br /><span>é outro nível.</span></h1>
        <p className="hero__subtitle">Encontre companhia para a próxima partida e fique por dentro dos lançamentos, ofertas e tudo que move o universo gamer.</p>
        <div className="hero__actions">
          <a className="btn btn--pill-white btn--large" href={discordUrl} target="_blank" rel="noopener noreferrer"><VoiceIcon /> Encontrar minha galera <span aria-hidden="true">↗</span></a>
          <a className="hero__explore" href="#lancamentos">Explorar o eGamer <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero__platforms"><span>SEJA QUAL FOR O SEU PLAYER</span><p>PC <i /> PlayStation <i /> Xbox <i /> Nintendo <i /> Mobile</p></div>
      </div>
      <div className="hero__lobby">
        <div className="lobby__top"><span className="lobby__mark"><VoiceIcon /></span><div><span className="lobby__eyebrow">PONTO DE ENCONTRO</span><h2>Tem espaço na call.</h2></div><span className="lobby__discord">DISCORD</span></div>
        <div className="lobby__filters" aria-label="Filtrar salas por jogo">{games.map((game) => <button type="button" key={game} aria-pressed={selectedGame === game} onClick={() => setSelectedGame(game)}>{game === 'Counter-Strike 2' ? 'CS2' : game}</button>)}</div>
        <div className="lobby__rooms">
          {rooms.map((room, index) => <a className="lobby-room" key={room.id} href={discordUrl} target="_blank" rel="noopener noreferrer" aria-label={`Explorar salas de ${room.game} no Discord`}>
            <span className={`lobby-room__icon lobby-room__icon--${index}`} aria-hidden="true"><VoiceIcon /></span>
            <div className="lobby-room__body"><h3>{room.game}</h3><p>{room.category.split('/').pop().trim()} <span>·</span> Sala {String(index + 1).padStart(2, '0')}</p><div className="lobby-room__avatars" aria-hidden="true">{room.members.slice(0, 3).map((member, i) => <span key={member} style={{ '--avatar-hue': `${200 + i * 45}` }}>{member.slice(0, 1)}</span>)}<small>Encontre seu squad</small></div></div>
            <span className="lobby-room__arrow" aria-hidden="true">↗</span>
          </a>)}
        </div>
        <a className="lobby__footer" href="#salas-discord">Conhecer a comunidade <span aria-hidden="true">→</span></a>
        <span className="lobby__note">Uma comunidade. Todos os estilos de jogo.</span>
      </div>
    </section>
  )
}
