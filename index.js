import express from 'express';
import axios from 'axios';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_URL = 'https://api.coingecko.com/api/v3/';
const API_KEY = "CG-ugY21foPBJyZFJarFzmW6ykV";

const config = {
    headers: {
        'x-cg-demo-api-key': API_KEY
      }
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/list', async (req, res) => {
    try {
        const response = await axios.get(API_URL + "coins/list", config);
        console.log(response.data);
        await fs.writeFileSync('./datacoins_map.json', JSON.stringify(response.data));
    } catch (error) {
        console.error("Failed to make request:", error.code);

    }
});

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})