export default function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="eGamer - Início">
      <div className="logo__icon">
        <svg viewBox="0 0 44 44" width="36" height="36" aria-hidden="true">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ff007a" />
            </linearGradient>
          </defs>
          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
          <path
            d="M 22 4 A 18 18 0 0 1 40 22"
            fill="none"
            stroke="url(#logoGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 22 40 A 18 18 0 0 1 4 22"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* D-Pad e botões estilizados */}
          <circle cx="16" cy="22" r="2" fill="#00f0ff" />
          <circle cx="28" cy="22" r="2" fill="#ff007a" />
        </svg>
      </div>
      <div className="logo__brand">
        <span className="logo__text">
          <span className="logo__accent">e</span>Gamer
        </span>
        <span className="logo__tagline">HUB & COMUNIDADE</span>
      </div>
    </a>
  )
}
