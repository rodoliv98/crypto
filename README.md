crypto-api
==========

A high-performance Node.js + Express service that proxies, rate-limits, and caches requests to the CoinGecko API. Designed to power front-end applications with reliable, fast crypto market data.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  
[![npm version](https://img.shields.io/npm/v/crypto-api.svg)](https://www.npmjs.com/package/crypto-api)  
[![Build Status](https://img.shields.io/github/actions/workflow/status/your-org/crypto-api/ci.yml?branch=main)](https://github.com/your-org/crypto-api/actions)

Features
--------

- **Market Data Endpoint**: Top coins by market cap, with sparkline and price-change metrics.  
- **Total Coins Endpoint**: Simplified list of all supported coins (ID, symbol, name) and total count.  
- **Search Endpoint**: Search by name or symbol.  
- **Price Endpoint**: Current price for any coin in USD or BRL.  
- **Full Metadata Endpoint**: Complete coin details via CoinGecko’s data.  
- **Security & Performance**  
  - CORS configured via `DEV_URL`.  
  - Rate limiter: 30 requests/minute per IP.  
  - Configurable server-side caching (5–60 minutes).

Table of Contents
-----------------

1. [Prerequisites](#prerequisites)  
2. [Installation](#installation)  
3. [Configuration](#configuration)  
4. [Running the Server](#running-the-server)  
5. [API Reference](#api-reference)  
6. [Error Handling](#error-handling)  
7. [Contributing](#contributing)  
8. [License](#license)  

Prerequisites
-------------

- **Node.js** v14 or higher  
- **npm** (or Yarn)  
- Internet access to reach CoinGecko’s public API  

Installation
-------------
```
git clone https://github.com/your-org/crypto-api.git
cd crypto-api
npm install
```

Configuration
-------------
Create a .env file in the project root:
```
# .env
DEV_URL=https://localhost:3000      # Your front-end application URL
PORT=3000                           # (Optional) HTTP port (default: 3000)
```

Running the Server
-------------
```
npm run dev
```
By default, the API listens on http://localhost:3000.

API Reference
-------------
All endpoints return JSON and utilize server-side caching (see individual TTL).

1. GET /
Fetches market data for top coins.

- Query Parameters

   `page` (integer, default: 1)

  `per_page` (integer, default: 50)

  `vs_currency` (usd or brl, default: brl)

- Response
```
[
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "current_price": 12345.67,
    "market_cap": 234567890123,
    "price_change_percentage_24h": 1.23,
    "sparkline_in_7d": { "price": [ ... ] }
  },
  // …
]
```
- Cache TTL: 5 minutes

2. GET /total
Retrieves a simplified list of all coins and the total count.

- Response
```
{
  "total": 12345,
  "coins": [
    { "id": "bitcoin", "symbol": "btc", "name": "Bitcoin" },
    // …
  ]
}
```
- Cache TTL: 5 minutes

3. GET /search
Search coins by name or symbol.

- Query Parameters

  `query` (string, required)

- Response
```
{
  "coins": [
    {
      "id": "bitcoin",
      "name": "Bitcoin",
      "symbol": "BTC",
      "market_cap_rank": 1,
      "thumb": "...",
      "large": "..."
    }
    // …
  ]
}

```
- Cache TTL: 5 minutes

4. GET /coin
Get the current price for a single coin.

- Query Parameters

  `id` (string, required)

  `currency` (usd or brl, default: usd)

- Response
```
{
  "id": "ethereum",
  "price": 2345.67
}

```
- Cache TTL: 60 minutes

5. GET /coin/:id
Fetch full metadata for a specific coin.

- Path Parameter

  `:id` (string, required)

- Response
Full JSON as returned by CoinGecko’s /coins/{id} endpoint.

- Cache TTL: 60 minutes

Error Handling
-------------
- 400 Bad Request
  Missing or invalid parameters (e.g. no id):
```
{ "error": "No coin provided" }
```
- 429 Too Many Requests
  Rate limit exceeded:
```
{ "error": "Too many requests, please try again later" }
```
- 500 Internal Server Error
  Upstream or unexpected errors:
```
{ "error": "Error while fetching data from CoinGecko" }
```

**Contributing**
-------------
Contributions are welcome! Please follow these steps:

* Fork the repository.

* Create a feature branch: git checkout -b feature/YourFeature.

* Commit your changes: git commit -m "Add your feature".

* Push to your branch: git push origin feature/YourFeature.

* Open a Pull Request.

License
-------------
Distributed under the MIT License. See LICENSE for details.
