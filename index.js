import express from 'express'
import axios from 'axios'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import apicache from 'apicache'
import 'dotenv/config'

const app = express();

const corsOptions = {
    origin: process.env.DEV_URL,
    credentials: true,
    optionsSuccessStatus: 200
}

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: { error: 'Too many requests, please try again later' }
})

const cache = apicache.middleware;

app.use(cors(corsOptions));
app.use(limiter);

function errorHandler(err, res) {
    console.error(err.message);
    return res.status(500).json({ error: 'Error while fetching data from Coingecko' });
}

app.get('/', cache('5 minutes'), async (req, res) => {
    const { page = 1, per_page = 50, vs_currency = 'brl' || 'usd' } = req.query;
    try{
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets',
            {
                params: {
                    vs_currency,
                    order: 'market_cap_desc',
                    page,
                    per_page,
                    sparkline: true,
                    price_change_percentage: '1h,24h,7d'
                }
            }
        );
    
        res.status(200).json(response.data);

    } catch(err){
        errorHandler(err, res);
    }
})

app.get('/total', cache('5 minutes'), async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const coins = response.data.map(({ id, symbol, name }) => ({ id, symbol, name }));
        res.status(200).json({ total: coins.length, coins });
    } catch (err) {
        errorHandler(err, res);
    }
});

app.get('/search', cache('5 minutes'), async (req, res) => {
    const { query } = req.query;
    try{
        const response = await axios.get('https://api.coingecko.com/api/v3/search', { params: { query } });
        res.status(200).json(response.data);
    } catch(err){
        errorHandler(err, res);
    }
})

app.get('/coin', cache('60 minutes'), async (req, res) => {
    const { id, currency = 'usd' || 'brl' } = req.query;
    if(!id) return res.status(400).json({ error: 'No coin provided' });
    try{
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        const price = response.data.market_data.current_price[currency];
        res.status(200).json({ id, price });
    } catch(err){
        errorHandler(err, res);
    }
})

app.get('/coin/:id', cache('60 minutes'), async (req, res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({ error: 'No coin provided' });
    try{
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        res.status(200).json(response.data);
    } catch(err){
        errorHandler(err, res);
    }
})

app.listen(3000, () => console.log('Server running'));