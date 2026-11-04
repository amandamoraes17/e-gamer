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

    const headers = rows[0].map((h) => h.toLowerCase().trim())
    const getIdx = (name) => headers.indexOf(name)

    const list = []
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      const titulo = row[getIdx('titulo')] || ''
      if (!titulo) continue

      list.push({
        title: titulo,
        platform: row[getIdx('plataforma')] || 'Console',
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
 * 2. Planilha de Próximos Lançamentos
 */
export async function fetchUpcomingSheet(csvUrl) {
  if (!csvUrl) return fallbackUpcoming

  try {
    const res = await fetch(csvUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    const rows = parseCSV(text)
    if (rows.length < 2) return fallbackUpcoming

    const headers = rows[0].map((h) => h.toLowerCase().trim())
    const getIdx = (name) => headers.indexOf(name)

    const list = []
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      const titulo = row[getIdx('titulo')] || ''
      if (!titulo) continue

      const platformsRaw = row[getIdx('plataformas')] || 'PC / Consoles'
      const platformsArray = platformsRaw.split('/').map((p) => p.trim())
      const trailer = row[getIdx('trailer')] || ''

      list.push({
        title: titulo,
        release: row[getIdx('lancamento')] || 'Em breve',
        tag: row[getIdx('genero')] || 'Jogo',
        platforms: platformsArray,
        developer: row[getIdx('estudio')] || 'Estúdio',
        desc: row[getIdx('descricao')] || '',
        image: row[getIdx('imagem')] || '',
        fallbackImg: row[getIdx('imagem')] || '',
        trailerUrl: trailer && trailer !== '#'
          ? trailer
          : `https://www.youtube.com/results?search_query=${encodeURIComponent(titulo)}+trailer`,
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

    const headers = rows[0].map((h) => h.toLowerCase().trim())
    const getIdx = (name) => headers.indexOf(name)

    const list = []
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      const jogo = row[getIdx('jogo')] || ''
      if (!jogo) continue

      const descNum = parseFloat(row[getIdx('desconto')] || '0')
      const oldP = parseFloat(row[getIdx('preco_antigo')] || '0')
      const promoP = parseFloat(row[getIdx('preco_promocional')] || '0')

      list.push({
        game: jogo,
        store: row[getIdx('loja')] || 'Loja Digital',
        platformCategory: (row[getIdx('plataforma_categoria')] || 'pc').toLowerCase(),
        discount: descNum,
        oldPrice: oldP,
        price: promoP,
        tag: row[getIdx('destaque_tag')] || 'Promoção',
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

    const headers = rows[0].map((h) => h.toLowerCase().trim())
    const getIdx = (name) => headers.indexOf(name)

    const list = []
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      const titulo = row[getIdx('titulo')] || ''
      if (!titulo) continue

      list.push({
        title: titulo,
        category: row[getIdx('categoria')] || 'Geek',
        type: row[getIdx('tipo')] || 'series',
        streaming: row[getIdx('streaming')] || 'Cinema',
        rating: row[getIdx('nota')] || '9.0',
        year: row[getIdx('ano')] || '2025',
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
