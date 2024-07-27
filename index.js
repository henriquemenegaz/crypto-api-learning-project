import express from 'express';
import axios from 'axios';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from "url";

// Define o diretório principal e o caminho do arquivo coins_map.json
const dirMain = path.dirname(fileURLToPath(import.meta.url));
const coinsMapPath = path.join(dirMain, '/data/coins_map.json');

// Inicializa o aplicativo Express
const app = express();
const port = 3000;

// Define a URL da API e a chave da API
const API_URL = 'https://api.coingecko.com/api/v3/';
const API_KEY = "CG-ugY21foPBJyZFJarFzmW6ykV";

// Objeto de configuração para axios com o cabeçalho da chave da API
const config = {
    headers: {
        'x-cg-demo-api-key': API_KEY
    }
}

// Carrega o mapa de moedas se ele existir
let coinsMap;
if (existsSync(coinsMapPath)) {
    coinsMap = JSON.parse(await readFile(coinsMapPath, 'utf8'));
}
let coins;

// Define o diretório de arquivos estáticos
app.use(express.static('public'));

// Middleware para analisar dados application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para obter a lista de moedas
app.get('/list', async (req, res) => {
    try {
        if (existsSync(coinsMapPath)) {
            coinsMap = JSON.parse(await readFile(coinsMapPath, 'utf8'));
        } else {
            const response = await axios.get(API_URL + "coins/list", config);
            coinsMap = response.data;
            await writeFile(coinsMapPath, JSON.stringify(coinsMap));
        }
        res.redirect('/');
    } catch (error) {
        console.error("Failed to make request:", error);
        res.status(500).send({ error: "Failed to fetch coin list. Please try again later." });
    }
});

// Rota para obter os IDs das moedas a partir do ticker e mostrar na página principal
app.post('/coin-ids', (req, res) => {
    try {
        const coinTicker = req.body.ticker;
        coins = coinsMap.filter(coin => coin.symbol === coinTicker);
        if (coins.length === 0) {
            return res.status(404).send({ error: "No coins found with the provided ticker." });
        }
        res.render('index.ejs', { coins: coins });
    } catch (error) {
        console.error("Error processing coin-ids request:", error);
        res.status(500).send({ error: "An error occurred while processing your request. Please try again later." });
    }
});

// Rota para obter dados de uma moeda pelo ID
app.post('/coin-data', async (req, res) => {
    try {
        const coinId = req.body.coinId;
        const coin = coinsMap.find(coin => coin.id === coinId);
        if (!coin) {
            return res.status(404).send({ error: "Coin not found with the provided ID." });
        }

        const coinName = coin.name;
        const coinSymbol = coin.symbol;

        const newURL = `${API_URL}simple/price/?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`;
        const response = await axios.get(newURL, config);

        const coinData = response.data[coinId];
        coinData.symbol = coinSymbol;
        coinData.name = coinName;
        coinData.id = coinId;

        res.render('index.ejs', {
            coinData: coinData,
            coins: coins,
        });
    } catch (error) {
        console.error("Failed to make request:", error);
        res.status(500).send({ error: "Failed to fetch coin data. Please try again later." });
    }
});

// Rota para renderizar a página inicial
app.get('/', (req, res) => {
    res.render('index.ejs');
})

// Inicializa o servidor na porta especificada
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Função para verificar se uma variável está definida
function assertDefined(variable) {
    if (typeof variable === 'undefined') {
        throw new Error(`Error: Please, insert a valid ID. Look for ID above.`);
    }
}
