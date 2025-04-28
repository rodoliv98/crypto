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

git clone https://github.com/your-org/crypto-api.git
cd crypto-api
npm install
