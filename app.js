// Service Worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => console.log('SW not supported'));
}

// Install prompt
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const installPrompt = document.getElementById('installPrompt');
const confirmInstall = document.getElementById('confirmInstall');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.add('show');
    installPrompt.classList.add('show');
});

installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
            installBtn.classList.remove('show');
            installPrompt.classList.remove('show');
        });
    }
});

confirmInstall.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
    }
});

// Set current date
function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('pt-PT', options);
    document.getElementById('currentDate').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

setCurrentDate();

// API Keys (use free tiers)
const API_KEYS = {
    newsapi: 'c540dbe86a4243f59ee83cb41375a14e', // Replace with your NewsAPI key
    openweather: '11d6b7b03d4af21c66a2948710284366', // Free tier
};

// Generate briefing
document.getElementById('generateBtn').addEventListener('click', generateBriefing);

async function generateBriefing() {
    const btn = document.getElementById('generateBtn');
    const loading = document.getElementById('loading');
    const briefing = document.getElementById('briefing');

    btn.disabled = true;
    loading.classList.add('active');
    briefing.classList.remove('active');

    try {
        const content = [];

        // Fetch all data in parallel
        const [surfNews, aiNews, worldNews, portugueseNews, weatherData] = await Promise.all([
            fetchSurfNews(),
            fetchAINews(),
            fetchWorldNews(),
            fetchPortugueseNews(),
            fetchWeatherData()
        ]);

        // Build HTML
        let html = '';

        // Surf section
        html += buildSection('🏄', 'SURF', surfNews, 'surf');

        // AI section
        html += buildSection('🤖', 'INTELIGÊNCIA ARTIFICIAL', aiNews, 'ai');

        // World news section
        html += buildSection('🌍', 'NOTÍCIAS DO MUNDO', worldNews, 'world');

        // Portuguese news section
        html += buildSection('🇵🇹', 'NOTÍCIAS DE PORTUGAL', portugueseNews, 'portugal');

        // Weather section
        html += buildWeatherSection(weatherData);

        // Motivation
        html += buildMotivation();

        document.getElementById('briefingContent').innerHTML = html;
        briefing.classList.add('active');

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('briefingContent').innerHTML = `
            <div class="error">
                <strong>Erro ao gerar briefing</strong><br>
                Verifica a ligação à internet e tenta novamente.<br>
                <small>${error.message}</small>
            </div>
        `;
        briefing.classList.add('active');
    } finally {
        loading.classList.remove('active');
        btn.disabled = false;
    }
}

async function fetchSurfNews() {
    try {
        // Using free news API with surf-related queries
        const response = await fetch(`https://newsapi.org/v2/everything?q=surf+WSL&sortBy=publishedAt&language=pt&pageSize=5&apiKey=${API_KEYS.newsapi}`);
        const data = await response.json();

        return (data.articles || []).slice(0, 4).map(article => ({
            title: article.title,
            source: article.source.name,
            description: article.description || 'Sem descrição disponível'
        }));
    } catch (error) {
        console.error('Surf news error:', error);
        return getMockSurfNews();
    }
}

async function fetchAINews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=AI+artificial+intelligence&sortBy=publishedAt&language=en&pageSize=5&apiKey=${API_KEYS.newsapi}`);
        const data = await response.json();

        return (data.articles || []).slice(0, 4).map(article => ({
            title: article.title,
            source: article.source.name,
            description: article.description || 'Sem descrição disponível'
        }));
    } catch (error) {
        console.error('AI news error:', error);
        return getMockAINews();
    }
}

async function fetchWorldNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${API_KEYS.newsapi}`);
        const data = await response.json();

        return (data.articles || []).slice(0, 3).map(article => ({
            title: article.title,
            source: article.source.name,
            description: article.description || 'Sem descrição disponível'
        }));
    } catch (error) {
        console.error('World news error:', error);
        return getMockWorldNews();
    }
}

async function fetchPortugueseNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=Portugal&sortBy=publishedAt&language=pt&pageSize=5&apiKey=${API_KEYS.newsapi}`);
        const data = await response.json();

        return (data.articles || []).slice(0, 3).map(article => ({
            title: article.title,
            source: article.source.name,
            description: article.description || 'Sem descrição disponível'
        }));
    } catch (error) {
        console.error('Portuguese news error:', error);
        return getMockPortugueseNews();
    }
}

async function fetchWeatherData() {
    try {
        // Espinho coordinates
        const lat = 40.7429;
        const lon = -8.6419;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt&appid=${API_KEYS.openweather}`);
        const data = await response.json();

        // Parse today and tomorrow
        const today = data.list[0];
        const tomorrow = data.list[8]; // 24 hours later

        return {
            today: {
                temp: Math.round(today.main.temp),
                description: today.weather[0].main,
                humidity: today.main.humidity,
                windSpeed: Math.round(today.wind.speed)
            },
            tomorrow: {
                temp: Math.round(tomorrow.main.temp),
                description: tomorrow.weather[0].main,
                humidity: tomorrow.main.humidity,
                windSpeed: Math.round(tomorrow.wind.speed)
            }
        };
    } catch (error) {
        console.error('Weather error:', error);
        return getMockWeatherData();
    }
}

// Mock data for fallback
function getMockSurfNews() {
    return [
        { title: 'WSL Championship Tour 2026 Update', source: 'Surfer Magazine', description: 'Atualizações sobre o tour mundial de surf' },
        { title: 'Espinho Beach Conditions Report', source: 'Surf Forecast', description: 'Condições atuais em Espinho' }
    ];
}

function getMockAINews() {
    return [
        { title: 'Latest LLM Benchmarks Released', source: 'TechCrunch', description: 'Novos benchmarks de modelos de linguagem' },
        { title: 'AI in Marketing 2026 Trends', source: 'Marketing AI Institute', description: 'Tendências de IA em marketing' }
    ];
}

function getMockWorldNews() {
    return [
        { title: 'Global Markets Report', source: 'Wall Street Journal', description: 'Relatório dos mercados globais' },
        { title: 'International Affairs Update', source: 'New York Times', description: 'Atualização de assuntos internacionais' }
    ];
}

function getMockPortugueseNews() {
    return [
        { title: 'Notícias de Portugal', source: 'Público', description: 'Últimas notícias nacionais' },
        { title: 'Atualização Econômica', source: 'Jornal de Notícias', description: 'Notícias da economia portuguesa' }
    ];
}

function getMockWeatherData() {
    return {
        today: { temp: 14, description: 'Nublado', humidity: 70, windSpeed: 12 },
        tomorrow: { temp: 16, description: 'Parcialmente Nublado', humidity: 65, windSpeed: 15 }
    };
}

// Build HTML sections
function buildSection(emoji, title, items, className) {
    let html = `<div class="section ${className}"><h2>${emoji} ${title}</h2>`;

    items.forEach((item, idx) => {
        html += `
            <div class="news-item">
                <strong>${idx + 1}. ${item.title}</strong>
                <div class="source">Fonte: ${item.source}</div>
                <p>${item.description}</p>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

function buildWeatherSection(data) {
    return `
        <div class="section weather">
            <h2>🌤️ CONDIÇÕES EM ESPINHO</h2>
            <div class="weather-grid">
                <div class="weather-card">
                    <h4>Hoje</h4>
                    <p><strong>${data.today.temp}°C</strong></p>
                    <p>${data.today.description}</p>
                    <p>Vento: ${data.today.windSpeed} km/h</p>
                </div>
                <div class="weather-card">
                    <h4>Amanhã</h4>
                    <p><strong>${data.tomorrow.temp}°C</strong></p>
                    <p>${data.tomorrow.description}</p>
                    <p>Vento: ${data.tomorrow.windSpeed} km/h</p>
                </div>
            </div>
            <p style="color: #999; font-size: 0.85em;">
                💡 Para condições de mar e ondas precisas, consulta Windguru, Magicseaweed ou Surf-Forecast
            </p>
        </div>
    `;
}

function buildMotivation() {
    const motivations = [
        "As ondas não esperam. Amanhã tem swell — move-te.",
        "Criatividade vem com movimento. Vai surfar.",
        "O melhor design é aquele que tu vives.",
        "Cada onda é uma oportunidade. Vai lá.",
        "Inovação sem ação é só teoria. Água te espera."
    ];

    const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];

    return `
        <div class="motivation">
            <p>🌊 ${randomMotivation}</p>
        </div>
    `;
}
