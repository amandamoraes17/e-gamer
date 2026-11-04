# eGamer - Portal Gamer & Comunidade Discord

Portal gamer moderno em React + Vite com salas de voz do Discord, radar automático de jogos grátis e curadoria completa via **planilhas separadas do Google Sheets**.

---

## 🚀 Como Rodar no seu Computador

Requer [Node.js](https://nodejs.org) (versão 18 ou superior).

```bash
npm install
npm run dev
```

Abra o endereço indicado no seu navegador (normalmente `http://localhost:5173`).

---

## 📊 As 4 Planilhas Separadas (Google Sheets)

Para manter tudo organizado, você tem **4 planilhas modelos prontas** na raiz do projeto:

| Assunto | Arquivo Modelo no Projeto | O que você controla nela |
| :--- | :--- | :--- |
| **1. Consoles & PS Plus** | `planilha-consoles-plus.csv` | Jogos que entraram na PS Plus, Game Pass e Nintendo Switch. |
| **2. Próximos Lançamentos** | `planilha-lancamentos.csv` | Jogos mais aguardados (GTA VI, Doom, Monster Hunter). |
| **3. Ofertas de Jogos** | `planilha-ofertas.csv` | Jogos com super descontos e menor preço histórico. |
| **4. Filmes & Séries** | `planilha-filmes-series.csv` | Séries, lançamentos do cinema, streaming e animes. |

---

### Como colocar cada planilha no ar:

1. **Abra uma nova planilha:** acesse [sheets.new](https://sheets.new)
2. **Importe o modelo desejado:** 
   * Vá em **Arquivo** → **Importar** → aba **Fazer upload**
   * Selecione o arquivo `.csv` correspondente da pasta do seu projeto.
3. **Publique como CSV (3 cliques):**
   * Vá em **Arquivo** → **Compartilhar** → **Publicar na Web**
   * Mude para **Valores separados por vírgula (.csv)**
   * Clique em **Publicar** e copie o link.
4. **Cole no seu site:**
   Abra `src/data/content.js` e cole o link no campo correspondente:

```javascript
export const googleSheetsUrls = {
  consoles: 'SEU_LINK_CSV_DE_CONSOLES',
  lancamentos: 'SEU_LINK_CSV_DE_LANCAMENTOS',
  ofertas: 'SEU_LINK_CSV_DE_OFERTAS',
  filmes: 'SEU_LINK_CSV_DE_FILMES',
}
```

> **Dica:** O que você deixar vazio (`''`) continua funcionando normalmente com a lista padrão do site! Você pode ativar uma planilha de cada vez no seu próprio ritmo.
