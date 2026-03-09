# 🚀 Briefing Diário — Guia de Deploy

A tua PWA está pronta! Aqui estão as instruções para instalar no teu telemóvel em menos de 5 minutos.

---

## **OPÇÃO 1: Deploy em Vercel (Recomendado — Mais Fácil)**

### Passo 1: Cria conta em Vercel
1. Vai a https://vercel.com
2. Clica em **"Sign Up"** (é grátis)
3. Usa a tua conta Google ou GitHub

### Passo 2: Faz upload dos ficheiros
1. Cria uma pasta `briefing-app` no teu computador
2. Move os 4 ficheiros para lá:
   - `index.html`
   - `app.js`
   - `sw.js`
   - `manifest.json`

3. Em Vercel, clica em **"New Project"**
4. Seleciona **"Import Git Repository"** ou faz drag & drop dos ficheiros
5. Clica em **"Deploy"**

### Passo 3: Acede no telemóvel
1. Vercel dá-te um URL tipo: `https://briefing-app-abc123.vercel.app`
2. Abre este link no teu telemóvel
3. Clica no botão **"Instalar App"** que aparece
4. A app fica no teu ecrã inicial como uma verdadeira app

---

## **OPÇÃO 2: Deploy em GitHub Pages (Também Grátis)**

### Passo 1: Cria repositório no GitHub
1. Vai a https://github.com/new
2. Nome: `briefing-app`
3. Seleciona **"Public"**
4. Clica **"Create Repository"**

### Passo 2: Faz upload dos ficheiros
1. Clica em **"uploading an existing file"**
2. Faz drag & drop dos 4 ficheiros
3. Clica **"Commit changes"**

### Passo 3: Ativa GitHub Pages
1. Vai a **"Settings"** do repositório
2. Procura **"Pages"** (à esquerda)
3. Muda a fonte para **"main"**
4. GitHub dá-te um URL tipo: `https://teuusername.github.io/briefing-app`

### Passo 4: Acede no telemóvel
1. Abre o URL no teu telemóvel
2. Clica em **"Instalar App"**
3. Pronto! Fica no teu ecrã inicial

---

## **OPÇÃO 3: Deploy em Netlify (Também Muito Fácil)**

### Passo 1: Cria conta em Netlify
1. Vai a https://netlify.com
2. Clica **"Sign up"** (grátis)
3. Liga com GitHub ou Google

### Passo 2: Deploy
1. Drag & drop dos 4 ficheiros para o interface
2. Netlify faz deploy automático
3. Dá-te um URL público

### Passo 3: Acede no telemóvel
1. Copia o URL público
2. Abre no telemóvel
3. Instala a app

---

## **🔑 CONFIGURAR APIs (Importante!)**

### NewsAPI
Atualmente está com `demo` (funciona com poucos pedidos). Para ilimitado:

1. Vai a https://newsapi.org
2. Faz sign up (grátis)
3. Copia a tua API Key
4. Em `app.js`, linha 21, muda:
   ```javascript
   newsapi: 'YOUR_API_KEY_HERE', // Substitui aqui
   ```

### OpenWeather
Já tem uma chave gratuita. Se quiseres a tua:

1. Vai a https://openweathermap.org/api
2. Cria conta
3. Copia a API Key
4. Em `app.js`, linha 22, muda:
   ```javascript
   openweather: 'YOUR_API_KEY_HERE', // Substitui aqui
   ```

---

## **📱 INSTALAR NO TELEMÓVEL**

### iPhone (iOS)
1. Abre a app no Safari
2. Toca no ícone **Partilhar** (seta para fora)
3. Seleciona **"Adicionar à Tela de Início"**
4. Nome: "Briefing Diário"
5. Toca **"Adicionar"**

### Android
1. Abre a app no Chrome ou Firefox
2. Toca no **menu** (⋮)
3. Seleciona **"Instalar app"** ou **"Add to Home screen"**
4. Confirma

---

## **✅ Testa Tudo**

Depois de instalar:

1. Clica no botão **"🔄 Gerar Briefing"**
2. Aguarda alguns segundos (carrega dados das APIs)
3. Verifica se aparece:
   - 🏄 Surf news
   - 🤖 IA news
   - 🌍 Notícias mundo
   - 🇵🇹 Notícias Portugal
   - 🌤️ Condições em Espinho

---

## **💡 Dicas**

- **Funciona offline?** Sim, guarda dados em cache (mas precisa de net para atualizar)
- **Push notifications?** Podes adicionar mais tarde com Web Push API
- **Automatizar diariamente?** Usa um serviço como IFTTT ou Zapier para chamar a app às 8h
- **Personalizar cores?** Edita as variáveis CSS em `index.html` (linha ~35)

---

## **🆘 Troubleshooting**

### "Não aparece botão de instalar"
- Tenta atualizar a página
- Garante que acedes via HTTPS (Vercel/Netlify fazem automaticamente)
- Tenta noutro navegador

### "Erro ao carregar notícias"
- Confirma que tens internet
- Verifica a NewsAPI Key em `app.js`
- Abre a consola (F12) e vê as mensagens de erro

### "App lenta"
- Limpa o cache do navegador
- Desativa extensions/plugins
- Tenta em WiFi rápido

---

## **📞 Suporte**

Se algo não funciona:
1. Abre a consola do navegador (F12)
2. Vê as mensagens de erro
3. Cria uma issue no GitHub

---

**Pronto! Tens um briefing diário como uma verdadeira app no teu telemóvel. Move-te! 🌊**
