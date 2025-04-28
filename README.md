Crypto API
A simple Node.js API for searching and retrieving cryptocurrency data using the CoinGecko public API. Supports searching, paginated market data, and detailed coin information with currency selection.

Features
Get paginated market data for coins in USD or BRL
Search for coins by name or symbol
Retrieve the total number of coins and their basic info
Get detailed information for a specific coin (by query or path parameter)
Built-in caching and rate limiting for efficient and safe usage
Endpoints
1. Get Paginated Market Data
GET /

| Query Parameter | Type | Default | Description | |-----------------|---------|---------|-----------------------------------------------| | page | integer | 1 | Page number for pagination | | per_page | integer | 50 | Number of coins per page (max 250) | | vs_currency | string | brl | Currency for prices (usd or brl) |

Example:

CopyInsert
GET /?page=1&per_page=100&vs_currency=usd
2. Search for Coins
GET /search

| Query Parameter | Type | Required | Description | |-----------------|--------|----------|---------------------------------| | query | string | yes | Coin name or symbol to search |

Example:

CopyInsert
GET /search?query=bitcoin
3. Get Total Number of Coins
GET /total

Returns the total number of available coins and their basic info.

4. Get Coin Details (by Query)
GET /coin

| Query Parameter | Type | Required | Description | |-----------------|--------|----------|--------------------------------------------| | id | string | yes | CoinGecko coin ID (e.g. bitcoin) | | currency | string | no | Currency for price (usd or brl, default: usd) |

Example:

CopyInsert
GET /coin?id=bitcoin&currency=usd
5. Get Coin Details (by Path)
GET /coin/:id

| Path Parameter | Type | Required | Description | |----------------|--------|----------|----------------------------------| | id | string | yes | CoinGecko coin ID (e.g. bitcoin) |

Example:

CopyInsert
GET /coin/bitcoin
Setup & Usage
Clone the repository:
bash
CopyInsert
git clone https://github.com/rodoliv98/crypto-api.git
cd crypto-api
Install dependencies:
bash
CopyInsert in Terminal
npm install
Start the server:
bash
CopyInsert in Terminal
npm run dev
The API will be available at http://localhost:3000.
Configuration
You can create a .env file to set environment variables if needed (e.g., for port or rate limiting).
The API uses CoinGecko’s public API, so no API key is required.
Technologies Used
Node.js
Express
Axios
apicache (caching)
express-rate-limit (rate limiting)
CORS
Documentation
See openapi.yaml for full OpenAPI documentation of all endpoints and schemas.

License
ISC
