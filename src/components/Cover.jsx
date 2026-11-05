import { useState, useEffect } from 'react'

export default function Cover({ src, fallbackSrc, alt, className = '' }) {
  const [useFallback, setUseFallback] = useState(false)
  const [failed, setFailed] = useState(false)

  // Reseta os estados quando a imagem ou o jogo selecionado mudar
  useEffect(() => {
    setUseFallback(false)
    setFailed(false)
  }, [src, fallbackSrc])

  const activeSrc = !useFallback ? src : fallbackSrc

  const handleError = () => {
    if (!useFallback && fallbackSrc && fallbackSrc !== src) {
      setUseFallback(true)
    } else {
      setFailed(true)
    }
  }

  if (!activeSrc || failed) {
    return (
      <div className={`cover cover--fallback ${className}`} role="img" aria-label={alt}>
        <div className="cover__placeholder">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="6" width="20" height="12" rx="3" />
            <path d="M6 12h4m-2-2v4m7-3h.01m3 2h.01" />
          </svg>
          <span>{alt}</span>
        </div>
      </div>
    )
  }

  return (
    <img
      className={`cover ${className}`}
      src={activeSrc}
      alt={alt}
      loading="eager"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
    />
  )
}
