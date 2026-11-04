import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import FreeDropsBar from './components/FreeDropsBar.jsx'
import DiscordRooms from './components/DiscordRooms.jsx'
import Upcoming from './components/Upcoming.jsx'
import Deals from './components/Deals.jsx'
import ConsoleNews from './components/ConsoleNews.jsx'
import GeekGuide from './components/GeekGuide.jsx'
import CommunityHub from './components/CommunityHub.jsx'
import Footer from './components/Footer.jsx'

import { googleSheetsUrls } from './data/content.js'
import {
  fetchConsolesSheet,
  fetchUpcomingSheet,
  fetchDealsSheet,
  fetchGeekSheet,
} from './services/apiService.js'

export default function App() {
  const [data, setData] = useState({
    consoles: null,
    upcoming: null,
    deals: null,
    geek: null,
  })

  useEffect(() => {
    // Carrega cada planilha separada que estiver configurada
    if (googleSheetsUrls.consoles) {
      fetchConsolesSheet(googleSheetsUrls.consoles).then((consoles) => {
        setData((prev) => ({ ...prev, consoles }))
      })
    }
    if (googleSheetsUrls.lancamentos) {
      fetchUpcomingSheet(googleSheetsUrls.lancamentos).then((upcoming) => {
        setData((prev) => ({ ...prev, upcoming }))
      })
    }
    if (googleSheetsUrls.ofertas) {
      fetchDealsSheet(googleSheetsUrls.ofertas).then((deals) => {
        setData((prev) => ({ ...prev, deals }))
      })
    }
    if (googleSheetsUrls.filmes) {
      fetchGeekSheet(googleSheetsUrls.filmes).then((geek) => {
        setData((prev) => ({ ...prev, geek }))
      })
    }
  }, [])

  return (
    <div id="inicio" className="app">
      <Header />
      <main className="container">
        <Hero />
        <FreeDropsBar />
        <DiscordRooms />
        <Upcoming items={data.upcoming} />
        <Deals items={data.deals} />
        <ConsoleNews items={data.consoles} />
        <GeekGuide items={data.geek} />
        <CommunityHub />
      </main>
      <Footer />
    </div>
  )
}
