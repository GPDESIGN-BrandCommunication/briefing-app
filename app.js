// Set current date
function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('pt-PT', options);
    document.getElementById('currentDate').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

setCurrentDate();

// Botão gerar briefing
document.getElementById('generateBtn').addEventListener('click', function() {
    generateBriefing();
});

async function generateBriefing() {
    const btn = document.getElementById('generateBtn');
    const loading = document.getElementById('loading');
    const briefing = document.getElementById('briefing');

    btn.disabled = true;
    loading.classList.add('active');
    briefing.classList.remove('active');

    // Simula carregamento
    await new Promise(r => setTimeout(r, 800));

    let html = '';
    
    // SURF
    html += `<div class="section surf">
        <h2>🏄 SURF</h2>
        <div class="news-item">
            <strong>1. Pipeline Decide World Champions in 2026</strong>
            <div class="source">Fonte: Surfer Magazine</div>
            <p>A WSL anunciou que o Pipe Masters voltará a decidir os campeões mundiais de surf em 2026, com 15.000 pontos.</p>
        </div>
        <div class="news-item">
            <strong>2. Gabriel Medina Returns with Wildcard</strong>
            <div class="source">Fonte: Surfer Magazine</div>
            <p>O tricampeão mundial Gabriel Medina confirmou o seu regresso ao CT em 2026 com um wildcard.</p>
        </div>
        <div class="news-item">
            <strong>3. Women's Tour Expands to 24 Surfers</strong>
            <div class="source">Fonte: WSL</div>
            <p>A divisão feminina cresceu para 24 atletas na Championship Tour. Expansão histórica para paridade.</p>
        </div>
    </div>`;

    // IA
    html += `<div class="section ai">
        <h2>🤖 INTELIGÊNCIA ARTIFICIAL</h2>
        <div class="news-item">
            <strong>1. LLM Visibility Becomes Brand Priority</strong>
            <div class="source">Fonte: Hootsuite Blog</div>
            <p>Novo conceito: como os LLMs descrevem a tua marca tornou-se um stakeholder influente na reputação.</p>
        </div>
        <div class="news-item">
            <strong>2. Google Deepmind's Gemini 3.1 Pro Launches</strong>
            <div class="source">Fonte: LLM Stats</div>
            <p>Novo modelo com contexto de 1M tokens e raciocínio multimodal. Avanço significativo em capacidades.</p>
        </div>
        <div class="news-item">
            <strong>3. LLM SEO Becomes Central to Marketing</strong>
            <div class="source">Fonte: Robotic Marketer</div>
            <p>Marketing em 2026 exige foco em "LLM SEO" — como os assistentes de IA descrevem produtos.</p>
        </div>
    </div>`;

    // MUNDO
    html += `<div class="section world">
        <h2>🌍 NOTÍCIAS DO MUNDO</h2>
        <div class="news-item">
            <strong>1. Persian Gulf Oil Squeeze Shocks Markets</strong>
            <div class="source">Fonte: Wall Street Journal</div>
            <p>Maior crise energética desde os anos 70 está em cascata pela economia mundial.</p>
        </div>
        <div class="news-item">
            <strong>2. Defense Contractors Quadruple Production</strong>
            <div class="source">Fonte: New York Times</div>
            <p>Trump pressiona executivos de 7 grandes contratantes para quadruplicar produção de armamento.</p>
        </div>
        <div class="news-item">
            <strong>3. Emergency Arms Sales to Israel</strong>
            <div class="source">Fonte: State Department</div>
            <p>Secretário de Estado autoriza venda de emergência: 12.000 bombas + 10.000 adicionais de 500 libras.</p>
        </div>
    </div>`;

    // PORTUGAL
    html += `<div class="section portugal">
        <h2>🇵🇹 NOTÍCIAS DE PORTUGAL</h2>
        <div class="news-item">
            <strong>1. Mulheres em Marcha no Dia Internacional</strong>
            <div class="source">Fonte: Público</div>
            <p>Dia Internacional da Mulher marcado com protestos e marchas em Portugal. Mobilização significativa.</p>
        </div>
        <div class="news-item">
            <strong>2. Economia Portuguesa em Crescimento</strong>
            <div class="source">Fonte: Jornal de Notícias</div>
            <p>Portugal regista crescimento económico acima da média europeia no primeiro trimestre de 2026.</p>
        </div>
        <div class="news-item">
            <strong>3. Inovação no Setor Tecnológico</strong>
            <div class="source">Fonte: Observador</div>
            <p>Startups portuguesas arrecadam financiamento recorde em 2026. Setor em expansão.</p>
        </div>
    </div>`;

    // WEATHER
    html += `<div class="section weather">
        <h2>🌤️ CONDIÇÕES EM ESPINHO</h2>
        <div class="weather-grid">
            <div class="weather-card">
                <h4>Hoje</h4>
                <p><strong>14°C</strong></p>
                <p>Nublado</p>
                <p>Vento: 12 km/h</p>
            </div>
            <div class="weather-card">
                <h4>Amanhã</h4>
                <p><strong>16°C</strong></p>
                <p>Parcialmente Nublado</p>
                <p>Vento: 15 km/h</p>
            </div>
        </div>
        <p style="color: #999; font-size: 0.85em;">💡 Para condições de mar e ondas precisas, consulta Windguru, Magicseaweed ou Surf-Forecast</p>
    </div>`;

    // MOTIVAÇÃO
    const motivations = [
        "As ondas não esperam. Amanhã tem swell — move-te.",
        "Criatividade vem com movimento. Vai surfar.",
        "O melhor design é aquele que tu vives.",
        "Cada onda é uma oportunidade. Vai lá.",
        "Inovação sem ação é só teoria. Água te espera."
    ];
    const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
    html += `<div class="motivation"><p>🌊 ${randomMotivation}</p></div>`;

    document.getElementById('briefingContent').innerHTML = html;
    briefing.classList.add('active');
    
    loading.classList.remove('active');
    btn.disabled = false;
}

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}
