// =====================================================================
// CONTEÚDO DO PORTAL eGamer
// Hub de Comunidade no Discord, Jogos, Ofertas e Cultura Geek
// =====================================================================

// Link de convite do servidor Discord (troque pelo seu).
export const discordUrl = 'https://discord.gg/egamer'

// LINKS DAS SUAS PLANILHAS SEPARADAS DO GOOGLE SHEETS
// Cole o link público CSV de cada uma que você quiser controlar por planilha.
// O que você deixar vazio '' continua usando a lista padrão do site sem quebrar!
export const googleSheetsUrls = {
  consoles: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQuA8fu2HuArECnNGAaGfECeK8275oYZhq7AIJtZWUS0qKhEHPX54gdA82EsnZz-qbu4dufy59HojaL/pub?output=csv',    // Planilha de PS Plus, Game Pass e novidades de consoles
  lancamentos: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRdR0eTn5EcaAm2ElQMxT1Keftpcq1sv-pxQ7-VcJvH7L-ihXkdmQa1i8LG5fwUPw/pub?output=csv', // Planilha de Próximos Lançamentos mais aguardados
  ofertas: '',     // Planilha de Jogos em Promoção e Ofertas
  filmes: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbAbKok05pPh30s1jlODnRh3ksyZmLnn5i7uD07thIg0RqOB7_xYqhhB-hNIPYO3G4pi7D8cUbq5dG/pub?output=csv',      // Planilha de Filmes, Séries e Cultura Geek
}

export const nav = [
  { label: 'Início', href: '#inicio' },
  { label: 'Salas do Discord', href: '#salas-discord' },
  { label: 'Lançamentos', href: '#lancamentos' },
  { label: 'Ofertas', href: '#ofertas' },
  { label: 'Consoles & Assinaturas', href: '#noticias' },
  { label: 'Guia Geek', href: '#geek' },
]

export const communityStats = {
  onlineMembers: 1480,
  voiceActiveCount: 23,
  totalGamers: '25.000+',
}

export const hero = {
  badge: 'SERVIDOR OFICIAL NO DISCORD',
  title: 'Conecte-se, Entre na Call & Jogue Junto',
  subtitle:
    'A central gamer definitiva: veja quais salas de voz estão ativas no Discord agora, encontre companhia para jogar, acompanhe os grandes lançamentos, aproveite super descontos e debata filmes e séries.',
  primaryCta: 'Ver Salas de Voz Ativas',
  secondaryCta: 'Explorar Ofertas & Jogos',
}

// Canais de Voz do Servidor Discord (Salas onde o pessoal joga e conversa)
export const discordVoiceRooms = [
  {
    id: 'voice-1',
    channelName: '🔊 Valorant • Sala 01 (Comp)',
    game: 'Valorant',
    category: 'Voz / Competitivo',
    activeUsers: 3,
    maxUsers: 5,
    activity: 'Jogando Modo Competitivo',
    members: ['Valkyrie', 'ShadowBR', 'Kaue_FPS'],
    badgeColor: 'cyan',
  },
  {
    id: 'voice-2',
    channelName: '🔊 CS2 • Premier / MM',
    game: 'Counter-Strike 2',
    category: 'Voz / Premier',
    activeUsers: 4,
    maxUsers: 5,
    activity: 'Partida em andamento (Mirage)',
    members: ['Lucas_Sniper', 'Bianca', 'Tox1c_BR', 'Ghost'],
    badgeColor: 'orange',
  },
  {
    id: 'voice-3',
    channelName: '🔊 Helldivers 2 • Esquadrão',
    game: 'Helldivers 2',
    category: 'Voz / Co-op',
    activeUsers: 2,
    maxUsers: 4,
    activity: 'Missão Dificuldade 7',
    members: ['MajorKranz', 'Democracia_BR'],
    badgeColor: 'cyan',
  },
  {
    id: 'voice-4',
    channelName: '🔊 GTA RP • Patrulha & Clã',
    game: 'GTA RP',
    category: 'Voz / Roleplay',
    activeUsers: 6,
    maxUsers: null, // sem limite
    activity: 'Servidor Cidade Alta',
    members: ['Tenente_Silva', 'Marcos', 'Aline', 'Pedro', 'Niko', '+1'],
    badgeColor: 'purple',
  },
  {
    id: 'voice-5',
    channelName: '🔊 League of Legends • ARAM/Flex',
    game: 'League of Legends',
    category: 'Voz / Casual',
    activeUsers: 3,
    maxUsers: 5,
    activity: 'Fila Flexível',
    members: ['MidOrAfk', 'SupportMain', 'JungleDiff'],
    badgeColor: 'cyan',
  },
  {
    id: 'voice-6',
    channelName: '🔊 Lounge Geek • Cinema & Séries',
    game: 'Bate-papo',
    category: 'Voz / Cultura Geek',
    activeUsers: 5,
    maxUsers: null,
    activity: 'Debatendo Demolidor e Arcane',
    members: ['CinefiloGamer', 'Ana_Geek', 'Renan', 'Mari', '+1'],
    badgeColor: 'purple',
  },
]

// Canais de Texto Temáticos no Servidor Discord
export const discordTextChannels = [
  {
    id: 'text-1',
    channel: '#procurando-duo',
    category: 'Squads & Equipes',
    desc: 'O canal onde a galera manda mensagem avisando que está livre para fechar trio, duo ou time completo.',
    tag: 'Matchmaking',
  },
  {
    id: 'text-2',
    channel: '#filmes-e-series',
    category: 'Cultura Pop',
    desc: 'Debates sobre episódios da semana, lançamentos do cinema, teorias de Marvel, animes e adaptações de games.',
    tag: 'Debate Geek',
  },
  {
    id: 'text-3',
    channel: '#jogos-gratis-e-promos',
    category: 'Economia Gamer',
    desc: 'Bots e membros postando avisos imediatos de jogos 100% gratuitos na Epic Games, Steam, PS Plus e Game Pass.',
    tag: 'Alertas',
  },
  {
    id: 'text-4',
    channel: '#clips-e-jogadas',
    category: 'Comunidade',
    desc: 'Espaço para compartilhar seus melhores clutches, jogadas épicas e clipes engraçados gravados no Discord.',
    tag: 'Clipes',
  },
]

// Drops e Jogos Grátis da Semana
export const freeDrops = [
  {
    store: 'Epic Games',
    title: 'Ghostrunner 2',
    type: '100% Grátis',
    deadline: 'Termina Quinta às 13h',
    badge: 'GRÁTIS',
    tagColor: 'green',
    link: 'https://store.epicgames.com',
  },
  {
    store: 'Prime Gaming',
    title: 'Fallout 76 + Tomb Raider',
    type: 'Resgate de Assinante',
    deadline: 'Disponível este mês',
    badge: 'PRIME',
    tagColor: 'purple',
    link: '#',
  },
  {
    store: 'Steam',
    title: 'Delta Force',
    type: 'Acesso Antecipado Aberto',
    deadline: 'Grátis para Jogar',
    badge: 'FREE TO PLAY',
    tagColor: 'cyan',
    link: '#',
  },
]

// Carrossel de Lançamentos de Alto Impacto
export const upcoming = [
  {
    title: 'DOOM: The Dark Ages',
    release: '2025',
    tag: 'FPS Frenético',
    platforms: ['PC', 'Xbox Series X|S', 'PS5'],
    developer: 'id Software / Bethesda',
    desc: 'A história de origem da fúria do Doom Slayer em uma guerra medieval épica contra as forças do Inferno.',
    image: '/img/doom.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/results?search_query=doom+the+dark+ages+trailer',
  },
  {
    title: 'Grand Theft Auto VI',
    release: '2025',
    tag: 'Mundo Aberto / Ação',
    platforms: ['PS5', 'Xbox Series X|S'],
    developer: 'Rockstar Games',
    desc: 'O retorno a Vice City na maior e mais imersiva evolução da série Grand Theft Auto de todos os tempos.',
    image: '/img/gta5.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/results?search_query=gta+6+trailer',
  },
  {
    title: 'Monster Hunter Wilds',
    release: '2025',
    tag: 'RPG de Ação / Co-op',
    platforms: ['PC', 'PS5', 'Xbox Series X|S'],
    developer: 'Capcom',
    desc: 'Ambientes dinâmicos e vivos, novas mecânicas de montaria e caçadas colossais com suporte total a crossplay.',
    image: '/img/delta-force.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/results?search_query=monster+hunter+wilds+trailer',
  },
]

// Novidades dos Ecossistemas de Consoles e Assinaturas
export const consoleNews = [
  {
    platform: 'PlayStation Plus',
    platformTag: 'PS Plus Deluxe/Extra',
    badgeColor: 'blue',
    title: 'GTA V e mais 12 títulos chegam ao catálogo',
    text: 'A Sony adicionou novos pesos-pesados para assinantes dos planos Extra e Deluxe neste mês, com acesso liberado a campanhas consagradas sem custo adicional.',
    image: '/img/gta5.jpg',
    date: 'Atualizado nesta semana',
  },
  {
    platform: 'Xbox Game Pass',
    platformTag: 'Dia 1 no Game Pass',
    badgeColor: 'green',
    title: 'Indiana Jones e o Grande Círculo em destaque',
    text: 'A nova grande aventura da Bethesda e MachineGames chega diretamente no lançamento para assinantes do Game Pass Ultimate no PC e Xbox Series.',
    image: '/img/indiana-jones.jpg',
    date: 'Lançamento confirmado',
  },
  {
    platform: 'PC / Steam',
    platformTag: 'Steam Free & Promoções',
    badgeColor: 'cyan',
    title: 'Delta Force: Testes abertos e festival tático',
    text: 'O aguardado shooter tático multiplayer chega com modos clássicos de guerra combinada e modo de extração com acesso gratuito para toda a comunidade.',
    image: '/img/delta-force.jpg',
    date: 'Disponível para testar',
  },
]

// Jogos em Promoção com Filtros de Plataforma
export const deals = [
  {
    game: 'Red Dead Redemption II',
    platform: 'Steam',
    platformCategory: 'pc',
    discount: 70,
    oldPrice: 299.9,
    price: 89.97,
    store: 'Steam Store',
    tag: 'Menor Preço Histórico',
    desc: 'Uma obra-prima absoluta sobre a era do Velho Oeste americano.',
    image: '/img/rdr2.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    link: 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/',
  },
  {
    game: 'The Last of Us Part I',
    platform: 'PlayStation',
    platformCategory: 'playstation',
    discount: 58,
    oldPrice: 349.9,
    price: 146.95,
    store: 'PlayStation Store',
    tag: 'Especial 30 Anos PS',
    desc: 'Totalmente reconstruído para o PS5 com gráficos e imersão incomparáveis.',
    image: '/img/last-of-us.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    link: '#',
  },
  {
    game: 'EA Sports College Football 25',
    platform: 'Xbox',
    platformCategory: 'xbox',
    discount: 50,
    oldPrice: 349.0,
    price: 174.5,
    store: 'Xbox Store',
    tag: 'Desconto Game Pass',
    desc: 'O retorno mais esperado do futebol universitário com jogabilidade de ponta.',
    image: '/img/college-football.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    link: '#',
  },
  {
    game: 'Cyberpunk 2077: Phantom Liberty Bundle',
    platform: 'PC',
    platformCategory: 'pc',
    discount: 55,
    oldPrice: 249.0,
    price: 112.05,
    store: 'GOG / Steam',
    tag: 'Super Oferta',
    desc: 'Explore Night City na sua melhor forma com a aclamada expansão com Idris Elba.',
    image: '/img/cyberpunk.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    link: '#',
  },
  {
    game: 'The Legend of Zelda: Tears of the Kingdom',
    platform: 'Nintendo',
    platformCategory: 'nintendo',
    discount: 30,
    oldPrice: 349.0,
    price: 244.3,
    store: 'Nintendo eShop',
    tag: 'Rara Promoção',
    desc: 'Uma aventura colossal pelas terras e céus de Hyrule.',
    image: '/img/zelda.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    link: '#',
  },
]

// Guia Geek: Séries, Filmes e Adaptações de Jogos
export const geek = [
  {
    title: 'Demolidor: Renascido',
    category: 'Série Marvel',
    type: 'series',
    streaming: 'Disney+',
    rating: '9.4',
    year: '2025',
    desc: 'Charlie Cox retorna como Matt Murdock enfrentando as garras do Rei do Crime em uma Nova York brutal.',
    image: '/img/daredevil.jpg',
    link: '#',
  },
  {
    title: 'Deadpool & Wolverine',
    category: 'Cinema / Ação',
    type: 'movies',
    streaming: 'Disney+ / Aluguel',
    rating: '8.9',
    year: '2024',
    desc: 'A dupla mais caótica do multiverso se reúne para salvar o universo com humor ácido e pancadaria.',
    image: '/img/deadpool-wolverine.jpg',
    link: '#',
  },
  {
    title: 'Agatha Desde Sempre',
    category: 'Série de Mistério',
    type: 'series',
    streaming: 'Disney+',
    rating: '8.2',
    year: '2024',
    desc: 'Agatha Harkness reúne um coven de bruxas para enfrentar os perigos da mística Estrada das Bruxas.',
    image: '/img/agatha.jpg',
    link: '#',
  },
  {
    title: 'The Last of Us - Temporada 2',
    category: 'Adaptação Gamer / Série',
    type: 'series',
    streaming: 'Max (HBO)',
    rating: 'Aguardado',
    year: '2025',
    desc: 'A continuação direta da jornada angustiante de Joel e Ellie, adaptando os eventos cruciais da Parte II.',
    image: '/img/last-of-us-series.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    link: '#',
  },
  {
    title: 'Arcane - Temporada 2',
    category: 'Animação / LoL',
    type: 'anime',
    streaming: 'Netflix',
    rating: '9.8',
    year: '2024',
    desc: 'O clímax eletrizante do confronto entre Piltover e Zaun, focado no destino trágico de Vi e Jinx.',
    image: '/img/arcane.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    link: '#',
  },
]

// Discussões e Tópicos Quentes da Comunidade
export const communityTopics = [
  {
    id: 1,
    title: 'Qual foi o jogo que mais te surpreendeu positivamente este ano?',
    author: 'GamerBR_88',
    replies: 142,
    likes: 389,
    tag: 'Debate Geral',
  },
  {
    id: 2,
    title: 'Dicas para quem está começando a jogar competitivo de Valorant sem tiltar',
    author: 'ClaraClutch',
    replies: 86,
    likes: 215,
    tag: 'Dicas & Guias',
  },
  {
    id: 3,
    title: 'Vale a pena investir no PS5 Pro pelo preço cobrado no Brasil?',
    author: 'TechGamerX',
    replies: 310,
    likes: 470,
    tag: 'Hardware',
  },
]

export const footer = {
  slogan: 'Conectando jogadores, celebrando histórias e fortalecendo a cultura geek no Discord.',
  columns: [
    {
      title: 'Discord & Comunidade',
      links: [
        { label: 'Salas de Voz ao Vivo', href: '#salas-discord' },
        { label: 'Entrar no Servidor Oficial', href: discordUrl },
        { label: 'Canal #procurando-duo', href: discordUrl },
        { label: 'Regras do Servidor', href: discordUrl },
      ],
    },
    {
      title: 'Jogos & Mídia',
      links: [
        { label: 'Próximos Lançamentos', href: '#lancamentos' },
        { label: 'Radar de Ofertas', href: '#ofertas' },
        { label: 'Jogos Grátis da Semana', href: '#drops' },
        { label: 'Guia Geek de Séries & Filmes', href: '#geek' },
      ],
    },
    {
      title: 'Plataforma',
      links: [
        { label: 'Sobre o eGamer', href: '#' },
        { label: 'Termos de Uso', href: '#' },
        { label: 'Privacidade', href: '#' },
        { label: 'Fale Conosco', href: '#' },
      ],
    },
  ],
  copyright: 'Copyright © 2024-2026 eGamer. Todos os direitos reservados. Feito para a comunidade gamer.',
}
