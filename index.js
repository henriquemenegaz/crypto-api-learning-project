import express from 'express';
import axios from 'axios';
import { readFile, writeFile } from 'fs/promises';
import {existsSync} from 'fs';
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from "url";

const dirMain = path.dirname(fileURLToPath(import.meta.url));
const coinsMapPath = path.join(dirMain, '/data/coins_map.json');
const app = express();
const port = 3000;
const API_URL = 'https://api.coingecko.com/api/v3/';
const API_KEY = "CG-ugY21foPBJyZFJarFzmW6ykV";

// config object for axios
const config = {
    headers: {
        'x-cg-demo-api-key': API_KEY
      }
}

// Load the coins map if it exists
let coinsMap
if (existsSync(coinsMapPath)) {
    coinsMap = JSON.parse(await readFile(coinsMapPath, 'utf8'));
}
let coins;


// static files will be served from /public
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// get list of coins
app.get('/list', async (req, res) => {
    
    if (existsSync(coinsMapPath)) {
        const coinsMap = await readFile(coinsMapPath, 'utf8');        
    } else {
        try {
            const response = await axios.get(API_URL + "coins/list", config);            
            const coinsMap = JSON.stringify(response.data);
            await writeFile(coinsMapPath, coinsMap);
        } catch (error) {
            console.error("Failed to make request:", error.code);
        }
    }
    res.redirect('/');
});

// get coin IDs from ticker and show on main page
app.post('/coin-ids', async (req, res) => {
    const coinTicker = req.body.ticker;
    coins = coinsMap.filter(coin => coin.symbol === coinTicker);
    res.render('index.ejs', {coins: coins});
});

// get coin data from id
app.post('/coin-data', async (req, res) => {
    const coinId = req.body.coinId;
    const coin = coinsMap.filter(coin => coin.id === coinId);
    const coinName = coin[0].name;        
    const coinSymbol = coin[0].symbol;
    
    
    
    try {
        const newURL = API_URL + "simple/price/" + "?ids=" + coinId + "&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true";
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
        console.log(error);
        console.error("Failed to make request:", error.code);
    }
        
});

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function assertDefined(variable) {
    if (typeof variable === 'undefined') {
      throw new Error(`Error: Please, insert a valid ID. Look for ID above.`);
    }
  }