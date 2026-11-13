import './logo.css'

export default function Logo() {
  return (
    <a className="logo logo--connected" href="#inicio" aria-label="eGamer — Início">
      <img className="logo__emblem" src="/img/egamer-symbol.svg?v=2" alt="" width="42" height="42" />
      <span className="logo__wordmark">eGamer</span>
    </a>
  )
}
