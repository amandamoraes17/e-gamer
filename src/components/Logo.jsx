export default function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="eGamer - Início">
      <div className="logo__symbol">
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
          <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <path
            d="M 16 2 A 14 14 0 0 1 30 16"
            fill="none"
            stroke="#4f8fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="4" fill="#ffffff" />
        </svg>
      </div>
      <div className="logo__brand">
        <span className="logo__text">
          <span className="logo__prefix">E</span>GAMER
        </span>
        <span className="logo__tagline">NEXT-GEN PLATFORM</span>
      </div>
    </a>
  )
}
