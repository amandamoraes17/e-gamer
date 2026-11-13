// =====================================================================
// SERVIÇOS DE APIS E PLANILHAS SEPARADAS DO GOOGLE SHEETS
// =====================================================================

import {
  freeDrops as fallbackFreeDrops,
  deals as fallbackDeals,
  consoleNews as fallbackConsoleNews,
  upcoming as fallbackUpcoming,
  geek as fallbackGeek,
} from '../data/content.js'

/**
 * Parser de CSV que respeita aspas, vírgulas internas e quebras de linha.
 */
function parseCSV(text) {
  const lines = []
  let currentRow = []
  let currentField = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const nextChar = text[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField.trim())
      currentField = ''
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++
      currentRow.push(currentField.trim())
      if (currentRow.some((f) => f.length > 0)) {
        lines.push(currentRow)
      }
      currentRow = []
      currentField = ''
    } else {
      currentField += char
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim())
    lines.push(currentRow)
  }

  return lines
}

/**
 * Imagens temáticas inteligentes para jogos de lançamentos quando a planilha
 * tiver "Buscar imagem" ou estiver vazia.
 */
function getGamePosterFallback(title) {
  const t = (title || '').toLowerCase()
  if (t.includes('gta') || t.includes('theft')) return '/img/gta5.jpg'
  if (t.includes('rayman')) return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80'
  if (t.includes('dragon quest') || t.includes('monster')) return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80'
  if (t.includes('warhammer') || t.includes('dawn of war')) return '/img/delta-force.jpg'
  if (t.includes('titan') || t.includes('attack')) return 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80'
  if (t.includes('layton') || t.includes('steam')) return 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80'
  if (t.includes('exile')) return 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80'
  if (t.includes('assassin') || t.includes('creed') || t.includes('black flag')) return 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80'
  return '/img/doom.jpg'
}

/**
 * 1. Planilha de Consoles & PS Plus / Game Pass
 */
export async function fetchConsolesSheet(csvUrl) {
  if (!csvUrl) return fallbackConsoleNews

  try {
    const res = await fetch(csvUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    const rows = parseCSV(text)
    if (rows.length < 2) return fallbackConsoleNews

    // Encontra o cabeçalho real
    let headerIdx = 0
    for (let i = 0; i < rows.length; i++) {
      const lower = rows[i].map((c) => c.toLowerCase().trim())
      if (lower.includes('titulo') || lower.includes('jogo') || lower.includes('título')) {
        headerIdx = i
        break
      }
    }

    const headers = rows[headerIdx].map((h) => h.toLowerCase().trim())
    const getIdx = (name) => headers.findIndex((h) => h.includes(name))

    const list = []
    for (let i = headerIdx + 1; i < rows.length; i++) {
      const row = rows[i]
      const titulo = row[getIdx('titulo')] || row[getIdx('jogo')] || ''
      if (!titulo) continue

      list.push({
        title: titulo,
        platform: row[getIdx('plataforma')] || 'PlayStation',
        platformTag: row[getIdx('categoria')] || 'Catálogo',
        date: row[getIdx('data')] || 'Atualizado',
        text: row[getIdx('texto')] || '',
        image: row[getIdx('imagem')] || '',
        fallbackImg: row[getIdx('imagem')] || '',
        badgeColor: row[getIdx('cor')] || 'blue',
      })
    }

    return list.length > 0 ? list : fallbackConsoleNews
  } catch (err) {
    console.warn('Usando dados locais de Consoles:', err.message)
    return fallbackConsoleNews
  }
}

/**
 * 2. Planilha de Próximos Lançamentos (Compatível com planilha da usuária)
 */
export async function fetchUpcomingSheet(csvUrl) {
  if (!csvUrl) return fallbackUpcoming

  try {
    const res = await fetch(csvUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    const rows = parseCSV(text)
    if (rows.length < 2) return fallbackUpcoming

    // Localiza a linha do cabeçalho real (pode estar na linha 0, 1, 2, etc.)
    let headerIdx = 0
    for (let i = 0; i < rows.length; i++) {
      const lower = rows[i].map((c) => c.toLowerCase().trim())
      if (lower.includes('jogo') || lower.includes('titulo') || lower.includes('título')) {
        headerIdx = i
        break
      }
    }

    const headers = rows[headerIdx].map((h) => h.toLowerCase().trim())
    const findCol = (terms) => headers.findIndex((h) => terms.some((t) => h.includes(t)))

    const jogoCol = findCol(['jogo', 'titulo', 'título'])
    const dataCol = findCol(['data', 'prevista', 'lancamento', 'lançamento'])
    const platCol = findCol(['plataforma'])
    const statusCol = findCol(['status'])
    const trailerCol = findCol(['trailer', 'video', 'vídeo'])
    const infoCol = findCol(['informac', 'informaç', 'info'])
    const bannerCol = findCol(['banner'])
    const imgCol = findCol(['imagem', 'capa'])
    const obsCol = findCol(['sobre', 'observa', 'obs', 'descric', 'descriç', 'sinopse'])

    const list = []
    for (let i = headerIdx + 1; i < rows.length; i++) {
      const row = rows[i]
      const titulo = (row[jogoCol] || '').trim()
      if (!titulo) continue

      const rawPlatforms = (row[platCol] || 'PC / Consoles').trim()
      const platformsArray = rawPlatforms
        .split(/[;/]/)
        .map((p) => p.replace(/\(.*?\)/g, '').trim())
        .filter((p) => p.length > 0)

      const rawStatus = (row[statusCol] || 'Em breve').trim()
      const rawData = (row[dataCol] || '2026').trim()
      const rawObs = (row[obsCol] || 'Grande lançamento aguardado pela comunidade gamer.').trim()
      const rawTrailer = (row[trailerCol] || '').trim()
      const rawInfo = (row[infoCol] || '').trim()
      const rawBanner = bannerCol !== -1 ? (row[bannerCol] || '').trim().replace(/^"|"$/g, '') : ''
      const rawImg = imgCol !== -1 ? (row[imgCol] || '').trim().replace(/^"|"$/g, '') : ''

      const hasCustomBanner = rawBanner && (rawBanner.startsWith('http://') || rawBanner.startsWith('https://') || rawBanner.startsWith('/'))
      const hasCustomImg = rawImg && (rawImg.startsWith('http://') || rawImg.startsWith('https://') || rawImg.startsWith('/'))

      // Prioridade do banner: coluna banner > coluna imagem/capa > fallback
      const resolvedBanner = hasCustomBanner ? rawBanner : (hasCustomImg ? rawImg : getGamePosterFallback(titulo))

      // Prioridade da miniatura: coluna imagem/capa > coluna banner > fallback
      const resolvedThumb = hasCustomImg ? rawImg : (hasCustomBanner ? rawBanner : getGamePosterFallback(titulo))

      const hasCustomTrailer = rawTrailer && rawTrailer.startsWith('http')
      const resolvedTrailer = hasCustomTrailer
        ? rawTrailer
        : `https://www.youtube.com/results?search_query=${encodeURIComponent(titulo)}+trailer+oficial`

      const hasCustomInfo = rawInfo && rawInfo.startsWith('http')
      const resolvedInfo = hasCustomInfo
        ? rawInfo
        : `https://www.google.com/search?q=${encodeURIComponent(titulo)}+jogo+lancamento`

      list.push({
        title: titulo,
        release: rawData,
        status: rawStatus,
        tag: rawStatus,
        platforms: platformsArray.length > 0 ? platformsArray : ['PC', 'Consoles'],
        developer: 'Estúdio / Publicadora',
        desc: rawObs,
        bannerImage: resolvedBanner,
        image: resolvedThumb,
        fallbackImg: getGamePosterFallback(titulo),
        trailerUrl: resolvedTrailer,
        infoUrl: resolvedInfo,
      })
    }

    return list.length > 0 ? list : fallbackUpcoming
  } catch (err) {
    console.warn('Usando dados locais de Lançamentos:', err.message)
    return fallbackUpcoming
  }
}

/**
 * 3. Planilha de Ofertas & Promoções
 */
export async function fetchDealsSheet(csvUrl) {
  if (!csvUrl) return fallbackDeals

  try {
    const res = await fetch(csvUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    const rows = parseCSV(text)
    if (rows.length < 2) return fallbackDeals

    let headerIdx = 0
    for (let i = 0; i < rows.length; i++) {
      const lower = rows[i].map((c) => c.toLowerCase().trim())
      if (lower.includes('jogo') || lower.includes('titulo')) {
        headerIdx = i
        break
      }
    }

    const headers = rows[headerIdx].map((h) => h.toLowerCase().trim())
    const getIdx = (name) => headers.findIndex((h) => h.includes(name))

    const list = []
    for (let i = headerIdx + 1; i < rows.length; i++) {
      const row = rows[i]
      const jogo = row[getIdx('jogo')] || row[getIdx('titulo')] || ''
      if (!jogo) continue

      const descNum = parseFloat(row[getIdx('desconto')] || '0')
      const oldP = parseFloat(row[getIdx('preco_antigo')] || '0')
      const promoP = parseFloat(row[getIdx('preco_promocional')] || '0')

      list.push({
        game: jogo,
        store: row[getIdx('loja')] || 'Loja Digital',
        platformCategory: (row[getIdx('plataforma')] || 'pc').toLowerCase(),
        discount: descNum,
        oldPrice: oldP,
        price: promoP,
        tag: row[getIdx('destaque')] || 'Promoção',
        desc: row[getIdx('descricao')] || '',
        image: row[getIdx('imagem')] || '',
        fallbackImg: row[getIdx('imagem')] || '',
        link: row[getIdx('link')] || '#',
      })
    }

    return list.length > 0 ? list : fallbackDeals
  } catch (err) {
    console.warn('Usando dados locais de Ofertas:', err.message)
    return fallbackDeals
  }
}

/**
 * 4. Planilha de Filmes, Séries & Cultura Geek
 */
export async function fetchGeekSheet(csvUrl) {
  if (!csvUrl) return fallbackGeek

  try {
    const res = await fetch(csvUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    const rows = parseCSV(text)
    if (rows.length < 2) return fallbackGeek

    let headerIdx = 0
    for (let i = 0; i < rows.length; i++) {
      const lower = rows[i].map((c) => c.toLowerCase().trim())
      if (lower.includes('titulo') || lower.includes('filme') || lower.includes('serie')) {
        headerIdx = i
        break
      }
    }

    const headers = rows[headerIdx].map((h) => h.toLowerCase().trim())
    const getIdx = (name) => headers.findIndex((h) => h.includes(name))

    const list = []
    for (let i = headerIdx + 1; i < rows.length; i++) {
      const row = rows[i]
      const titulo = row[getIdx('titulo')] || row[getIdx('filme')] || ''
      if (!titulo) continue

      list.push({
        title: titulo,
        category: row[getIdx('categoria')] || 'Geek',
        type: (row[getIdx('tipo')] || 'series').toLowerCase(),
        streaming: row[getIdx('streaming')] || 'Cinema',
        rating: row[getIdx('nota')] || '9.0',
        year: row[getIdx('ano')] || '2026',
        desc: row[getIdx('sinopse')] || '',
        image: row[getIdx('imagem')] || '',
        fallbackImg: row[getIdx('imagem')] || '',
        link: row[getIdx('link')] || '#',
      })
    }

    return list.length > 0 ? list : fallbackGeek
  } catch (err) {
    console.warn('Usando dados locais de Geek:', err.message)
    return fallbackGeek
  }
}

/**
 * Radar de Jogos Grátis da Semana (GamerPower API)
 */
export async function getLiveFreeGames() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const res = await fetch('https://www.gamerpower.com/api/giveaways?type=game', {
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return fallbackFreeDrops

    return data.slice(0, 3).map((item) => ({
      store: item.platforms || 'PC / Epic Games',
      title: item.title,
      type: '100% Grátis',
      deadline: item.end_date !== 'N/A' ? `Até ${item.end_date}` : 'Por tempo limitado',
      badge: 'GRÁTIS',
      tagColor: 'green',
      link: item.open_giveaway_url || item.gamerpower_url,
    }))
  } catch (err) {
    console.warn('Usando dados locais de jogos grátis:', err.message)
    return fallbackFreeDrops
  }
}

/**
 * Ofertas da Steam em tempo real (CheapShark API)
 */
export async function getLiveDeals() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const res = await fetch(
      'https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=8&sortBy=Savings',
      { signal: controller.signal }
    )
    clearTimeout(timeoutId)

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return fallbackDeals

    return data.slice(0, 6).map((item) => {
      const discount = Math.round(parseFloat(item.savings || '0'))
      const usdPrice = parseFloat(item.salePrice || '0')
      const brlPrice = usdPrice * 5.6
      const oldPrice = brlPrice / (1 - discount / 100)

      return {
        game: item.title,
        platform: 'Steam',
        platformCategory: 'pc',
        discount: discount,
        oldPrice: oldPrice,
        price: brlPrice,
        store: 'Steam Store',
        tag: discount >= 75 ? 'Super Oferta' : 'Promoção Ativa',
        desc: `Avaliação do público no Steam: ${item.dealRating}/10. Aproveite enquanto durar o estoque da chave.`,
        image: item.thumb,
        fallbackImg: item.thumb,
        link: `https://www.cheapshark.com/redirect?dealID=${item.dealID}`,
      }
    })
  } catch (err) {
    console.warn('Usando dados locais de promoções:', err.message)
    return fallbackDeals
  }
}
